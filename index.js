var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var list = new Array();
var id = 1;

app.set('port', (process.env.PORT || 5000));


app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: false
}));


//Save a list item
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


//Get all the items in the list
app.get('/', function(req, response) {
    response.setHeader('Content-Type', 'application/json');
    response.header('Access-Control-Allow-Origin', '*');

    if(list.length){
      response.end(JSON.stringify(list));
    }else{
      response.end('Nothing yet ... but soon');
    }
});


//Get list item by id
app.get('/:id', function(req, response) {
    response.header('Access-Control-Allow-Origin', '*');


    //Lookup the item in the list
    var lookup = {};
    for (var i = 0, len = list.length; i < len; i++) {
        lookup[list[i].id] = list[i];
    }

    if(lookup[req.params.id]){
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(lookup[req.params.id]));
    }else{
      response.status(404);
      response.end();
    }
});


app.post('/:id', function(req, response) {
    response.header('Access-Control-Allow-Origin', '*');

    var checked = req.body.checked || false;

    //Lookup the item in the list
    var lookup = {};
    for (var i = 0, len = list.length; i < len; i++) {
        lookup[list[i].id] = list[i];
    }

    lookup[req.params.id].checked = checked;

    response.status(204);
    response.end();
});


app.delete('/:id', function(req, response) {
    response.header('Access-Control-Allow-Origin', '*');

    list = list.filter(function(el) {
        return el.id != req.params.id;
    })


    response.status(204);
    response.end();
})

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
