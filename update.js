const StudentModel = require('./StudentModel');

// update 方法接收2个参数，第一个是查询条件，第二个是修改的值
// 下面把name为lisi的记录，将他的age修改为80
StudentModel.update({name: 'lisi'}, {age: 80}).then(result => {
    console.log(result)
})
