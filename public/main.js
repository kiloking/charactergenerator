$(function() {
  const btn = document.querySelector('#generate')
  const app = document.querySelector('#app')
  const usernameInput = document.querySelector('.username')
  const jobSelect = document.querySelector('#jobSelect')
  const moneyArray =[50,500,5000,50000,500000]
  // const loginPage = document.querySelector('.login.page')
  // const characterPage = document.querySelector('.character.page')
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    '#FFFF7F', '#B7B3FF', '#FFEFB3', '#FFFFCC',
    '#58dc00', '#DBFFB3', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#D1BDFF', '#FFB3FF', '#FFE5FF'
  ];
  var $loginPage = $('.login.page'); // The login page
  var $characterPage = $('.character.page'); // The chatroom page
  var $usernameInput = $('.username'); // Input for username
  var $phoneInput = $('.phone'); // Input for phone
  var $trueName = $('.trueName') //裝真實姓名
  var $window = $(window);
  var $messages = $('.messages');
  var $inputMessage = $('.inputMessage');
  var $enter = $('.enter')
  var username;
  var trueName;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  var $currentInput = $usernameInput;
  var currentBallId;
  let character = {};

  //data array
  //特效 / 合成 / PM / 動畫 / 美術 / 導演 / 研發 / 行政 / 創辦人 / 行銷 / 設計
  //'特效師' , '合成師' , 'PM' , '動畫師' , '美術師' , '導演' , '研發工程師' , '行政', '創辦人', '行銷人' , '設計師'
  // const jobArray=['合成師','特效師','PM','創辨人','概念設計師','工程師','建模師','動畫師','會計師','人力資源','廣告分析師','資料科學家']
  const jobArray=['特效師' , '合成師' , 'PM' , '動畫師' , '美術師' , '導演' , '研發工程師' , '行政', '創辦人', '行銷人' , '設計師']
  const nameArray =['安柳','雪雁','靜蝶','孤巧','聽薇','惜白','思風','綺香','元陽','依香','盼翠','白蝶','水風','妙蓉','寄綠','夏蓮','雪蓮','笑楓','飛南','若晴','青柳','安霜','水玉','白柔','曉槐','飛瑤','尋芙','天雲','飛天','易芙','妙蓉','尋云','迎夏','曉薇','綺芙','秋竹','宛旋','夢之','平珍','紫晴','恨風','又夏','寒丹','夢薇','凌薇','碧亦','之荷','夏筠','涵梅','憶萱','冷絲','寄夏','憶蝶','冷靈','傲蓮','新兒','春芹','冰琴','碧曼','海安','凡嵐','問柏','香南','聽菡','之容','念萱','思白','恨天','映絲','翠靈','曼卉','芷煙','宛安','千天','香嵐','以柳','癡風','青文','醉煙','凝夢','又香','念綠','懷夏','半絲','映雁','雁文','問香','樂香','采凡','慕翠','孤菱','夜嵐','憐凝','采芙','盼芙','含蝶','詩雁','凌荷','問嵐','友易','依香','之夢','碧霜','靜青','白芹','覓雁','白亦','沛雙','紫秋','傲薇','春雙','谷巧','雪翠','秋夏','冰蕾','若凡','向之','覓綠','凌春','雅陽','映露','凝冬','冬容','香文','念霜','恨冬','傲珍','紫文','平春','沛巧','碧靈','秋蓮','曼芹','盼綠','谷春','憶曼','映雁','懷巧','語曼','綠山','含曼','幻波','樂容','書波','映蘭','冬荷','妙山','碧凡','平卉','飛桃','飛嵐','幼琴','代芹','寒凝','尋翠','醉天','依萍','念蕾','天卉','尋芙','尋易','山旋','芷蓉','南翠','巧雲','慕易','又海','懷夏','映安','慕兒','爾蕾','凡靈','巧雁','詩青','惜陽','雁芹','采云','惜綠','芷蓉','之青','香薇','新之','冬梅','元菱','采雪','慕巧','安晴','尋嵐','爾旋','從翠','念蕊','之山','亦風','曉文','詩桃','憐琴','千綠','迎真']
  const skillArray =['吃超多零食','偷懶' , '路過廁所', '泡冰滴咖啡', '提早到公司', '照顧小孩', '跟狗說話', '跟貓說話', '什麼都來不及','總是停得到汽車位','常常加班', '下午茶不會被幹走','想到爛點子','上班一年沒換過座位','很會罵髒話','老是忘記密碼','出門就會下雨','頭上的冷氣不會滴水','上廁所都有位置','得到兩份下午茶','下午茶沒有點也吃得到','不用當值日生','忽然被加薪','被貓包圍','絕對不會踢到狗','偷懶不會被發現','']
  console.log('skill:' +skillArray.length)
  console.log('name:' +nameArray.length)
  console.log('job:' +jobArray.length)
  function chackAccount(e){
    $.ajax({
      url: 'data.json',
      type: 'GET',
      beforeSend:function(){
        $trueName.empty();
      },
      error: function(xhr) {
        alert('Ajax request 發生錯誤');
      },
      success: function(response) {
          // console.log(e)
          var dataPhoneArray = []
          for (let i = 0; i < response.length; i++) {
            const element = response[i];
            // console.log(element)
            dataPhoneArray.push(element.phone)
            if(element.phone == e){
              console.log( element.phone  +  element.name)
              trueName = element.name
              $trueName.append(element.name)
              $trueName.css('padding', '10px 15px')
            }
          }
          // console.log(dataPhoneArray)
          if(dataPhoneArray.indexOf(e) == -1){
            $trueName.append('這個號碼不存在')
            $trueName.css('padding', '10px 15px')
          }
      }
    });
  }
/*
按照手機號碼輸入後 取得身分 再產生遊戲角色資料
把角色資料回存到本人的表裡面\
*/

  function randomUsernameInput(){
    let index = Math.floor(Math.random()*nameArray.length);
    usernameInput.value = nameArray[index]
  }
  randomUsernameInput()

  function generateCharacter(){
    console.log(moneyArray)
    var index = Math.floor(Math.random()*moneyArray.length);
    // var skillindex = Math.floor(Math.random()*skillArray.length);
    console.log(index)

    var res = getArrayItems(skillArray,3)
    character.name = usernameInput.value
    character.truename = trueName
    character.job = jobArray[jobSelect.value]
    character.level = getRandom(99)
    character.vit =  getRandom(16)
    character.int =  getRandom(16)
    character.str =  getRandom(16)
    character.agi =  getRandom(16)
    character.dex =  getRandom(16)
    character.luk =  getRandom(16)
    character.skill1=  res[0]
    character.skill2=  res[1]
    character.skill3=  res[2]
    character.money =  getRandom(moneyArray[index])

    return character

  }
  function generateCharacterCard(obj){
    console.log(obj)

    var namehtml = '';
    namehtml +=  '<div class="block">'
    namehtml +=  '<div class="name">'+obj.name + '<span class="truename">{'+obj.truename + '}</span></div>'
    namehtml +=  '<div><span class="prop-title">職業</span>'+obj.job + '</div>'
    namehtml +=  '<div><span class="prop-title">等級</span>'+obj.level + '</div>'
    namehtml +=  '</div>'
    namehtml +=  '<div class="block">'
    namehtml +=  '<div ><span class="prop-title">體力</span>'+obj.vit + '</div>'
    namehtml +=  '<div ><span class="prop-title">智力</span>'+obj.int + '</div>'
    namehtml +=  '<div ><span class="prop-title">力量</span>'+obj.str + '</div>'
    namehtml +=  '<div ><span class="prop-title">敏捷</span>'+obj.agi + '</div>'
    namehtml +=  '<div ><span class="prop-title">靈巧</span>'+obj.dex + '</div>'
    namehtml +=  '<div ><span class="prop-title">幸運</span>'+obj.luk + '</div>'
    namehtml +=  '</div>'
    namehtml +=  '<div class="block">'
    namehtml +=  '<div>技能</div>'
    namehtml +=  '<div>'+obj.skill1+'</div>'
    namehtml +=  '<div>'+obj.skill2+'</div>'
    namehtml +=  '<div>'+obj.skill3+'</div>'
    namehtml +=  '</div>'
    namehtml +=  '<div class="block">'
    namehtml +=  '<div><span class="prop-title">錢袋</span> '+obj.money+'元</div>'
    namehtml +=  '</div>'


    var card = document.createElement('div')
    card.classList.add('card')



    card.innerHTML = namehtml




    app.appendChild(card);
    // console.log(card)

  }

  btn.addEventListener('click' , ()=>{
    if(!trueName) return
    generateCharacter()
    setUsername(character)
    generateCharacterCard(character)
    // randomUsernameInput()
  })
  // phone
  $phoneInput.change(function(e){
    console.log(e.target.value)
    chackAccount(e.target.value)
  })

  //help
  //隨機範圍取數1~x
  function getRandom(x){
    return Math.floor(Math.random()*x)+1;
  };

function getArrayItems(arr, num) {
  //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
  var temp_array = new Array();
  for (var index in arr) {
      temp_array.push(arr[index]);
  }
  //取出的数值项,保存在此数组
  var return_array = new Array();
  for (var i = 0; i<num; i++) {
      //判断如果数组还有可以取出的元素,以防下标越界
      if (temp_array.length>0) {
          //在数组中产生一个随机索引
          var arrIndex = Math.floor(Math.random()*temp_array.length);
          //将此随机索引的对应的数组元素值复制出来
          return_array[i] = temp_array[arrIndex];
          //然后删掉此索引的数组元素,这时候temp_array变为新的数组
          temp_array.splice(arrIndex, 1);
      } else {
          //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
          break;
      }
  }
  return return_array;
}



  var socket = io();

  const addParticipantsMessage = (data) => {
    console.log(data)
    var message = '';
    if (data.numUsers === 1) {
      message += "有1位參與者";
    } else {
      message += "有 "  + data.numUsers + " 參與者";
    }

    log(message);
  }

  // $usernameInput.focus()

  // Sets the client's username
  const setUsername = (character) => {
    console.log(character)
    username = character.name

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $characterPage.css('display', 'flex')
      $loginPage.off('click');
      // $currentInput = $inputMessage.focus();
      // Tell the server your username
      socket.emit('add user', character);
      socket.emit('create user', character)
    }
  }

  // Sends a chat message
  const sendMessage = () => {
    var message = $inputMessage.val();
    // Prevent markup from being injected into the message
    message = cleanInput(message);
    // if there is a non-empty message and a socket connection
    if (message && connected) {
      $inputMessage.val('');
      addChatMessage({
        username: username,
        message: message
      });
      // tell server to execute 'new message' and send along one parameter
      socket.emit('new message', message);
    }
  }

  // Log a message
    const log = (message, options) => {
    var $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }

  // Adds the visual chat message to the message list
  const addChatMessage = (data, options) => {
    // Don't fade the message in if there is an 'X was typing'
    var $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    var $usernameDiv = $('<span class="username"/>')
      .text(data.username +' ')
      .css('color', getUsernameColor(data.username));
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    var typingClass = data.typing ? 'typing' : '';
    var $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv, options);
  }

  // Adds the visual chat typing message
  const addChatTyping = (data) => {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  const removeChatTyping = (data) => {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)
  const addMessageElement = (el, options) => {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  const cleanInput = (input) => {
    return $('<div/>').text(input).html();
  }

  // Updates the typing event
  const updateTyping = () => {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(() => {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  const getTypingMessages = (data) => {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }

  // Gets the color of a username through our hash function
  const getUsernameColor = (username) => {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  // Keyboard events

  $window.keydown(event => {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      // $currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        // setUsername();
      }
    }
  });
  $enter.click(event =>{
    if (username) {
      sendMessage();
      socket.emit('stop typing');
      typing = false;
    } else {
      // setUsername();
    }
  })

  $inputMessage.on('input', () => {
    updateTyping();
  });

  // Click events

  // Focus input when clicking anywhere on login page
  $loginPage.click(() => {
    // $currentInput.focus();
  });

  // Focus input when clicking on the message input's border
  $inputMessage.click(() => {
    $inputMessage.focus();
  });

  // Socket events

  // Whenever the server emits 'login', log the login message
  socket.on('login', (data) => {
    connected = true;
    currentBallId = data.id
    // Display the welcome message
    console.log(data)
    var message = "歡迎來到夢想 online – " +data.character.name;
    log(message, {
      prepend: true
    });
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', (data) => {
    addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body 別人加入
  socket.on('user joined', (data) => {
    console.log('user joined' + data.username)
    log(data.username + ' joined');
    addParticipantsMessage(data);

  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', (data) => {
    log(data.username + ' left');
    addParticipantsMessage(data);
    removeChatTyping(data);
  });

  // Whenever the server emits 'typing', show the typing message
  socket.on('typing', (data) => {
    addChatTyping(data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on('stop typing', (data) => {
    removeChatTyping(data);
  });

  socket.on('disconnect', () => {
    // log('你已離線。');
  });

  socket.on('reconnect', () => {
    log('已重新連接。');
    if (username) {
      socket.emit('add user', username);
    }
  });

  socket.on('reconnect_error', () => {
    log('嘗試重新連接失敗。');
  });

});



