var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    },

    onDeviceReady: function () {
        this.receivedEvent('deviceready')
        var Enum = Face.Enum
        var FaceCaptureResponse = Face.FaceCaptureResponse
        var LivenessResponse = Face.LivenessResponse
        var MatchFacesResponse = Face.MatchFacesResponse
        var MatchFacesRequest = Face.MatchFacesRequest

        var image1 = new Face.Image()
        var image2 = new Face.Image()

        document.getElementById("similarityResult").innerHTML = "unknown"
        document.getElementById("livenessResult").innerHTML = "unknown"

        document.getElementById("img1").onclick = function () { pickImage(true) }
        document.getElementById("img2").onclick = function () { pickImage(false) }
        document.getElementById("matchFaces").addEventListener("click", matchFaces)
        document.getElementById("liveness").addEventListener("click", liveness)
        document.getElementById("clearResults").addEventListener("click", clearResults)

        function liveness(){
            Face.startLivenessMatching(result => {
                result = LivenessResponse.fromJson(JSON.parse(result))
                image1.bitmap = result.bitmap
                image1.imageType = Enum.eInputFaceType.ift_Live
                document.getElementById("img1").src = "data:image/png;base64," + result.bitmap
                document.getElementById("livenessResult").innerHTML = result["liveness"] == 0 ? "passed" : "unknown"
            }, e => { })
        }

        function matchFaces(){
            if(image1 == null || image1.bitmap == null || image1.bitmap == "" || image2 == null || image2.bitmap == null || image2.bitmap == "")
              return
            request = new MatchFacesRequest()
            request.images = [image1, image2]
            Face.matchFaces(JSON.stringify(request), response => {
                response = MatchFacesResponse.fromJson(JSON.parse(response))
                matchedFaces = response.matchedFaces
                document.getElementById("similarityResult").innerHTML = matchedFaces.length > 0 ? ((matchedFaces[0].similarity*100).toFixed(2) + "%") : "error"
            }, e => { this.setState({ similarity: e }) })
        }

        function clearResults(){
            document.getElementById("img1").src = "img/portrait.png"
            document.getElementById("img2").src = "img/portrait.png"
            image1 = new Face.Image()
            image2 = new Face.Image()
            document.getElementById("similarityResult").innerHTML = "unknown"
            document.getElementById("livenessResult").innerHTML = "unknown"
        }

        function useGallery(first){
            window.imagePicker.getPictures(function (results) {
                readFile(results[0], function (base64) {
                    if (first) {
                        document.getElementById("img1").src = "data:image/png;base64," + base64
                        image1.bitmap = base64
                        image1.imageType = Enum.eInputFaceType.ift_DocumentPrinted
                    } else {
                        document.getElementById("img2").src = "data:image/png;base64," + base64
                        image2.bitmap = base64
                        image2.imageType = Enum.eInputFaceType.ift_DocumentPrinted
                    }
                })
            }, function (e) { }, { maximumImagesCount: 1 })
        }

        function useGalleryAndroid(first){
            var permissions = cordova.plugins.permissions
            permissions.checkPermission(permissions.READ_EXTERNAL_STORAGE, function (status) {
                if (status.hasPermission)
                    useGallery(first)
                else {
                    permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, function success(status) {
                        if (status.hasPermission)
                            useGallery(first)
                    }, function error() {
                        console.warn('READ_EXTERNAL_STORAGE permission denied')
                    })
                }
            })
        }

        function pickImage(first){
            if(confirm("Use camera?"))
                Face.presentFaceCaptureActivity(result => {
                    result = FaceCaptureResponse.fromJson(JSON.parse(result))
                    if (first) {
                        document.getElementById("img1").src = "data:image/png;base64," + result.image.bitmap
                        image1.bitmap = result.image.bitmap
                        image1.imageType = Enum.eInputFaceType.ift_Live
                    } else {
                        document.getElementById("img2").src = "data:image/png;base64," + result.image.bitmap
                        image2.bitmap = result.image.bitmap
                        image2.imageType = Enum.eInputFaceType.ift_Live
                    }
                }, e => { })
            else if (window.cordova.platformId == "android")
                useGalleryAndroid(first)
            else if (window.cordova.platformId == "ios")
                useGallery(first)
        }

        function readFile(path, callback, ...items) {
            if (path.substring(0, 8) !== "file:///")
                path = cordova.file.applicationDirectory + path
            window.resolveLocalFileSystemURL(path, function (fileEntry) {
                fileEntry.file(function (file) {
                    var reader = new FileReader()
                    reader.onloadend = function (e) {
                        callback(this.result.substring(this.result.indexOf(',') + 1), items)
                    }
                    reader.readAsDataURL(file)
                })
            }, function (e) { console.log(JSON.stringify(e)) })
        }
    },

    receivedEvent: function (id) {
        console.log('Received Event: ' + id)
    },
}

app.initialize()