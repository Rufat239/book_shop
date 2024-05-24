import db from "./firebase.mjs";
import {
  get,
  set,
  ref,
  onValue,
  push,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";



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



      set(push(ref(db, '/joinus')), info)


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



// Modal Window Functionality

const nameInput = document.querySelector("#name");
const adressInput = document.querySelector("#surname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const send = document.querySelector(".sendBtn");
const text = document.querySelector("#textarea");


const div = document.createElement('div')

function checkUser() {
  if (!emailInput.value.includes("@")) {
    emailInput.style.border = "2px solid red";
  } else if (
    phoneInput.value.trim() === "" ||
    !/^\d{10}$/.test(phoneInput.value)
  ) {
    phoneInput.style.border = "2px solid red";
  } else if (emailInput.value.length === 0 || phoneInput.value.length === 0) {
    send.setAttribute("data-toggle", "modal");
    send.setAttribute("data-target", "#exampleModal");
  } else {
    const contact = document.querySelector('.contact')

    div.innerHTML = `<div 
class="modal fade" 
id="exampleModal"
tabindex="-1"
role="dialog"
aria-labelledby="exampleModalLabel"
aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-body">
<div class="warning-img">
                <img src="../img/contact/succes.jpg" alt="" />
              </div>
<div class="warning-msg">
              <br />
              <p class="default-msg">Müraciətiniz göndərildi! Təşəkkür edirik!</p>
            </div>
</div>
<div class="modal-footer">
              <button
                style="background-color: #e16a00; border: none"
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal">
                Oldu
              </button>
            </div>
</div>
</div>
</div>`

    contact.appendChild(div)
    addInputs();

    nameInput.value = "";
    adressInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    text.value = "";
    phoneInput.style.border = "";
    emailInput.style.border = "";
    send.setAttribute("data-toggle", "modal");
    send.setAttribute("data-target", "#exampleModal");
  }
}
document.querySelector(".joinUsBtn").addEventListener('click',()=>{
  div.innerHTML=''
})

function addInputs() {
  let obj = {
    name: nameInput.value,
    adress: adressInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    text: text.value,
  };
  set(push(ref(db, "/contact")), obj);
}

send.addEventListener("click", checkUser);
