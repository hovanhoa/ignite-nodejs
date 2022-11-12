var conn = require('../Conn')
const COUNTRY_CACHE_NAME = 'Country';
const IgniteClient = require('apache-ignite-client');

const SqlFieldsQuery = IgniteClient.SqlFieldsQuery;
const countryCache = conn.getCache(COUNTRY_CACHE_NAME);

exports.getAll = async function () {
    const cursor =  await countryCache.query(new SqlFieldsQuery(
        'SELECT * FROM City'
    ));
    
    var result = []
    do {
        let row = await cursor.getValue();
        console.log(row)
        result.push({'name': row[0], 'population': row[1]});
    } while (cursor.hasMore());
    return result;
};
