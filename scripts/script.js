
const areasObjectArray = [{ area: 'Coding', total: 0 }, { area: 'Art', total: 0 }, { area: 'Reading', total: 0 }];

const dropdownElement = document.getElementById('area');

areasObjectArray.forEach((area) => {
    const optionElement = document.createElement('option');
    optionElement.value = area.area;
    optionElement.textContent = area.area;
    dropdownElement.appendChild(optionElement);
})


const addForm = document.getElementById('add-activity');

addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(addForm);

    const areaFormValue = formData.get('area');

    const areaValue = areasObjectArray.find((area) => area.area == areaFormValue);

    areaValue.total += Number(formData.get('time'));
    renderAreasList();
});

const activityListElement = document.getElementById('activity-list')

const renderAreasList = () => {
    areasObjectArray.forEach((areaItem) => {
        const activityElement = document.createElement('li');
        activityElement.textContent = `${areaItem.area} : ${(areaItem.total) / 60} hrs `;
        activityListElement.appendChild(activityElement);
    })
}