// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Measure', new Schema({ 
    name: String, 
    owner : { type: Schema.Types.ObjectId, ref: 'User' },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now},
    fp_lines: [],
    total_fps: Number
}));