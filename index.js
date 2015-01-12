var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var list = new Array();
var id = 1;

app.set('port', (process.env.PORT || 5000));


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function(request, response) {
    response.send('Hy');
});

app.post('/', function(req, response) {
    var name = req.body.name;

    response.setHeader('Content-Type', 'application/json');
    response.header('Access-Control-Allow-Origin', '*');

    console.log(req.body);

    list.push({
        id: id,
        text: 'Test'
    });

    response.end(JSON.stringify(list));
    id++;
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
