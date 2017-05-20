/**
 * Created by gowtham on 03-05-2017.
 */
var Brands = require('../app/models/brands');


const drugHistoryAnalysisController = {};


drugHistoryAnalysisController.postNewBrand = function (req, res) {


    if (!req.body.name) {
        res.json({success: false, message: 'Please enter name name.'});
    } else {
        var newBrand = new Brands({
            name: req.body.name,
            form: req.body.form
        });

        // Attempt to save the user
        newBrand.save(function (err) {
            if (err) {
                return res.json({success: false, message: err.message});
            }
            res.json({success: true, message: 'Successfully created new brans.'});
            newBrand.on('es-indexed', function (err, res) {
                if (err) throw err;
                console.log("inserted data is indexed");
            });
        });
    }

};


module.exports = drugHistoryAnalysisController;