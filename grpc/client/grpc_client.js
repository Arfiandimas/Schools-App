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

function main() {
    target = 'localhost:50051';
    let client = new proto.Greeter(target,grpc.credentials.createInsecure());

    client.getStudents({}, function (err, response) {
        console.log(response)
    })
}

main()