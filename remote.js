const StudentModel = require('./StudentModel');

// delete 方法接收1个参数，就是查询条件
// 下面把name为lisi的记录删除
StudentModel.remove({name:'lisi'}).then((result) => {
    console.log(result);
});
