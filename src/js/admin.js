const hamburgerBtn = document.querySelector(".hamburgerBtn");
const adminPage_left = document.querySelector(".adminPage_left");
const adminPage_right = document.querySelector(".adminPage_right");
const xBtn = document.querySelector(".xBtn");
const searchInp = document.querySelector(".searchInp");
const searchBtn = document.querySelector(".searchBtn");
const partBookList = document.querySelector(".partBookList");
const title = document.querySelector(".title");
const authorName = document.querySelector(".authorName");
const bookImageUrl = document.querySelector(".bookImageUrl");
const description = document.querySelector(".description");
const bookType = document.querySelector(".bookType");

hamburgerBtn.addEventListener("click", function () {
  adminPage_left.style.display = "block";
});

xBtn.addEventListener("click", function () {
  adminPage_left.style.display = "none";
});

async function getData(title) {
  const url = "https://www.googleapis.com/books/v1/volumes?q=";

  try {
    const response = await fetch(url + title);
    let result = await response.json();
    console.log("melumat", result.items);
    return result.items;
  } catch (error) {
    console.error(error);
  }
}

searchBtn.addEventListener("click", async function () {
  partBookList.style.display = "block";
  partBookList.innerHTML = "";
  if (searchInp.value) {
    let data = await getData(searchInp.value);
    addingMainSection(data);
  }
});

function addingMainSection(data) {
  data.forEach((element) => {
    const bookElement = document.createElement("div");
    bookElement.innerHTML = `<p style="cursor: pointer;"><strong>Title:</strong> ${element.volumeInfo.title}</p>`;
    bookElement.addEventListener("click", function () {
      // console.log(element.volumeInfo.title);
      title.value = element.volumeInfo.title;
      authorName.value = element.volumeInfo.authors;
      bookImageUrl.value = element.volumeInfo.imageLinks.thumbnail;
      description.value = element.volumeInfo.description;
      bookType.value = element.volumeInfo.categories;
      searchInp.value = "";
      partBookList.style.display = "none";
    });
    partBookList.append(bookElement);
  });
}

// Fecth Data from Login Page
const adminName = document.querySelector("#adminName");
function fetchAdminName() {
  let storedName = localStorage.getItem("username");
  adminName.textContent = storedName;
}
document.addEventListener("DOMContentLoaded", fetchAdminName);

// Firabase Functions
import db from "./firebase.mjs";
import {
  set,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const addBtn = document.querySelector(".addBtn");
const admininsiyahisi = document.querySelector("#adminKitabSiyahi");
const radios = document.querySelectorAll('input[name="x"]');

onValue(ref(db, "/ourBooks"), function (snapshot) {
  admininsiyahisi.innerHTML = "";

  let index = 1;

  snapshot.forEach((childSnapshot) => {
    const bookData = childSnapshot.val();
    updateTableWithBook(bookData, index++);
  });
});

addBtn.addEventListener("click", function () {
  const selectedRadio = document.querySelector('input[name="x"]:checked');

  const addingBook = {
    bookTitle: title.value,
    bookAuthor: authorName.value,
    bookImg: bookImageUrl.value,
    bookdesc: description.value,
    bookcategory: bookType.value,
  };

  const newBookRef = push(ref(db, "/ourBooks"));
  set(newBookRef, addingBook).then(() => {
    clearInputFields();
  });

  const category = selectedRadio.id;
  const categoryBookRef = push(ref(db, `/${category}`));
  set(categoryBookRef, addingBook);
});

function updateTableWithBook(bookData, index) {
  admininsiyahisi.innerHTML += `
    <tr>
      <td>${index}</td>
      <td><img src="${bookData.bookImg}" alt="" /> <br/>${bookData.bookTitle}</td>
      <td>${bookData.bookdesc}</td>
      <td>${bookData.bookcategory}</td>
      <td>${bookData.bookAuthor}</td>
      <td><button class="deleteBookBtn"><i class="fa-solid fa-trash-can"></i></button></td>
    </tr>
  `;
}

function clearInputFields() {
  title.value = "";
  authorName.value = "";
  bookImageUrl.value = "";
  description.value = "";
  bookType.value = "";
  radios.forEach((radio) => (radio.checked = false));
}
