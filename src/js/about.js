import joinUs from "./joinUs.mjs";

setTimeout(open, 2000);

// document.querySelector(".joinUsBtn").addEventListener("click", function () {
//   document.querySelector(".joinUsSection").style.display = "flex";
//   document.body.style.overflow = "hidden";
// });

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
joinUs()

function open() {
  document.querySelector(".downloadingImg").style.display = "none";
  document.querySelector(".main").style.opacity = "1";
}

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
