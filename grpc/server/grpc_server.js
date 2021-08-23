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
    let data_server =  [
        {no : 1, kelas : 'IPA', angkatan : 2017},
        {no : 2, kelas : 'IPS', angkatan : 2017}
    ]
    console.log(call.request.halah)
    callback(null, {message: data_server})
}

function main() {
    let server = new grpc.Server()
    server.addService(proto.Greeter.service, {getStudents : getStudents})
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();