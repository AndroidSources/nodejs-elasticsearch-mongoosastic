var User = require('../app/models/user');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/main');


// Bring in defined Passport Strategy
require('../config/passport')(passport);

const userController = {};
/* GET users listing. */
userController.registerUser = function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, message: 'Please enter email and password.'});
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });

        // Attempt to save the user
        newUser.save(function (err) {
            if (err) {
                return res.json({success: false, message: 'That email address already exists.'});
            }
            res.json({success: true, message: 'Successfully created new user.'});
        });
    }

};


userController.autheticateUser = function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.send({success: false, message: 'Authentication failed. User not found.'});
        } else {
            // Check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 10080 // in seconds
                    });
                    res.json({
                        success: true, data: {
                            token: 'JWT ' + token,
                            user: user
                        }
                    });
                } else {
                    res.send({success: false, message: 'Authentication failed. Passwords did not match.'});
                }
            });
        }
    });
};


userController.getDashboard = function (req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');

};


//exporting the router so that it can be imported into app.js
module.exports = userController;
