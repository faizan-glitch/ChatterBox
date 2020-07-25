const socket = io('ws://localhost:5000');

  socket.on('connect', () => {
    socket.send('Hello!');
  });

  socket.on('message', data => {
    // show message on screen
    showInChat(data);

    //scroll down to see the message
    $("#"+data.roomname+"_messages").scrollTop($("#"+data.roomname+"_messages").prop('scrollHeight'));
  });


  //Sent messages
  function sendMessage(event, room_id, room_name) {
    let msg = document.getElementById(room_name+'_messaage').value;
    if(msg === '') {
      return;
    }
    // send message
    socket.emit('chatmsg', { user: userID , username: username, message : msg, time: Date.now() , roomname: room_name, roomID: room_id } );
    //empty msg feild
    event.target.message.value = '';
    event.target.message.focus();
    $('#such-empty-' + room_name).addClass('d-none');
    $('#such-empty-' + room_name).removeClass('d-flex');

  }

  function showInChat(data){
    console.log(data);
    
    let time = new Date(data.time);
    let current_time = time.toLocaleString('en-US',{hour:'numeric',minute:'numeric',hour12:true});
    
    const mydiv = document.createElement('div');
    mydiv.classList.add('msg');
    mydiv.innerHTML = data.username  + ": <i class='time'> " + current_time + " </i> <p class='message'>" + data.message + " </p>" ;
    $("#"+data.roomname+"_messages").append(mydiv);
  }

  function leaveRoom(event, room_id, room_name){
    socket.emit('disc', { user: userID , username: username, roomname: room_name, roomID: room_id });
  }