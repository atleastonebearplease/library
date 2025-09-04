const addBookButton = document.querySelector('.header__add-book');

const addBookDialog = document.querySelector('.dialog');
const dialogCancelButton = document.querySelector('.dialog__cancel');
const dialogSubmitButton = document.querySelector('.dialog__submit')

const bookForm = document.querySelector('.dialog__form')


const myLibrary = [];

function Book(title, author, pages, isRead, uniqueID = 0, notes = '', imageURL = '') {
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.uniqueID = uniqueID;
    this.notes = notes;
    this.imageURL = imageURL;
}

function addBookToLibrary(title, author, pages, isRead, notes = '', imageURL = '') {
    let id = crypto.randomUUID();

    let newBook = new Book(title, author, pages, isRead, id, notes, imageURL);

    myLibrary.push(newBook);
}

function makeBookCardDiv(book) {
    let imageElementString = '';
    
    //If the book was givne a URL, include the img element. Otherwise, don't. 
    if(book.imageURL !== ''){
        imageElementString = 
        `<div class="book-card__image">
            <img src="${book.imageURL}" alt="Book Image">
        </div>`;
    }
    
    let htmlString = 
    `
    <div class="book-card__text">
        <p><strong>Title:</strong> <span>${book.title}</span></p>
        <p><strong>Author:</strong> <span>${book.author}</span></p>
        <p><strong>Pages:</strong> <span>${book.pages}</span></p>
        <p><strong>Read?:</strong> <span>${book.isRead}</span></p>
        <p><strong>Notes:</strong> <span class="book-notes">${book.notes}</span></p>
    </div>
    <div class="delete-wrapper"><button class="book-card__delete">Delete</button></div>
    `;
    
    let div = document.createElement('div');
    div.className = 'book-card';
    div.innerHTML = imageElementString + htmlString; 
    div.setAttribute('data-bookId', book.uniqueID);

    //If the book doesn't contain an image URL, then use both grid rows to house the text
    if(book.imageURL === ''){
        div.querySelector('.book-card__text').classList.add('book-card__text--center');
        div.querySelector('.book-notes').classList.add('book-notes--more-room');
    }

    return div;
}
1
function addBookToPage(book) {
    let bookCard = makeBookCardDiv(book);

    document.querySelector(".library-cards").appendChild(bookCard);
}


addBookToLibrary("The Lord of the Rings", "JRR Tolkien", 1000, "Yes", "Literally my favorite start to a book series of all time. I spent so much time in the world of Robert Jordan growing up and I would not have it any other way as an adult. So much of my creative mind is built upon worlds that Robert Jordan built before I existed.", 'https://upload.wikimedia.org/wikipedia/en/0/00/WoT01_TheEyeOfTheWorld.jpg');
addBookToLibrary("The lord of the flies", "Unknown", 200, "Yes");

addBookToPage(myLibrary[0]);
addBookToPage(myLibrary[1]);


//================Button Event Listeners and Functions

function showDialog() {
    addBookDialog.showModal();
}

addBookButton.addEventListener('click', showDialog);

function closeDialog() {
    addBookDialog.close();
}

dialogCancelButton.addEventListener('click', closeDialog);

function submitDialog(event) {
    event.preventDefault();

    const formData = new FormData(bookForm);

    let title = formData.get('book-title');
    let author = formData.get('book-author');
    let pages = formData.get('book-pages');
    let hasBeenRead = formData.get('has-been-read');
    let notes = formData.get('book-notes');
    let URL = formData.get('book-image-url');

    addBookToLibrary(title, author, pages, hasBeenRead, notes, URL);
    addBookToPage(myLibrary.at(-1)); //Add the last book in the stack

    bookForm.reset();
    addBookDialog.close();
}

bookForm.addEventListener('submit', submitDialog);