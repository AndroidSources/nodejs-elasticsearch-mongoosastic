/**
 * Created by Gowtham Chandrasekar on 22-03-2017.
 */

var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');


// Schema defines how the user's data will be stored in MongoDB
var BrandsSchema = new mongoose.Schema({
    name: {type: String, es_indexed: true},
    form: {
        type: String
    }
}, {collection: 'brands'});

BrandsSchema.plugin(mongoosastic,{
    hosts:[
        'localhost:9200'
    ]
});


module.exports = mongoose.model('Brands', BrandsSchema);

