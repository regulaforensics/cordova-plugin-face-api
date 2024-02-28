package cordova.plugin.faceapi

import android.content.Context
import com.regula.facesdk.configuration.FaceCaptureConfiguration
import com.regula.facesdk.configuration.LivenessConfiguration
import com.regula.facesdk.configuration.MatchFacesConfiguration
import com.regula.facesdk.configuration.UiConfiguration
import com.regula.facesdk.enums.CustomizationColor
import com.regula.facesdk.enums.CustomizationFont
import com.regula.facesdk.enums.CustomizationImage
import com.regula.facesdk.enums.LivenessType
import com.regula.facesdk.enums.ProcessingMode
import com.regula.facesdk.enums.RecordingProcess
import org.json.JSONArray
import org.json.JSONObject

fun faceCaptureConfigFromJSON(config: JSONObject): FaceCaptureConfiguration {
    val builder = FaceCaptureConfiguration.Builder()
    config.forEach { key, value ->
        when (key) {
            "copyright" -> builder.setCopyright(value as Boolean)
            "cameraSwitchEnabled" -> builder.setCameraSwitchEnabled(value as Boolean)
            "closeButtonEnabled" -> builder.setCloseButtonEnabled(value as Boolean)
            "torchButtonEnabled" -> builder.setTorchButtonEnabled(value as Boolean)
            "cameraId" -> builder.setCameraId(value.toInt())
            "timeout" -> builder.setTimeout(value.toFloat())
            "holdStillDuration" -> builder.setHoldStillDuration(value.toFloat())
            "screenOrientation" -> builder.setScreenOrientation(*JSONConstructor.ScreenOrientationArrayFromJSON(value as JSONArray))
        }
    }
    return builder.build()
}

fun livenessConfigFromJSON(config: JSONObject): LivenessConfiguration {
    val builder = LivenessConfiguration.Builder()
    config.forEach { key, value ->
        when (key) {
            "copyright" -> builder.setCopyright(value as Boolean)
            "cameraSwitchEnabled" -> builder.setCameraSwitchEnabled(value as Boolean)
            "closeButtonEnabled" -> builder.setCloseButtonEnabled(value as Boolean)
            "torchButtonEnabled" -> builder.setTorchButtonEnabled(value as Boolean)
            "cameraId" -> builder.setCameraId(value.toInt())
            "attemptsCount" -> builder.setAttemptsCount(value.toInt())
            "locationTrackingEnabled" -> builder.setLocationTrackingEnabled(value as Boolean)
            "recordingProcess" -> builder.setRecordingProcess(RecordingProcess.valueOf(value as String))
            "livenessType" -> builder.setType(LivenessType.valueOf(value as String))
            "tag" -> builder.setTag(value as String)
            "skipStep" -> builder.setSkipStep(*JSONConstructor.LivenessSkipStepArrayFromJSON(value as JSONArray))
            "screenOrientation" -> builder.setScreenOrientation(*JSONConstructor.ScreenOrientationArrayFromJSON(value as JSONArray))
        }
    }
    return builder.build()
}

fun matchFacesConfigFromJSON(config: JSONObject): MatchFacesConfiguration {
    val builder = MatchFacesConfiguration.Builder()
    config.forEach { key, value ->
        when (key) {
            "processingMode" -> builder.setProcessingMode(ProcessingMode.valueOf(value as String))
        }
    }
    return builder.build()
}

fun uiConfigFromJSON(config: JSONObject, context: Context): UiConfiguration {
    val builder = UiConfiguration.Builder()
    config.forEach { key, value ->
        when (key.substringBefore('.')) {
            "CustomizationColor" -> builder.setColor(
                CustomizationColor.valueOf(key.substringAfter('.')),
                value.toLong()
            )

            "CustomizationImage" -> builder.setImage(
                CustomizationImage.valueOf(key.substringAfter('.')),
                drawableFromJSON(value as String, context)
            )

            "CustomizationFont" -> {
                val font = JSONConstructor.typeFaceFromJSON(value as JSONObject)
                val name = CustomizationFont.valueOf(key.substringAfter('.'))
                builder.setFont(name, font.first)
                builder.setFontSize(name, font.second)
            }
        }
    }
    return builder.build()
}

fun Any?.toFloat(): Float {
    if (this is Double) return this.toFloat()
    if (this is Int) return this.toFloat()
    return this as Float
}

fun Any?.toInt(): Int {
    if (this is Double) return this.toInt()
    return this as Int
}

fun Any?.toLong(): Int {
    val result =
        if (this is Double) this.toLong()
        else this as Long
    return result.toInt()
}