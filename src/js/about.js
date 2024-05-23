function open() {
  document.querySelector(".downloadingImg").style.display = "none";
  document.querySelector(".main").style.opacity = "1";
}
setTimeout(open, 2000);


document.querySelector(".joinUsBtn").addEventListener("click", function () {
  document.querySelector(".joinUsSection").style.display = "flex";
  document.body.style.overflow = "hidden";
});

document.addEventListener("click", function (e) {
  const joinUsSection = document.querySelector(".joinUsSection");
  const joinUs = document.querySelector(".joinUs");
  const joinUsBtn = document.querySelector(".joinUsBtn");

  // Check if the clicked element is not the joinUsBtn or its children
  if (!joinUsBtn.contains(e.target) && !joinUs.contains(e.target)) {
    joinUsSection.style.display = "none";
    document.body.style.overflow = "auto";
  }
});



function sendJoinUsToDatabase() {
  document.querySelector(".joinSubmitBtn").addEventListener("click", function () {
      const successAlert = document.querySelector(".alert-success");
      successAlert.style.opacity = "1";
      let name = document.querySelector(".nameInpJoinUs");
      let email = document.querySelector(".emailInpJoinUs");
      let message = document.querySelector(".messageInpJoinUs");
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (name.value.trim() !== "" && emailPattern.test(email.value)) {
          // Show Bootstrap success alert
          const info = {
              email: email.value,
              fullname: name.value,
              message: message.value
          }

          

    set(push(ref(db,'/joinus')),info)  
          

          successAlert.style.display = "block";
          name.value = "";
          email.value = "";
          message.value = "";

          // Hide the alert after a certain time
          setTimeout(() => {
              successAlert.style.opacity = "0";
              document.querySelector(".joinUsSection").style.display = "none";
          }, 3000);
      }
      else {
          alert("Please write fullname and email!")
      }
  })
}

sendJoinUsToDatabase();

import db from "./firebase.mjs";
import {
  set,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const about = document.querySelector(".about");
// const snapshot = push(ref(db, "/abouStoretData"));

function showAboutStore(result) {
  const data = result.val();
  about.innerHTML += `
    <div class="about-div1">
    <h1>${data.title}</h1>
    <p>${data.aboutDesc}</p>
  </div>
  <div class="img-div">
    <img src="${data.aboutİmage}" alt="">
  </div>`;
}
// }

onValue(ref(db, "/abouStoretData"), showAboutStore);
