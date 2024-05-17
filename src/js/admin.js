const hamburgerBtn = document.querySelector(".hamburgerBtn");
const adminPage_left = document.querySelector(".adminPage_left");
const adminPage_right = document.querySelector(".adminPage_right");
const xBtn = document.querySelector(".xBtn");
const sarechInp = document.querySelector(".sarechInp");
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
  if (sarechInp.value) {
    let data = await getData(sarechInp.value);
    addingMainSection(data);
  }
});

function addingMainSection(data) {
  data.forEach((element) => {
    const bookElement = document.createElement("div");
    bookElement.innerHTML = `<p style="cursor: pointer;"><strong>Title:</strong> ${element.volumeInfo.title}</p>`;
    bookElement.addEventListener("click", function () {
      console.log(element.volumeInfo.title);
      title.value = element.volumeInfo.title;
      authorName.value = element.volumeInfo.authors;
      bookImageUrl.value = element.volumeInfo.imageLinks.thumbnail;
      description.value = element.volumeInfo.description;
      bookType.value = element.volumeInfo.categories;
    });
    partBookList.append(bookElement);
  });
}
