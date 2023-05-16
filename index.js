const path = require("path");
const fs = require("fs");
const dbman = require("./dbmanager");

module.exports = async(res, origin, t)=>{
    
    const db = dbman.getDB();
    db.connect()
    const query = "select url from clients;";
    var res = await db.query(query);
    var users = [];
    res.rows.forEach(row => {
        users.push(row.url);
    });
    
    if (users.includes(origin)){
        res.setHeader('Access-Control-Allow-Origin', origin);
        console.log(origin + ' logged in');
        res.writeHead(200, { "Content-Type": "text/javascript" });
        fs.readFile(path.join(__dirname, t), (err, content) => {
            if (err) {
                console.log(err);
            } else {
                res.end(content);
            }
        });
    }else{
        console.log(origin + ' tried to login');
        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.end('console.log("Error")');
    }
    db.end();
}