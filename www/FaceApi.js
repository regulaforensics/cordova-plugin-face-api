
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

class InitException {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new InitException()

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
        result.underlyingException = LivenessBackendException.fromJson(jsonObject["underlyingException"])
        result.message = jsonObject["message"]

        return result
    }
}

class LivenessBackendException {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new LivenessBackendException()

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
        result.sessionId = jsonObject["sessionId"]
        result.transactionId = jsonObject["transactionId"]
        result.exception = LivenessErrorException.fromJson(jsonObject["exception"])

        return result
    }
}

class MatchFacesResponse {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesResponse()

        result.exception = MatchFacesException.fromJson(jsonObject["exception"])
        result.detections = []
        if (jsonObject["detections"] != null)
            for (const i in jsonObject["detections"])
                result.detections.push(MatchFacesDetection.fromJson(jsonObject["detections"][i]))
        result.results = []
        if (jsonObject["results"] != null)
            for (const i in jsonObject["results"])
                result.results.push(MatchFacesComparedFacesPair.fromJson(jsonObject["results"][i]))

        return result
    }
}

class Image {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new Image()

        result.imageType = jsonObject["imageType"]
        result.bitmap = jsonObject["bitmap"]
        result.tag = jsonObject["tag"]
        result.imageData = []
        if (jsonObject["imageData"] != null)
            for (const i in jsonObject["imageData"])
                result.imageData.push(jsonObject["imageData"][i])

        return result
    }
}

class MatchFacesRequest {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesRequest()

        result.images = []
        if (jsonObject["images"] != null)
            for (const i in jsonObject["images"])
                result.images.push(MatchFacesImage.fromJson(jsonObject["images"][i]))
        result.customMetadata = jsonObject["customMetadata"]
        result.thumbnails = jsonObject["thumbnails"]

        return result
    }
}

class MatchFacesImage {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesImage()

        result.imageType = jsonObject["imageType"]
        result.detectAll = jsonObject["detectAll"]
        result.bitmap = jsonObject["bitmap"]
        result.identifier = jsonObject["identifier"]

        return result
    }
}

class MatchFacesComparedFacesPair {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesComparedFacesPair()

        result.first = MatchFacesComparedFace.fromJson(jsonObject["first"])
        result.second = MatchFacesComparedFace.fromJson(jsonObject["second"])
        result.similarity = jsonObject["similarity"]
        result.score = jsonObject["score"]
        result.exception = MatchFacesException.fromJson(jsonObject["exception"])

        return result
    }
}

class MatchFacesComparedFace {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesComparedFace()

        result.face = MatchFacesDetectionFace.fromJson(jsonObject["face"])
        result.image = MatchFacesImage.fromJson(jsonObject["image"])
        result.faceIndex = jsonObject["faceIndex"]
        result.imageIndex = jsonObject["imageIndex"]

        return result
    }
}

class MatchFacesDetectionFace {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesDetectionFace()

        result.faceIndex = jsonObject["faceIndex"]
        result.landmarks = []
        if (jsonObject["landmarks"] != null)
            for (const i in jsonObject["landmarks"])
                result.landmarks.push(Point.fromJson(jsonObject["landmarks"][i]))
        result.faceRect = Rect.fromJson(jsonObject["faceRect"])
        result.rotationAngle = jsonObject["rotationAngle"]
        result.thumbnail = jsonObject["thumbnail"]

        return result
    }
}

class MatchFacesDetection {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesDetection()

        result.image = MatchFacesImage.fromJson(jsonObject["image"])
        result.imageIndex = jsonObject["imageIndex"]
        result.faces = []
        if (jsonObject["faces"] != null)
            for (const i in jsonObject["faces"])
                result.faces.push(MatchFacesDetectionFace.fromJson(jsonObject["faces"][i]))
        result.exception = MatchFacesException.fromJson(jsonObject["exception"])

        return result
    }
}

class Point {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new Point()

        result.x = jsonObject["x"]
        result.y = jsonObject["y"]

        return result
    }
}

class Rect {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new Rect()

        result.bottom = jsonObject["bottom"]
        result.top = jsonObject["top"]
        result.left = jsonObject["left"]
        result.right = jsonObject["right"]

        return result
    }
}

class MatchFacesSimilarityThresholdSplit {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesSimilarityThresholdSplit()

        result.matchedFaces = []
        if (jsonObject["matchedFaces"] != null)
            for (const i in jsonObject["matchedFaces"])
                result.matchedFaces.push(MatchFacesComparedFacesPair.fromJson(jsonObject["matchedFaces"][i]))
        result.unmatchedFaces = []
        if (jsonObject["unmatchedFaces"] != null)
            for (const i in jsonObject["unmatchedFaces"])
                result.unmatchedFaces.push(MatchFacesComparedFacesPair.fromJson(jsonObject["unmatchedFaces"][i]))

        return result
    }
}

class DetectFacesRequest {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new DetectFacesRequest()

        result.scenario = jsonObject["scenario"]
        result.image = jsonObject["image"]
        result.configuration = DetectFacesConfiguration.fromJson(jsonObject["configuration"])

        return result
    }
}

class DetectFacesConfiguration {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new DetectFacesConfiguration()

        result.attributes = []
        if (jsonObject["attributes"] != null)
            for (const i in jsonObject["attributes"])
                result.attributes.push(jsonObject["attributes"][i])
        result.customQuality = []
        if (jsonObject["customQuality"] != null)
            for (const i in jsonObject["customQuality"])
                result.customQuality.push(ImageQualityCharacteristic.fromJson(jsonObject["customQuality"][i]))
        result.outputImageParams = OutputImageParams.fromJson(jsonObject["outputImageParams"])
        result.onlyCentralFace = jsonObject["onlyCentralFace"]

        return result
    }
}

class OutputImageParams {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new OutputImageParams()

        result.backgroundColor = jsonObject["backgroundColor"]
        result.crop = OutputImageCrop.fromJson(jsonObject["crop"])

        return result
    }
}

class OutputImageCrop {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new OutputImageCrop()

        result.type = jsonObject["type"]
        result.size = Size.fromJson(jsonObject["size"])
        result.padColor = jsonObject["padColor"]
        result.returnOriginalRect = jsonObject["returnOriginalRect"]

        return result
    }
}

class ImageQualityCharacteristic {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new ImageQualityCharacteristic()

        result.characteristicName = jsonObject["characteristicName"]
        result.imageQualityGroup = jsonObject["imageQualityGroup"]
        result.recommendedRange = ImageQualityRange.fromJson(jsonObject["recommendedRange"])
        result.customRange = ImageQualityRange.fromJson(jsonObject["customRange"])

        return result
    }
}

class ImageQualityRange {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new ImageQualityRange()

        result.min = jsonObject["min"]
        result.max = jsonObject["max"]

        return result
    }
}

class Size {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new Size()

        result.width = jsonObject["width"]
        result.height = jsonObject["height"]

        return result
    }
}

class DetectFacesResponse {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new DetectFacesResponse()

        result.detection = DetectFaceResult.fromJson(jsonObject["detection"])
        result.scenario = jsonObject["scenario"]
        result.error = DetectFacesErrorException.fromJson(jsonObject["error"])
        result.allDetections = []
        if (jsonObject["allDetections"] != null)
            for (const i in jsonObject["allDetections"])
                result.allDetections.push(DetectFaceResult.fromJson(jsonObject["allDetections"][i]))

        return result
    }
}

class DetectFacesErrorException {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new DetectFacesErrorException()

        result.errorCode = jsonObject["errorCode"]
        result.underlyingException = DetectFacesBackendException.fromJson(jsonObject["underlyingException"])
        result.message = jsonObject["message"]

        return result
    }
}

class DetectFacesBackendException {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new DetectFacesBackendException()

        result.errorCode = jsonObject["errorCode"]
        result.message = jsonObject["message"]

        return result
    }
}

class DetectFaceResult {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new DetectFaceResult()

        result.quality = []
        if (jsonObject["quality"] != null)
            for (const i in jsonObject["quality"])
                result.quality.push(ImageQualityResult.fromJson(jsonObject["quality"][i]))
        result.attributes = []
        if (jsonObject["attributes"] != null)
            for (const i in jsonObject["attributes"])
                result.attributes.push(DetectFacesAttributeResult.fromJson(jsonObject["attributes"][i]))
        result.landmarks = []
        if (jsonObject["landmarks"] != null)
            for (const i in jsonObject["landmarks"])
                result.landmarks.push(Point.fromJson(jsonObject["landmarks"][i]))
        result.crop = jsonObject["crop"]
        result.faceRect = Rect.fromJson(jsonObject["faceRect"])
        result.originalRect = Rect.fromJson(jsonObject["originalRect"])
        result.isQualityCompliant = jsonObject["isQualityCompliant"]

        return result
    }
}

class ImageQualityResult {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new ImageQualityResult()

        result.name = jsonObject["name"]
        result.group = jsonObject["group"]
        result.status = jsonObject["status"]
        result.range = ImageQualityRange.fromJson(jsonObject["range"])
        result.value = jsonObject["value"]

        return result
    }
}

class DetectFacesAttributeResult {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new DetectFacesAttributeResult()

        result.attribute = jsonObject["attribute"]
        result.value = jsonObject["value"]
        result.range = ImageQualityRange.fromJson(jsonObject["range"])
        result.confidence = jsonObject["confidence"]

        return result
    }
}

// Enum

const ImageQualityGroupName = {
    IMAGE_CHARACTERISTICS: 1,
    HEAD_SIZE_AND_POSITION: 2,
    FACE_QUALITY: 3,
    EYES_CHARACTERISTICS: 4,
    SHADOWS_AND_LIGHTNING: 5,
    POSE_AND_EXPRESSION: 6,
    HEAD_OCCLUSION: 7,
    BACKGROUND: 8,
    UNKNOWN: 9,
}

const DetectFacesErrorCode = {
    IMAGE_EMPTY: "IMAGE_EMPTY",
    FR_FACE_NOT_DETECTED: "FR_FACE_NOT_DETECTED",
    FACER_NO_LICENSE: "FACER_NO_LICENSE",
    FACER_IS_NOT_INITIALIZED: "FACER_IS_NOT_INITIALIZED",
    FACER_COMMAND_IS_NOT_SUPPORTED: "FACER_COMMAND_IS_NOT_SUPPORTED",
    FACER_COMMAND_PARAMS_READ_ERROR: "FACER_COMMAND_PARAMS_READ_ERROR",
    PROCESSING_FAILED: "PROCESSING_FAILED",
    REQUEST_FAILED: "REQUEST_FAILED",
    API_CALL_FAILED: "API_CALL_FAILED",
}

const InitErrorCode = {
    IN_PROGRESS_ALREADY: "IN_PROGRESS_ALREADY",
    CONTEXT_IS_NULL: "CONTEXT_IS_NULL",
    MISSING_CORE: "MISSING_CORE",
    INTERNAL_CORE_ERROR: "INTERNAL_CORE_ERROR",
}

const LivenessStatus = {
    PASSED: "PASSED",
    UNKNOWN: "UNKNOWN",
}

const CameraErrorCode = {
    CAMERA_NOT_AVAILABLE: "CAMERA_NOT_AVAILABLE",
    CAMERA_NO_PERMISSION: "CAMERA_NO_PERMISSION",
}

const LivenessErrorCode = {
    CONTEXT_IS_NULL: "CONTEXT_IS_NULL",
    IN_PROGRESS_ALREADY: "IN_PROGRESS_ALREADY",
    ZOOM_NOT_SUPPORTED: "ZOOM_NOT_SUPPORTED",
    NO_LICENSE: "NO_LICENSE",
    CANCELLED: "CANCELLED",
    PROCESSING_TIMEOUT: "PROCESSING_TIMEOUT",
    API_CALL_FAILED: "API_CALL_FAILED",
    PROCESSING_FAILED: "PROCESSING_FAILED",
    NOT_INITIALIZED: "NOT_INITIALIZED",
    CAMERA_NO_PERMISSION: "CAMERA_NO_PERMISSION",
    CAMERA_NOT_AVAILABLE: "CAMERA_NOT_AVAILABLE",
    PROCESSING_FRAME_FAILED: "PROCESSING_FRAME_FAILED",
}

const DetectFacesBackendErrorCode = {
    FR_FACE_NOT_DETECTED: 2,
    FACER_NO_LICENSE: 200,
    FACER_IS_NOT_INITIALIZED: 201,
    FACER_COMMAND_IS_NOT_SUPPORTED: 202,
    FACER_COMMAND_PARAMS_READ_ERROR: 203,
    UNDEFINED: -1,
}

const MatchFacesErrorCode = {
    IMAGE_EMPTY: "IMAGE_EMPTY",
    FACE_NOT_DETECTED: "FACE_NOT_DETECTED",
    LANDMARKS_NOT_DETECTED: "LANDMARKS_NOT_DETECTED",
    FACE_ALIGNER_FAILED: "FACE_ALIGNER_FAILED",
    DESCRIPTOR_EXTRACTOR_ERROR: "DESCRIPTOR_EXTRACTOR_ERROR",
    NO_LICENSE: "NO_LICENSE",
    IMAGES_COUNT_LIMIT_EXCEEDED: "IMAGES_COUNT_LIMIT_EXCEEDED",
    API_CALL_FAILED: "API_CALL_FAILED",
    PROCESSING_FAILED: "PROCESSING_FAILED",
}

const ImageQualityCharacteristicName = {
    IMAGE_WIDTH: "ImageWidth",
    IMAGE_HEIGHT: "ImageHeight",
    IMAGE_WIDTH_TO_HEIGHT: "ImageWidthToHeight",
    IMAGE_CHANNELS_NUMBER: "ImageChannelsNumber",
    PADDING_RATIO: "PaddingRatio",
    FACE_MID_POINT_HORIZONTAL_POSITION: "FaceMidPointHorizontalPosition",
    FACE_MID_POINT_VERTICAL_POSITION: "FaceMidPointVerticalPosition",
    HEAD_WIDTH_RATIO: "HeadWidthRatio",
    HEAD_HEIGHT_RATIO: "HeadHeightRatio",
    EYES_DISTANCE: "EyesDistance",
    YAW: "Yaw",
    PITCH: "Pitch",
    ROLL: "Roll",
    BLUR_LEVEL: "BlurLevel",
    NOISE_LEVEL: "NoiseLevel",
    UNNATURAL_SKIN_TONE: "UnnaturalSkinTone",
    FACE_DYNAMIC_RANGE: "FaceDynamicRange",
    EYE_RIGHT_CLOSED: "EyeRightClosed",
    EYE_LEFT_CLOSED: "EyeLeftClosed",
    EYE_RIGHT_OCCLUDED: "EyeRightOccluded",
    EYE_LEFT_OCCLUDED: "EyeLeftOccluded",
    EYES_RED: "EyesRed",
    EYE_RIGHT_COVERED_WITH_HAIR: "EyeRightCoveredWithHair",
    EYE_LEFT_COVERED_WITH_HAIR: "EyeLeftCoveredWithHair",
    OFF_GAZE: "OffGaze",
    TOO_DARK: "TooDark",
    TOO_LIGHT: "TooLight",
    FACE_GLARE: "FaceGlare",
    SHADOWS_ON_FACE: "ShadowsOnFace",
    SHOULDERS_POSE: "ShouldersPose",
    EXPRESSION_LEVEL: "ExpressionLevel",
    MOUTH_OPEN: "MouthOpen",
    SMILE: "Smile",
    DARK_GLASSES: "DarkGlasses",
    REFLECTION_ON_GLASSES: "ReflectionOnGlasses",
    FRAMES_TOO_HEAVY: "FramesTooHeavy",
    FACE_OCCLUDED: "FaceOccluded",
    HEAD_COVERING: "HeadCovering",
    FOREHEAD_COVERING: "ForeheadCovering",
    STRONG_MAKEUP: "StrongMakeup",
    HEAD_PHONES: "Headphones",
    MEDICAL_MASK: "MedicalMask",
    BACKGROUND_UNIFORMITY: "BackgroundUniformity",
    SHADOWS_ON_BACKGROUND: "ShadowsOnBackground",
    OTHER_FACES: "OtherFaces",
    BACKGROUND_COLOR_MATCH: "BackgroundColorMatch",
    UNKNOWN: "Unknown",
}

const DetectFacesScenario = {
    CROP_CENTRAL_FACE: "CropCentralFace",
    CROP_ALL_FACES: "CropAllFaces",
    THUMBNAIL: "Thumbnail",
    ATTRIBUTES_ALL: "AttributesAll",
    QUALITY_FULL: "QualityFull",
    QUALITY_ICAO: "QualityICAO",
    QUALITY_VISA_SCHENGEN: "QualityVisaSchengen",
    QUALITY_VISA_USA: "QualityVisaUSA",
}

const OutputImageCropAspectRatio = {
    OUTPUT_IMAGE_CROP_ASPECT_RATIO_3X4: 0,
    OUTPUT_IMAGE_CROP_ASPECT_RATIO_4X5: 1,
    OUTPUT_IMAGE_CROP_ASPECT_RATIO_2X3: 2,
    OUTPUT_IMAGE_CROP_ASPECT_RATIO_1X1: 3,
    OUTPUT_IMAGE_CROP_ASPECT_RATIO_7X9: 4,
}

const LivenessSkipStep = {
    NONE: 0,
    START_STEP: 1,
    DONE_STEP: 2,
}

const ImageQualityResultStatus = {
    IMAGE_QUALITY_RESULT_STATUS_FALSE: 0,
    IMAGE_QUALITY_RESULT_STATUS_TRUE: 1,
    IMAGE_QUALITY_RESULT_STATUS_UNDETERMINED: 2,
}

const ImageType = {
    PRINTED: 1,
    RFID: 2,
    LIVE: 3,
    DOCUMENT_WITH_LIVE: 4,
    EXTERNAL: 5,
    GHOST_PORTRAIT: 6,
}

const FaceCaptureErrorCode = {
    CANCEL: "CANCEL",
    CAMERA_NOT_AVAILABLE: "CAMERA_NOT_AVAILABLE",
    CAMERA_NO_PERMISSION: "CAMERA_NO_PERMISSION",
    IN_PROGRESS_ALREADY: "IN_PROGRESS_ALREADY",
    CONTEXT_IS_NULL: "CONTEXT_IS_NULL",
    TIMEOUT: "TIMEOUT",
    NOT_INITIALIZED: "NOT_INITIALIZED",
}

const LivenessBackendErrorCode = {
    UNDEFINED: -1,
    NO_LICENSE: 200,
    LOW_QUALITY: 231,
    HIGH_ASYMMETRY: 232,
    TRACK_BREAK: 246,
    CLOSED_EYES_DETECTED: 230,
    FACE_OVER_EMOTIONAL: 233,
    SUNGLASSES_DETECTED: 234,
    SMALL_AGE: 235,
    HEADDRESS_DETECTED: 236,
    MEDICINE_MASK_DETECTED: 239,
    OCCLUSION_DETECTED: 240,
    FOREHEAD_GLASSES_DETECTED: 242,
    MOUTH_OPENED: 243,
    ART_MASK_DETECTED: 244,
    NOT_MATCHED: 237,
    IMAGES_COUNT_LIMIT_EXCEEDED: 238,
    ELECTRONIC_DEVICE_DETECTED: 245,
    WRONG_GEO: 247,
    WRONG_OF: 248,
    WRONG_VIEW: 249,
}

const DetectFacesAttribute = {
    AGE: "Age",
    EYE_RIGHT: "EyeRight",
    EYE_LEFT: "EyeLeft",
    EMOTION: "Emotion",
    SMILE: "Smile",
    GLASSES: "Glasses",
    HEAD_COVERING: "HeadCovering",
    FOREHEAD_COVERING: "ForeheadCovering",
    MOUTH: "Mouth",
    MEDICAL_MASK: "MedicalMask",
    OCCLUSION: "Occlusion",
    STRONG_MAKEUP: "StrongMakeup",
    HEADPHONES: "Headphones",
}

const Enum = {
   ImageQualityGroupName,
   DetectFacesErrorCode,
   InitErrorCode,
   LivenessStatus,
   CameraErrorCode,
   LivenessErrorCode,
   DetectFacesBackendErrorCode,
   MatchFacesErrorCode,
   ImageQualityCharacteristicName,
   DetectFacesScenario,
   OutputImageCropAspectRatio,
   LivenessSkipStep,
   ImageQualityResultStatus,
   ImageType,
   FaceCaptureErrorCode,
   LivenessBackendErrorCode,
   DetectFacesAttribute,
}

const FaceSDK = {}

FaceSDK.getServiceUrl = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getServiceUrl"])
FaceSDK.startLiveness = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["startLiveness"])
FaceSDK.getFaceSdkVersion = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getFaceSdkVersion"])
FaceSDK.presentFaceCaptureActivity = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["presentFaceCaptureActivity"])
FaceSDK.stopFaceCaptureActivity = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["stopFaceCaptureActivity"])
FaceSDK.init = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["init"])
FaceSDK.deinit = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["deinit"])
FaceSDK.isInitialized = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["isInitialized"])
FaceSDK.stopLivenessProcessing = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["stopLivenessProcessing"])
FaceSDK.setRequestHeaders = (headers, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["setRequestHeaders", headers])
FaceSDK.presentFaceCaptureActivityWithConfig = (config, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["presentFaceCaptureActivityWithConfig", config])
FaceSDK.startLivenessWithConfig = (config, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["startLivenessWithConfig", config])
FaceSDK.setServiceUrl = (url, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["setServiceUrl", url])
FaceSDK.matchFaces = (request, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["matchFaces", request])
FaceSDK.detectFaces = (request, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["detectFaces", request])
FaceSDK.matchFacesWithConfig = (request, config, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["matchFacesWithConfig", request, config])
FaceSDK.setLanguage = (language, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["setLanguage", language])
FaceSDK.matchFacesSimilarityThresholdSplit = (faces, similarity, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["matchFacesSimilarityThresholdSplit", faces, similarity])


FaceSDK.Enum = Enum
FaceSDK.FaceCaptureResponse = FaceCaptureResponse
FaceSDK.LivenessResponse = LivenessResponse
FaceSDK.MatchFacesResponse = MatchFacesResponse
FaceSDK.MatchFacesRequest = MatchFacesRequest
FaceSDK.MatchFacesSimilarityThresholdSplit = MatchFacesSimilarityThresholdSplit
FaceSDK.MatchFacesImage = MatchFacesImage

module.exports = FaceSDK