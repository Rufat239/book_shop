function open() {
  document.querySelector(".downloadingImg").style.display = "none";
  document.querySelector(".main").style.opacity = "1";
}
setTimeout(open, 2000);
document.querySelector(".joinUsBtn").addEventListener("click", function () {
  document.querySelector(".joinUsSection").style.display = "flex";
  document.body.style.overflow = "hidden";
});
// document.addEventListener("click", function (e) {
//   const joinUsSection = document.querySelector(".joinUsSection");
//   const joinUs = document.querySelector(".joinUs");
//   const joinUsBtn = document.querySelector(".joinUsBtn");
//   // Check if the clicked element is not the joinUsBtn or its children
//   if (!joinUsBtn.contains(e.target) && !joinUs.contains(e.target)) {
//     joinUsSection.style.display = "none";
//     document.body.style.overflow = "auto";
//   }
// });

// Data almaq

import db from "./firebase.mjs";
import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const bookId = window.location.search.substring(1);

const selectedBook = document.querySelector(".div-1");

onValue(ref(db, `/ourBooks/${bookId}`), function (snapshot) {
  const bookData = snapshot.val();

  selectedBook.innerHTML = `
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
  `;
});

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
