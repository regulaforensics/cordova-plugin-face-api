package cordova.plugin.faceapi;

import android.app.Activity;
import android.content.Context;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import static com.regula.facesdk.Face.Instance;

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
                case "startLivenessMatching":
                    startLivenessMatching(callback);
                    break;
                case "getFaceSdkVersion":
                    getFaceSdkVersion(callback);
                    break;
                case "livenessParams":
                    livenessParams(callback);
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
                case "presentFaceCaptureActivityByCameraId":
                    presentFaceCaptureActivityByCameraId(callback, args(0));
                    break;
                case "startLivenessMatchingByCameraId":
                    startLivenessMatchingByCameraId(callback, args(0));
                    break;
                case "setServiceUrl":
                    setServiceUrl(callback, args(0));
                    break;
                case "matchFaces":
                    matchFaces(callback, args(0));
                    break;
            }
        } catch (Exception ignored) {
        }
        return true;
    }

    private void getServiceUrl(Callback callback) {
        callback.success(Instance().getServiceUrl());
    }

    private void startLivenessMatching(Callback callback) {
        Instance().startLivenessMatching(getContext(), (response) -> callback.success(JSONConstructor.generateLivenessResponse(response).toString()));
    }

    private void getFaceSdkVersion(Callback callback) {
        callback.success(Instance().getFaceSdkVersion());
    }

    private void livenessParams(Callback callback) {
        callback.success(JSONConstructor.generateLivenessParams(Instance().livenessParams()));
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

    private void presentFaceCaptureActivityByCameraId(Callback callback, int cameraID) {
        Instance().presentFaceCaptureActivity(getContext(), cameraID, (response) -> callback.success(JSONConstructor.generateFaceCaptureResponse(response).toString()));
    }

    private void startLivenessMatchingByCameraId(Callback callback, int cameraID) {
        Instance().startLivenessMatching(getContext(), cameraID, (response) -> callback.success(JSONConstructor.generateLivenessResponse(response).toString()));
    }

    private void setServiceUrl(Callback callback, String url) {
        Instance().setServiceUrl(url);
        callback.success();
    }

    private void matchFaces(Callback callback, String request) throws JSONException {
        Instance().matchFaces(JSONConstructor.MatchFacesRequestFromJSON(new JSONObject(request)), (response) -> callback.success(JSONConstructor.generateMatchFacesResponse(response).toString()));
    }
}