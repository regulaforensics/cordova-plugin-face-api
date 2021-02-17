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

        var img1
        var img2
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
            console.log("clearResults")
        }

        function useGallery(first){
            console.log("useGallery" + first)
        }

        function pickImage(first){
            console.log("pickImage" + first)
        }
    },

    receivedEvent: function (id) {
        console.log('Received Event: ' + id)
    },
}

app.initialize()