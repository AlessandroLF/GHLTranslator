const {Client} = require('pg')

const dburl = 'postgres://sandromclombardo:wkf6YfXtz40ixlhMvWd6esUySfYRTzBO@dpg-cg81l8l269vf27e3i4eg-a.oregon-postgres.render.com/gohighwhatsdbmaster';
const getDB = ()=>{
    return new Client({
        connectionString: dburl,
        ssl:{rejectUnauthorized: true}
    })
}

module.exports.getDic = async(req)=>{
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    var data = Buffer.concat(buffers).toString();
    data = JSON.parse(data);

    db = getDB();
    db.connect()
    const query = "create table dictionaries (id char(2), dic json, dicInv json);";
    var res = await db.query(query);
    db.end();

    return{'res': res}
}

module.exports.delClient = async(req)=>{
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    var data = Buffer.concat(buffers).toString();
    data = JSON.parse(data);

    db = getDB();
    db.connect()
    const query = "delete from clients where url='" + data.url + "';";
    var res = await db.query(query);
    db.end();

    return {'rowCount': res.rowCount};
}

module.exports.getClients = async()=>{
    db = getDB();
    db.connect()
    const query = "select * from clients";
    var res = await db.query(query);
    db.end();
    return res.rows;
}

module.exports.signUpClient = async(req)=>{
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    var data = Buffer.concat(buffers).toString();
    data = JSON.parse(data);

    db = getDB();
    db.connect()
    const query = "insert into clients (url, type) values ('" + data.url + "', 1)";
    var res = await db.query(query);
    db.end();
    return {'rowCount': res.rowCount};
}

module.exports.login = async(req)=>{
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    var data = Buffer.concat(buffers).toString();
    console.log(data);
    data = JSON.parse(data);
    return data.uname === 'adminadmin2435' && data.passwd === 'password#3425';
}