const table = document.getElementById('table');
const deleteButtons = document.querySelectorAll('#control-delete');
const addButton = document.getElementById('button-submit');
const nameField = document.getElementById('name');
const phoneField = document.getElementById('phone');

deleteButtons.forEach(el => {el.addEventListener('click', deleteCell)});
addButton.addEventListener('click', handleForm);
nameField.addEventListener('change', e => {validateName(e.target.value)});
phoneField.addEventListener('change', e => {validatePhone(e.target.value)});

function validateForm()

function handleForm(e) {
    e.preventDefault();

    const name = nameField.value;
    const phone = phoneField.value;
    
    if (validateName(name) || validatePhone(phone)) {
        addButton.attributes('disabled', false)
    }
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
    const messageContainer = document.getElementById('status-message');
    if (show) {
        messageContainer.style.display = 'block';
        messageContainer.innerText = message;
    }
    messageContainer.style.display = 'none'
}

function validateName(value) {
    if (value.length) {
        return true
    }
    displayMessage(true, 'Введите имя')

}

function validatePhone (value) {
    const re = new RegExp('^[+]*[0-9\-]+$', 'g');
    return re.test(value);
}

// TODO: add validation as form' onchange event triggered