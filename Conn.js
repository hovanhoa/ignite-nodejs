const IgniteClient = require('apache-ignite-client');
const IgniteClientConfiguration = IgniteClient.IgniteClientConfiguration;

const igniteClient = new IgniteClient();

async function IgniteConnection() {
    try {
        await igniteClient.connect(new IgniteClientConfiguration('127.0.0.1:10800', '127.0.0.1:10801', '127.0.0.1:10802'));
        return igniteClient
    } catch (e) {
        console.error
        return
    }
}
IgniteConnection()

module.exports = igniteClient
