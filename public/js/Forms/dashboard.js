// Load user data function
async function loadUserData() {
    const token = localStorage.getItem('token');
    
    try {
        const data = await fetchRequest('/api/protected-route', 'GET', null, token);

        console.log(data);

        document.getElementById('userInfo').innerHTML = `
            <p>Hello ${data.username}, welcome back!</p>
            <p>Email: ${data.email}</p>
        `;
    } catch (error) {
        console.error('Error loading user data:', error);
        window.location.href = '/api/signIn'; 
    }
}

// Logout button event
document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('token'); // Clear the token
    window.location.href = '/api/signIn'; // Redirect to login
});

// Call loadUserData on window load
window.onload = loadUserData;

// jQuery document ready function
$(document).ready(function () {
    const table = $('#bookTable').DataTable();
    let editingRowId = null; // Track the row being edited

    // Fetch books from the backend
    async function fetchBooks() {
        const token = localStorage.getItem('token');
        try {
            const books = await fetchRequest('/api/todos/books', 'GET', null, token);

            table.clear();
            books.forEach(book => {
                table.row.add([
                    `<span class="bookName">${book.title}</span><input type="text" class="bookInput" style="display:none;" value="${book.title}" />`,
                    `<span class="bookAuthor">${book.author}</span><input type="text" class="authorInput" style="display:none;" value="${book.author}" />`,
                    `<span class="bookYear">${book.year}</span><input type="text" class="yearInput" style="display:none;" value="${book.year}" />`,
                    `<span class="bookStatus">${book.status}</span><select class="statusInput" style="display:none;">
                        <option value="Pending" ${book.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Completed" ${book.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    </select>`,
                    `<button class="viewDetailsButton btn btn-info" data-id="${book._id}" data-bs-toggle="modal" data-bs-target="#bookDetailsModal">View Details</button>
                    <button class="editButton btn btn-primary" data-id="${book._id}">Edit</button>
                     <button class="saveButton btn btn-primary" data-id="${book._id}" style="display:none;">Save</button>
                     <button class="deleteButton btn btn-danger" data-id="${book._id}">Delete</button>`
                ]).draw();
            });
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    // Fetch books when the page loads
    fetchBooks();
  // Create a new book
  $('#createBookForm').on('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission
    const token = localStorage.getItem('token');

    const bookData = {
        title: $('#bookName').val(),
        author: $('#bookAuthor').val(),
        year: $('#bookYear').val()
    };

    try {
        // Use the fetchRequest function for the POST request
        await fetchRequest('/api/todos/books', 'POST', bookData, token);
        
        $('#createBookForm')[0].reset(); // Clear the form
        fetchBooks(); // Refresh the book list
    } catch (error) {
        console.error('Error creating book:', error);
    }
});

// Handle view details button click
$('#bookTable tbody').on('click', '.viewDetailsButton', async function () {
    const bookId = $(this).data('id');
    const token = localStorage.getItem('token');

    try {
        const book = await fetchRequest(`/api/todos/book/${bookId}`, 'GET', null, token);
     
        // Populate modal with book details
        $('#bookTitles').text(book.title);
        $('#bookAuthors').text(book.author);
        $('#bookYears').text(book.year);
        $('#bookStatus').text(book.status);
    } catch (error) {
        console.error('Error fetching book details:', error);
    }
});


    // Handle edit button click
    $('#bookTable tbody').on('click', '.editButton', function () {
        const row = $(this).closest('tr');
        editingRowId = $(this).data('id'); // Store the book ID being edited
    
        // Show input fields for editing and hide static content
        row.find('.bookInput, .authorInput, .yearInput,.statusInput').show();
        row.find('.bookName, .bookAuthor, .bookYear,.bookStatus').hide();
    
        // Show Save button, hide Edit button
        row.find('.saveButton').show();
        row.find('.editButton').hide();
    });

    // Handle save button click
    $('#bookTable tbody').on('click', '.saveButton', async function () {
        const row = $(this).closest('tr');
        const bookId = $(this).data('id');
    
        const updatedBook = {
            book: row.find('.bookInput').val(),
            author: row.find('.authorInput').val(),
            year: row.find('.yearInput').val(),
            priority: row.find('.priorityInput').val(),
            status: row.find('.statusInput').val(),
        };
    
        const token = localStorage.getItem('token');
        try {
            await fetchRequest(`/api/todos/books/${bookId}`, 'PUT', updatedBook, token);
    
            // Update the UI with the saved changes
            row.find('.bookName').text(updatedBook.book).show();
            row.find('.bookAuthor').text(updatedBook.author).show();
            row.find('.bookYear').text(updatedBook.year).show();
            row.find('.bookStatus').text(updatedBook.status).show(); // Show the updated status
    
            // Hide input fields
            row.find('.bookInput, .authorInput, .yearInput,.priorityInput, .statusInput').hide();
    
            // Show Edit button, hide Save button
            row.find('.editButton').show();
            row.find('.saveButton').hide();
        } catch (error) {
            console.error('Error saving book:', error);
        }
    });

    // Handle delete button click
    $('#bookTable tbody').on('click', '.deleteButton', async function () {
        const todoId = $(this).data('id');
        const token = localStorage.getItem('token');
        try {
            await fetchRequest(`/api/todos/books/${todoId}`, 'DELETE', null, token);
           await fetchBooks(); // Refresh the book list after deletion
           window.location.href = '/api/dashboard';
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    });
});