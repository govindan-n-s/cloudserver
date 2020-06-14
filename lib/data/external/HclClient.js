const { errors, s3middleware } = require('arsenal');
const MD5Sum = s3middleware.MD5Sum;
const getMetaHeaders = s3middleware.userMetadata.getMetaHeaders;
const createLogger = require('../multipleBackendLogger');
const { prepareStream } = require('../../api/apiUtils/object/prepareStream');
const { logHelper, removeQuotes, trimXMetaPrefix } = require('./utils');
const { config } = require('../../Config');
var grpc = require('grpc');

const interface = require('./HCL/object-layer-client.js');
// console.log( "object layer  " , interface );
const objectLayerClientStub = new interface.ObjectLayer(config.dataDaemon.bindAddress+":"+config.dataDaemon.port , grpc.credentials.createInsecure());
const missingVerIdInternalError = errors.InternalError.customizeDescription(
    'Invalid state. Please ensure versioning is enabled ' +
    'in AWS for the location constraint and try again.'
);

class HclClient {
    constructor(config) {
        this.clientType = 'hcl_backend';
        this._s3Params = config.s3Params;
        this._awsBucketName = config.bucketName;
        this._bucketMatch = config.bucketMatch;
        this._dataStoreName = config.dataStoreName;
        this._serverSideEncryption = config.serverSideEncryption;
        this._client = objectLayerClientStub ;
    }

    
    put(stream, size, keyContext, reqUids, callback) {
    console.log(' put object ',objectLayerClientStub );
    logHelper(log, 'info', 'put object data received by hcl backend ' , objectLayerClientStub ,
                    this._client);
    objectLayerClientStub.PutObject();

    }
    head(objectGetInfo, reqUids, callback) {
        
        return callback(null, stream);
    }
    delete(objectGetInfo, reqUids, callback) {
       
    }

    healthcheck(location, callback) {
        
    }

    createMPU(key, metaHeaders, bucketName, websiteRedirectHeader, contentType,
        cacheControl, contentDisposition, contentEncoding, tagging, log,
        callback) {
        
    }

    uploadPart(request, streamingV4Params, stream, size, key, uploadId,
    partNumber, bucketName, log, callback) {
        
    }

    listParts(key, uploadId, bucketName, partNumberMarker, maxParts, log,
    callback) {
        
    }

    
    completeMPU(jsonList, mdInfo, key, uploadId, bucketName, log, callback) {
        
    }

    abortMPU(key, uploadId, bucketName, log, callback) {
       
    }

    objectPutTagging(key, bucket, objectMD, log, callback) {
        
    }

    objectDeleteTagging(key, bucket, objectMD, log, callback) {
       
    }
    copyObject(request, destLocationConstraintName, sourceKey,
    sourceLocationConstraintName, storeMetadataParams, log, callback) {
        
    }
    uploadPartCopy(request, awsSourceKey, sourceLocationConstraintName,
      log, callback) {
    }
        
}

module.exports = HclClient;
