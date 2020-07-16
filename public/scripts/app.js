// let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

// const deleteUsersRooms = async () => {
//     const rooms = await fetch('/room/5f036b719d29b426e4cee87b', {
//       method: "DELETE",
//       headers: {
//         "Content-Type": 'application/json',
//         "Accept": 'application/json',
//         'CSRF-Token': csrfToken
//       }
//     });
//     rooms.json()
//     .then(rooms => {
//         console.log(rooms);
//     })
// };

// deleteUsersRooms();

//   function myFunction() {
//       var input, filter, ul, li, a, i, txtValue;
//       input = document.getElementById("searchInput");
//       filter = input.value.toUpperCase();
//       ul = document.getElementById("chatrooms");
//       li = ul.getElementsByTagName("li");
//       for (i = 0; i < li.length; i++) {
//           a = li[i].getElementsByTagName("a")[0];
//           txtValue = a.textContent || a.innerText;
//           if (txtValue.toUpperCase().indexOf(filter) > -1) {
//               li[i].style.display = "";
//           } else {
//               li[i].style.display = "none";
//           }
//       }
//   }

const socket = io('ws://localhost:5000');

  socket.on('connect', () => {
    socket.send('Hello!');
  });

  socket.on('message', data => {

    // show message on screen
    showInChat(data);

    //scroll down to see the message
    const messagesScroll = document.querySelector('.messages');
    messagesScroll.scrollTop = messagesScroll.scrollHeight;
  });


  //Sent messages
  const form = document.getElementById('send_msg_form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const msg = event.target.send_msg.value;

    // send message
    socket.emit('chatmsg', { user: username , message : msg , time: Date.now() } );
    //empty msg feild
    event.target.send_msg.value = '';
    event.target.send_msg.focus();

  });

  function showInChat(data){
    let time = new Date(data.time);
    let current_time = time.toLocaleString('en-US',{hour:'numeric',minute:'numeric',hour12:true});

    const mydiv = document.createElement('div');
    mydiv.classList.add('msg');
    mydiv.innerHTML = data.user + ": <i class='time'> " + current_time + " </i> <p class='message'>" + data.message + " </p>" ;
    document.querySelector('.messages').appendChild(mydiv);
  }