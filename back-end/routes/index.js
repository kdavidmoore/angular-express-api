var express = require('express');
var router = express.Router();

// removed router.get because we will never use it for this app

router.post('/search', function(req, res, next) {
	res.json({
		message: "success"
	});
});

module.exports = router;
