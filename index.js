const {Translate} = require('@google-cloud/translate').v2;
const path = require("path");

module.exports = async(res,)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { "Content-Type": 'text/html' });
    res.end('Hello world');
}