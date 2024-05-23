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



// Modal Window Functionality

const nameInput = document.querySelector("#name");
const adressInput = document.querySelector("#surname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const send = document.querySelector(".sendBtn");
const text = document.querySelector("#textarea");

const infoImg = document.querySelector(".warning-img");
const infoMsg = document.querySelector(".warning-msg");
const infoTitle = document.querySelector(".modal-title");

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
    infoImg.innerHTML = `<img src="../img/contact/succes.jpg" alt="">`;
    infoMsg.innerHTML = ` <br /> <p class="default-msg">Müraciətiniz göndərildi! Təşəkkür edirik!</p>`;
    infoTitle.textContent = "GÖNDƏRİLDİ !";
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
