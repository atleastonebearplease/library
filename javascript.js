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

function makeBookCard(book, imgSrc="") {
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

//for now, just push to console while we work on the JS
function displayLibrary() {
    for(book of myLibrary) {
        console.log(`Title: ${book.title} | Author: ${book.author} | Pages: ${book.pages} | Read: ${book.isRead} | ID: ${book.uniqueID}`);
    }
}

addBookToLibrary("The Lord of the Rings", "JRR Tolkien", 1000, true, "Literally my favorite");
addBookToLibrary("The lord of the flies", "Unknown", 200, true);

addBookCardToPage(makeBookCard(myLibrary[0]));

