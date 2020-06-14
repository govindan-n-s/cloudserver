var PROTO_PATH = __dirname + '/object-layer.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// console.log(' descriptor  PATH , route guide', protoDescriptor , PROTO_PATH, protoDescriptor.interface);
// The protoDescriptor object has the full package hierarchy
var interface= protoDescriptor.interface;

module.exports = interface