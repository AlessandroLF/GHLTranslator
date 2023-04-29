const http = require("http");
const path = require("path");
const fs = require("fs");
const index = require("./index");

const server = http.createServer((req, res) => {
    let contentType = "text/html";
    const params = req.url.split('/');
    console.log("Request: " + params);
    switch(params[1]){

      case "translator.js":
        fs.readFile(path.join(__dirname, 'logger.js'), (content) => {
          res.end(content, "utf8");
        });
        break;

      case "login":;
        index(res, req.headers.origin);
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
              fs.readFile(path.join("public", "404.html"), (err, content) => {
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
      
    }
  });
  
  const PORT = process.env.PORT || 5000;
  
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));