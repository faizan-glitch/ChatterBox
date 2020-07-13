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
