
const areas = ['Coding', 'Art', 'Reading'];
const activities = [];
const dropdownElement = document.getElementById('area');

areas.forEach((area) => {
    const optionElement = document.createElement('option');
    optionElement.value = area;
    optionElement.textContent = area;
    dropdownElement.appendChild(optionElement);
})


const addForm = document.getElementById('add-activity');

function addActivity(activity) {
    activities.push(activity);
}

function renderActivities() {
    const activityListElement = document.getElementById('activity-list');
    activityListElement.innerHTML = '';

    activities.forEach((activity) => {
        const listElement = document.createElement('li');
        listElement.textContent = `${activity.activity_name} - ${activity.area} - ${activity.time}`;
        activityListElement.appendChild(listElement);
    })
}

function calculateAreaTotals() {
    const activityTotalElement = document.getElementById('activity-totals')
    activityTotalElement.innerHTML = '';
    areas.forEach((area) => {
        var total = 0;
        activities.forEach((activity) => {
            if (area == activity.area) {
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
