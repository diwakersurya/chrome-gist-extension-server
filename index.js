var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var errorhandler = require("errorhandler");
var request=require("superagent");
var githubURL="https://github.com/login/oauth/access_token";
var app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/github_access", function ( req,res) {
	var codeToSend=req.query.code;//temporary code provided by github to get the access token
	request.post(githubURL)
		  .send({ client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET, code: codeToSend })
		  .set('Accept', 'application/json')
		  .end(function(errInternal, resInternal){
		    if (errInternal) {console.log(errInternal); return }
		    //here is the acces token
			return res.json({access_token:resInternal.body.access_token});
		  });
});

app.get("/", function ( req,res) {
	return res.json({result:"wroking properly"});
});
app.use(errorhandler());

app.listen(process.env.PORT || 4567, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

 