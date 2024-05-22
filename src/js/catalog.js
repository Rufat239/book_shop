function open() {
  document.querySelector(".downloadingImg").style.display = "none";
  document.querySelector(".main").style.opacity = "1";
}

setTimeout(open, 500);

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
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const allBooks = document.querySelector(".allbooks");
const bestsellerbooks = document.querySelector(".bestsellerbooks");
const newbooks = document.querySelector(".newbooks");

function truncateText(text, maxLength) {
  if (text === "undefined" || text === null) {
    text = "No Info in Database";
  }
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

function updateTableWithBook(bookData, bookId) {
  const truncatedTitle = truncateText(bookData.bookTitle, 20);
  const truncatedAuthor = truncateText(bookData.bookAuthor, 20);

  allBooks.innerHTML += `
    <div class="swiper-slide">
      <div class="book">
        <img src="${bookData.bookImg}" alt="" />
        <h3>${truncatedTitle}</h3>
        <p>${truncatedAuthor}</p>
        <button><a href="../pages/bookpage.html?${bookId}">READ MORE</a></button>
      </div>
    </div>
  `;
  bestsellerbooks.innerHTML += `
    <div class="swiper-slide">
      <div class="book">
        <img src="${bookData.bookImg}" alt="" />
        <h3>${truncatedTitle}</h3>
        <p>${truncatedAuthor}</p>
         <button><a href="../pages/bookpage.html?${bookId}">READ MORE</a></button>
      </div>
    </div>
  `;
  newbooks.innerHTML += `
    <div class="swiper-slide">
      <div class="book">
        <span>NEW</span>
        <img src="${bookData.bookImg}" alt="" />
        <h3>${truncatedTitle}</h3>
        <p>${truncatedAuthor}</p>
        <button><a href="../pages/bookpage.html?${bookId}">READ MORE</a></button>
      </div>
    </div>
  `;
}

onValue(ref(db, "/ourBooks"), function (snapshot) {
  allBooks.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const bookData = childSnapshot.val();
    const bookId = childSnapshot.key;
    updateTableWithBook(bookData, bookId);
  });
});

onValue(ref(db, "/bestseller"), function (snapshot) {
  bestsellerbooks.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const bookData = childSnapshot.val();
    const bookId = childSnapshot.key;
    updateTableWithBook(bookData, bookId);
  });
});

onValue(ref(db, "/new"), function (snapshot) {
  newbooks.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const bookData = childSnapshot.val();
    const bookId = childSnapshot.key;
    updateTableWithBook(bookData, bookId);
  });
});
