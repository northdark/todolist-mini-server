var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var list = new Array();
var id = 1;

app.set('port', (process.env.PORT || 5000));


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

app.post('/', function(req, response) {
    var text = req.body.text || 'untitled';
    var checked = req.body.checked || false;

    response.setHeader('Content-Type', 'application/json');
    response.header('Access-Control-Allow-Origin', '*');

    var todo = {
        id: id,
        text: text,
        checked: checked
    };

    list.push(todo);

    response.end(JSON.stringify(todo));

    id++;
});

app.get('/', function(req, response) {
    response.setHeader('Content-Type', 'application/json');
    response.header('Access-Control-Allow-Origin', '*');

    response.end(JSON.stringify(list));
});


app.get('/:id', function(req, response) {
    response.setHeader('Content-Type', 'application/json');
    response.header('Access-Control-Allow-Origin', '*');

    var lookup = {};
    for (var i = 0, len = list.length; i < len; i++) {
        lookup[list[i].id] = list[i];
    }

    response.end(JSON.stringify(lookup[req.params.id]));
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
