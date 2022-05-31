const table = document.getElementById('table');
const deleteButtons = document.querySelectorAll('#control-delete');
const addButton = document.getElementById('button-submit');
// const form = document.getElementById('add-item');
const nameField = document.getElementById('name');
const phoneField = document.getElementById('phone');
const messageContainer = document.getElementById('status-message');

deleteButtons.forEach(el => {el.addEventListener('click', deleteCell)});
// form.addEventListener('change', validateForm)
nameField.addEventListener('focusout', validateForm);
phoneField.addEventListener('focusout', validateForm);
addButton.addEventListener('click', handleForm);

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
    const row = table.insertRow();

    fields.forEach(el => {    
        const cell = row.insertCell()
        let newText = document.createTextNode(el);
        cell.appendChild(newText);
    });
};

function deleteCell(e) {
    const tr = findTagInParents(e.target, 'tr');
    tr.remove();
}

function findTagInParents (el, tagName) {
    if (el.parentNode.tagName == tagName.toUpperCase()) {
        return el.parentNode
    }
    return findTagInParents(el.parentNode, tagName)
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