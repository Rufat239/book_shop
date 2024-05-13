const hamburgerBtn = document.querySelector(".hamburgerBtn");
const adminPage_left = document.querySelector(".adminPage_left");
const adminPage_right = document.querySelector(".adminPage_right");
const xBtn = document.querySelector(".xBtn");

hamburgerBtn.addEventListener("click", function () {
  adminPage_left.style.display = "block";
});

xBtn.addEventListener("click", function () {
  adminPage_left.style.display = "none";
});
