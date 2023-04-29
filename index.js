const path = require("path");
const fs = require("fs");

const users = ['https://app.mymarketing.vip'];

module.exports = async(res, origin, t)=>{
    console.log(origin);
    if (users.includes(origin)){
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
    }
}