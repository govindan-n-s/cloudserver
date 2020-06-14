const { config } = require('../Config');
var grpc = require('grpc');


const interface = require('./HCL/object-layer-client.js');
console.log( "object layer  " , interface );
// const objectLayerClient = new interface.ObjectLayer(config.metadataClient.bindAddress+":"+config.metadataClient.port , grpc.credentials.createInsecure());
const objectLayerClient = new interface.ObjectLayer('localhost:50051' , grpc.credentials.createInsecure());


module.exports = {objectLayerClient};