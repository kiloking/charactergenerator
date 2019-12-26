const StudentModel = require('./StudentModel');

// 富查询条件，对象格式，键值对，下面为查询 name 为 lisi 的记录
StudentModel.find({name:'lisi'}).then(doc => {
    console.log(doc);
})
