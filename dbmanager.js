const {Client} = require('pg')
const fs = require('fs')

const dburl = 'postgres://sandromclombardo:wkf6YfXtz40ixlhMvWd6esUySfYRTzBO@dpg-cg81l8l269vf27e3i4eg-a.oregon-postgres.render.com/gohighwhatsdbmaster';

const getDB = ()=>{
    const db = new Client({
        connectionString: dburl,
        ssl:{rejectUnauthorized: true}
    });
    db.connect();
    return  db;
}



module.exports.clientLogin = async(req, res){
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
        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.end('console.log("Error")');
    }
    
    db.end();
    return arr.includes(req.headers.origin);
}

module.exports.getDic = async()=>{
    fs.readFile(path.join(__dirname,  'translation.json'), (err, content1) => {
        fs.readFile(path.join(__dirname,  'translation.json'), (err, content2) => {
            db = getDB();
            const query = "insert into dictionaries (id , dic , dicInv) values ('es', '" + content1 + "', '" + content2 + "' );";
            var res = await db.query(query);
            console.log(res);
            db.end();
        }
    });
    

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