const mongoose = require('mongoose');

let StudentSchema = mongoose.Schema({
    name: String,
    truename: String,
    job: String,
    level: Number,
    vit:  Number,
    int:  Number,
    str:  Number,
    agi:  Number,
    dex:  Number,
    luk:  Number,
    skill1: String,
    skill2: String,
    skill3: String,
    money: Number,
})

module.exports = StudentSchema;
