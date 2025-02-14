const defaultBooks = [
    { id: 1, title: "1984", author: "Джордж Оруэлл", year: 1949 },
    { id: 2, title: "Мастер и Маргарита", author: "Михаил Булгаков", year: 1967 },
    { id: 3, title: "Преступление и наказание", author: "Фёдор Достоевский", year: 1866 }
];

let books = [];

function openAuthModal() {
    document.getElementById('authModal').style.display = 'flex';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function initializeBooks() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        books = JSON.parse(storedBooks);
    } else {
        books = [...defaultBooks];
        saveBooksToLocalStorage();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeBooks();
    renderBooks();
    
    document.getElementById('searchInput').addEventListener('input', renderBooks);
    document.getElementById('authorFilter').addEventListener('change', renderBooks);

    document.getElementById('addBookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const year = document.getElementById('bookYear').value;
        
        if (title && author && year) {
            addBook(title, author, year);
            closeAddBookModal();
            this.reset();
        }
    });

    document.querySelectorAll('a[onclick="openAuthModal()"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openAuthModal();
        });
    });
});

window.onclick = function(event) {
    const modal = document.getElementById('authModal');
    if (event.target === modal) {
        closeAuthModal();
    }
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        closeAuthModal();
        alert('Вы успешно вошли!');
    }
});

function renderBooks() {
    const booksGrid = document.getElementById('booksGrid');
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const selectedAuthor = document.getElementById('authorFilter').value;

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchQuery);
        const matchesAuthor = selectedAuthor ? book.author === selectedAuthor : true;
        return matchesSearch && matchesAuthor;
    });

    booksGrid.innerHTML = filteredBooks.map(book => `
        <div class="book-card">
            <button class="delete-btn" onclick="deleteBook(${book.id})">&times;</button>
            <h3>${book.title}</h3>
            <p><strong>Автор:</strong> ${book.author}</p>
            <p><strong>Год:</strong> ${book.year}</p>
        </div>
    `).join('');

    updateAuthorFilter();
}

function updateAuthorFilter() {
    const authorFilter = document.getElementById('authorFilter');
    const authors = [...new Set(books.map(book => book.author))];
    
    authorFilter.innerHTML = '<option value="">Все авторы</option>' + 
        authors.map(author => `<option value="${author}">${author}</option>`).join('');
}

function addBook(title, author, year) {
    const newBook = {
        id: Date.now(),
        title,
        author,
        year: parseInt(year)
    };
    books.push(newBook);
    renderBooks();
    saveBooksToLocalStorage();
}

function deleteBook(id) {
    books = books.filter(book => book.id !== id);
    renderBooks();
    saveBooksToLocalStorage();
}

function openAddBookModal() {
    document.getElementById('addBookModal').style.display = 'flex';
}

function closeAddBookModal() {
    document.getElementById('addBookModal').style.display = 'none';
}

function saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}

function loadBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        books = JSON.parse(storedBooks);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadBooksFromLocalStorage();
    renderBooks();
    
    document.getElementById('searchInput').addEventListener('input', renderBooks);
    document.getElementById('authorFilter').addEventListener('change', renderBooks);

    document.getElementById('addBookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const year = document.getElementById('bookYear').value;
        
        if (title && author && year) {
            addBook(title, author, year);
            closeAddBookModal();
            this.reset();
        }
    });
});