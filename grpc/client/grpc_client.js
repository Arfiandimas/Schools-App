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
    let data =  [
        {nama : 'Barjono', nim : '17.11.1018'},
        {nama : 'Lahh', nim : '17.11.1019'}
    ]
    client.getStudents({halah: data}, function (err, response) {
        console.log(response)
    })
}

main()