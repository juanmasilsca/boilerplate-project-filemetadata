var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }).single('upfile');
const fs = require('fs');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end('Error while uploading file...');
    }
    let byteArray = new Int8Array(req.file.buffer);
    console.log(byteArray);
    res.send(JSON.stringify({ name: req.file.originalname,
                type: req.file.mimetype,
              size: req.file.size, }));
  })
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
