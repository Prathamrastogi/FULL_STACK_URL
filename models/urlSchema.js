const mongoose = require('mongoose');
var { nanoid } = require('nanoid');


const Schema = mongoose.Schema;

const shortUrlSchema = new Schema({
    url_name : {
        type :String,
        require: true
    },
    short_url:{
        type :String,
        require: true,
        default: () => nanoid().substring(0,8)
    },clicks:{
        type:Number,
        require: true,
        default :0
    }
},{
    timestamps: true
})

module.exports = mongoose.model('shorturl',shortUrlSchema)