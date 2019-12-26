// insert.js file
let mongoose = require('mongoose');

// 导入连接模块
let connection = require('./connection');

// 创建schema
let StudentSchema = new mongoose.Schema({
   name: String,
   age: Number
})

// 通过connection和schema创建model
let StudentModel = connection.model('Student', StudentSchema);

// create
// 通过实例化model创建文档
let studentDoc = new StudentModel({
    name: 'lisi',
    age: 20
})

// 将文档插入到数据库，save方法返回一个Promise对象。
studentDoc.save().then((doc) => {
    console.log(doc)
})
