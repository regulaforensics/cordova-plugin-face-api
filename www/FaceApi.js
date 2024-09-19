
// Classes

class Customization {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new Customization()

        result.colors = jsonObject["colors"]
        result.fonts = jsonObject["fonts"]
        result.images = jsonObject["images"]
        result.uiCustomizationLayer = jsonObject["uiCustomizationLayer"]

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
        result.crop = jsonObject["crop"]
        result.faceRect = Rect.fromJson(jsonObject["faceRect"])
        result.originalRect = Rect.fromJson(jsonObject["originalRect"])
        result.landmarks = []
        if (jsonObject["landmarks"] != null)
            for (const i in jsonObject["landmarks"])
                result.landmarks.push(Point.fromJson(jsonObject["landmarks"][i]))
        result.isQualityCompliant = jsonObject["isQualityCompliant"]

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

class DetectFacesConfig {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new DetectFacesConfig()

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

class UnderlyingException {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new UnderlyingException()

        result.code = jsonObject["code"]
        result.message = jsonObject["message"]

        return result
    }
}

class DetectFacesException {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new DetectFacesException()

        result.code = jsonObject["code"]
        result.message = jsonObject["message"]
        result.underlyingError = UnderlyingException.fromJson(jsonObject["underlyingError"])

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
        result.configuration = DetectFacesConfig.fromJson(jsonObject["configuration"])

        return result
    }
}

class DetectFacesResponse {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new DetectFacesResponse()

        result.detection = DetectFaceResult.fromJson(jsonObject["detection"])
        result.scenario = jsonObject["scenario"]
        result.error = DetectFacesException.fromJson(jsonObject["error"])
        result.allDetections = []
        if (jsonObject["allDetections"] != null)
            for (const i in jsonObject["allDetections"])
                result.allDetections.push(DetectFaceResult.fromJson(jsonObject["allDetections"][i]))

        return result
    }
}

class FaceCaptureConfig {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new FaceCaptureConfig()

        result.copyright = jsonObject["copyright"]
        result.cameraSwitchEnabled = jsonObject["cameraSwitchEnabled"]
        result.closeButtonEnabled = jsonObject["closeButtonEnabled"]
        result.torchButtonEnabled = jsonObject["torchButtonEnabled"]
        result.vibrateOnSteps = jsonObject["vibrateOnSteps"]
        result.detectOcclusion = jsonObject["detectOcclusion"]
        result.cameraPositionAndroid = jsonObject["cameraPositionAndroid"]
        result.cameraPositionIOS = jsonObject["cameraPositionIOS"]
        result.screenOrientation = []
        if (jsonObject["screenOrientation"] != null)
            for (const i in jsonObject["screenOrientation"])
                result.screenOrientation.push(jsonObject["screenOrientation"][i])
        result.timeout = jsonObject["timeout"]
        result.holdStillDuration = jsonObject["holdStillDuration"]

        return result
    }
}

class FaceCaptureException {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new FaceCaptureException()

        result.code = jsonObject["code"]
        result.message = jsonObject["message"]

        return result
    }
}

class FaceCaptureImage {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new FaceCaptureImage()

        result.imageType = jsonObject["imageType"]
        result.image = jsonObject["image"]
        result.tag = jsonObject["tag"]

        return result
    }
}

class FaceCaptureResponse {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new FaceCaptureResponse()

        result.error = FaceCaptureException.fromJson(jsonObject["error"])
        result.image = FaceCaptureImage.fromJson(jsonObject["image"])

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

class OutputImageParams {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new OutputImageParams()

        result.backgroundColor = jsonObject["backgroundColor"]
        result.crop = OutputImageCrop.fromJson(jsonObject["crop"])

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

class Size {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new Size()

        result.width = jsonObject["width"]
        result.height = jsonObject["height"]

        return result
    }
}

class ImageQualityCharacteristic {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new ImageQualityCharacteristic()

        result.characteristicName = jsonObject["characteristicName"]
        result.color = jsonObject["color"]
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

class FaceSDKVersion {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new FaceSDKVersion()

        result.api = jsonObject["api"]
        result.core = jsonObject["core"]
        result.coreMode = jsonObject["coreMode"]

        return result
    }
}

class InitConfig {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new InitConfig()

        result.license = jsonObject["license"]
        result.licenseUpdate = jsonObject["licenseUpdate"]

        return result
    }
}

class InitException {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new InitException()

        result.code = jsonObject["code"]
        result.message = jsonObject["message"]
        result.underlyingError = UnderlyingException.fromJson(jsonObject["underlyingError"])

        return result
    }
}

class LivenessConfig {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new LivenessConfig()

        result.copyright = jsonObject["copyright"]
        result.cameraSwitchEnabled = jsonObject["cameraSwitchEnabled"]
        result.closeButtonEnabled = jsonObject["closeButtonEnabled"]
        result.torchButtonEnabled = jsonObject["torchButtonEnabled"]
        result.vibrateOnSteps = jsonObject["vibrateOnSteps"]
        result.cameraPositionAndroid = jsonObject["cameraPositionAndroid"]
        result.cameraPositionIOS = jsonObject["cameraPositionIOS"]
        result.screenOrientation = []
        if (jsonObject["screenOrientation"] != null)
            for (const i in jsonObject["screenOrientation"])
                result.screenOrientation.push(jsonObject["screenOrientation"][i])
        result.locationTrackingEnabled = jsonObject["locationTrackingEnabled"]
        result.attemptsCount = jsonObject["attemptsCount"]
        result.recordingProcess = jsonObject["recordingProcess"]
        result.livenessType = jsonObject["livenessType"]
        result.tag = jsonObject["tag"]
        result.skipStep = []
        if (jsonObject["skipStep"] != null)
            for (const i in jsonObject["skipStep"])
                result.skipStep.push(jsonObject["skipStep"][i])
        result.metadata = jsonObject["metadata"]

        return result
    }
}

class LivenessException {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new LivenessException()

        result.code = jsonObject["code"]
        result.message = jsonObject["message"]
        result.underlyingError = UnderlyingException.fromJson(jsonObject["underlyingError"])

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

class LivenessResponse {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new LivenessResponse()

        result.image = jsonObject["image"]
        result.liveness = jsonObject["liveness"]
        result.tag = jsonObject["tag"]
        result.transactionId = jsonObject["transactionId"]
        result.estimatedAge = jsonObject["estimatedAge"]
        result.error = LivenessException.fromJson(jsonObject["error"])

        return result
    }
}

class ComparedFace {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new ComparedFace()

        result.imageIndex = jsonObject["imageIndex"]
        result.image = MatchFacesImage.fromJson(jsonObject["image"])
        result.faceIndex = jsonObject["faceIndex"]
        result.face = MatchFacesDetectionFace.fromJson(jsonObject["face"])

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
        result.score = jsonObject["score"]
        result.error = MatchFacesException.fromJson(jsonObject["error"])

        return result
    }
}

class ComparedFacesSplit {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new ComparedFacesSplit()

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

class MatchFacesConfig {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesConfig()

        result.processingMode = jsonObject["processingMode"]

        return result
    }
}

class MatchFacesDetection {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesDetection()

        result.imageIndex = jsonObject["imageIndex"]
        result.image = MatchFacesImage.fromJson(jsonObject["image"])
        result.faces = []
        if (jsonObject["faces"] != null)
            for (const i in jsonObject["faces"])
                result.faces.push(MatchFacesDetectionFace.fromJson(jsonObject["faces"][i]))
        result.error = MatchFacesException.fromJson(jsonObject["error"])

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
        result.originalRect = Rect.fromJson(jsonObject["originalRect"])
        result.crop = jsonObject["crop"]

        return result
    }
}

class MatchFacesException {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesException()

        result.code = jsonObject["code"]
        result.message = jsonObject["message"]
        result.underlyingError = UnderlyingException.fromJson(jsonObject["underlyingError"])

        return result
    }
}

class MatchFacesImage {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesImage()

        result.image = jsonObject["image"]
        result.imageType = jsonObject["imageType"]
        result.detectAll = jsonObject["detectAll"]
        result.identifier = jsonObject["identifier"]

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
        result.outputImageParams = OutputImageParams.fromJson(jsonObject["outputImageParams"])
        result.tag = jsonObject["tag"]
        result.metadata = jsonObject["metadata"]

        return result
    }
}

class MatchFacesResponse {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new MatchFacesResponse()

        result.results = []
        if (jsonObject["results"] != null)
            for (const i in jsonObject["results"])
                result.results.push(ComparedFacesPair.fromJson(jsonObject["results"][i]))
        result.detections = []
        if (jsonObject["detections"] != null)
            for (const i in jsonObject["detections"])
                result.detections.push(MatchFacesDetection.fromJson(jsonObject["detections"][i]))
        result.tag = jsonObject["tag"]
        result.error = MatchFacesException.fromJson(jsonObject["error"])

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

class ImageUpload {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new ImageUpload()

        result.imageData = jsonObject["imageData"]
        result.imageUrl = jsonObject["imageUrl"]

        return result
    }
}

class PageableItemList {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new PageableItemList()

        result.items = []
        if (jsonObject["items"] != null)
            for (const i in jsonObject["items"])
                result.items.push(jsonObject["items"][i])
        result.page = jsonObject["page"]
        result.totalPages = jsonObject["totalPages"]

        return result
    }
}

class Person {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new Person()

        result.name = jsonObject["name"]
        result.updatedAt = jsonObject["updatedAt"]
        result.groups = []
        if (jsonObject["groups"] != null)
            for (const i in jsonObject["groups"])
                result.groups.push(jsonObject["groups"][i])
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

class SearchPerson {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new SearchPerson()

        result.images = []
        if (jsonObject["images"] != null)
            for (const i in jsonObject["images"])
                result.images.push(SearchPersonImage.fromJson(jsonObject["images"][i]))
        result.detection = SearchPersonDetection.fromJson(jsonObject["detection"])
        result.name = jsonObject["name"]
        result.updatedAt = jsonObject["updatedAt"]
        result.groups = []
        if (jsonObject["groups"] != null)
            for (const i in jsonObject["groups"])
                result.groups.push(jsonObject["groups"][i])
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
        result.crop = jsonObject["crop"]
        result.rotationAngle = jsonObject["rotationAngle"]

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

class SearchPersonRequest {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new SearchPersonRequest()

        result.imageUpload = ImageUpload.fromJson(jsonObject["imageUpload"])
        result.groupIdsForSearch = []
        if (jsonObject["groupIdsForSearch"] != null)
            for (const i in jsonObject["groupIdsForSearch"])
                result.groupIdsForSearch.push(jsonObject["groupIdsForSearch"][i])
        result.threshold = jsonObject["threshold"]
        result.limit = jsonObject["limit"]
        result.detectAll = jsonObject["detectAll"]
        result.outputImageParams = OutputImageParams.fromJson(jsonObject["outputImageParams"])

        return result
    }
}

class InitResponse {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new InitResponse()

        result.success = jsonObject["success"]
        result.error = InitException.fromJson(jsonObject["error"])

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

class PersonDBResponse {
    static fromJson(jsonObject) {
        if (jsonObject == null) return null
        const result = new PersonDBResponse()

        result.data = jsonObject["data"]
        result.error = jsonObject["error"]

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
    ONBOARDING_SCREEN_START_BUTTON_BACKGROUND: 100,
    ONBOARDING_SCREEN_START_BUTTON_TITLE: 101,
    ONBOARDING_SCREEN_BACKGROUND: 102,
    ONBOARDING_SCREEN_TITLE_LABEL_TEXT: 103,
    ONBOARDING_SCREEN_SUBTITLE_LABEL_TEXT: 104,
    ONBOARDING_SCREEN_MESSAGE_LABELS_TEXT: 105,
    CAMERA_SCREEN_STROKE_NORMAL: 200,
    CAMERA_SCREEN_STROKE_ACTIVE: 201,
    CAMERA_SCREEN_SECTOR_TARGET: 202,
    CAMERA_SCREEN_SECTOR_ACTIVE: 203,
    CAMERA_SCREEN_FRONT_HINT_LABEL_BACKGROUND: 204,
    CAMERA_SCREEN_FRONT_HINT_LABEL_TEXT: 205,
    CAMERA_SCREEN_BACK_HINT_LABEL_BACKGROUND: 206,
    CAMERA_SCREEN_BACK_HINT_LABEL_TEXT: 207,
    CAMERA_SCREEN_LIGHT_TOOLBAR_TINT: 208,
    CAMERA_SCREEN_DARK_TOOLBAR_TINT: 209,
    RETRY_SCREEN_BACKGROUND: 300,
    RETRY_SCREEN_RETRY_BUTTON_BACKGROUND: 301,
    RETRY_SCREEN_RETRY_BUTTON_TITLE: 302,
    RETRY_SCREEN_TITLE_LABEL_TEXT: 303,
    RETRY_SCREEN_SUBTITLE_LABEL_TEXT: 304,
    RETRY_SCREEN_HINT_LABELS_TEXT: 305,
    PROCESSING_SCREEN_BACKGROUND: 400,
    PROCESSING_SCREEN_PROGRESS: 401,
    PROCESSING_SCREEN_TITLE: 402,
    SUCCESS_SCREEN_BACKGROUND: 500,
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

const LicensingResultCode = {
    OK: 0,
    LICENSE_CORRUPTED: 1,
    INVALID_DATE: 2,
    INVALID_VERSION: 3,
    INVALID_DEVICE_ID: 4,
    INVALID_SYSTEM_OR_APP_ID: 5,
    NO_CAPABILITIES: 6,
    NO_AUTHENTICITY: 7,
    LICENSE_ABSENT: 8,
    NO_INTERNET: 9,
    NO_DATABASE: 10,
    DATABASE_INCORRECT: 11,
}

const DetectFacesErrorCode = {
    IMAGE_EMPTY: 0,
    FR_FACE_NOT_DETECTED: 1,
    FACER_NO_LICENSE: 2,
    FACER_IS_NOT_INITIALIZED: 3,
    FACER_COMMAND_IS_NOT_SUPPORTED: 4,
    FACER_COMMAND_PARAMS_READ_ERROR: 5,
    PROCESSING_FAILED: 6,
    REQUEST_FAILED: 7,
    API_CALL_FAILED: 8,
}

const CameraPosition = {
    FRONT: 0,
    BACK: 1,
}

const InitErrorCode = {
    IN_PROGRESS_ALREADY: 0,
    MISSING_CORE: 1,
    INTERNAL_CORE_ERROR: 2,
    BAD_LICENSE: 3,
    UNAVAILABLE: 4,
    CONTEXT_IS_NULL: 100,
    RESOURCE_DAT_ABSENT: 101,
    LICENSE_IS_NULL: 102,
}

const LivenessStatus = {
    PASSED: 0,
    UNKNOWN: 1,
}

const LivenessErrorCode = {
    NOT_INITIALIZED: 0,
    NO_LICENSE: 1,
    API_CALL_FAILED: 2,
    SESSION_START_FAILED: 3,
    CANCELLED: 4,
    PROCESSING_TIMEOUT: 5,
    PROCESSING_FAILED: 6,
    PROCESSING_FRAME_FAILED: 7,
    APPLICATION_INACTIVE: 8,
    CONTEXT_IS_NULL: 9,
    IN_PROGRESS_ALREADY: 10,
    ZOOM_NOT_SUPPORTED: 11,
    CAMERA_NO_PERMISSION: 12,
    CAMERA_NOT_AVAILABLE: 13,
}

const RecordingProcess = {
    ASYNCHRONOUS_UPLOAD: 0,
    SYNCHRONOUS_UPLOAD: 1,
    NOT_UPLOAD: 2,
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
    IMAGE_EMPTY: 0,
    FACE_NOT_DETECTED: 1,
    LANDMARKS_NOT_DETECTED: 2,
    FACE_ALIGNER_FAILED: 3,
    DESCRIPTOR_EXTRACTOR_ERROR: 4,
    IMAGES_COUNT_LIMIT_EXCEEDED: 5,
    API_CALL_FAILED: 6,
    PROCESSING_FAILED: 7,
    NO_LICENSE: 8,
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

const ScreenOrientation = {
    PORTRAIT: 0,
    LANDSCAPE: 1,
}

const CustomizationFont = {
    ONBOARDING_SCREEN_START_BUTTON: 100,
    ONBOARDING_SCREEN_TITLE_LABEL: 101,
    ONBOARDING_SCREEN_SUBTITLE_LABEL: 102,
    ONBOARDING_SCREEN_MESSAGE_LABELS: 103,
    CAMERA_SCREEN_HINT_LABEL: 200,
    RETRY_SCREEN_RETRY_BUTTON: 300,
    RETRY_SCREEN_TITLE_LABEL: 301,
    RETRY_SCREEN_SUBTITLE_LABEL: 302,
    RETRY_SCREEN_HINT_LABELS: 303,
    PROCESSING_SCREEN: 400,
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
    START: 0,
    PREPARING: 1,
    NEW_SESSION: 2,
    NEXT_STAGE: 3,
    SECTOR_CHANGED: 4,
    PROGRESS: 5,
    LOW_BRIGHTNESS: 6,
    FIT_FACE: 7,
    MOVE_AWAY: 8,
    MOVE_CLOSER: 9,
    TURN_HEAD: 10,
    PROCESSING: 11,
    FAILED: 12,
    RETRY: 13,
    SUCCESS: 14,
}

const OutputImageCropAspectRatio = {
    OUTPUT_IMAGE_CROP_ASPECT_RATIO_3X4: 0,
    OUTPUT_IMAGE_CROP_ASPECT_RATIO_4X5: 1,
    OUTPUT_IMAGE_CROP_ASPECT_RATIO_2X3: 2,
    OUTPUT_IMAGE_CROP_ASPECT_RATIO_1X1: 3,
    OUTPUT_IMAGE_CROP_ASPECT_RATIO_7X9: 4,
}

const LivenessType = {
    ACTIVE: 0,
    PASSIVE: 1,
}

const LivenessSkipStep = {
    ONBOARDING_STEP: 0,
    SUCCESS_STEP: 1,
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
    BARCODE: 7,
}

const FaceCaptureErrorCode = {
    CANCEL: 0,
    TIMEOUT: 1,
    NOT_INITIALIZED: 2,
    SESSION_START_FAILED: 3,
    CAMERA_NOT_AVAILABLE: 4,
    CAMERA_NO_PERMISSION: 5,
    IN_PROGRESS_ALREADY: 6,
    CONTEXT_IS_NULL: 7,
}

const LivenessBackendErrorCode = {
    UNDEFINED: -1,
    NO_LICENSE: 200,
    LOW_QUALITY: 231,
    TRACK_BREAK: 246,
    CLOSED_EYES_DETECTED: 230,
    HIGH_ASYMMETRY: 232,
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

const ProcessingMode = {
    ONLINE: 0,
    OFFLINE: 1,
}

const CustomizationImage = {
    ONBOARDING_SCREEN_CLOSE_BUTTON: 100,
    ONBOARDING_SCREEN_ILLUMINATION: 101,
    ONBOARDING_SCREEN_ACCESSORIES: 102,
    ONBOARDING_SCREEN_CAMERA_LEVEL: 103,
    CAMERA_SCREEN_CLOSE_BUTTON: 200,
    CAMERA_SCREEN_LIGHT_ON_BUTTON: 201,
    CAMERA_SCREEN_LIGHT_OFF_BUTTON: 202,
    CAMERA_SCREEN_SWITCH_BUTTON: 203,
    RETRY_SCREEN_CLOSE_BUTTON: 300,
    RETRY_SCREEN_HINT_ENVIRONMENT: 301,
    RETRY_SCREEN_HINT_SUBJECT: 302,
    PROCESSING_SCREEN_CLOSE_BUTTON: 400,
    SUCCESS_SCREEN_IMAGE: 500,
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
   LicensingResultCode,
   DetectFacesErrorCode,
   CameraPosition,
   InitErrorCode,
   LivenessStatus,
   LivenessErrorCode,
   RecordingProcess,
   DetectFacesBackendErrorCode,
   MatchFacesErrorCode,
   ImageQualityCharacteristicName,
   ScreenOrientation,
   CustomizationFont,
   DetectFacesScenario,
   LivenessProcessStatus,
   OutputImageCropAspectRatio,
   LivenessType,
   LivenessSkipStep,
   ImageQualityResultStatus,
   ImageType,
   FaceCaptureErrorCode,
   LivenessBackendErrorCode,
   ProcessingMode,
   CustomizationImage,
   DetectFacesAttribute,
}

const FaceSDK = {}

FaceSDK.getVersion = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getVersion"])
FaceSDK.getServiceUrl = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getServiceUrl"])
FaceSDK.setServiceUrl = (url, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["setServiceUrl", url])
FaceSDK.setLocalizationDictionary = (dictionary, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["setLocalizationDictionary", dictionary])
FaceSDK.setRequestHeaders = (headers, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["setRequestHeaders", headers])
FaceSDK.setCustomization = (config, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["setCustomization", config])
FaceSDK.isInitialized = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["isInitialized"])
FaceSDK.initialize = (config, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["initialize", config])
FaceSDK.deinitialize = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["deinitialize"])
FaceSDK.startFaceCapture = (config, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["startFaceCapture", config])
FaceSDK.stopFaceCapture = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["stopFaceCapture"])
FaceSDK.startLiveness = (config, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["startLiveness", config])
FaceSDK.stopLiveness = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["stopLiveness"])
FaceSDK.matchFaces = (request, config, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["matchFaces", request, config])
FaceSDK.splitComparedFaces = (facesPairs, similarityThreshold, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["splitComparedFaces", facesPairs, similarityThreshold])
FaceSDK.detectFaces = (request, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["detectFaces", request])
FaceSDK.createPerson = (name, groupIds, metadata, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["createPerson", name, groupIds, metadata])
FaceSDK.updatePerson = (person, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["updatePerson", person])
FaceSDK.deletePerson = (personId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["deletePerson", personId])
FaceSDK.getPerson = (personId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPerson", personId])
FaceSDK.addPersonImage = (personId, image, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["addPersonImage", personId, image])
FaceSDK.deletePersonImage = (personId, imageId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["deletePersonImage", personId, imageId])
FaceSDK.getPersonImage = (personId, imageId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPersonImage", personId, imageId])
FaceSDK.getPersonImages = (personId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPersonImages", personId])
FaceSDK.getPersonImagesForPage = (personId, page, size, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPersonImagesForPage", personId, page, size])
FaceSDK.createGroup = (name, metadata, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["createGroup", name, metadata])
FaceSDK.updateGroup = (group, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["updateGroup", group])
FaceSDK.editPersonsInGroup = (groupId, editGroupPersonsRequest, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["editPersonsInGroup", groupId, editGroupPersonsRequest])
FaceSDK.deleteGroup = (groupId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["deleteGroup", groupId])
FaceSDK.getGroup = (groupId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getGroup", groupId])
FaceSDK.getGroups = (successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getGroups"])
FaceSDK.getGroupsForPage = (page, size, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getGroupsForPage", page, size])
FaceSDK.getPersonGroups = (personId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPersonGroups", personId])
FaceSDK.getPersonGroupsForPage = (personId, page, size, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPersonGroupsForPage", personId, page, size])
FaceSDK.getPersonsInGroup = (groupId, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPersonsInGroup", groupId])
FaceSDK.getPersonsInGroupForPage = (groupId, page, size, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["getPersonsInGroupForPage", groupId, page, size])
FaceSDK.searchPerson = (searchPersonRequest, successCallback, errorCallback) => cordova.exec(successCallback, errorCallback, "FaceApi", "exec", ["searchPerson", searchPersonRequest])

FaceSDKPlugin = {}

FaceSDKPlugin.FaceSDK = FaceSDK
FaceSDKPlugin.Enum = Enum

FaceSDKPlugin.Customization = Customization
FaceSDKPlugin.Font = Font
FaceSDKPlugin.DetectFaceResult = DetectFaceResult
FaceSDKPlugin.DetectFacesAttributeResult = DetectFacesAttributeResult
FaceSDKPlugin.DetectFacesConfig = DetectFacesConfig
FaceSDKPlugin.UnderlyingException = UnderlyingException
FaceSDKPlugin.DetectFacesException = DetectFacesException
FaceSDKPlugin.DetectFacesRequest = DetectFacesRequest
FaceSDKPlugin.DetectFacesResponse = DetectFacesResponse
FaceSDKPlugin.FaceCaptureConfig = FaceCaptureConfig
FaceSDKPlugin.FaceCaptureException = FaceCaptureException
FaceSDKPlugin.FaceCaptureImage = FaceCaptureImage
FaceSDKPlugin.FaceCaptureResponse = FaceCaptureResponse
FaceSDKPlugin.OutputImageCrop = OutputImageCrop
FaceSDKPlugin.OutputImageParams = OutputImageParams
FaceSDKPlugin.Point = Point
FaceSDKPlugin.Rect = Rect
FaceSDKPlugin.Size = Size
FaceSDKPlugin.ImageQualityCharacteristic = ImageQualityCharacteristic
FaceSDKPlugin.ImageQualityRange = ImageQualityRange
FaceSDKPlugin.ImageQualityResult = ImageQualityResult
FaceSDKPlugin.FaceSDKVersion = FaceSDKVersion
FaceSDKPlugin.InitConfig = InitConfig
FaceSDKPlugin.InitException = InitException
FaceSDKPlugin.LivenessConfig = LivenessConfig
FaceSDKPlugin.LivenessException = LivenessException
FaceSDKPlugin.LivenessNotification = LivenessNotification
FaceSDKPlugin.LivenessResponse = LivenessResponse
FaceSDKPlugin.ComparedFace = ComparedFace
FaceSDKPlugin.ComparedFacesPair = ComparedFacesPair
FaceSDKPlugin.ComparedFacesSplit = ComparedFacesSplit
FaceSDKPlugin.MatchFacesConfig = MatchFacesConfig
FaceSDKPlugin.MatchFacesDetection = MatchFacesDetection
FaceSDKPlugin.MatchFacesDetectionFace = MatchFacesDetectionFace
FaceSDKPlugin.MatchFacesException = MatchFacesException
FaceSDKPlugin.MatchFacesImage = MatchFacesImage
FaceSDKPlugin.MatchFacesRequest = MatchFacesRequest
FaceSDKPlugin.MatchFacesResponse = MatchFacesResponse
FaceSDKPlugin.EditGroupPersonsRequest = EditGroupPersonsRequest
FaceSDKPlugin.ImageUpload = ImageUpload
FaceSDKPlugin.PageableItemList = PageableItemList
FaceSDKPlugin.Person = Person
FaceSDKPlugin.PersonGroup = PersonGroup
FaceSDKPlugin.PersonImage = PersonImage
FaceSDKPlugin.SearchPerson = SearchPerson
FaceSDKPlugin.SearchPersonDetection = SearchPersonDetection
FaceSDKPlugin.SearchPersonImage = SearchPersonImage
FaceSDKPlugin.SearchPersonRequest = SearchPersonRequest
FaceSDKPlugin.InitResponse = InitResponse
FaceSDKPlugin.VideoEncoderCompletion = VideoEncoderCompletion
FaceSDKPlugin.PersonDBResponse = PersonDBResponse

module.exports = FaceSDKPlugin