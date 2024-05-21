package cordova.plugin.faceapi;

import static com.regula.facesdk.FaceSDK.Instance;
import static cordova.plugin.faceapi.ConfigKt.*;
import static cordova.plugin.faceapi.JSONConstructor.*;
import static cordova.plugin.faceapi.UtilsKt.*;

import android.app.Activity;
import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.regula.common.LocalizationCallbacks;
import com.regula.facesdk.callback.FaceInitializationCompletion;
import com.regula.facesdk.callback.PersonDBCallback;
import com.regula.facesdk.exception.InitException;
import com.regula.facesdk.listener.NetworkInterceptorListener;
import com.regula.facesdk.model.LivenessNotification;
import com.regula.facesdk.model.results.matchfaces.MatchFacesComparedFacesPair;
import com.regula.facesdk.model.results.matchfaces.MatchFacesSimilarityThresholdSplit;
import com.regula.facesdk.model.results.personDb.Person;
import com.regula.facesdk.model.results.personDb.PersonGroup;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;
import java.util.List;

@SuppressWarnings({"ConstantConditions", "RedundantSuppression"})
public class FaceApi extends CordovaPlugin {
    private CallbackContext callbackContext;
    private Activity activity;
    JSONArray data;

    private Context getContext() {
        return activity;
    }

    private <T> T args(@SuppressWarnings("SameParameterValue") int index) throws JSONException {
        //noinspection unchecked
        return (T) data.get(index);
    }

    private void sendVideoEncoderCompletion(String transactionId, boolean success) {
        // VideoEncoderCompletion does not work in cordova
    }

    private void sendOnCustomButtonTappedEvent(int tag) {
        PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, tag);
        pluginResult.setKeepCallback(true);
        callbackContext.sendPluginResult(pluginResult);
    }

    void sendLivenessNotification(LivenessNotification notification) {
        // LivenessNotification does not work in cordova
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        this.callbackContext = callbackContext;
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
                case "init":
                    init(callback);
                    break;
                case "initialize":
                    initialize(callback);
                    break;
                case "initializeWithConfig":
                    initializeWithConfig(callback, args(0));
                    break;
                case "deinit":
                    deinit(callback);
                    break;
                case "deinitialize":
                    deinitialize(callback);
                    break;
                case "isInitialized":
                    isInitialized(callback);
                    break;
                case "stopLivenessProcessing":
                    stopLivenessProcessing(callback);
                    break;
                case "setRequestHeaders":
                    setRequestHeaders(callback, args(0));
                    break;
                case "presentFaceCaptureActivityWithConfig":
                    presentFaceCaptureActivityWithConfig(callback, args(0));
                    break;
                case "matchFacesWithConfig":
                    matchFacesWithConfig(callback, args(0), args(1));
                    break;
                case "startLivenessWithConfig":
                    startLivenessWithConfig(callback, args(0));
                    break;
                case "setServiceUrl":
                    setServiceUrl(callback, args(0));
                    break;
                case "setLogs":
                    setLogs(callback, args(0));
                    break;
                case "setSaveLogs":
                    setSaveLogs(callback, args(0));
                    break;
                case "setLogsFolder":
                    setLogsFolder(callback, args(0));
                    break;
                case "matchFaces":
                    matchFaces(callback, args(0));
                    break;
                case "detectFaces":
                    detectFaces(callback, args(0));
                    break;
                case "setUiCustomizationLayer":
                    setUiCustomizationLayer(callback, args(0));
                    break;
                case "setUiConfiguration":
                    setUiConfiguration(callback, args(0));
                    break;
                case "setLocalizationDictionary":
                    setLocalizationDictionary(callback, args(0));
                    break;
                case "matchFacesSimilarityThresholdSplit":
                    matchFacesSimilarityThresholdSplit(callback, args(0), args(1));
                    break;
                case "getPerson":
                    getPerson(callback, args(0));
                    break;
                case "createPerson":
                    createPerson(callback, args(0), args(1), args(2));
                    break;
                case "updatePerson":
                    updatePerson(callback, args(0));
                    break;
                case "deletePerson":
                    deletePerson(callback, args(0));
                    break;
                case "getPersonImages":
                    getPersonImages(callback, args(0));
                    break;
                case "getPersonImagesForPage":
                    getPersonImagesForPage(callback, args(0), args(1), args(2));
                    break;
                case "addPersonImage":
                    addPersonImage(callback, args(0), args(1));
                    break;
                case "getPersonImage":
                    getPersonImage(callback, args(0), args(1));
                    break;
                case "deletePersonImage":
                    deletePersonImage(callback, args(0), args(1));
                    break;
                case "getGroups":
                    getGroups(callback);
                    break;
                case "getGroupsForPage":
                    getGroupsForPage(callback, args(0), args(1));
                    break;
                case "getPersonGroups":
                    getPersonGroups(callback, args(0));
                    break;
                case "getPersonGroupsForPage":
                    getPersonGroupsForPage(callback, args(0), args(1), args(2));
                    break;
                case "createGroup":
                    createGroup(callback, args(0), args(1));
                    break;
                case "getGroup":
                    getGroup(callback, args(0));
                    break;
                case "updateGroup":
                    updateGroup(callback, args(0));
                    break;
                case "editPersonsInGroup":
                    editPersonsInGroup(callback, args(0), args(1));
                    break;
                case "getPersonsInGroup":
                    getPersonsInGroup(callback, args(0));
                    break;
                case "getPersonsInGroupForPage":
                    getPersonsInGroupForPage(callback, args(0), args(1), args(2));
                    break;
                case "deleteGroup":
                    deleteGroup(callback, args(0));
                    break;
                case "searchPerson":
                    searchPerson(callback, args(0));
                    break;
            }
        } catch (Exception e) {
            Log.e(LOG_TAG, e.toString());
        }
        return true;
    }

    private void getServiceUrl(Callback callback) {
        callback.success(Instance().getServiceUrl());
    }

    private void setRequestHeaders(Callback callback, JSONObject headers) {
        networkInterceptorListener = requestBuilder -> {
            Iterator<String> keys = headers.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                String value = headers.optString(key);
                requestBuilder.header(key, value);
            }
        };
        Instance().setNetworkInterceptorListener(networkInterceptorListener);
        callback.success(null);
    }

    private void startLiveness(Callback callback) {
        Instance().startLiveness(
                getContext(),
                response -> callback.success(generateLivenessResponse(response).toString()),
                this::sendLivenessNotification);
    }

    private void detectFaces(Callback callback, String request) throws JSONException {
        Instance().detectFaces(
                DetectFacesRequestFromJSON(new JSONObject(request)),
                (response) -> callback.success(generateDetectFacesResponse(response).toString()));
    }

    private void getFaceSdkVersion(Callback callback) {
        callback.success(Instance().getFaceSdkVersion());
    }

    private void presentFaceCaptureActivity(Callback callback) {
        Instance().presentFaceCaptureActivity(
                getContext(),
                (response) -> callback.success(generateFaceCaptureResponse(response).toString()));
    }

    private void stopFaceCaptureActivity(Callback callback) {
        Instance().stopFaceCaptureActivity(getContext());
        callback.success(null);
    }

    private void stopLivenessProcessing(Callback callback) {
        Instance().stopLivenessProcessing(getContext());
        callback.success(null);
    }

    private void presentFaceCaptureActivityWithConfig(Callback callback, JSONObject config) {
        Instance().presentFaceCaptureActivity(
                getContext(),
                faceCaptureConfigFromJSON(config),
                (response) -> callback.success(generateFaceCaptureResponse(response).toString()));
    }

    private void matchFacesWithConfig(Callback callback, String request, JSONObject config) throws JSONException {
        Instance().matchFaces(
                MatchFacesRequestFromJSON(new JSONObject(request)),
                matchFacesConfigFromJSON(config),
                (response) -> callback.success(generateMatchFacesResponse(response).toString()));
    }

    private void startLivenessWithConfig(Callback callback, JSONObject config) {
        Instance().startLiveness(
                getContext(),
                livenessConfigFromJSON(config),
                (response) -> callback.success(generateLivenessResponse(response).toString()),
                this::sendLivenessNotification);
    }

    private void setServiceUrl(Callback callback, String url) {
        Instance().setServiceUrl(url);
        callback.success(null);
    }

    private void setLogs(Callback callback, boolean isEnable) {
        Instance().setLogs(isEnable);
        callback.success(null);
    }

    private void setSaveLogs(Callback callback, boolean isSaveLog) {
        Instance().setSaveLogs(isSaveLog);
        callback.success(null);
    }

    private void setLogsFolder(Callback callback, String path) {
        Instance().setLogsFolder(path);
        callback.success(null);
    }

    /**
     * @noinspection deprecation
     */
    private void init(Callback callback) {
        Instance().init(getContext(), getInitCompletion(callback));
    }

    private void initialize(Callback callback) {
        Instance().initialize(getContext(), getInitCompletion(callback));
    }

    private void initializeWithConfig(Callback callback, JSONObject config) {
        Instance().initialize(getContext(), InitializationConfigurationFromJSON(config), getInitCompletion(callback));
    }

    /**
     * @noinspection deprecation
     */
    private void deinit(Callback callback) {
        Instance().deinit();
        callback.success(null);
    }

    private void deinitialize(Callback callback) {
        Instance().deinitialize();
        callback.success(null);
    }

    private void isInitialized(Callback callback) {
        callback.success(Instance().isInitialized());
    }

    private void matchFaces(Callback callback, String request) throws JSONException {
        Instance().matchFaces(
                MatchFacesRequestFromJSON(new JSONObject(request)),
                (response) -> callback.success(generateMatchFacesResponse(response).toString()));
    }

    private void matchFacesSimilarityThresholdSplit(Callback callback, String array, Double similarity) throws JSONException {
        List<MatchFacesComparedFacesPair> faces = listFromJSON(new JSONArray(array), JSONConstructor::MatchFacesComparedFacesPairFromJSON);
        MatchFacesSimilarityThresholdSplit split = new MatchFacesSimilarityThresholdSplit(faces, similarity);
        callback.success(generateMatchFacesSimilarityThresholdSplit(split).toString());
    }

    private void setUiCustomizationLayer(Callback callback, JSONObject customization) throws JSONException {
        // Fore some reason if we convert JSONObject to String and then back, it fixes react
        Instance().getCustomization().setUiCustomizationLayer(new JSONObject(customization.toString()));
        callback.success(null);
    }

    private void setUiConfiguration(Callback callback, JSONObject config) {
        Instance().getCustomization().setUiConfiguration(uiConfigFromJSON(config, getContext()));
        callback.success(null);
    }

    private void setLocalizationDictionary(Callback callback, JSONObject dictionary) {
        localizationCallbacks = key -> dictionary == null ? null : dictionary.optString(key, null);
        Instance().setLocalizationCallback(localizationCallbacks);
        callback.success(null);
    }

    private void getPerson(Callback callback, String personId) {
        Instance().personDatabase().getPerson(personId, createPersonDBCallback(callback, JSONConstructor::generatePerson));
    }

    private void createPerson(Callback callback, String name, JSONArray groupIds, JSONObject metadata) {
        Instance().personDatabase().createPerson(name, metadata, arrayFromJSON(groupIds), createPersonDBCallback(callback, JSONConstructor::generatePerson));
    }

    private void updatePerson(Callback callback, JSONObject personJson) {
        Instance().personDatabase().getPerson(idFromJSON(personJson), new PersonDBCallback<Person>() {
            @Override
            public void onSuccess(@Nullable Person person) {
                if (person != null)
                    Instance().personDatabase().updatePerson(updatePersonFromJSON(person, personJson), createPersonDBCallback(callback, null));
                else
                    callback.error("id does not exist");
            }

            @Override
            public void onFailure(@NonNull String s) {
                callback.error(s);
            }
        });
    }

    private void deletePerson(Callback callback, String personId) {
        Instance().personDatabase().deletePerson(personId, createPersonDBCallback(callback, null));
    }

    private void getPersonImages(Callback callback, String personId) {
        Instance().personDatabase().getPersonImages(personId, createPersonDBPageableListCallback(callback, JSONConstructor::generatePersonImage));
    }

    private void getPersonImagesForPage(Callback callback, String personId, int page, int size) {
        Instance().personDatabase().getPersonImagesForPage(personId, page, size, createPersonDBPageableListCallback(callback, JSONConstructor::generatePersonImage));
    }

    private void addPersonImage(Callback callback, String personId, JSONObject image) {
        Instance().personDatabase().addPersonImage(personId, ImageUploadFromJSON(image), createPersonDBCallback(callback, JSONConstructor::generatePersonImage));
    }

    private void getPersonImage(Callback callback, String personId, String imageId) {
        Instance().personDatabase().getPersonImageById(personId, imageId, createPersonDBCallback(callback, JSONConstructor::generateByteArrayImage));
    }

    private void deletePersonImage(Callback callback, String personId, String imageId) {
        Instance().personDatabase().deletePersonImage(personId, imageId, createPersonDBCallback(callback, null));
    }

    private void getGroups(Callback callback) {
        Instance().personDatabase().getGroups(createPersonDBPageableListCallback(callback, JSONConstructor::generatePersonGroup));
    }

    private void getGroupsForPage(Callback callback, int page, int size) {
        Instance().personDatabase().getGroupsForPage(page, size, createPersonDBPageableListCallback(callback, JSONConstructor::generatePersonGroup));
    }

    private void getPersonGroups(Callback callback, String personId) {
        Instance().personDatabase().getPersonGroups(personId, createPersonDBPageableListCallback(callback, JSONConstructor::generatePersonGroup));
    }

    private void getPersonGroupsForPage(Callback callback, String personId, int page, int size) {
        Instance().personDatabase().getPersonGroupsForPage(personId, page, size, createPersonDBPageableListCallback(callback, JSONConstructor::generatePersonGroup));
    }

    private void createGroup(Callback callback, String name, JSONObject metadata) {
        Instance().personDatabase().createGroup(name, metadata, createPersonDBCallback(callback, JSONConstructor::generatePersonGroup));
    }

    private void getGroup(Callback callback, String groupId) {
        Instance().personDatabase().getGroup(groupId, createPersonDBCallback(callback, JSONConstructor::generatePersonGroup));
    }

    private void updateGroup(Callback callback, JSONObject groupJson) {
        Instance().personDatabase().getGroup(idFromJSON(groupJson), new PersonDBCallback<PersonGroup>() {
            @Override
            public void onSuccess(@Nullable PersonGroup group) {
                if (group != null)
                    Instance().personDatabase().updateGroup(updatePersonGroupFromJSON(group, groupJson), createPersonDBCallback(callback, null));
                else
                    callback.error("id does not exist");
            }

            @Override
            public void onFailure(@NonNull String s) {
                callback.error(s);
            }
        });
    }

    private void editPersonsInGroup(Callback callback, String groupId, JSONObject editGroupPersonsRequest) {
        Instance().personDatabase().editPersonsInGroup(groupId, EditGroupPersonsRequestFromJSON(editGroupPersonsRequest), createPersonDBCallback(callback, null));
    }

    private void getPersonsInGroup(Callback callback, String groupId) {
        Instance().personDatabase().getPersonsInGroup(groupId, createPersonDBPageableListCallback(callback, JSONConstructor::generatePerson));
    }

    private void getPersonsInGroupForPage(Callback callback, String groupId, int page, int size) {
        Instance().personDatabase().getPersonsInGroupForPage(groupId, page, size, createPersonDBPageableListCallback(callback, JSONConstructor::generatePerson));
    }

    private void deleteGroup(Callback callback, String groupId) {
        Instance().personDatabase().deleteGroup(groupId, createPersonDBCallback(callback, null));
    }

    private void searchPerson(Callback callback, JSONObject searchPersonRequest) {
        Instance().personDatabase().searchPerson(SearchPersonRequestFromJSON(searchPersonRequest), createPersonDBListCallback(callback, JSONConstructor::generateSearchPerson));
    }

    private FaceInitializationCompletion getInitCompletion(Callback callback) {
        return (boolean success, InitException error) -> {
            if (success) {
                Instance().setVideoEncoderCompletion(this::sendVideoEncoderCompletion);
                Instance().setOnClickListener(view -> sendOnCustomButtonTappedEvent((int) view.getTag()));
            }
            callback.success(generateInitCompletion(success, error).toString());
        };
    }

    // Weak references
    LocalizationCallbacks localizationCallbacks = null;
    NetworkInterceptorListener networkInterceptorListener = null;
}