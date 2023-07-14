#import <Cordova/CDVPlugin.h>
#import <Foundation/Foundation.h>
#import "RFSWJSONConstructor.h"
@import FaceSDK;

typedef void (^RFSWCallback)(NSString* _Nullable response);

@interface RFSWFaceApi : CDVPlugin<RFSURLRequestInterceptingDelegate,
                                    RFSVideoUploadingDelegate,
                                    RFSCustomizationActionDelegate,
                                    RFSLivenessProcessStatusDelegate>
@property (class) CDVInvokedUrlCommand* _Nullable command;
@property NSDictionary* _Nullable headers;
@end
