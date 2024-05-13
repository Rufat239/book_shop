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
    const joinUsSection = document.querySelector(".joinUsSection");
    const joinUs = document.querySelector(".joinUs");
    const joinUsBtn = document.querySelector(".joinUsBtn")

    // Check if the clicked element is not the joinUsBtn or its children
    if (!joinUsBtn.contains(e.target) && !joinUs.contains(e.target)) {
        joinUsSection.style.display = "none";
        document.body.style.overflow = "auto";
    }
});


// https://www.googleapis.com/books/v1/volumes?q=${bookName}

function fetchBooks(bookName) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}`)
    .then(response => response.json())
    .then(data => {
        const booksContainer = document.querySelector('.swiper-wrapper');
        booksContainer.innerHTML = ''; 


        data.items.forEach(item => {
            const book = document.createElement('div');
            book.classList.add('swiper-slide');
            book.style.height = "400px"
            book.style.display = "flex";
            book.style.flexDirection = "row"
            
            

            const img = document.createElement('img');
            img.src = item.volumeInfo.imageLinks.thumbnail; 
            img.alt = item.volumeInfo.title;
            img.style.width = "240px"
            img.style.height = "320px"
            img.style.paddingTop = "40px"
            img.style.paddingLeft = "20px"



            const textContainer = document.createElement('div');
            textContainer.style.display = "flex";
            textContainer.style.flexDirection = "column";
            textContainer.style.width ="300px !important"
            textContainer.style.paddingLeft = "20px"

            const title = document.createElement('h2');
            title.textContent = item.volumeInfo.title;
            title.style.fontWeight = "bold"



            const author = document.createElement('h4');
            author.textContent = item.volumeInfo.authors[0]; 
            author.style.fontFamily = "Montserrat";
            author.style.fontSize = "18px";
            author.style.fontWeight = "400";
            author.style.lineHeight = "35.31px";
            author.style.textAlign = "left";



            const description = document.createElement('p');
            description.textContent = item.volumeInfo.description;
            description.style.height = "200px !important"
            description.style.marginTop = "70px"
            description.style.maxWidth = "calc(100% - 340px)"
            description.style.overflowY = "auto"


            textContainer.appendChild(title);
            textContainer.appendChild(author);
            textContainer.appendChild(description);

            book.appendChild(img);

            booksContainer.appendChild(book);
            book.appendChild(textContainer)
            

        });

        
        const swiper = new Swiper('.swiper', {
            // Your swiper settings here
            loop: true, // Looping through slides
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
        }});
    })
    .catch(error => {
        console.error('Error fetching books:', error);
    });
}


document.querySelector(".search button").addEventListener("click", function() {
    const searchTerm = document.querySelector(".search input").value;
    fetchBooks(searchTerm);
});



document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        loop: true, // Looping through slides
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});




