
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
        result.tag = jsonObject["tag"]
        result.transactionId = jsonObject["transactionId"]
        result.estimatedAge = jsonObject["estimatedAge"]
        result.exception = LivenessErrorException.fromJson(jsonObject["exception"])

        return result
    }
}

class MatchFacesResponse {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesResponse()

        result.tag = jsonObject["tag"]
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
        result.imageData = jsonObject["imageData"]

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
        result.tag = jsonObject["tag"]

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

        result.tag = jsonObject["tag"]
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

class Font {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new Font()

        result.name = jsonObject["name"]
        result.style = jsonObject["style"]
        result.size = jsonObject["size"]

        return result
    }
}

class Person {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new Person()

        result.name = jsonObject["name"]
        result.groups = []
        if (jsonObject["groups"] != null)
            for (const i in jsonObject["groups"])
                result.groups.push(jsonObject["groups"][i])
        result.updatedAt = jsonObject["updatedAt"]
        result.id = jsonObject["id"]
        result.metadata = jsonObject["metadata"]
        result.createdAt = jsonObject["createdAt"]

        return result
    }
}

class PersonGroup {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new PersonGroup()

        result.name = jsonObject["name"]
        result.id = jsonObject["id"]
        result.metadata = jsonObject["metadata"]
        result.createdAt = jsonObject["createdAt"]

        return result
    }
}

class PersonImage {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new PersonImage()

        result.path = jsonObject["path"]
        result.url = jsonObject["url"]
        result.contentType = jsonObject["contentType"]
        result.id = jsonObject["id"]
        result.metadata = jsonObject["metadata"]
        result.createdAt = jsonObject["createdAt"]

        return result
    }
}

class ImageUpload {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new ImageUpload()

        result.imageData = jsonObject["imageData"]

        return result
    }
}

class EditGroupPersonsRequest {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new EditGroupPersonsRequest()

        result.personIdsToAdd = []
        if (jsonObject["personIdsToAdd"] != null)
            for (const i in jsonObject["personIdsToAdd"])
                result.personIdsToAdd.push(jsonObject["personIdsToAdd"][i])
        result.personIdsToRemove = []
        if (jsonObject["personIdsToRemove"] != null)
            for (const i in jsonObject["personIdsToRemove"])
                result.personIdsToRemove.push(jsonObject["personIdsToRemove"][i])

        return result
    }
}

class SearchPersonRequest {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new SearchPersonRequest()

        result.outputImageParams = OutputImageParams.fromJson(jsonObject["outputImageParams"])
        result.groupIdsForSearch = []
        if (jsonObject["groupIdsForSearch"] != null)
            for (const i in jsonObject["groupIdsForSearch"])
                result.groupIdsForSearch.push(jsonObject["groupIdsForSearch"][i])
        result.threshold = jsonObject["threshold"]
        result.limit = jsonObject["limit"]
        result.imageUpload = ImageUpload.fromJson(jsonObject["imageUpload"])
        result.detectAll = jsonObject["detectAll"]

        return result
    }
}

class SearchPerson {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new SearchPerson()

        result.detection = SearchPersonDetection.fromJson(jsonObject["detection"])
        result.images = []
        if (jsonObject["images"] != null)
            for (const i in jsonObject["images"])
                result.images.push(SearchPersonImage.fromJson(jsonObject["images"][i]))
        result.name = jsonObject["name"]
        result.groups = []
        if (jsonObject["groups"] != null)
            for (const i in jsonObject["groups"])
                result.groups.push(jsonObject["groups"][i])
        result.updatedAt = jsonObject["updatedAt"]
        result.id = jsonObject["id"]
        result.metadata = jsonObject["metadata"]
        result.createdAt = jsonObject["createdAt"]

        return result
    }
}

class SearchPersonImage {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new SearchPersonImage()

        result.similarity = jsonObject["similarity"]
        result.distance = jsonObject["distance"]
        result.path = jsonObject["path"]
        result.url = jsonObject["url"]
        result.contentType = jsonObject["contentType"]
        result.id = jsonObject["id"]
        result.metadata = jsonObject["metadata"]
        result.createdAt = jsonObject["createdAt"]

        return result
    }
}

class SearchPersonDetection {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new SearchPersonDetection()

        result.landmarks = []
        if (jsonObject["landmarks"] != null)
            for (const i in jsonObject["landmarks"])
                result.landmarks.push(Point.fromJson(jsonObject["landmarks"][i]))
        result.rect = Rect.fromJson(jsonObject["rect"])
        result.cropImage = jsonObject["cropImage"]
        result.rotationAngle = jsonObject["rotationAngle"]

        return result
    }
}

class LivenessNotification {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new LivenessNotification()

        result.status = jsonObject["status"]
        result.response = LivenessResponse.fromJson(jsonObject["response"])

        return result
    }
}

class VideoEncoderCompletion {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new VideoEncoderCompletion()

        result.success = jsonObject["success"]
        result.transactionId = jsonObject["transactionId"]

        return result
    }
}

// Enum

const FontStyle = {
    NORMAL: 0,
    BOLD: 1,
    ITALIC: 2,
    BOLD_ITALIC: 3,
}

const CustomizationColor = {
    ONBOARDING_SCREEN_START_BUTTON_BACKGROUND: "CustomizationColor.ONBOARDING_SCREEN_START_BUTTON_BACKGROUND",
    ONBOARDING_SCREEN_START_BUTTON_TITLE: "CustomizationColor.ONBOARDING_SCREEN_START_BUTTON_TITLE",
    ONBOARDING_SCREEN_BACKGROUND: "CustomizationColor.ONBOARDING_SCREEN_BACKGROUND",
    ONBOARDING_SCREEN_TITLE_LABEL_TEXT: "CustomizationColor.ONBOARDING_SCREEN_TITLE_LABEL_TEXT",
    ONBOARDING_SCREEN_MESSAGE_LABEL_TEXT: "CustomizationColor.ONBOARDING_SCREEN_MESSAGE_LABEL_TEXT",
    CAMERA_SCREEN_STROKE_NORMAL: "CustomizationColor.CAMERA_SCREEN_STROKE_NORMAL",
    CAMERA_SCREEN_STROKE_ACTIVE: "CustomizationColor.CAMERA_SCREEN_STROKE_ACTIVE",
    CAMERA_SCREEN_SECTOR_TARGET: "CustomizationColor.CAMERA_SCREEN_SECTOR_TARGET",
    CAMERA_SCREEN_SECTOR_ACTIVE: "CustomizationColor.CAMERA_SCREEN_SECTOR_ACTIVE",
    CAMERA_SCREEN_FRONT_HINT_LABEL_BACKGROUND: "CustomizationColor.CAMERA_SCREEN_FRONT_HINT_LABEL_BACKGROUND",
    CAMERA_SCREEN_FRONT_HINT_LABEL_TEXT: "CustomizationColor.CAMERA_SCREEN_FRONT_HINT_LABEL_TEXT",
    CAMERA_SCREEN_BACK_HINT_LABEL_BACKGROUND: "CustomizationColor.CAMERA_SCREEN_BACK_HINT_LABEL_BACKGROUND",
    CAMERA_SCREEN_BACK_HINT_LABEL_TEXT: "CustomizationColor.CAMERA_SCREEN_BACK_HINT_LABEL_TEXT",
    CAMERA_SCREEN_LIGHT_TOOLBAR_TINT: "CustomizationColor.CAMERA_SCREEN_LIGHT_TOOLBAR_TINT",
    CAMERA_SCREEN_DARK_TOOLBAR_TINT: "CustomizationColor.CAMERA_SCREEN_DARK_TOOLBAR_TINT",
    RETRY_SCREEN_BACKGROUND: "CustomizationColor.RETRY_SCREEN_BACKGROUND",
    RETRY_SCREEN_RETRY_BUTTON_BACKGROUND: "CustomizationColor.RETRY_SCREEN_RETRY_BUTTON_BACKGROUND",
    RETRY_SCREEN_RETRY_BUTTON_TITLE: "CustomizationColor.RETRY_SCREEN_RETRY_BUTTON_TITLE",
    RETRY_SCREEN_TITLE_LABEL_TEXT: "CustomizationColor.RETRY_SCREEN_TITLE_LABEL_TEXT",
    RETRY_SCREEN_HINT_LABELS_TEXT: "CustomizationColor.RETRY_SCREEN_HINT_LABELS_TEXT",
    PROCESSING_SCREEN_BACKGROUND: "CustomizationColor.PROCESSING_SCREEN_BACKGROUND",
    PROCESSING_SCREEN_PROGRESS: "CustomizationColor.PROCESSING_SCREEN_PROGRESS",
    PROCESSING_SCREEN_TITLE: "CustomizationColor.PROCESSING_SCREEN_TITLE",
    SUCCESS_SCREEN_BACKGROUND: "CustomizationColor.SUCCESS_SCREEN_BACKGROUND",
}

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
    SESSION_START_FAILED: "SESSION_START_FAILED",
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
    ART_FACE: "ArtFace",
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
    IMAGE_CHARACTERISTIC_ALL_RECOMMENDED: "ImageCharacteristic",
    HEAD_SIZE_AND_POSITION_ALL_RECOMMENDED: "HeadSizeAndPosition",
    FACE_IMAGE_QUALITY_ALL_RECOMMENDED: "FaceImageQuality",
    EYES_CHARACTERISTICS_ALL_RECOMMENDED: "EyesCharacteristics",
    SHADOW_AND_LIGHTING_ALL_RECOMMENDED: "ShadowsAndLightning",
    POSE_AND_EXPRESSION_ALL_RECOMMENDED: "PoseAndExpression",
    HEAD_OCCLUSION_ALL_RECOMMENDED: "HeadOcclusion",
    QUALITY_BACKGROUND_ALL_RECOMMENDED: "QualityBackground",
}

const ButtonTag = {
    CLOSE: 1001,
    TORCH: 1002,
    CAMERA_SWITCH: 1003,
}

const CustomizationFont = {
    ONBOARDING_SCREEN_START_BUTTON: "CustomizationFont.ONBOARDING_SCREEN_START_BUTTON",
    ONBOARDING_SCREEN_TITLE_LABEL: "CustomizationFont.ONBOARDING_SCREEN_TITLE_LABEL",
    ONBOARDING_SCREEN_MESSAGE_LABEL: "CustomizationFont.ONBOARDING_SCREEN_MESSAGE_LABEL",
    CAMERA_SCREEN_HINT_LABEL: "CustomizationFont.CAMERA_SCREEN_HINT_LABEL",
    RETRY_SCREEN_RETRY_BUTTON: "CustomizationFont.RETRY_SCREEN_RETRY_BUTTON",
    RETRY_SCREEN_TITLE_LABEL: "CustomizationFont.RETRY_SCREEN_TITLE_LABEL",
    RETRY_SCREEN_HINT_LABELS: "CustomizationFont.RETRY_SCREEN_HINT_LABELS",
    PROCESSING_SCREEN: "CustomizationFont.PROCESSING_SCREEN",
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

const LivenessProcessStatus = {
    START: "START",
    PREPARING: "PREPARING",
    NEW_SESSION: "NEW_SESSION",
    NEXT_STAGE: "NEXT_STAGE",
    SECTOR_CHANGED: "SECTOR_CHANGED",
    PROGRESS: "PROGRESS",
    LOW_BRIGHTNESS: "LOW_BRIGHTNESS",
    FIT_FACE: "FIT_FACE",
    MOVE_AWAY: "MOVE_AWAY",
    MOVE_CLOSER: "MOVE_CLOSER",
    TURN_HEAD: "TURN_HEAD",
    PROCESSING: "PROCESSING",
    FAILED: "FAILED",
    RETRY: "RETRY",
    SUCCESS: "SUCCESS",
}

const OutputImageCropAspectRatio = {
    OUTPUT_IMAGE_CROP_ASPECT_RATIO_3X4: 0,
    OUTPUT_IMAGE_CROP_ASPECT_RATIO_4X5: 1,
    OUTPUT_IMAGE_CROP_ASPECT_RATIO_2X3: 2,
    OUTPUT_IMAGE_CROP_ASPECT_RATIO_1X1: 3,
    OUTPUT_IMAGE_CROP_ASPECT_RATIO_7X9: 4,
}

const LivenessSkipStep = {
    ONBOARDING_STEP: 1,
    SUCCESS_STEP: 2,
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
    SESSION_START_FAILED: "SESSION_START_FAILED",
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

const CustomizationImage = {
    ONBOARDING_SCREEN_CLOSE_BUTTON: "CustomizationImage.ONBOARDING_SCREEN_CLOSE_BUTTON",
    ONBOARDING_SCREEN_ILLUMINATION: "CustomizationImage.ONBOARDING_SCREEN_ILLUMINATION",
    ONBOARDING_SCREEN_ACCESSORIES: "CustomizationImage.ONBOARDING_SCREEN_ACCESSORIES",
    ONBOARDING_SCREEN_CAMERA_LEVEL: "CustomizationImage.ONBOARDING_SCREEN_CAMERA_LEVEL",
    CAMERA_SCREEN_CLOSE_BUTTON: "CustomizationImage.CAMERA_SCREEN_CLOSE_BUTTON",
    CAMERA_SCREEN_LIGHT_ON_BUTTON: "CustomizationImage.CAMERA_SCREEN_LIGHT_ON_BUTTON",
    CAMERA_SCREEN_LIGHT_OFF_BUTTON: "CustomizationImage.CAMERA_SCREEN_LIGHT_OFF_BUTTON",
    CAMERA_SCREEN_SWITCH_BUTTON: "CustomizationImage.CAMERA_SCREEN_SWITCH_BUTTON",
    RETRY_SCREEN_CLOSE_BUTTON: "CustomizationImage.RETRY_SCREEN_CLOSE_BUTTON",
    RETRY_SCREEN_HINT_ENVIRONMENT: "CustomizationImage.RETRY_SCREEN_HINT_ENVIRONMENT",
    RETRY_SCREEN_HINT_SUBJECT: "CustomizationImage.RETRY_SCREEN_HINT_SUBJECT",
    PROCESSING_SCREEN_CLOSE_BUTTON: "CustomizationImage.PROCESSING_SCREEN_CLOSE_BUTTON",
    SUCCESS_SCREEN_IMAGE: "CustomizationImage.SUCCESS_SCREEN_IMAGE",
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
   FontStyle,
   CustomizationColor,
   ImageQualityGroupName,
   DetectFacesErrorCode,
   InitErrorCode,
   LivenessStatus,
   CameraErrorCode,
   LivenessErrorCode,
   DetectFacesBackendErrorCode,
   MatchFacesErrorCode,
   ImageQualityCharacteristicName,
   ButtonTag,
   CustomizationFont,
   DetectFacesScenario,
   LivenessProcessStatus,
   OutputImageCropAspectRatio,
   LivenessSkipStep,
   ImageQualityResultStatus,
   ImageType,
   FaceCaptureErrorCode,
   LivenessBackendErrorCode,
   CustomizationImage,
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
FaceSDK.setUiCustomizationLayer = (json, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["setUiCustomizationLayer", json])
FaceSDK.setUiConfiguration = (config, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["setUiConfiguration", config])
FaceSDK.setLocalizationDictionary = (dictionary, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["setLocalizationDictionary", dictionary])
FaceSDK.matchFacesSimilarityThresholdSplit = (faces, similarity, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["matchFacesSimilarityThresholdSplit", faces, similarity])
FaceSDK.getPerson = (personId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPerson", personId])
FaceSDK.createPerson = (name, groupIds, metadata, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["createPerson", name, groupIds, metadata])
FaceSDK.updatePerson = (person, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["updatePerson", person])
FaceSDK.deletePerson = (personId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["deletePerson", personId])
FaceSDK.getPersonImages = (personId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPersonImages", personId])
FaceSDK.getPersonImagesForPage = (personId, page, size, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPersonImagesForPage", personId, page, size])
FaceSDK.addPersonImage = (personId, image, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["addPersonImage", personId, image])
FaceSDK.getPersonImage = (personId, imageId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPersonImage", personId, imageId])
FaceSDK.deletePersonImage = (personId, imageId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["deletePersonImage", personId, imageId])
FaceSDK.getGroups = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getGroups"])
FaceSDK.getGroupsForPage = (page, size, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getGroupsForPage", page, size])
FaceSDK.getPersonGroups = (personId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPersonGroups", personId])
FaceSDK.getPersonGroupsForPage = (personId, page, size, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPersonGroupsForPage", personId, page, size])
FaceSDK.createGroup = (name, metadata, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["createGroup", name, metadata])
FaceSDK.getGroup = (groupId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getGroup", groupId])
FaceSDK.updateGroup = (group, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["updateGroup", group])
FaceSDK.editPersonsInGroup = (groupId, editGroupPersonsRequest, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["editPersonsInGroup", groupId, editGroupPersonsRequest])
FaceSDK.getPersonsInGroup = (groupId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPersonsInGroup", groupId])
FaceSDK.getPersonsInGroupForPage = (groupId, page, size, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPersonsInGroupForPage", groupId, page, size])
FaceSDK.deleteGroup = (groupId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["deleteGroup", groupId])
FaceSDK.searchPerson = (searchPersonRequest, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["searchPerson", searchPersonRequest])

FaceSDKPlugin = {}

FaceSDKPlugin.FaceSDK = FaceSDK
FaceSDKPlugin.Enum = Enum

FaceSDKPlugin.FaceCaptureException = FaceCaptureException
FaceSDKPlugin.InitException = InitException
FaceSDKPlugin.LivenessErrorException = LivenessErrorException
FaceSDKPlugin.LivenessBackendException = LivenessBackendException
FaceSDKPlugin.MatchFacesException = MatchFacesException
FaceSDKPlugin.FaceCaptureResponse = FaceCaptureResponse
FaceSDKPlugin.LivenessResponse = LivenessResponse
FaceSDKPlugin.MatchFacesResponse = MatchFacesResponse
FaceSDKPlugin.Image = Image
FaceSDKPlugin.MatchFacesRequest = MatchFacesRequest
FaceSDKPlugin.MatchFacesImage = MatchFacesImage
FaceSDKPlugin.MatchFacesComparedFacesPair = MatchFacesComparedFacesPair
FaceSDKPlugin.MatchFacesComparedFace = MatchFacesComparedFace
FaceSDKPlugin.MatchFacesDetectionFace = MatchFacesDetectionFace
FaceSDKPlugin.MatchFacesDetection = MatchFacesDetection
FaceSDKPlugin.Point = Point
FaceSDKPlugin.Rect = Rect
FaceSDKPlugin.MatchFacesSimilarityThresholdSplit = MatchFacesSimilarityThresholdSplit
FaceSDKPlugin.DetectFacesRequest = DetectFacesRequest
FaceSDKPlugin.DetectFacesConfiguration = DetectFacesConfiguration
FaceSDKPlugin.OutputImageParams = OutputImageParams
FaceSDKPlugin.OutputImageCrop = OutputImageCrop
FaceSDKPlugin.ImageQualityCharacteristic = ImageQualityCharacteristic
FaceSDKPlugin.ImageQualityRange = ImageQualityRange
FaceSDKPlugin.Size = Size
FaceSDKPlugin.DetectFacesResponse = DetectFacesResponse
FaceSDKPlugin.DetectFacesErrorException = DetectFacesErrorException
FaceSDKPlugin.DetectFacesBackendException = DetectFacesBackendException
FaceSDKPlugin.DetectFaceResult = DetectFaceResult
FaceSDKPlugin.ImageQualityResult = ImageQualityResult
FaceSDKPlugin.DetectFacesAttributeResult = DetectFacesAttributeResult
FaceSDKPlugin.Font = Font
FaceSDKPlugin.Person = Person
FaceSDKPlugin.PersonGroup = PersonGroup
FaceSDKPlugin.PersonImage = PersonImage
FaceSDKPlugin.ImageUpload = ImageUpload
FaceSDKPlugin.EditGroupPersonsRequest = EditGroupPersonsRequest
FaceSDKPlugin.SearchPersonRequest = SearchPersonRequest
FaceSDKPlugin.SearchPerson = SearchPerson
FaceSDKPlugin.SearchPersonImage = SearchPersonImage
FaceSDKPlugin.SearchPersonDetection = SearchPersonDetection
FaceSDKPlugin.LivenessNotification = LivenessNotification
FaceSDKPlugin.VideoEncoderCompletion = VideoEncoderCompletion

module.exports = FaceSDKPlugin