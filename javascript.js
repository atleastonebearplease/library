const addBookButton = document.querySelector('.header__add-book');
const addBookDialog = document.querySelector('.dialog');
const dialogCancelButton = document.querySelector('.dialog__cancel');

const bookForm = document.querySelector('.dialog__form')


const myLibrary = [];

function Book(title, author, pages, isRead, uniqueID = 0, notes = '') {
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.uniqueID = uniqueID;
    this.notes = notes;
}

function addBookToLibrary(title, author, pages, isRead, notes) {
    let id = crypto.randomUUID();

    let newBook = new Book(title, author, pages, isRead, id, notes);

    myLibrary.push(newBook);
}

function makeBookCardDiv(book, imgSrc="") {
    let hasBeenRead = book.isRead ? "Yes" : "No";
    
    let htmlString = 
    `<div class="book-card__image">
        <img src="" alt="Book Image">
    </div>
    <div class="book-card__text">
        <p><strong>Title:</strong> <span>${book.title}</span></p>
        <p><strong>Author:</strong> <span>${book.author}</span></p>
        <p><strong>Pages:</strong> <span>${book.pages}</span></p>
        <p><strong>Read?:</strong> <span>${hasBeenRead}</span></p>
        <p><strong>Notes:</strong> <span class="book-notes">${book.notes}</span></p>
    </div>`;
    
    let div = document.createElement('div');
    div.className = 'book-card';

    div.innerHTML = htmlString;
    div.setAttribute('data-bookId', book.uniqueID);

    return div;
}

function addBookCardToPage(bookCard) {
    document.querySelector(".library-cards").appendChild(bookCard);
}


addBookToLibrary("The Lord of the Rings", "JRR Tolkien", 1000, true, "Literally my favorite");
addBookToLibrary("The lord of the flies", "Unknown", 200, true);

addBookCardToPage(makeBookCardDiv(myLibrary[0]));
addBookCardToPage(makeBookCardDiv(myLibrary[1]));


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
}













//Testing Modals

const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");

const selectEl = favDialog.querySelector("select");
const confirmBtn = favDialog.querySelector("#confirmBtn");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

//"Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event
favDialog.addEventListener("close", (e)=> {
    outputBox.value = 
        favDialog.returnValue === 'default' 
        ? "No return value."
        : `ReturnValue: ${favDialog.returnValue}.`; //Have to check for "default" rather than empty string
});

//Prevent the confirm button from the default behavior of submitting the form, and close the dialog with the 
//close() method, which triggers the 'close' event
confirmBtn.addEventListener('click', (event)=> {
    event.preventDefault(); //We don't want to submit this fake form
    favDialog.close(selectEl.value); //Have to send the select box value here
})