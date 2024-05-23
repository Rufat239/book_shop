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
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const addBtn = document.querySelector(".addBtn");
const admininsiyahisi = document.querySelector("#adminKitabSiyahi");
const radios = document.querySelectorAll('input[name="x"]');

onValue(ref(db, "/ourBooks"), function (snapshot) {
  admininsiyahisi.innerHTML = "";

  let index = 1;

  snapshot.forEach((childSnapshot) => {
    const bookData = childSnapshot.val();
    const bookKey = childSnapshot.key;
    updateTableWithBook(bookData, index++, bookKey);
  });
});

addBtn.addEventListener("click", function () {
  const selectedRadio = document.querySelector('input[name="x"]:checked');

  const timeSpam = new Date().toDateString();
  const addingBook = { 
    bookTitle: title.value,
    bookAuthor: authorName.value,
    bookImg: bookImageUrl.value,
    bookdesc: description.value,
    bookcategory: bookType.value,
    addedAt:timeSpam
  };

  const newBookRef = push(ref(db, "/ourBooks"));
  set(newBookRef, addingBook).then(() => {
    clearInputFields();
  });

  const category = selectedRadio.id;
  const categoryBookRef = push(ref(db, `/${category}`));
  set(categoryBookRef, addingBook);
});

function updateTableWithBook(bookData, index, bookKey) {
  const row = document.querySelector(".rowTemp").content.cloneNode(true)
    .children[0];

  const td1 = row.querySelector(".listNum");
  const img = row.querySelector(".bookImg");
  const td3 = row.querySelector(".bookDesc");
  const td4 = row.querySelector(".category");
  const td5 = row.querySelector(".author");
  const td6 = row.querySelector(".bookName");

  const button = row.querySelector(".fa-trash-can");

  button.addEventListener("click", () => {
    deleteBook(bookKey);
  });

  img.src = bookData.bookImg;
  td1.textContent = index;
  td3.textContent = bookData.bookdesc; 
  td4.textContent = bookData.bookcategory;
  td5.textContent = bookData.bookAuthor;
  td6.textContent = bookData.bookTitle;

  admininsiyahisi.append(row);
}

function deleteBook(bookKey) {
  const bookRef = ref(db, `ourBooks/${bookKey}`);
  remove(bookRef)
    .then(() => {
      console.log("Book removed successfully");
    })
    .catch((error) => {
      console.error("Error removing book: ", error);
    });
}
function clearInputFields() {
  title.value = "";
  authorName.value = "";
  bookImageUrl.value = "";
  description.value = "";
  bookType.value = "";
  radios.forEach((radio) => (radio.checked = false));
}

const aboutAddBtn = document.querySelector(".aboutAddBtn");
const aboutTitle = document.querySelector(".aboutTitle");
const aboutImageUrl = document.querySelector(".aboutImageUrl");
const aboutDescription = document.querySelector(".aboutDesc");

function addAboutStore() {
  const title = aboutTitle.value;
  const aboutİmage = aboutImageUrl.value;
  const aboutDesc = aboutDescription.value;

  const addingAboutStore = {
    title,
    aboutİmage,
    aboutDesc,
  };

  set(ref(db, "abouStoretData"), addingAboutStore).then(() => {
    aboutTitle.value = "";
    aboutImageUrl.value = "";
    aboutDescription.value = "";
  });
}

aboutAddBtn.addEventListener("click", addAboutStore);


const contactTable=document.querySelector('#contactTable')
let index=0
onValue(ref(db,'/contact'),(x)=>{
  
x.forEach((((objects)=>{
  index++
  const tr=document.createElement('tr')
  const element=objects.val()
  
  console.log(element);
tr.innerHTML=`
<td>${index}</td>
<td>${element.name}</td>
<td>${element.adress}</td>
<td>${element.email}</td>
<td>${element.phone}</td>
<td>${element.text}</td>
`
contactTable.appendChild(tr)
})))
})