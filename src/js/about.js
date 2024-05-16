function open() {
    document.querySelector(".downloadingImg").style.display = "none";
    document.querySelector(".main").style.opacity = "1";
}

setTimeout(open, 2000);

document.querySelector(".joinUsBtn").addEventListener("click", function () {
    document.querySelector(".joinUsSection").style.display = "flex";
    document.body.style.overflow = "hidden";
})

document.addEventListener("click", function (e) {
    const joinUsSection = document.querySelector(".joinUsSection");    const joinUs = document.querySelector(".joinUs");
const joinUsBtn = document.querySelector(".joinUsBtn")

    // Check if the clicked element is not the joinUsBtn or its children
    if (!joinUsBtn.contains(e.target) && !joinUs.contains(e.target)) {
        joinUsSection.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

function open() {
document.querySelector(".downloadingImg").style.display = "none";
document.querySelector(".main").style.opacity = "1";
}