function open() {
  document.querySelector(".downloadingImg").style.display = "none";
  document.querySelector(".main").style.opacity = "1";
}

setTimeout(open, 5000);

document.querySelector(".joinUsBtn").addEventListener("click", function () {
  document.querySelector(".joinUsSection").style.display = "flex";
  document.body.style.overflow = "hidden";
});

document.addEventListener("click", function (e) {
  const joinUsSection = document.querySelector(".joinUsSection");
  const joinUs = document.querySelector(".joinUs");
  const joinUsBtn = document.querySelector(".joinUsBtn");

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

// Swiper

var swiper = new Swiper(".swiper", {
  slidesPerView: getSlidesPerView(),
  direction: getDirection(),
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    resize: function () {
      swiper.params.slidesPerView = getSlidesPerView();
      swiper.update();
    },
  },
});

function getDirection() {
  return "horizontal";
}

function getSlidesPerView() {
  return window.innerWidth <= 600 ? 1 : 5;
}

// Firebase
import db from "./firebase.mjs";
import {
  ref,
  onValue,
  set,
  get,
  push
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const allBooks = document.querySelector(".allbooks");
const bestsellerbooks = document.querySelector(".bestsellerbooks");
const newbooks = document.querySelector(".newbooks");

function truncateText(text, maxLength) {
  if (!text || text === "undefined" || text === null) {
    return "No Info in Database";
  }
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

function updateTableWithBook(container, bookData, bookId) {
  const truncatedTitle = truncateText(bookData.bookTitle, 20);
  const truncatedAuthor = truncateText(bookData.bookAuthor, 20);

  container.innerHTML += `
    <div class="swiper-slide">
      <div class="book">
        <img src="${bookData.bookImg}" alt="" />
        <h3>${truncatedTitle}</h3>
        <p>${truncatedAuthor}</p>
        <button><a href="../pages/bookpage.html?${bookId}">READ MORE</a></button>
      </div>
    </div>
  `;
}

function fetchBooksFromFirebase(reference, container) {
  onValue(reference, function (snapshot) {
    container.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      const bookData = childSnapshot.val();
      const bookId = childSnapshot.key;
      updateTableWithBook(container, bookData, bookId);
    });
  });
}

fetchBooksFromFirebase(ref(db, "/ourBooks"), allBooks);
fetchBooksFromFirebase(ref(db, "/bestseller"), bestsellerbooks);
fetchBooksFromFirebase(ref(db, "/new"), newbooks);
