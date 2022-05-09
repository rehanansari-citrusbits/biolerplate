var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());   
app.post('/hello', function (req, res) {  
    console.log(req.body);
  var name = req.body.username
  res.send('Hello ' + name);  
});
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});