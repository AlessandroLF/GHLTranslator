const {Translate} = require('@google-cloud/translate').v2;
const path = require("path");

module.exports = async(req, res, dic)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { "Content-Type": 'application/json' });
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    var data = Buffer.concat(buffers).toString();
    console.log(data);
    data = JSON.parse(data);
    console.log(data.text);
    var arr = [];
    if(dic[data.text]){
        console.log('saved!');
        arr.push({'translatedText': data.text});
    }else{
        const translator = new Translate({projectId:'untitled-dashboard-323223', keyFilename: path.join(__dirname, 'untitled-dashboard-323223-ba382242b771.json')});
        var translation = await translator.translate(data.text,'es');
        console.log(translation.text);
        dic[data.text] = translation.text;
        arr.push({'translatedText': translation.text});
    }
    console.log(dic);
    res.end(JSON.stringify(arr));
}