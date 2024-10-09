const searchBtn = document.getElementById('search-button');
const resultsDiv = document.getElementById('book-results');
let booksData = [];

async function searchBooks(query) {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    booksData = data.items || [];

    resultsDiv.innerHTML = '';

    if (booksData.length > 0) {
      const booksToDisplay = booksData.slice(0, 9);

      booksToDisplay.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-result');

        const imageUrl = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';

        bookDiv.innerHTML = `
          <img src="${imageUrl}" alt="${book.volumeInfo.title}" class="book-image">
          <p><strong>Название:</strong> ${book.volumeInfo.title}</p>
          <p><strong>Автор:</strong> ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Неизвестен'}</p>
          <button class="select-book" data-book-id="${book.id}">Выбрать</button>
        `;
        resultsDiv.appendChild(bookDiv);
      });
    } else {
      resultsDiv.innerHTML = '<p>Книги не найдены.</p>';
    }
  } catch (error) {
    console.error('Ошибка при запросе к API:', error);
  }
}

searchBtn.addEventListener('click', () => {
  const query = document.getElementById('book-title').value.trim();
  if (query) {
    searchBooks(query);
  } else {
    resultsDiv.innerHTML = '<p>Пожалуйста, введите название книги.</p>';
  }
});

resultsDiv.addEventListener('click', (event) => {
  if (event.target.classList.contains('select-book')) {
    const bookId = event.target.dataset.bookId;

    const selectedBook = booksData.find(book => book.id === bookId);

    resultsDiv.style.display = 'none';

    const orderForm = document.createElement('form');
    orderForm.id = 'order-form';
    orderForm.innerHTML = `
      <div>
        <label for="book-title">Книга:</label>
        <input type="text" id="book-title" value="${selectedBook.volumeInfo.title}" readonly>
      </div>
      <div>
        <label for="quantity">Количество:</label>
        <input type="number" id="quantity" min="1" required>
      </div>
      <div>
        <label for="name">Имя:</label>
        <input type="text" id="name" required>
      </div>
      <div>
        <label for="delivery-date">Дата доставки:</label>
        <input type="date" id="delivery-date" required>
      </div>
      <div>
        <label for="address">Адрес:</label>
        <textarea id="address" required></textarea>
      </div>
      <div>
        <label for="comment">Комментарий:</label>
        <textarea id="comment"></textarea>
      </div>
      <button type="submit">Оформить заказ</button>
    `;

    document.body.appendChild(orderForm);

    orderForm.addEventListener('submit', (event) => {
      event.preventDefault(); 

      const quantity = document.getElementById('quantity').value;
      const name = document.getElementById('name').value;
      const deliveryDate = document.getElementById('delivery-date').value;
      const address = document.getElementById('address').value;

      const confirmationMessage = document.createElement('p');
      confirmationMessage.classList.add('confirmation-message');
      confirmationMessage.textContent = `${name}, спасибо за заказ. ${selectedBook.volumeInfo.title} будет доставлен ${deliveryDate} по адресу ${address}.`;
      document.body.appendChild(confirmationMessage);

      orderForm.remove();

      orderForm.reset();
    });
  }
});

const students = [
    { lastName: 'Иванов', firstName: 'Иван' },
    { lastName: 'Петров', firstName: 'Петр' },
    { lastName: 'Сидоров', firstName: 'Сидор' },
];

document.getElementById('selectButton').addEventListener('click', () => {
    createStudentTable();
});

function createStudentTable() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = ''; 
    studentList.style.display = 'block';

    const lessonTopic = document.getElementById('lessonTopic').value; 

    const topicHeader = document.createElement('h2');
    topicHeader.innerText = `Тема лекции: ${lessonTopic}`; 
    studentList.appendChild(topicHeader); 

    const table = document.createElement('table');

    const headerRow = table.insertRow();
    headerRow.insertCell(0).innerText = 'Фамилия';
    headerRow.insertCell(1).innerText = 'Имя';
    headerRow.insertCell(2).innerText = 'Присутствует';

    students.forEach((student, index) => {
        const row = table.insertRow();
        row.insertCell(0).innerText = student.lastName;
        row.insertCell(1).innerText = student.firstName;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `student-${index}`;
        row.insertCell(2).appendChild(checkbox);
    });

    studentList.appendChild(table); 
    document.getElementById('saveButton').style.display = 'block'; 
}

document.getElementById('saveButton').addEventListener('click', () => {
    showMarkedStudents();
});

function showMarkedStudents() {
    const markedStudents = students.filter((_, index) => {
        const checkbox = document.getElementById(`student-${index}`);
        return checkbox.checked;
    });

    const studentList = document.getElementById('studentList');
    studentList.innerHTML = ''; 

    const lessonTopic = document.getElementById('lessonTopic').value; 

    const topicHeader = document.createElement('h2');
    topicHeader.innerText = `Тема лекции: ${lessonTopic}`; 
    studentList.appendChild(topicHeader);

    const resultHeader = document.createElement('h2');
    resultHeader.innerText = 'Отмеченные студенты:';
    studentList.appendChild(resultHeader);

    if (markedStudents.length > 0) {
        markedStudents.forEach(student => {
            const studentRow = document.createElement('p');
            studentRow.innerText = `${student.lastName} ${student.firstName}`;
            studentList.appendChild(studentRow);
        });
    } else {
        studentList.appendChild(document.createTextNode('Нет отмеченных студентов.'));
    }
}


const seatsContainer = document.querySelector('.seats');
const ticketsList = document.getElementById('tickets-list');
const directionSelect = document.getElementById('direction');
const dateInput = document.getElementById('date');

function createSeats(numberOfSeats) {
    for (let i = 1; i <= numberOfSeats; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `seat-${i}`;

        const label = document.createElement('label');
        label.htmlFor = `seat-${i}`;
        label.textContent = i;

        seat.appendChild(checkbox);
        seat.appendChild(label);
        seatsContainer.appendChild(seat);
    }
}

createSeats(6);

document.getElementById('book').addEventListener('click', () => {
    const selectedSeats = [];
    const checkboxes = document.querySelectorAll('.seat input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedSeats.push(checkbox.id.replace('seat-', '')); 
        }
    });

    const direction = directionSelect.value;
    const formattedDirection = direction === 'odessa-lviv' ? 'Одесса - Львов' :
                               direction === 'kyiv-lviv' ? 'Киев - Львов' :
                               direction === 'kharkiv-odessa' ? 'Харьков - Одесса' :
                               'Харьков - Одесса'; 
    const date = dateInput.value;


    if (selectedSeats.length > 0) {
        const ticketInfo = `Выбранные места: ${selectedSeats.join(', ')}. Направление: ${formattedDirection}. Дата поездки: ${date}.`;
        const listItem = document.createElement('li');
        listItem.textContent = ticketInfo;
        ticketsList.appendChild(listItem);
    } else {
        alert('Пожалуйста, выберите хотя бы одно место.');
    }
});

