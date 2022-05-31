const table = document.getElementById('table');
const deleteButtons = document.querySelectorAll('#control-delete');
const addButton = document.getElementById('button-submit');
const form = document.getElementById('add-item');
const nameField = document.getElementById('name');
const phoneField = document.getElementById('phone');
const messageContainer = document.getElementById('status-message');

// deleteButtons.forEach(el => {el.addEventListener('click', deleteRow)});
form.addEventListener('input', checkValidity)
// form.addEventListener('submit', handleFormSubmit);
// nameField.addEventListener('input', validateForm);
// phoneField.addEventListener('focusout', validateForm);
// addButton.addEventListener('click', handleForm);

fetchTable();

function validateForm(e) {
    const name = nameField.value;
    const phone = phoneField.value;

    if (validateName(name) && validatePhone(phone)) {
        addButton.disabled = false;
        return;
    }
    addButton.disabled = true;
}

function handleForm(e) {
    e.preventDefault();

    const name = nameField.value;
    const phone = phoneField.value;
    
    constructRow(table, [name, phone]);
}

function constructRow(table = table, fields) {
    const tbody = table.getElementsByTagName('tbody')[0];
    const row = tbody.insertRow();

    fields.forEach(el => {    
        const cell = row.insertCell()
        const newText = document.createTextNode(el);
        cell.setAttribute('onclick', 'editCell');
        cell.classList.add('editable');
        cell.setAttribute('contenteditable', true);
        cell.appendChild(newText);
    });
    const cell = row.insertCell();
    createRowControls().forEach(el => cell.appendChild(el))
};

function createRowControls() {
    const controls = [
        { tag: 'span', id: 'control-edit', layout: '✏️' , onClick: toggleRow },
        { tag: 'span', id: 'control-save' , layout: '👌', onClick: toggleRow },
        { tag: 'span', id: 'control-delete' , layout: '❌', onClick: deleteRow }
    ]
    const elements = controls.map(item => {
        const { tag, id, layout, onClick } = item;
        const el = document.createElement(tag);
        el.classList.add(id);
        el.id = id;
        el.innerText = layout;
        el.onclick = onClick;
        return el
    })
    return elements;
}

function deleteRow(e) {
    const tr = e.target.closest('tr');
    tr.remove();
}

function displayMessage(show, message) {
    if (show) {
        messageContainer.innerText = message;
        messageContainer.style.display = 'block';
        return;
    }
    messageContainer.style.display = 'none'
}

function validateName(value) {
    if (value.length) {
        displayMessage(false);
        return true;
    }
    displayMessage(true, 'Введите имя');
    return false;
}

function validatePhone (value) {
    const re = new RegExp('^[+]*[0-9\-]+$', 'g');
    return re.test(value) || displayMessage(true, 'В номере телефона допустимы только цифры и +')
}

// ===

function serializeForm(formNode) {
    return new FormData(formNode)
}
  
async function handleFormSubmit(e) {
    e.preventDefault();
    const data = serializeForm(e.target);
    // const response = await sendData(data);
    // TODO: add checking of response status, if 200:
    updateTable(data);
}

function updateTable(formData) {
    const items = Array.from(formData.entries());
    const values = items.map(el => el[1]);
    constructRow(table, values);
}

// async function sendData(data) {
//     return await fetch('/api/apply/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'multipart/form-data' },
//         body: data,
//     })
// }

function checkValidity(event) {
    const formNode = event.target.form;
    const isValid = formNode.checkValidity();
  
    formNode.querySelector('button').disabled = !isValid
}

function toggleRow(e) {
    const tr = e.target.closest('tr')
    const editables = tr.getElementsByClassName('editable');


}

toggleRow

function fetchTable() {
    // TODO: make async fetch when API is done
    const mockData = [
        ['Lorem Ipsum', '+1 234 555 66 77'],
        ['Lorem Ipsum', '+1 234 555 66 77'],
        ['Lorem Ipsum', '+1 234 555 66 77']
    ];
    mockData.forEach(el => constructRow(table, el));
}

function constructInput(value, name) {
    const input = document.createElement('input');
    input.value = value;
    input.name = name;
    input.pattern = inputPatterns[name];
    return input;
}

const inputPatterns = {
    name: '\w+',
    tel: '^[+]*[0-9\-]+$'
}