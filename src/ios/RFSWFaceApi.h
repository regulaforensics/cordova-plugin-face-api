#import <Cordova/CDVPlugin.h>
#import <Foundation/Foundation.h>
#import "RFSWJSONConstructor.h"
#import "RFSWConfig.h"
@import FaceSDK;

typedef void (^RFSWCallback)(id _Nullable response);
typedef void (^RFSWEventSender)(NSString* _Nonnull event, id _Nullable data);

@interface RFSWFaceApi : CDVPlugin<RFSURLRequestInterceptingDelegate,
                                    RFSVideoUploadingDelegate,
                                    RFSCustomizationActionDelegate,
                                    RFSFaceCaptureDelegate,
                                    RFSLivenessDelegate>
@property (class) CDVInvokedUrlCommand* _Nullable command;
@property NSDictionary* _Nullable headers;
@end

NSString* _Nonnull RFSWCameraSwitchEvent;
NSString* _Nonnull RFSWLivenessNotificationEvent;
NSString* _Nonnull RFSWVideoEncoderCompletionEvent;
NSString* _Nonnull RFSWOnCustomButtonTappedEvent;
