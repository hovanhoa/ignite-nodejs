const IgniteClient = require('apache-ignite-client');
const IgniteClientConfiguration = IgniteClient.IgniteClientConfiguration;

const igniteClient = new IgniteClient();

async function IgniteConnection() {
    try {
        const igniteClientConfiguration = new IgniteClientConfiguration('adf7cbef-ec9a-4104-b448-0bdd83448090.gridgain-nebula.com:10800').
        setUserName('user').
        setPassword('password').
        setConnectionOptions(true);

        await igniteClient.connect(igniteClientConfiguration);
        return igniteClient
    } catch (e) {
        console.error
        return
    }
}
IgniteConnection()

module.exports = igniteClient
