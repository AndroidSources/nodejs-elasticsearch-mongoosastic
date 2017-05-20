const basicController = {};

basicController.get = function (req, res) {
    res.json({
        message: 'Welcome to our API!'
    });
};

//exporting the router so that it can be imported into app.js
module.exports = basicController;
