
const areas = ['Coding', 'Art', 'Reading'];

const dropdownElement = document.getElementById('area');

areas.forEach((area) => {

    const optionElement = document.createElement('option');

    optionElement.value = area.toLowerCase();

    optionElement.textContent = area;

    dropdownElement.appendChild(optionElement);
})


const addForm = document.getElementById('add-activity');

addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(addForm);

    const activity = Object.fromEntries(formData);

    console.log(activity);
})
