
const areas = ['Coding', 'Art', 'Reading'];
let activities = [];
const dropdownElement = document.getElementById('area');

areas.forEach((area) => {
    const optionElement = document.createElement('option');
    optionElement.value = area;
    optionElement.textContent = area;
    dropdownElement.appendChild(optionElement);
})


const addForm = document.getElementById('add-activity');

function addActivity(activity) {
    activities.push({ ...activity, id: crypto.randomUUID() });
};

function deleteActivity(event) {
    const idToDelete = event.target.dataset.id;

    activities = activities.filter((activity) => activity.id !== idToDelete);
    renderActivities();
    calculateAreaTotals();
};

let isEditingFlag = 0;
let idToEdit = null;

function editActivity(event) {
    idToEdit = event.target.dataset.id;
    isEditingFlag = 1;
    const activityToEdit = activities.find((activity => activity.id === idToEdit));

    document.getElementById('activity_name').value = activityToEdit.activity_name;
    document.getElementById('area').value = activityToEdit.area;
    document.getElementById('time').value = activityToEdit.time;
    document.getElementById('notes').value = activityToEdit.notes;
};

function renderActivities() {
    const activityListElement = document.getElementById('activity-list');
    activityListElement.innerHTML = '';

    activities.forEach((activity) => {
        const listElement = document.createElement('li');
        listElement.textContent = `${activity.activity_name} - ${activity.area} - ${activity.time}`;

        const deleteButton = document.createElement('button');
        deleteButton.dataset.id = activity.id;
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', deleteActivity);

        const editButton = document.createElement('button');
        editButton.dataset.id = activity.id;
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', editActivity);

        listElement.appendChild(editButton);
        listElement.appendChild(deleteButton);
        activityListElement.appendChild(listElement);
    })
}

function calculateAreaTotals() {
    const activityTotalElement = document.getElementById('activity-totals')
    activityTotalElement.innerHTML = '';
    areas.forEach((area) => {
        let total = 0;
        activities.forEach((activity) => {
            if (area === activity.area) {
                total += Number(activity.time);
            }
        })

        const li = document.createElement('li');
        li.textContent = `${area} - ${total} minutes`;
        activityTotalElement.appendChild(li);
    });
}

addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(addForm);

    const activity = Object.fromEntries(formData);

    if (isEditingFlag) {
        activityToEdit = activities.find((activity) => activity.id === idToEdit);
        activityToEdit.activity_name = activity.activity_name;
        activityToEdit.area = activity.area;
        activityToEdit.time = activity.time;
        activityToEdit.notes = activity.notes;
    }
    else addActivity(activity);

    renderActivities();
    calculateAreaTotals();
    addForm.reset();
});


calculateAreaTotals();
