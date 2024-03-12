var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    },

    onDeviceReady: function () {
        this.receivedEvent('deviceready')

        // This way you can import any class declared in FaceSDKPlugin
        var FaceSDK = FaceSDKPlugin.FaceSDK
        var FaceCaptureResponse = FaceSDKPlugin.FaceCaptureResponse
        var LivenessResponse = FaceSDKPlugin.LivenessResponse
        var MatchFacesResponse = FaceSDKPlugin.MatchFacesResponse
        var MatchFacesRequest = FaceSDKPlugin.MatchFacesRequest
        var MatchFacesImage = FaceSDKPlugin.MatchFacesImage
        var MatchFacesSimilarityThresholdSplit = FaceSDKPlugin.MatchFacesSimilarityThresholdSplit
        var InitializationConfiguration = FaceSDKPlugin.InitializationConfiguration
        var Enum = FaceSDKPlugin.Enum

        var image1 = new MatchFacesImage()
        var image2 = new MatchFacesImage()

        document.getElementById("similarityResult").innerHTML = "nil"
        document.getElementById("livenessResult").innerHTML = "nil"

        document.getElementById("img1").onclick = function () { pickImage(true) }
        document.getElementById("img2").onclick = function () { pickImage(false) }
        document.getElementById("matchFaces").addEventListener("click", matchFaces)
        document.getElementById("liveness").addEventListener("click", liveness)
        document.getElementById("clearResults").addEventListener("click", clearResults)

        var onInit = (json) => {
            response = JSON.parse(json)
            if (!response["success"]) {
                console.log("Init failed: ");
                console.log(json);
            } else {
                console.log("Init complete")
            }
        }

        path = cordova.file.applicationDirectory + "www/regula.license"
        window.resolveLocalFileSystemURL(path, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader()
                reader.onloadend = function (e) {
                    license = this.result.substring(this.result.indexOf(',') + 1)
                    var config = new InitializationConfiguration();
                    config.license = license
                    FaceSDK.initializeWithConfig(config, onInit, e => { })
                }
                reader.readAsDataURL(file)
            })
        }, function (e) {
            FaceSDK.initialize(onInit, e => { })
        })

        function pickImage(first) {
            navigator.notification.confirm("Choose the option", button => {
                if (button == 1)
                    FaceSDK.presentFaceCaptureActivity(result => {
                        setImage(first, FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap, Enum.ImageType.LIVE)
                    }, e => { })
                else
                    navigator.camera.getPicture(function (result) {
                        setImage(first, result, Enum.ImageType.PRINTED)
                    }, function (e) { }, {
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        mediaType: Camera.MediaType.PICTURE
                    })
            }, "", ["Use camera", "Use gallery"])
        }

        function setImage(first, base64, type) {
            if (base64 == null) return
            document.getElementById("similarityResult").innerHTML = "nil"
            if (first) {
                image1.bitmap = base64
                image1.imageType = type
                document.getElementById("img1").src = "data:image/png;base64," + base64
                document.getElementById("livenessResult").innerHTML = "nil"
            } else {
                image2.bitmap = base64
                image2.imageType = type
                document.getElementById("img2").src = "data:image/png;base64," + base64
            }
        }

        function clearResults() {
            document.getElementById("img1").src = "img/portrait.png"
            document.getElementById("img2").src = "img/portrait.png"
            document.getElementById("similarityResult").innerHTML = "nil"
            document.getElementById("livenessResult").innerHTML = "nil"
            image1 = new MatchFacesImage()
            image2 = new MatchFacesImage()
        }

        function matchFaces() {
            if (image1 == null || image1.bitmap == null || image1.bitmap == "" || image2 == null || image2.bitmap == null || image2.bitmap == "")
                return
            document.getElementById("similarityResult").innerHTML = "Processing..."
            request = new MatchFacesRequest()
            request.images = [image1, image2]
            FaceSDK.matchFaces(JSON.stringify(request), response => {
                response = MatchFacesResponse.fromJson(JSON.parse(response))
                FaceSDK.matchFacesSimilarityThresholdSplit(JSON.stringify(response.results), 0.75, (split) => {
                    split = MatchFacesSimilarityThresholdSplit.fromJson(JSON.parse(split))
                    document.getElementById("similarityResult").innerHTML = split.matchedFaces.length > 0 ?
                        ((split.matchedFaces[0].similarity * 100).toFixed(2) + "%") : "error"
                }, (error) => { });
            }, e => { this.setState({ similarity: e }) })
        }

        function liveness() {
            FaceSDK.startLiveness(result => {
                result = LivenessResponse.fromJson(JSON.parse(result))

                setImage(true, result.bitmap, Enum.ImageType.LIVE)
                if (result.bitmap != null)
                    document.getElementById("livenessResult").innerHTML = result["liveness"] == Enum.LivenessStatus.PASSED ? "passed" : "unknown"
            }, e => { })
        }
    },

    receivedEvent: function (id) {
        console.log('Received Event: ' + id)
    },
}

app.initialize()
