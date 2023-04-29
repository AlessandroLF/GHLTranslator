const path = require("path");
const fs = require("fs");

const users = ['https://app.mymarketing.vip'];

module.exports = async(res, origin)=>{
    res.setHeader('Access-Control-Allow-Origin', 'https://app.mymarketing.vip');
    res.writeHead(200, { "Content-Type": "text/javascript" });
    if (users.includes(origin)){
        console.log(origin + ' logged in');
        fs.readFile(path.join(__dirname, 'translator.js'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            } else {
            res.writeHead(200, { "Content-Type": "text/javascript" });
            res.end(content, "utf8");
            }
        });
    }else{
        console.log(origin + ' tried to login');
        res.end('console.log("compra");');
    }
}