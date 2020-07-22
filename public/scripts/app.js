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
  function sendMessage(event,room_name) {
    let msg = document.getElementById(room_name+'_messaage').value;
    if(msg === '') {
      return;
    }

    // send message
    socket.emit('chatmsg', { user: username , message : msg, time: Date.now() , roomname: room_name } );
    
    //empty msg feild
    event.target.message.value = '';
    event.target.message.focus();

  }

  function showInChat(data){
    let time = new Date(data.time);
    let current_time = time.toLocaleString('en-US',{hour:'numeric',minute:'numeric',hour12:true});
    
    const mydiv = document.createElement('div');
    mydiv.classList.add('msg');
    mydiv.innerHTML = data.user + ": <i class='time'> " + current_time + " </i> <p class='message'>" + data.message + " </p>" ;
    
    $("#"+data.roomname+"_messages").append(mydiv);
  }
