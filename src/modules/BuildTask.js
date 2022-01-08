const BuildTask = (task) => {
    let taskElement = document.createElement('div');
    taskElement.classList.add("task");
    let name = document.createElement('div');
    let icon = document.createElement('i');
    icon.classList.add('material-icons');
    icon.classList.add('taskEnd');
    icon.textContent = 'check_box_outline_blank';
    icon.onclick = (e) => {
        e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
    };
    name.appendChild(icon);
    let nametag = document.createElement('p');
    nametag.textContent = task.name;
    name.appendChild(nametag);
    name.classList.add("taskName");
    let date = document.createElement('div');
    date.textContent = task.dueDate;
    date.classList.add("taskDate");
    taskElement.appendChild(name);
    taskElement.appendChild(date);
    return taskElement;
}

export default BuildTask;