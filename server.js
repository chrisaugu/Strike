// Include required libs
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
var upload = require("express-upload");

var upload_file = require("./file_upload.js");
// var upload_image = require("./image_upload.js");
// var upload_video = require("./video_upload.js");

var app = express();

app.use(express.static(__dirname + "/"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// File POST handler.
app.post("/file_upload", function(req, res) {
  upload_file(req, function(err, data) {

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }

    res.send(data);
  });
});

// Image POST handler.
app.post("/image_upload", function(req, res) {
  upload_image(req, function(err, data) {

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }

    res.send(data);
  });
});

// Video POST handler.
app.post("/video_upload", function(req, res) {
  console.log(req)
  
  if (req.files) {
    console.log(req.files);
    var file = req.files.file;
    var filename = file.name;
    console.log(filename);

    file.mv("./uploads" + filename, function(err) {
      if (err) {
        res.send(err);
      }
      else {
        res.send("File uploaded");
      }
    })
  }

  // upload_video(req, function(err, data) {

  //   if (err) {
  //     return res.status(404).end(JSON.stringify(err));
  //   }

  //   res.send(data);
  // });
});

// Create folder for uploading files.
var filesDir = path.join(path.dirname(require.main.filename), "uploads");

if (!fs.existsSync(filesDir)){
  fs.mkdirSync(filesDir);
}

// Init server.
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});