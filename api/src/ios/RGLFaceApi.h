#import <Cordova/CDVPlugin.h>
#import <Foundation/Foundation.h>
#import "JSONConstructor.h"
#import "RegulaConfig.h"
#import <DocumentReader/DocumentReader.h>

@class DocReader;

@interface RGLDocumentReader : CDVPlugin

@property (class) CDVInvokedUrlCommand* _Nullable command;
@property (class) NSNumber* _Nullable databasePercentageDownloaded;

@end