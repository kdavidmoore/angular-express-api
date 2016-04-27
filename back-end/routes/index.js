var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/electric';
var db;
// removed router.get because we will never use it for this app
// create a connection to mongo
mongoClient.connect(mongoUrl, function(error, database){
	db = database;
});

// if someone puts /search into the address bar, render all cars as the result
router.get('/search', function(req, res, next) {
	db.collection('cars').find().toArray(function(error, result){
		res.json(result);
	});
});

router.post('/search', function(req, res, next) {
	var myCar = req.body.name;
	if (req.body.name.length < 1){
		res.status(500);
		return res.render('User input error.');
	}
	// query the electric database
	db.collection('cars').find({name: myCar}).toArray(function(error, result){
		if (result.length < 1){
			db.collection('cars').insertOne({name: myCar});
			db.collection('cars').find({name: myCar}).toArray(function(error, result2){
				res.json(result2);
			});
		} else {
			res.json(result);
		}
	});
});

module.exports = router;
