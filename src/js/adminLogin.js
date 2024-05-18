// Modal Windows Functionality

const nameInput = document.querySelector("#username");
const passInput = document.querySelector("#pass");
const join = document.querySelector("#join");

const infoImg = document.querySelector(".warning-img");
const infoMsg = document.querySelector(".warning-msg");
const infoTitle = document.querySelector(".modal-title");

function checkUser() {
  if (nameInput.value.trim() === "" || passInput.value.trim() === "") {
    nameInput.style.border = "2px solid red";
    passInput.style.border = "2px solid red";
  } else if (
    (nameInput.value !== "ayxan" && passInput.value !== "12345") ||
    (nameInput.value !== "rufat" && passInput.value !== "12345")
  ) {
    join.setAttribute("data-toggle", "modal");
    join.setAttribute("data-target", "#exampleModal");
  } else {
    console.log(nameInput.value);
    localStorage.setItem("username", nameInput.value);
    infoImg.innerHTML = `<img src="../../img/contact/succes.jpg" alt="">`;
    infoMsg.innerHTML = ` <br /> <p class="default-msg">Uğurlar! Sizi səhifəyə yönləndiririk.</p>`;
    infoTitle.textContent = "DAXİL OLDUNUZ! !";
    join.setAttribute("data-toggle", "modal");
    join.setAttribute("data-target", "#exampleModal");
    nameInput.value = "";
    passInput.value = "";
    nameInput.style.border = "";
    passInput.style.border = "";
    setTimeout(function () {
      window.location.href = "../../pages/admin/admin.html";
    }, 3000);
  }
}

join.addEventListener("click", checkUser);
