package cordova.plugin.faceapi;

import android.app.Activity;
import android.content.Context;

import com.regula.facesdk.configuration.FaceCaptureConfiguration;
import com.regula.facesdk.configuration.LivenessConfiguration;
import com.regula.facesdk.configuration.MatchFaceConfiguration;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import static com.regula.facesdk.FaceSDK.Instance;

@SuppressWarnings({"ConstantConditions", "RedundantSuppression"})
public class FaceApi extends CordovaPlugin {
    private Activity activity;
    JSONArray data;

    private Context getContext() {
        return activity;
    }

    private interface Callback {
        void success(Object o);

        void error(String s);

        default void success() {
            success("");
        }
    }

    private <T> T args(@SuppressWarnings("SameParameterValue") int index) throws JSONException {
        //noinspection unchecked
        return (T) data.get(index);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        activity = cordova.getActivity();
        action = (String)args.remove(0);
        data = args;
        Callback callback = new Callback() {
            @Override
            public void success(Object o) {
                if (o instanceof Integer)
                    callbackContext.success((int) o);
                else if (o instanceof Boolean)
                    callbackContext.success((boolean) o ? "true" : "");
                else
                    callbackContext.success((String) o);
            }

            @Override
            public void error(String s) {
                callbackContext.error(s);
            }
        };

        try {
            switch (action) {
                case "getServiceUrl":
                    getServiceUrl(callback);
                    break;
                case "startLiveness":
                    startLiveness(callback);
                    break;
                case "getFaceSdkVersion":
                    getFaceSdkVersion(callback);
                    break;
                case "presentFaceCaptureActivity":
                    presentFaceCaptureActivity(callback);
                    break;
                case "stopFaceCaptureActivity":
                    stopFaceCaptureActivity(callback);
                    break;
                case "stopLivenessProcessing":
                    stopLivenessProcessing(callback);
                    break;
                case "presentFaceCaptureActivityWithConfig":
                    presentFaceCaptureActivityWithConfig(callback, args(0));
                    break;
                case "startLivenessWithConfig":
                    startLivenessWithConfig(callback, args(0));
                    break;
                case "setServiceUrl":
                    setServiceUrl(callback, args(0));
                    break;
                case "matchFaces":
                    matchFaces(callback, args(0));
                    break;
                case "setLanguage":
                    setLanguage(callback, args(0));
                    break;
                case "matchFacesWithConfig":
                    matchFacesWithConfig(callback, args(0), args(1));
                    break;
            }
        } catch (Exception ignored) {
        }
        return true;
    }

    private void getServiceUrl(Callback callback) {
        callback.success(Instance().getServiceUrl());
    }

    private void startLiveness(Callback callback) {
        Instance().startLiveness(getContext(), (response) -> callback.success(JSONConstructor.generateLivenessResponse(response).toString()));
    }

    private void getFaceSdkVersion(Callback callback) {
        callback.success(Instance().getFaceSdkVersion());
    }

    private void presentFaceCaptureActivity(Callback callback) {
        Instance().presentFaceCaptureActivity(getContext(), (response) -> callback.success(JSONConstructor.generateFaceCaptureResponse(response).toString()));
    }

    private void stopFaceCaptureActivity(Callback callback) {
        Instance().stopFaceCaptureActivity(getContext());
        callback.success();
    }

    private void stopLivenessProcessing(Callback callback) {
        Instance().stopLivenessProcessing(getContext());
        callback.success();
    }

    private void presentFaceCaptureActivityWithConfig(Callback callback, JSONObject config) throws JSONException {
        FaceCaptureConfiguration.Builder builder = new FaceCaptureConfiguration.Builder();
        if(config.has("cameraId"))
            builder.setCameraId(config.getInt("cameraId"));
        if(config.has("cameraSwitchEnabled"))
            builder.setCameraSwitchEnabled(config.getBoolean("cameraSwitchEnabled"));
        if(config.has("showHelpTextAnimation"))
            builder.setShowHelpTextAnimation(config.getBoolean("showHelpTextAnimation"));
        Instance().presentFaceCaptureActivity(getContext(), builder.build(), (response) -> callback.success(JSONConstructor.generateFaceCaptureResponse(response).toString()));
    }

    private void startLivenessWithConfig(Callback callback, JSONObject config) throws JSONException {
        LivenessConfiguration.Builder builder = new LivenessConfiguration.Builder();
        if(config.has("attemptsCount"))
            builder.setAttemptsCount(config.getInt("attemptsCount"));
        if(config.has("cameraId"))
            builder.setCameraId(config.getInt("cameraId"));
        if(config.has("cameraSwitchEnabled"))
            builder.setCameraSwitchEnabled(config.getBoolean("cameraSwitchEnabled"));
        if(config.has("showHelpTextAnimation"))
            builder.setShowHelpTextAnimation(config.getBoolean("showHelpTextAnimation"));
        Instance().startLiveness(getContext(), builder.build(), (response) -> callback.success(JSONConstructor.generateLivenessResponse(response).toString()));
    }

    private void setServiceUrl(Callback callback, String url) {
        Instance().setServiceUrl(url);
        callback.success();
    }

    private void matchFaces(Callback callback, String request) throws JSONException {
        Instance().matchFaces(JSONConstructor.MatchFacesRequestFromJSON(new JSONObject(request)), (response) -> callback.success(JSONConstructor.generateMatchFacesResponse(response).toString()));
    }

    private void matchFacesWithConfig(Callback callback, String request, JSONObject config) throws JSONException {
        MatchFaceConfiguration.Builder builder = new MatchFaceConfiguration.Builder();
        config.has("TODO"); // in order to remove warning Unused
        Instance().matchFaces(JSONConstructor.MatchFacesRequestFromJSON(new JSONObject(request)), builder.build(),(response) -> callback.success(JSONConstructor.generateMatchFacesResponse(response).toString()));
    }

    private void setLanguage(Callback callback, @SuppressWarnings("unused") String language) {
        callback.error("setLanguage() is an ios-only method");
    }
}