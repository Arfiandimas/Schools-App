let PROTO_PATH = __dirname + './../proto/grpc.proto';
let grpc = require('@grpc/grpc-js');
let protoLoader = require('@grpc/proto-loader');

const protoDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

const proto = grpc.loadPackageDefinition(protoDefinition).authpackage

function getStudents(call, callback) {
    let data =  [
        {nama : 'Barjono', nim : '17.11.1018'},
        {nama : 'Lahh', nim : '17.11.1019'}
    ]
    callback(null, {data: data})
}

function main() {
    let server = new grpc.Server()
    server.addService(proto.Greeter.service, {getStudents : getStudents})
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();