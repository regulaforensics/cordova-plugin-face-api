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

        var similarityResult = "unknown"
        var livenessResult = "unknown"
        document.getElementById("similarityResult").innerHTML = similarityResult
        document.getElementById("livenessResult").innerHTML = livenessResult

        document.getElementById("img1").onclick = function () { pickImage(true) }
        document.getElementById("img2").onclick = function () { pickImage(false) }
        document.getElementById("matchFaces").addEventListener("click", matchFaces)
        document.getElementById("liveness").addEventListener("click", liveness)
        document.getElementById("clearResults").addEventListener("click", clearResults)

        function liveness(){
            console.log("liveness")
        }

        function matchFaces(){
            console.log("matchFaces")
        }

        function clearResults(){

        }

        function useGallery(first){
            window.imagePicker.getPictures(function (results) {
                readFile(results[0], function (base64) {
                    if (first) {
                        console.log(base64)
                        document.getElementById("img1").src = base64
                        image1.bitmap = base64
                        image1.imageType = Enum.eInputFaceType.ift_DocumentPrinted
                    } else {
                        document.getElementById("img2").src = base64
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
            if (window.cordova.platformId == "android")
                useGalleryAndroid(first)
            if (window.cordova.platformId == "ios")
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