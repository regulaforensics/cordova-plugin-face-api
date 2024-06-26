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
        var ComparedFacesSplit = FaceSDKPlugin.ComparedFacesSplit
        var InitConfig = FaceSDKPlugin.InitConfig
        var InitResponse = FaceSDKPlugin.InitResponse
        var LivenessNotification = FaceSDKPlugin.LivenessNotification
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
            response = InitResponse.fromJson(JSON.parse(json))
            if (!response.success) {
                console.log(response.error.code);
                console.log(response.error.message);
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
                    var config = new InitConfig();
                    config.license = license
                    FaceSDK.initialize(config, onInit, e => { })
                }
                reader.readAsDataURL(file)
            })
        }, function (e) {
            FaceSDK.initialize(null, onInit, e => { })
        })

        function pickImage(first) {
            navigator.notification.confirm("Choose the option", button => {
                if (button == 1)
                    FaceSDK.startFaceCapture(null, raw => {
                        // handling event
                        var csEventId = "cameraSwitchEvent"
                        if (raw.substring(0, csEventId.length) === csEventId) {
                            raw = raw.substring(csEventId.length, raw.length)
                            var cameraId = raw
                            console.log("switched to camera " + cameraId)
                        } else {
                            // handling response
                            setImage(first, FaceCaptureResponse.fromJson(JSON.parse(raw)).image.image, Enum.ImageType.LIVE)
                        }
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
                image1.image = base64
                image1.imageType = type
                document.getElementById("img1").src = "data:image/png;base64," + base64
                document.getElementById("livenessResult").innerHTML = "nil"
            } else {
                image2.image = base64
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
            if (image1 == null || image1.image == null || image1.image == "" || image2 == null || image2.image == null || image2.image == "")
                return
            document.getElementById("similarityResult").innerHTML = "Processing..."
            request = new MatchFacesRequest()
            request.images = [image1, image2]
            FaceSDK.matchFaces(request, null, response => {
                response = MatchFacesResponse.fromJson(JSON.parse(response))
                FaceSDK.splitComparedFaces(response.results, 0.75, (split) => {
                    split = ComparedFacesSplit.fromJson(JSON.parse(split))
                    document.getElementById("similarityResult").innerHTML = split.matchedFaces.length > 0 ?
                        ((split.matchedFaces[0].similarity * 100).toFixed(2) + "%") : "error"
                }, (error) => { });
            }, e => { this.setState({ similarity: e }) })
        }

        function liveness() {
            FaceSDK.startLiveness({ skipStep: [Enum.LivenessSkipStep.ONBOARDING_STEP] }, raw => {
                // handling events
                var lnEventId = "livenessNotificationEvent"
                var csEventId = "cameraSwitchEvent"
                if (raw.substring(0, lnEventId.length) === lnEventId) {
                    raw = raw.substring(lnEventId.length, raw.length)
                    var notification = LivenessNotification.fromJson(JSON.parse(raw))
                    console.log("LivenessStatus: " + notification.status)
                } else if (raw.substring(0, csEventId.length) === csEventId) {
                    raw = raw.substring(csEventId.length, raw.length)
                    var cameraId = raw
                    console.log("switched to camera " + cameraId)
                } else {
                    // handling response
                    var result = LivenessResponse.fromJson(JSON.parse(raw))
                    setImage(true, result.image, Enum.ImageType.LIVE)
                    if (result.image != null)
                        document.getElementById("livenessResult").innerHTML = result.liveness == Enum.LivenessStatus.PASSED ? "passed" : "unknown"
                }
            }, e => { })
        }
    },

    receivedEvent: function (id) {
        console.log('Received Event: ' + id)
    },
}

app.initialize()
