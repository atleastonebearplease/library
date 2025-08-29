const myLibrary = [];

function Book(title, author, pages, isRead, uniqueID = 0) {
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.uniqueID = uniqueID;
}

function addBookToLibrary(title, author, pages, isRead) {
    let id = crypto.randomUUID();

    let newBook = new Book(title, author, pages, isRead, id);

    myLibrary.push(newBook);
}

//for now, just push to console while we work on the JS
function displayLibrary() {
    for(book of myLibrary) {
        console.log(`Title: ${book.title} | Author: ${book.author} | Pages: ${book.pages} | Read: ${book.isRead} | ID: ${book.uniqueID}`);
    }
}

addBookToLibrary("The Lord of the Rings", "JRR Tolkien", 1000, true);
addBookToLibrary("The lord of the flies", "Unknown", 200, true);

displayLibrary();