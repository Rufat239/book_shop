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

function open() {
  document.querySelector(".downloadingImg").style.display = "none";
  document.querySelector(".main").style.opacity = "1";
}

// Modal Window Functionality

const nameInput = document.querySelector("#name");
const surNameInput = document.querySelector("#surname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const send = document.querySelector(".sendBtn");

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
    send.setAttribute("data-toggle", "modal");
    send.setAttribute("data-target", "#exampleModal");
  }
}

send.addEventListener("click", checkUser);
