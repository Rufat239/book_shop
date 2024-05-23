import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, query, orderByChild, equalTo, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
// import Swiper from 'https://unpkg.com/swiper/swiper-bundle.min.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOldxszY5NokTC-9GJHYL6CS2xUHs6JuY",
    authDomain: "book-platform-92fc8.firebaseapp.com",
    projectId: "book-platform-92fc8",
    storageBucket: "book-platform-92fc8.appspot.com",
    messagingSenderId: "844344224692",
    appId: "1:844344224692:web:bb2fb3fba3f235a1b320e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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




async function fetchBooks(bookName) {
    const booksRef = ref(db, 'ourBooks');
    console.log('Searching for:', bookName);

    try {
        const snapshot = await get(booksRef);
        const data = snapshot.val();
        
        console.log('Data fetched:', data);
        
        if (!data) {
            console.log('No books found in the database.');
            return;
        }

        // const filteredData = Object.values(data).filter(item => 
        //     item.bookTitle.toLowerCase().includes(bookName.toLowerCase())
        // );

        const filteredData = Object.values(data).filter(item => {
            return item.bookTitle && item.bookTitle.toLowerCase().includes(bookName.toLowerCase());
        });


        const booksContainer = document.querySelector('.swiper-wrapper');
        booksContainer.innerHTML = '';

        if (filteredData.length === 0) {
            console.log('No books found matching the search term.');
            return;
        }



        let booksHTML = '';

        filteredData.forEach(item => {
            booksHTML += `
                <div class="swiper-slide" style="height: 300px; width: 700px; display: flex; flex-direction: row; background-color: rgba(255, 255, 255, 1); border: solid 1px; border-color: rgba(0, 0, 0, 0.25);box-shadow: 15px 15px 15px 15px rgba(0, 0, 0, 0.25);">
                                    <div>
                        <img src="${item.bookImg || 'placeholder.jpg'}" alt="${item.bookTitle}" style="width: 230px; height: 300px; padding-top: 40px; padding-left: 20px; padding-bottom: 20px">
                    </div>
                    <div style="display: flex; flex-direction: column; width: 300px; padding-left: 20px;">
                        <h2 style="font-weight: bold; padding-top: 35px; width: 400px;">${item.bookTitle}</h2>
                        <h4 style="font-family: Montserrat; font-size: 18px; font-weight: 400; line-height: 35.31px; text-align: left;">${item.bookAuthor || 'Unknown'}</h4>
                        <p style="height: 200px; margin-top: 30px; width: 500px; overflow-y: auto;">${item.bookdesc || 'No description available'}</p>
                    </div>
                </div>

            `;
        });

        booksContainer.innerHTML = booksHTML;

//         new Swiper('.swiper', {
//             loop: true,
//             navigation: {
//                 nextEl: '.swiper-button-next',
//                 prevEl: '.swiper-button-prev',
//             }
//         });
//     } catch (error) {
//         console.error('Error fetching books from database:', error);
//     }
// }
const swiperConfig = {
    loop: filteredData.length >= 3, // Используем loop только если слайдов 3 или больше
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
};

new Swiper('.swiper', swiperConfig);

console.log('Swiper initialized with config:', swiperConfig);
} catch (error) {
console.error('Error fetching books from database:', error);
}
}


function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

searchButton.addEventListener("click", function() {
    const searchTerm = searchInput.value;
    console.log('Search term:', searchTerm);
    fetchBooks(searchTerm);
});

searchInput.addEventListener("keyup", debounce(function() {
    const searchTerm = searchInput.value;
    console.log('Search term:', searchTerm);
    fetchBooks(searchTerm);
}, 300));



document.addEventListener("DOMContentLoaded", function () {
    new Swiper('.swiper', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});



