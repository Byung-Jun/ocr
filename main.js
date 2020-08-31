var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
  var rtn = "";
function templateHTML(title, list, body, control){

      return `
  <!doctype html>
  <html>
  <head>
    <title>OCR Tester</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">Input Image Url</a></h1>
    <form action="/create" method="post">
           <p>
              <textarea name="description" placeholder="Input imageURL"></textarea>
            </p>
            <p> Example URL
            </p>
            <p> https://raw.githubusercontent.com/Byung-Jun/ocr/master/dream.jpg
            </p>
            <p>
              <input type="submit">
            </p>
    </form>
  </body>
  </html>
  `;
}
var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if(pathname === '/'  ){
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var template = templateHTML();
          response.writeHead(200);
          response.end(template);
        });
  }
  if(pathname === '/create'){
    var body = "";
    request.on('data', function(data){
      body = body + data
    });
          request.on('end', function(){
          var post = qs.parse(body);
          var title = post.title;
          var description = post.description;
          console.log(description);
  //image url
  var ocrUrl = 'https://9bae41e4b0354e8abbf7078e48f3b0b8.apigw.ntruss.com/custom/v1/3566/f683b34cc0de2187d754f445e6d467b812b1a53929842ec699673c812cf9ce95/general';

  console.log(pathname);
//if(pathname == ""){}
  var req = require('request');
  var jsonDataObj = {
    "images": [
      {
        "format": "JPG",
        "name": "bjPark",
        "url": description
      }
    ],
    "requestId": "test",
    "timestamp": 0,
    "version": "V1"
};

req.post({
  headers: {'Content-Type': 'application/json', 'X-OCR-SECRET': 'cVluWmR2YnhlcXpSanlsb1FzY2lPVlF2WndxSFpMTkE='},
  url : ocrUrl,
  body: jsonDataObj,
  json: true
}, function(error, res, body){
var str = "";
for(idx in body.images[0].fields){
  str += body.images[0].fields[idx].inferText + " ";
    //console.log(body.images[0].fields[idx]);
};
rtn = `
  <!doctype html>
  <html>  
  <head>
    <meta charset="utf-8">
  </head>
  <body>
<img src="`;
rtn += description;
rtn += `" alt="OCR Image">
  <p>입력한 URL Image에서 나온 TEXT</p><p>`;
rtn += str;
rtn += `  </p></body>
  </html>`;
console.log(rtn);
    response.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
    response.end(rtn);
});
      });
  }

});
app.listen(3000);
