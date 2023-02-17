const container = document.querySelector('#container');

const values = [1, 2, 3, 4, 5];
text = ['Max', 'Lörrach', 'Freiburg'];

for (let i = 0; i < values.length; i++) {
    const newBox = document.createElement('div');
    newBox.classList.add('box');
    newBox.innerHTML = text[0] + " fährt von " + text[1] + " nach " + text[2] + "   Value: " + values[i];
    container.appendChild(newBox);

    newBox.addEventListener('click', function() {
        this.innerHTML = text[0] + "fährt von " + text[1] + "nach " + text[2] + "Value: " + (parseInt(this.innerHTML.split(': ')[1]) + 1);
    });
}


// Vprschlag von chat gpt
const saveButton = document.querySelector('#save-button');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const boxContainer = document.querySelector('#box-container');

let data = [];

saveButton.addEventListener('click', function() {
    const name = nameInput.value;
    const email = emailInput.value;

    data.push({ name, email });

    localStorage.setItem('data', JSON.stringify(data));

    createBox(name, email);
});


// ToDo: data besser abspeichern und hier richtig aufrufen


localStorage.setItem('data', JSON.stringify(data));


const createBox = (name, email) => {
    const newBox = document.createElement('div');
    newBox.classList.add('box');
    newBox.innerHTML = `Name: ${name}<br>Email: ${email}`;
    boxContainer.appendChild(newBox);
};

const savedData = JSON.parse(localStorage.getItem('data')) || [];

savedData.forEach(({ name, email }) => {
    createBox(name, email);
});