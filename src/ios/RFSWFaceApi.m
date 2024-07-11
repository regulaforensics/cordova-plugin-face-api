@import UIKit;
#import "RFSWFaceApi.h"

RFSWFaceApi* RFSWPlugin;
@implementation RFSWFaceApi
static CDVInvokedUrlCommand* _command;
+ (CDVInvokedUrlCommand*)command { return _command; }
+ (void) setCommand:(CDVInvokedUrlCommand*)command { _command = command; }

static RFSWEventSender sendEvent = ^(NSString* event, id data) {
    data = [RFSWJSONConstructor toSendable:data];
    if (event) {
        NSArray *skippedEvents = @[RFSWVideoEncoderCompletionEvent, RFSWOnCustomButtonTappedEvent];
        if([skippedEvents containsObject:event]) return;
        NSArray *singleEvents = @[];
        if(![singleEvents containsObject:event]) data = [NSString stringWithFormat:@"%@%@", event, data];
    }

    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:data];
    [result setKeepCallbackAsBool:YES];
    [RFSWPlugin.commandDelegate sendPluginResult:result callbackId:RFSWFaceApi.command.callbackId];
};

- (void) exec:(CDVInvokedUrlCommand*)command {
    [RFSWFaceApi setCommand:command];
    RFSWPlugin = self;
    NSString* method = command.arguments[0];
    NSMutableArray* args = [NSMutableArray new];
    for(int i = 1; i < command.arguments.count; i++) [args addObject:command.arguments[i]];
    RFSWCallback callback = ^(id _Nullable data) { sendEvent(nil, data); };
    NSDictionary* Switch = @{
        @"getVersion": ^{ [self getVersion :callback]; },
        @"getServiceUrl": ^{ [self getServiceUrl :callback]; },
        @"setServiceUrl": ^{ [self setServiceUrl :args[0] :callback]; },
        @"setLocalizationDictionary": ^{ [self setLocalizationDictionary :args[0]]; },
        @"setRequestHeaders": ^{ [self setRequestHeaders :args[0]]; },
        @"setCustomization": ^{ [self setCustomization :args[0]]; },
        @"isInitialized": ^{ [self isInitialized :callback]; },
        @"initialize": ^{ [self initialize :args[0] :callback]; },
        @"deinitialize": ^{ [self deinitialize]; },
        @"startFaceCapture": ^{ [self startFaceCapture :args[0] :callback]; },
        @"stopFaceCapture": ^{ [self stopFaceCapture]; },
        @"startLiveness": ^{ [self startLiveness :args[0] :callback]; },
        @"stopLiveness": ^{ [self stopLiveness]; },
        @"matchFaces": ^{ [self matchFaces :args[0] :args[1] :callback]; },
        @"splitComparedFaces": ^{ [self splitComparedFaces :args[0] :args[1] :callback]; },
        @"detectFaces": ^{ [self detectFaces :args[0] :callback]; },
        @"createPerson": ^{ [self createPerson :args[0] :args[1] :args[2] :callback]; },
        @"updatePerson": ^{ [self updatePerson :args[0] :callback]; },
        @"deletePerson": ^{ [self deletePerson :args[0] :callback]; },
        @"getPerson": ^{ [self getPerson :args[0] :callback]; },
        @"addPersonImage": ^{ [self addPersonImage :args[0] :args[1] :callback]; },
        @"deletePersonImage": ^{ [self deletePersonImage :args[0] :args[1] :callback]; },
        @"getPersonImage": ^{ [self getPersonImage :args[0] :args[1] :callback]; },
        @"getPersonImages": ^{ [self getPersonImages :args[0] :callback]; },
        @"getPersonImagesForPage": ^{ [self getPersonImagesForPage :args[0] :args[1] :args[2] :callback]; },
        @"createGroup": ^{ [self createGroup :args[0] :args[1] :callback]; },
        @"updateGroup": ^{ [self updateGroup :args[0] :callback]; },
        @"editPersonsInGroup": ^{ [self editPersonsInGroup :args[0] :args[1] :callback]; },
        @"deleteGroup": ^{ [self deleteGroup :args[0] :callback]; },
        @"getGroup": ^{ [self getGroup :args[0] :callback]; },
        @"getGroups": ^{ [self getGroups :callback]; },
        @"getGroupsForPage": ^{ [self getGroupsForPage :args[0] :args[1] :callback]; },
        @"getPersonGroups": ^{ [self getPersonGroups :args[0] :callback]; },
        @"getPersonGroupsForPage": ^{ [self getPersonGroupsForPage :args[0] :args[1] :args[2] :callback]; },
        @"getPersonsInGroup": ^{ [self getPersonsInGroup :args[0] :callback]; },
        @"getPersonsInGroupForPage": ^{ [self getPersonsInGroupForPage :args[0] :args[1] :args[2] :callback]; },
        @"searchPerson": ^{ [self searchPerson :args[0] :callback]; },
    };
    ((void(^)(void))Switch[method])();
}

NSString* RFSWCameraSwitchEvent = @"cameraSwitchEvent";
NSString* RFSWLivenessNotificationEvent = @"livenessNotificationEvent";
NSString* RFSWVideoEncoderCompletionEvent = @"video_encoder_completion";
NSString* RFSWOnCustomButtonTappedEvent = @"onCustomButtonTappedEvent";

- (void) getVersion:(RFSWCallback)callback {
    callback([RFSWJSONConstructor generateFaceSDKVersion:RFSFaceSDK.service.version]);
}

- (void) getServiceUrl:(RFSWCallback)callback {
    callback([RFSFaceSDK.service serviceURL]);
}

- (void) setServiceUrl:(NSString*)url :(RFSWCallback)callback {
    [RFSFaceSDK.service setServiceURL:url];
    callback(@"");
}

- (void) setLocalizationDictionary:(NSDictionary*)dictionary {
    RFSFaceSDK.service.localizationHandler = ^NSString* (NSString* localizationKey) {
        if (dictionary[localizationKey]) return dictionary[localizationKey];
        return nil;
    };
}

- (void) setRequestHeaders:(NSDictionary*)headers {
    self.headers = headers;
    RFSFaceSDK.service.requestInterceptingDelegate = self;
}

- (NSURLRequest*)interceptorPrepareRequest:(NSURLRequest*)request {
    NSMutableURLRequest *interceptedRequest = [request mutableCopy];
    for (NSString* key in self.headers.allKeys)
        [interceptedRequest addValue:[self.headers valueForKey:key] forHTTPHeaderField:key];
    return interceptedRequest;
}

- (void) setCustomization:(NSDictionary*)config {
    [RFSWConfig setCustomization:config :RFSFaceSDK.service.customization];
}

- (void) isInitialized:(RFSWCallback)callback {
    callback(@([RFSFaceSDK.service isInitialized]));
}

- (void) initialize:(NSDictionary*)config :(RFSWCallback)callback {
    [RFSFaceSDK.service initializeWithConfiguration:[RFSWJSONConstructor initConfigFromJSON:config]
                                         completion:[self initCompletion:callback]];
}

- (void) deinitialize {
    [RFSFaceSDK.service deinitialize];
}

- (void) startFaceCapture:(NSDictionary*)config :(RFSWCallback)callback {
    dispatch_async(dispatch_get_main_queue(), ^{
        [RFSFaceSDK.service presentFaceCaptureViewControllerFrom:[UIApplication sharedApplication].windows.lastObject.rootViewController
                                                            animated:true
                                                       configuration:[RFSWConfig faceCaptureConfigFromJSON:config]
                                                           onCapture:[self faceCaptureCompletion:callback]
                                                          completion:nil];
    });
}

- (void) stopFaceCapture {
    [RFSFaceSDK.service stopFaceCaptureViewController];
}

- (void) startLiveness:(NSDictionary*)config :(RFSWCallback)callback {
    dispatch_async(dispatch_get_main_queue(), ^{
        [RFSFaceSDK.service startLivenessFrom:[UIApplication sharedApplication].windows.lastObject.rootViewController
                                                animated:true
                                           configuration:[RFSWConfig livenessConfigFromJSON:config]
                                              onLiveness:[self livenessCompletion:callback]
                                              completion:nil];
    });
}

- (void) stopLiveness {
    [RFSFaceSDK.service stopLivenessProcessing];
}

- (void) matchFaces:(NSDictionary*)request :(NSDictionary*)config :(RFSWCallback)callback {
    [RFSFaceSDK.service matchFaces:[RFSWJSONConstructor matchFacesRequestFromJSON:request]
                     configuration:[RFSWConfig matchFacesConfigFromJSON:config]
                        completion:[self matchFacesCompletion:callback]];
}

- (void) splitComparedFaces:(NSArray*)faces :(NSNumber*)similarity :(RFSWCallback)callback {
    NSArray* array = [RFSWJSONConstructor arrayFromJSON:faces :@selector(comparedFacesPairFromJSON:)];
    RFSMatchFacesSimilarityThresholdSplit *split = [RFSMatchFacesSimilarityThresholdSplit splitPairs:array bySimilarityThreshold:similarity];
    callback([RFSWJSONConstructor generateComparedFacesSplit:split]);
}

- (void) detectFaces:(NSDictionary*)request :(RFSWCallback)callback {
    [RFSFaceSDK.service detectFacesByRequest:[RFSWJSONConstructor detectFacesRequestFromJSON:request]
                                  completion:[self detectFacesCompletion:callback]];
}

- (void) createPerson:(NSString*)name :(NSDictionary*)metadata :(NSArray<NSString*>*)groupIds :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase createPersonWithName:name
                                                   metadata:metadata
                                                   groupIds:groupIds
                                                 completion:[self databaseItemCompletion :callback :@selector(generatePerson:)]];
}

- (void) updatePerson:(NSDictionary*)person :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase getPersonByPersonId:[RFSWJSONConstructor idFromJSON:person] completion:^(RFSItemResponse<RFSPerson *> * response) {
        if (response.error) callback([RFSWJSONConstructor generatePersonDBResponse:nil :response.error]);
        else [RFSFaceSDK.service.personDatabase updatePerson:[RFSWJSONConstructor updatePersonFromJSON:response.item :person]
                                                 completion:[self databaseCompletion:callback]];
    }];
}

- (void) deletePerson:(NSString*)personId :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase deletePersonByPersonId:personId
                                                   completion:[self databaseCompletion:callback]];
}

- (void) getPerson:(NSString*)personId :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase getPersonByPersonId:personId
                                                completion:[self databaseItemCompletion :callback :@selector(generatePerson:)]];
}

- (void) addPersonImage:(NSString*)personId :(NSDictionary*)image :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase addPersonImageByPersonId:personId
                                                    imageUpload:[RFSWJSONConstructor imageUploadFromJSON:image]
                                                     completion:[self databaseItemCompletion :callback :@selector(generatePersonImage:)]];
}

- (void) deletePersonImage:(NSString*)personId :(NSString*)imageId :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase deletePersonImageByPersonId:personId
                                                           imageId: imageId
                                                        completion:[self databaseCompletion:callback]];
}

- (void) getPersonImage:(NSString*)personId :(NSString*)imageId :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase getPersonImageByPersonId:personId imageId:imageId completion:^(RFSDataResponse* response) {
        callback([RFSWJSONConstructor generatePersonDBResponse:[RFSWJSONConstructor base64Encode:response.data] :response.error]);
    }];
}

- (void) getPersonImages:(NSString*)personId :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase getPersonImagesByPersonId:personId
                                                      completion:[self databasePageCompletion :callback :@selector(generatePersonImage:)]];
}

- (void) getPersonImagesForPage:(NSString*)personId :(NSNumber*)page :(NSNumber*)size :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase getPersonImagesByPersonId:personId
                                                            page:[page integerValue]
                                                            size:[size integerValue]
                                                      completion:[self databasePageCompletion :callback :@selector(generatePersonImage:)]];
}

- (void) createGroup:(NSString*)name :(NSDictionary*)metadata :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase createGroupWithName:name
                                                  metadata:metadata
                                                completion:[self databaseItemCompletion :callback :@selector(generatePersonGroup:)]];
}

- (void) updateGroup:(NSDictionary*)group :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase getGroupByGroupId:[RFSWJSONConstructor idFromJSON:group] completion:^(RFSItemResponse<RFSPersonGroup *> * response) {
        if (response.error) callback([RFSWJSONConstructor generatePersonDBResponse:nil :response.error]);
        else [RFSFaceSDK.service.personDatabase updateGroup:[RFSWJSONConstructor updatePersonGroupFromJSON:response.item :group]
                                                 completion:[self databaseCompletion:callback]];
    }];
}

- (void) editPersonsInGroup:(NSString*)groupId :(NSDictionary*)editGroupPersonsRequest :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase editGroupPersonsByGroupId:groupId
                                                         request:[RFSWJSONConstructor editGroupPersonsRequestFromJSON:editGroupPersonsRequest]
                                                      completion:[self databaseCompletion:callback]];
}

- (void) deleteGroup:(NSString*)groupId :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase deleteGroupByGroupId:groupId
                                                 completion:[self databaseCompletion:callback]];
}

- (void) getGroup:(NSString*)groupId :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase getGroupByGroupId:groupId
                                              completion:[self databaseItemCompletion :callback :@selector(generatePersonGroup:)]];
}

- (void) getGroups:(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase getGroups:[self databasePageCompletion :callback :@selector(generatePersonGroup:)]];
}

- (void) getGroupsForPage:(NSNumber*)page :(NSNumber*)size :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase getGroupsForPage:[page integerValue]
                                                   size:[size integerValue]
                                             completion:[self databasePageCompletion :callback :@selector(generatePersonGroup:)]];
}

- (void) getPersonGroups:(NSString*)personId :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase getPersonGroupsByPersonId:personId
                                                      completion:[self databasePageCompletion :callback :@selector(generatePersonGroup:)]];
}

- (void) getPersonGroupsForPage:(NSString*)personId :(NSNumber*)page :(NSNumber*)size :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase getPersonGroupsByPersonId:personId
                                                            page:[page integerValue]
                                                            size:[size integerValue]
                                                      completion:[self databasePageCompletion :callback :@selector(generatePersonGroup:)]];
}

- (void) getPersonsInGroup:(NSString*)groupId :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase getGroupPersonsByGroupId:groupId
                                                     completion:[self databasePageCompletion :callback :@selector(generatePerson:)]];
}

- (void) getPersonsInGroupForPage:(NSString*)groupId :(NSNumber*)page :(NSNumber*)size :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase getGroupPersonsByGroupId:groupId
                                                           page:[page integerValue]
                                                           size:[size integerValue]
                                                     completion:[self databasePageCompletion :callback :@selector(generatePerson:)]];
}

- (void) searchPerson:(NSDictionary*)searchPersonRequest :(RFSWCallback)callback {
    [RFSFaceSDK.service.personDatabase searchPerson:[RFSWJSONConstructor searchPersonRequestFromJSON:searchPersonRequest]
                                         completion:^(RFSSearchPersonResponse *response) {
        callback([RFSWJSONConstructor generatePersonDBResponse:[RFSWJSONConstructor generateArray:response.results :@selector(generateSearchPerson:)] :response.error]);
    }];
}

-(RFSInitializationCompletion)initCompletion:(RFSWCallback)callback {
    return ^(BOOL success, NSError* error) {
        RFSFaceSDK.service.customization.configuration = [RFSUIConfiguration defaultConfiguration];
        [RFSFaceSDK.service setVideoUploadingDelegate:self];
        [RFSFaceSDK.service setFaceCaptureDelegate:self];
        [RFSFaceSDK.service setLivenessDelegate:self];
        RFSFaceSDK.service.customization.actionDelegate = self;
        callback([RFSWJSONConstructor generateInitCompletion:success :error]);
    };
}

- (void (^)(RFSFaceCaptureResponse*)) faceCaptureCompletion:(RFSWCallback)callback {
    return ^(RFSFaceCaptureResponse* response) {
        callback([RFSWJSONConstructor generateFaceCaptureResponse:response]);
    };
}

- (void (^)(RFSLivenessResponse*)) livenessCompletion:(RFSWCallback)callback {
    return ^(RFSLivenessResponse* response) {
        callback([RFSWJSONConstructor generateLivenessResponse:response]);
    };
}

- (void (^)(RFSMatchFacesResponse*)) matchFacesCompletion:(RFSWCallback)callback {
    return ^(RFSMatchFacesResponse* response) {
        callback([RFSWJSONConstructor generateMatchFacesResponse:response]);
    };
}

- (void (^)(RFSDetectFacesResponse*)) detectFacesCompletion:(RFSWCallback)callback {
    return ^(RFSDetectFacesResponse* response) {
        callback([RFSWJSONConstructor generateDetectFacesResponse:response]);
    };
}

- (void (^)(RFSComfirmResponse *response))databaseCompletion:(RFSWCallback)callback {
    return ^(RFSComfirmResponse *response) {
        callback([RFSWJSONConstructor generatePersonDBResponse:@YES :response.error]);
    };
}

- (void (^)(RFSItemResponse<RFSDBBaseItem *> *response))databaseItemCompletion:(RFSWCallback)callback :(SEL)toJson {
    return ^(RFSItemResponse<RFSDBBaseItem *> *response) {
        callback([RFSWJSONConstructor generatePersonDBResponse:[RFSWJSONConstructor performSelector:toJson withObject:response.item] :response.error]);
    };
}

- (void (^)(RFSPageResponse<RFSDBBaseItem *> *response))databasePageCompletion:(RFSWCallback)callback :(SEL)toJson {
    return ^(RFSPageResponse<RFSDBBaseItem *> *response) {
        callback([RFSWJSONConstructor generatePersonDBResponse:@{
            @"items": [RFSWJSONConstructor generateArray:response.items :toJson],
            @"page": @(response.page),
            @"totalPages": @(response.totalPages),
        } :response.error]);
    };
}

// RFSFaceCaptureDelegate & RFSLivenessDelegate
- (void)cameraPositionChanged:(RFSCameraPosition)cameraPosition {
    sendEvent(RFSWCameraSwitchEvent, @(cameraPosition));
}

// RFSLivenessDelegate
- (void)processStatusChanged:(RFSLivenessProcessStatus)status result:(RFSLivenessResponse*)result {
    sendEvent(RFSWLivenessNotificationEvent, [RFSWJSONConstructor generateLivenessNotification:status result:result]);
}

// RFSVideoUploadingDelegate
- (void)videoUploadingForTransactionId:(NSString*)transactionId didFinishedWithSuccess:(BOOL)success {
    sendEvent(RFSWVideoEncoderCompletionEvent, [RFSWJSONConstructor generateVideoEncoderCompletion:transactionId :success]);
}

// RFSCustomizationActionDelegate
- (void)onFaceCustomButtonTappedWithTag:(NSInteger)tag {
    sendEvent(RFSWOnCustomButtonTappedEvent, @(tag));
}

@end
