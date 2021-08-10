
// Classes

class FaceCaptureException {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new FaceCaptureException()

        result.errorCode = jsonObject["errorCode"]
        result.message = jsonObject["message"]

        return result
    }
}

class LivenessErrorException {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new LivenessErrorException()

        result.errorCode = jsonObject["errorCode"]
        result.message = jsonObject["message"]

        return result
    }
}

class MatchFacesException {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesException()

        result.errorCode = jsonObject["errorCode"]
        result.message = jsonObject["message"]

        return result
    }
}

class ComparedFacesPairException {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new ComparedFacesPairException()

        result.errorCode = jsonObject["errorCode"]
        result.message = jsonObject["message"]

        return result
    }
}

class ComparedFace {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new ComparedFace()

        result.tag = jsonObject["tag"]
        result.imageType = jsonObject["imageType"]
        result.position = jsonObject["position"]

        return result
    }
}

class ComparedFacesPair {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new ComparedFacesPair()

        result.first = ComparedFace.fromJson(jsonObject["first"])
        result.second = ComparedFace.fromJson(jsonObject["second"])
        result.similarity = jsonObject["similarity"]
        result.exception = ComparedFacesPairException.fromJson(jsonObject["exception"])

        return result
    }
}

class FaceCaptureResponse {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new FaceCaptureResponse()

        result.exception = FaceCaptureException.fromJson(jsonObject["exception"])
        result.image = Image.fromJson(jsonObject["image"])

        return result
    }
}

class LivenessResponse {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new LivenessResponse()

        result.bitmap = jsonObject["bitmap"]
        result.liveness = jsonObject["liveness"]
        result.exception = LivenessErrorException.fromJson(jsonObject["exception"])

        return result
    }
}

class MatchFacesResponse {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesResponse()

        result.exception = MatchFacesException.fromJson(jsonObject["exception"])
        result.matchedFaces = []
        if (jsonObject["matchedFaces"] != null)
            for (const i in jsonObject["matchedFaces"])
                result.matchedFaces.push(ComparedFacesPair.fromJson(jsonObject["matchedFaces"][i]))
        result.unmatchedFaces = []
        if (jsonObject["unmatchedFaces"] != null)
            for (const i in jsonObject["unmatchedFaces"])
                result.unmatchedFaces.push(ComparedFacesPair.fromJson(jsonObject["unmatchedFaces"][i]))

        return result
    }
}

class Image {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new Image()

        result.imageType = jsonObject["imageType"]
        result.tag = jsonObject["tag"]
        result.bitmap = jsonObject["bitmap"]

        return result
    }
}

class MatchFacesRequest {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesRequest()

        result.similarityThreshold = jsonObject["similarityThreshold"]
        result.images = []
        if (jsonObject["images"] != null)
            for (const i in jsonObject["images"])
                result.images.push(Image.fromJson(jsonObject["images"][i]))
        result.customMetadata = jsonObject["customMetadata"]

        return result
    }
}

// Enum

const ComparedFacesPairErrorCodes = {
    IMAGE_EMPTY: 1,
    FACE_NOT_DETECTED: 2,
    LANDMARKS_NOT_DETECTED: 3,
    FACE_ALIGNER_FAILED: 4,
    DESCRIPTOR_EXTRACTOR_ERROR: 5,
    API_CALL_FAILED: 6,
}

const FaceCaptureResultCodes = {
    CANCEL: 1,
    CAMERA_NOT_AVAILABLE: 2,
    CAMERA_NO_PERMISSION: 3,
    IN_PROGRESS_ALREADY: 4,
    CONTEXT_IS_NULL: 5,
}

const ImageType = {
    IMAGE_TYPE_PRINTED: 1,
    IMAGE_TYPE_RFID: 2,
    IMAGE_TYPE_LIVE: 3,
    IMAGE_TYPE_LIVE_WITH_DOC: 4,
}

const LivenessErrorCode = {
    CONTEXT_IS_NULL: 1,
    IN_PROGRESS_ALREADY: 2,
    ZOOM_NOT_SUPPORTED: 3,
    NO_LICENSE: 4,
    CANCELLED: 5,
    PROCESSING_TIMEOUT: 6,
    API_CALL_FAILED: 7,
    PROCESSING_FAILED: 8,
    PROCESSING_ATTEMPTS_ENDED: 9,
}

const LivenessStatus = {
    PASSED: 0,
    UNKNOWN: 1,
}

const MatchFacesErrorCodes = {
    IMAGE_EMPTY: 1,
    FACE_NOT_DETECTED: 2,
    LANDMARKS_NOT_DETECTED: 3,
    FACE_ALIGNER_FAILED: 4,
    DESCRIPTOR_EXTRACTOR_ERROR: 5,
    NO_LICENSE: 6,
    NOT_INITIALIZED: 7,
    COMMAND_IS_NOT_SUPPORTED: 8,
    COMMAND_PARAMS_READ_ERROR: 9,
    API_CALL_FAILED: 10,
    PROCESSING_FAILED: 11,
}

const Enum = {
   ComparedFacesPairErrorCodes,
   FaceCaptureResultCodes,
   ImageType,
   LivenessErrorCode,
   LivenessStatus,
   MatchFacesErrorCodes,
}

const FaceSDK = {}

FaceSDK.getServiceUrl = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getServiceUrl"])
FaceSDK.startLiveness = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["startLiveness"])
FaceSDK.getFaceSdkVersion = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getFaceSdkVersion"])
FaceSDK.presentFaceCaptureActivity = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["presentFaceCaptureActivity"])
FaceSDK.stopFaceCaptureActivity = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["stopFaceCaptureActivity"])
FaceSDK.stopLivenessProcessing = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["stopLivenessProcessing"])
FaceSDK.presentFaceCaptureActivityByCameraId = (cameraId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["presentFaceCaptureActivityByCameraId", cameraId])
FaceSDK.startLivenessByCameraId = (cameraId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["startLivenessByCameraId", cameraId])
FaceSDK.setServiceUrl = (url, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["setServiceUrl", url])
FaceSDK.matchFaces = (request, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["matchFaces", request])
FaceSDK.setLanguage = (language, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["setLanguage", language])

FaceSDK.Enum = Enum
FaceSDK.FaceCaptureResponse = FaceCaptureResponse
FaceSDK.LivenessResponse = LivenessResponse
FaceSDK.MatchFacesResponse = MatchFacesResponse
FaceSDK.MatchFacesRequest = MatchFacesRequest
FaceSDK.Image = Image

module.exports = FaceSDK