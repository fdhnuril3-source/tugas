var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
    res.render('kipk',
        {
            judul:'pkartu indonesia pintar'
        });
});

module.exports = router