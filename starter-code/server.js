// SERVER-SIDE JAVASCRIPT
// run npm install to install all required packages before starting server

var express = require('express');
var app = express();
artworks = [{title:"tree" , artist:"sherri" ,dicription:"watercolor" },{title:"bee" , artist:"notsherri" ,dicription:"no disc" }];

// MIDDLEWARE
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Allow CORS:
// not necessary since we'll be making requests from a js file
  // that we are also serving (as static assets in public)
// app.use(function(request, response, next) {
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// ROUTES
// Root Route
app.get('/',function(req,res){
   res.sendFile(__dirname + "/views/index.html");
});


// Gallery View Route



// The Number Guessing Game
 var magicNumber = 20;
function match(picked){
  var msg="";
  if(picked > magicNumber) { msg = " You picked higher";}
   else if(picked < magicNumber) { msg= " You picked lower";}
   else {msg = "You picked right"};
   return msg;
}
function update(picked){
  if(+picked != NaN)
    magicNumber = picked;
    return 'new number is '+magicNumber;
}

app.get('/api/guess',function(request,response){
   var picked = +request.query.number;
   response.send(match(picked));
});

app.post('/api/guess',function(request,response){
   var picked = request.body.number;
   console.log(picked)
    response.send(update(picked));
});
// Gallery
app.get('/api/artworks',function(request,response){
   response.json(artworks);
})

app.post('/api/artworks',function(request,response){
  var piece = {title: request.body.title , artist : request.body.artist , dicription:request.body.disc }
     artworks.push(piece);
   response.json(artworks);

})

// SERVER START
var port = 3000;
app.listen(port, function(){
  console.log('Server Running at localhost:3000/');
});
