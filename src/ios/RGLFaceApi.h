#import <Cordova/CDVPlugin.h>
#import <Foundation/Foundation.h>
#import "RFSWJSONConstructor.h"
@import FaceSDK;

@interface RGLFaceApi : CDVPlugin<RFSURLRequestInterceptingDelegate, RFSVideoUploadingDelegate>
@property NSDictionary* _Nullable headers;
@end
