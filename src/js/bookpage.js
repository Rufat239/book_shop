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

// Data almaq

import db from "./firebase.mjs";
import {
  ref,
  onValue,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const bookId = window.location.search.substring(1);

const selectedBook = document.querySelector(".div-1");

onValue(ref(db, `/ourBooks/${bookId}`), function (snapshot) {
  const bookData = snapshot.val();

  selectedBook.innerHTML = `
        <div class="div-1">
          <div class="div-2">
            <div class="div-4">
              <div class="div-p">
                <p class="p1">2017</p>
              </div>
              <h1 class="h11">${bookData.bookTitle}</h1>
              <h6 class="h66">Added at ${bookData.addedAt}</h6>
              <p class="p2">${bookData.bookAuthor}</p>
              <p class="p3">${bookData.bookdesc}
              </p>
            </div>
          </div>

          <div class="imgbook">
            <div class="new">
              <p>NEW</p>
            </div>
            <img src="${bookData.bookImg}" alt="" class="img1" />
          </div>
        </div>
  `;
});
onValue(ref(db, `/bestseller/${bookId}`), function (snapshot) {
  const bookData = snapshot.val();

  selectedBook.innerHTML = `
        <div class="div-1">
          <div class="div-2">
            <div class="div-4">
              <div class="div-p">
                <p class="p1">2017</p>
              </div>
              <h1 class="h11">${bookData.bookTitle}</h1>
              <h6 class="h66">2 days ago added</h6>
              <p class="p2">${bookData.bookAuthor}</p>

              <p class="p3">${bookData.bookdesc}
              </p>
            </div>
          </div>

          <div class="imgbook">
            <div class="new">
              <p>NEW</p>
            </div>
            <img src="${bookData.bookImg}" alt="" class="img1" />
          </div>
        </div>
  `;
});

onValue(ref(db, `/new/${bookId}`), function (snapshot) {
  const bookData = snapshot.val();

  selectedBook.innerHTML = `
        <div class="div-1">
          <div class="div-2">
            <div class="div-4">
              <div class="div-p">
                <p class="p1">2017</p>
              </div>
              <h1 class="h11">${bookData.bookTitle}</h1>
              <h6 class="h66">2 days ago added</h6>
              <p class="p2">${bookData.bookAuthor}</p>

              <p class="p3">${bookData.bookdesc}
              </p>
            </div>
          </div>

          <div class="imgbook">
            <div class="new">
              <p>NEW</p>
            </div>
            <img src="${bookData.bookImg}" alt="" class="img1" />
          </div>
        </div>
  `;
});

const commentInput = document.querySelector("#comment");
const addCommentBtn = document.querySelector(".btn-2");

addCommentBtn.addEventListener("click", function () {
  const newComment = {
    text: commentInput.value,
    timestamp: Date.now(),
    author: "anonim",
  };

  const commentsRef = ref(db, `/ourBooks/${bookId}/comments`);
  push(commentsRef, newComment).then(() => {
    console.log("Yorum eleve edildi");
    commentInput.value = "";
  });
});

const div = document.querySelector(".div-5");
const commentsRef = ref(db, `/ourBooks/${bookId}/comments`);
onValue(commentsRef, function (commentsSnapshot) {
  const commentsData = commentsSnapshot.val();
  const commentsContainer = document.createElement("div");
  commentsContainer.classList.add("comments-container");

  for (const commentId in commentsData) {
    const comment = commentsData[commentId];
    const commentElement = document.createElement("div");
    commentElement.classList.add("div-7", "glow-on-hover");
    commentElement.innerHTML = `
        <div class="div-78">
          <h6 class="div-77">${comment.author}</h6>
          <p class="div-80">${new Date(
            comment.timestamp
          ).toLocaleTimeString()} ${new Date(
      comment.timestamp
    ).toLocaleDateString()}</p>
        </div>
        <p class="div-79">${comment.text}</p>
      `;
    div.appendChild(commentElement);
  }

  selectedBook.appendChild(commentsContainer);
});
