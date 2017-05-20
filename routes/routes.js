/**
 * Created by Gowtham Chandrasekar on 29-03-2017.
 */

var express = require('express');
var basicController = require('./../controllers/basicController');
var userController = require('./../controllers/userController');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var Brands = require('../app/models/brands');
var drugHistoryAnalysisController = require('./../controllers/drugHistoryAnalysisController');


// Bring in defined Passport Strategy
require('../config/passport')(passport);

const routes = express();

// Basic Routes
routes.get('/', basicController.get);

routes.get('/search/:name', function (req, res) {

    Brands.search({
        query_string: {
            query: req.params.name
        }
    }, function (err, results) {
        console.log(results);
        var data=results.hits.hits.map(function (hit) {
         return hit;
        });

        res.json({success: true, data: data});
    });
});

routes.post('/brands', drugHistoryAnalysisController.postNewBrand);
// User Routes
routes.post('/register', userController.registerUser);
routes.post('/authenticate', userController.autheticateUser);
routes.get('/dashboard', passport.authenticate('jwt', {session: false}), userController.getDashboard);

module.exports = routes;
