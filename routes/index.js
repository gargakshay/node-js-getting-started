var express = require('express');
var multer  = require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  }
});

var upload = multer({ storage : storage }).any();

var csv = require('csvtojson');

var router = express.Router();

router.get('/', function(req, res, next){
    // res.sendFile('index.html');
    res.send("akshay");
});

router.post('/upload', function(req, res, next){

    upload(req, res, function(err) {

        if(err){
            res.sendStatus(400);
            return;
        }
        
        var arrFiles = req.files;
        var arrData = [];

        for(let i = 0; i < arrFiles.length; i++){
            //Converting CSV to JSON
            csv()
            .fromFile(arrFiles[i].path)
            .on("end_parsed", function(jsonObj){
                arrData.push({data: jsonObj, filename: arrFiles[i].originalname});
                
                // When file is last then send Response
                if(i == arrFiles.length - 1){
                    res.send(arrData);
                }
            })
            .on('error',(err)=>{
                res.sendStatus(400);
            });        
        }
    });
});

module.exports = router;