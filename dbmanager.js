const {Client} = require('pg');
const fs = require("fs");
const path = require("path");

const dburl = 'postgres://sandromclombardo:wkf6YfXtz40ixlhMvWd6esUySfYRTzBO@dpg-cg81l8l269vf27e3i4eg-a.oregon-postgres.render.com/gohighwhatsdbmaster';

const getDB = ()=>{
    const db = new Client({
        connectionString: dburl,
        ssl:{rejectUnauthorized: true}
    });
    db.connect();
    return  db;
}

module.exports.clientLogin = async(req, res)=>{
    const db = getDB();
    const query = "select url from clients;";
    var users = await db.query(query);
    var arr = [];
    users.rows.forEach(row => {
        arr.push(row.url);
    });
    if(arr.includes(req.headers.origin)){
        console.log(origin + ' logged in');
        res.setHeader('Access-Control-Allow-Origin', origin);
    }else{
        res.setHeader('Access-Control-Allow-Origin','');
        console.log(origin + ' tried to login');
    }
    
    db.end();
    return arr.includes(req.headers.origin);
}

const readJsonFile = async(filePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        } else {
          try {
            resolve(data);
          } catch (parseError) {
            reject(parseError);
          }
        }
      });
    });
}

module.exports.getDic = async()=>{

    var data1 = await readJsonFile(path.join(__dirname,  'translation.json'));
    var data2 = await readJsonFile(path.join(__dirname,  'translationInv.json'));

    console.log(data1);
    db = getDB();
    const query = "insert into dictionaries (id , dic , dicInv) values ('es', '" + data1 + "', '" + data2 + "' );";
    const res = await db.query(query);
    console.log(res);
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
    const query = "delete from clients where url='" + data.url + "';";
    var res = await db.query(query);
    db.end();

    return {'rowCount': res.rowCount};
}

module.exports.getClients = async()=>{
    db = getDB();
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