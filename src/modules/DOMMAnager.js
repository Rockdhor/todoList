import StorageManager from "./StorageManager";
import Task from "./Task"
let SM = new StorageManager();
SM.initialize();
export default class DOMMAnager {
    constructor () {
        this.initialize;
    }
    
    initialize() {
        this.buildSideMenu();
        this.buildFolder();
    }

    buildSideMenu() {
        let sideMenu = document.getElementById("sideMenu");
        sideMenu.innerHTML = "";
        let nav = document.createElement("nav");
        nav.innerHTML = `
                        <div id="inboxButton"><i class="material-icons">mail</i><p>Inbox</p></div>
                        <div id="todayButton"><i class="material-icons">today</i><p>Today</p></div>
                        <div id="weekButton"><i class="material-icons">date_range</i><p>This Week</p></div>
                        <h2>Folders</h2>
        `
        Object.getOwnPropertyNames(JSON.parse(localStorage.folders)).filter((x) => x != "Inbox" && x != "Today" && x != "Week").forEach(folder => {
            let newFolderDiv = document.createElement("div");
            let folderName = document.createElement("p");
            folderName.textContent = folder;
            newFolderDiv.onclick = (e) => {
                //console.log(e.target.textContent);
                document.getElementById("activeFolderName").textContent = e.target.textContent;
                (new DOMMAnager).buildFolder();
            }
            newFolderDiv.appendChild(folderName);
            nav.appendChild(newFolderDiv);
        })
        let newFolder = document.createElement("div");
        newFolder.id = "newFolder";
        newFolder.innerHTML = `<i class="material-icons">create_new_folder</i>
        <p>New Folder</p>`;
        newFolder.onclick = () => {
            let folderName = prompt("Please enter the folder name.");
            folderName && !SM.folderExists(folderName) && SM.createFolder(folderName);
            (new DOMMAnager).buildSideMenu();
        }
        nav.appendChild(newFolder);
        sideMenu.appendChild(nav);
        document.getElementById("inboxButton").onclick = () => {
            document.getElementById("activeFolderName").textContent = "Inbox";
            (new DOMMAnager).buildFolder();
        }
        document.getElementById("todayButton").onclick = () => {
            document.getElementById("activeFolderName").textContent = "Today";
            (new StorageManager).updateToday();
            (new DOMMAnager).buildFolder();
        }
        document.getElementById("weekButton").onclick = () => {
            document.getElementById("activeFolderName").textContent = "Week";
            (new StorageManager).updateWeek();
            (new DOMMAnager).buildFolder();
        }
    }

    buildFolder() {
        let container = document.getElementById("todoContainer");
        let folder = SM.getFolder(document.getElementById("activeFolderName").textContent);
        container.innerHTML = "";
        //console.log(document.getElementById("activeFolderName").textContent, folder)
        folder.tasks.forEach(task => {
            let taskElement = document.createElement('div');
            taskElement.data=task;
            taskElement.classList.add("task");
            let name = document.createElement('div');
            let icon = document.createElement('i');
            icon.classList.add('material-icons');
            icon.classList.add('taskEnd');
            icon.textContent = 'check_box_outline_blank';
            icon.onclick = (e) => {
                if (document.getElementById("activeFolderName").textContent == "Today" || document.getElementById("activeFolderName").textContent == "Week") {
                    alert("Tasks must be marked complete from their respective folder.")
                }
                //console.log(e.target.parentNode.childNodes[1].textContent);
                SM.removeTask(e.target.parentNode.childNodes[1].textContent, document.getElementById("activeFolderName").textContent);
                (new DOMMAnager).buildFolder();
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

           
            container.appendChild(taskElement);
        });
        if (document.getElementById("activeFolderName").textContent == "Today" || document.getElementById("activeFolderName").textContent == "Week") return false;
        let newTaskElement = document.createElement('div');
        newTaskElement.classList.add("newTask");
        let nameTextBox = document.createElement('input');
        nameTextBox.id = "taskNameBox"
        let dateInput = document.createElement('input');
        dateInput.id = "dateInput"
        dateInput.type = "date";
        const todayDate = new Date(); //"2001-12-12";
        dateInput.value = todayDate.getFullYear() + "-" + String(todayDate.getMonth()+1).padStart(2, '0') + "-" + String(todayDate.getDate()).padStart(2, '0');
        let confirmButton = document.createElement('button');
        confirmButton.textContent = "Submit"
        confirmButton.onclick = () => {
            //console.log(document.getElementById("taskNameBox").value == "")
            if (document.getElementById("taskNameBox").value == "" || SM.taskExists(document.getElementById("taskNameBox").value, document.getElementById("activeFolderName").textContent)) return;
            SM.addTask(new Task(document.getElementById("taskNameBox").value, document.getElementById("dateInput").value, "Now"), document.getElementById("activeFolderName").textContent);
            (new DOMMAnager).buildFolder();
        }
        let inputs = document.createElement("div");
        inputs.appendChild(nameTextBox);
        inputs.appendChild(dateInput);
        newTaskElement.appendChild(inputs);
        newTaskElement.appendChild(confirmButton);
        container.appendChild(newTaskElement);

        document.getElementById("deleteFolder").onclick = () => {
            if (document.getElementById("activeFolderName").textContent == "Inbox" || document.getElementById("activeFolderName").textContent == "Today" || document.getElementById("activeFolderName").textContent == "Week") return;
            SM.deleteFolder(document.getElementById("activeFolderName").textContent)
            document.getElementById("activeFolderName").textContent = "Inbox";
            (new DOMMAnager).buildSideMenu();
            (new DOMMAnager).buildFolder();
        }

    }
}