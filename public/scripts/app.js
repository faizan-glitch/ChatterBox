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

  socket.on('message', message => {
    console.log(message);

    // show message on screen
    showMessageInChat(message);

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
    socket.emit('chatmsg', msg);
    //empty msg feild
    event.target.send_msg.value = '';
    event.target.send_msg.focus();

  });

  function showMessageInChat(message){
    const mydiv = document.createElement('div');
    mydiv.classList.add('msg');
    mydiv.innerHTML = "Username: <i class='time'> 00:00am </i> <p class='message'>" + message + " </p>" ;
    document.querySelector('.messages').appendChild(mydiv);
  }