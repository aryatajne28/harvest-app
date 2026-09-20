
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
    addActivity(Object.fromEntries(formData));

    renderActivities();
    calculateAreaTotals();
    addForm.reset();
});


calculateAreaTotals();
