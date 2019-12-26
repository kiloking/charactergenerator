var app = require('express')();
var express = require('express');
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// 導入mongoose 連接資料庫 建立Schema 連接model
let mongoose = require('mongoose');
let connection = require('./connection');
const StudentSchema = require('./StudentSchema');
const StudentModel = require('./StudentModel');

app.use(express.static(path.join(__dirname, 'public')));

var numUsers = 0;
io.on('connection', function(socket){
  var addedUser = false;


  socket.on('add user' , (character) =>{
    if(addedUser) return;

    socket.username = character.name;
    ++numUsers;
    addedUser = true;
    socket.emit('login' ,{
      id : socket.id,
      character: character,
      numUsers : numUsers
    })
    socket.broadcast.emit('user joined' , {
      username: socket.username,
      id : socket.id ,
      numUsers:numUsers
    })
  })
  socket.on('create user' , (character)=>{
    //檢查重複名字 沒重複就新建
    // console.log(StudentModel.find({truename: character.truename}).exec())
    StudentModel.findOne({truename: character.truename},function(err,data){
      if(err){
        console.log(err)
      }
      // console.log(data)
      if(data === null){
        console.log('data null')
        let studentDoc = new StudentModel({
          name:character.name,
          truename: character.truename,
          job: character.job,
          level: character.level,
          vit:  character.vit,
          int:  character.int,
          str:  character.str,
          agi:  character.agi,
          dex:  character.dex,
          luk:  character.luk,
          skill1: character.skill1,
          skill2: character.skill2,
          skill3: character.skill3,
          money: character.money,
        })
        studentDoc.save().then((doc) => {
          console.log(doc)
        })
      }else{
        console.log(data)
        StudentModel.updateOne({truename: character.truename}, {name: character.name}).then(result => {
          console.log(result)
        })
      }
    })
  })

  socket.on('new message' ,(data) => {
    socket.broadcast.emit('new message' ,{
      username:socket.username,
      message:data
    })
  })


  socket.on('typing' , ()=>{
    socket.broadcast.emit('typing' ,{
      username:socket.username
    })
  })

  socket.on('stop typing' , () =>{
    socket.broadcast.emit('stop typing',{
      username:socket.username
    })
  })

  socket.on('disconnect' ,()=>{
    if(addedUser){
      --numUsers

      socket.broadcast.emit('user left' , {
        username: socket.username,
        numUsers: numUsers
      })
    }
  })
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});