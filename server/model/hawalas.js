const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var hawalaSchema = new Schema({
    nameOne: {
        type: String,
        required: true,
        trim: true
    },
    nameOnePhone: {
        type: Number,
        trim: true
    },
    nameTwo: {
        type: String,
        required: true,
        trim: true
    },
    nameTwoPhone: {
        type: Number,
        required: true,
        trim: true
    },
    nameTwoAddress: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    currency:{
        type: String,
        default: "$",
        trim: true
    },
    sherfiOne:{
        type: Number,
        trim: true,
        required: true
    },
    sherfi: {
        type: String
    },
    payed: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        default: function(){
            var months = ["Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var d = new Date();
            return `${d.getDate()}-${months[d.getMonth()]}-${d.getFullYear()}   ${d.getHours()}:${d.getMinutes()}`;
        }
    }
});

var Hawala = mongoose.model("Hawala", hawalaSchema);
module.exports = {Hawala};