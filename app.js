const http = require("http");
const path = require("path");
const fs = require("fs");
const index = require("./index");
const dbman = require("./dbmanager");

const server = http.createServer(async(req, res) => {
    let contentType = "text/html";
    const params = req.url.split('/');
    console.log("Request: " + params);
    switch(params[1]){

      case "translator.js":
        res.writeHead(200, { "Content-Type": "text/javascript" });
        fs.readFile(path.join(__dirname, params[1]), (err, content) => {
          if(err){
            console.log(err);
          }
          res.end(content);
        });
      break;

      case 'getDic':
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, { "Content-Type": "application/json" });
        let dic = {'err': 'bad credentials'};
        if(await dbman.login(req)){
          dic = await dbman.getDic(req);
        }
        res.end(JSON.stringify(dic));
      break;

      case 'getClients':
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, { "Content-Type": "application/json" });
        let resp = {'err': 'bad credentials'};
        if(await dbman.login(req)){
          resp = await dbman.getClients(req);
        }
        res.end(JSON.stringify(resp));
      break;

      case "adminlogin":
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, { "Content-Type": "application/json" });
        var bol =  await dbman.login(req);
        console.log(bol);
        var login = {'res':bol};
        console.log('log: ' + JSON.stringify(login));
        res.end(JSON.stringify(login));
      break;

      case "customersugnup":
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, { "Content-Type": "application/json" });
        let signup = {'err': 'bad credentials'};
        if(await dbman.login(req)){
          signup = await dbman.signUpClient(req);
        }
        res.end(JSON.stringify(signup));
      break;

      case "admin":
        fs.readFile(path.join(__dirname, 'public', 'build', 'index.html'), (err, content) => {
          if(err){
            console.log(err);
          }
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content);
        });
      break;

      case "login":
        index(res, req.headers.origin, 'logger.js');
      break;
  
      default:
        let extname = path.extname(req.url);
        switch (extname) {
          case ".js":
            contentType = "text/javascript";
          break;
          case ".css":
            contentType = "text/css";
          break;
          case ".json":
            contentType = "application/json";
          break;
          case ".png":
            contentType = "image/png";
          break;
          case ".jpg":
            contentType = "image/jpg";
          break;
        }
  
        if (contentType == "text/html" && extname == "") req.url += ".html";
  
        fs.readFile(path.join(__dirname, 'public', req.url), (err, content) => {
          if (err) {
            if (err.code == "ENOENT") {
              fs.readFile(path.join("public", "404.html"), (content) => {
                  res.writeHead(404, { "Content-Type": "text/html" });
                  res.end(content, "utf8");
                }
              );
            }
            else{
              res.writeHead(500);
              res.end(`Server Error: ${err.code}`);
            }
          } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf8");
          }
        });
      //default
    }
  });
  
  const PORT = process.env.PORT || 5000;
  
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));