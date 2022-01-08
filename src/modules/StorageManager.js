import Folder from "./Folder";

let inboxFolder = new Folder("Inbox")

export default class StorageManager {
    constructor () {
        
    }

    initialize = () => {
        if (localStorage.length === 0) {
            let folders = {
                Inbox : inboxFolder
            };
            localStorage.setItem("folders", JSON.stringify(folders));
        }
    }

    createFolder = (folder) => {
        //folder = folder.toLowerCase();
        let folders = JSON.parse(localStorage.getItem("folders"));
        folders[folder] = new Folder(folder);
        localStorage.setItem("folders", JSON.stringify(folders));
    }

    getFolder = (folder) => {
        //folder = folder.toLowerCase();
        let result = new Folder();
        let f = JSON.parse(localStorage.getItem("folders"))[folder];
        console.log(folder);
        if (f == undefined) return false
        result.construct(f)
        return result;
    }

    updateToday = () => {
        let today = new Folder("Today")
        today.tasks = [].concat.apply([], (Object.getOwnPropertyNames(JSON.parse(localStorage.folders)).filter((x) => x != "Today" && x != "Week").map((x) => JSON.parse(localStorage.folders)[x].tasks))).filter(x => x.dueDate == new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, '0') + "-" + String(new Date().getDate()).padStart(2, '0'));
        let folders = JSON.parse(localStorage.getItem("folders"));
        folders["Today"] = today;
        localStorage.setItem("folders", JSON.stringify(folders));
    }

    updateWeek = () => {
        const yearMonth = new Date().getFullYear() + "-" + String(new Date().getMonth()+1).padStart(2, '0') + "-";
        let dates = [
            yearMonth + String(new Date().getDate()).padStart(2, '0'),
            yearMonth + String(new Date().getDate()+1).padStart(2, '0'),
            yearMonth + String(new Date().getDate()+2).padStart(2, '0'),
            yearMonth + String(new Date().getDate()+3).padStart(2, '0'),
            yearMonth + String(new Date().getDate()+4).padStart(2, '0'),
            yearMonth + String(new Date().getDate()+5).padStart(2, '0'),
            yearMonth + String(new Date().getDate()+6).padStart(2, '0')
        ]    
        //console.log(dates);
        let week = new Folder("Week")
        week.tasks = [].concat.apply([], (Object.getOwnPropertyNames(JSON.parse(localStorage.folders)).filter((x) => x != "Today" && x != "Week").map((x) => JSON.parse(localStorage.folders)[x].tasks))).filter(x => dates.includes(x.dueDate));
        let folders = JSON.parse(localStorage.getItem("folders"));
        folders["Week"] = week;
        localStorage.setItem("folders", JSON.stringify(folders));
    }

    folderExists = (folder) => {
        return this.getFolder(folder) != false;
    }

    deleteFolder = (folder) => {
        let folders = JSON.parse(localStorage.getItem("folders"));
        delete folders[folder];
        localStorage.setItem("folders", JSON.stringify(folders));
    }

    updateFolder = (folder, updatedFolder) => {
        let folders = JSON.parse(localStorage.getItem("folders"));
        folders[folder] = updatedFolder;
        localStorage.setItem("folders", JSON.stringify(folders));
    }

    addTask = (task, folder) => {
        let updatedFolder = this.getFolder(folder);
        updatedFolder.addTask(task);
        this.updateFolder(folder, updatedFolder);
    }

    removeTask = (task, folder) => {
        let updatedFolder = this.getFolder(folder);
        updatedFolder.removeTask(task);
        this.updateFolder(folder, updatedFolder);
    }

    taskExists = (task, folder) =>
    {
        return (this.getFolder(folder).tasks.map((task) => {
            return task.name;
        })).includes(task);
    }
    /*populateFolder = (folder, n) => {
        for (let i = 1; i <= n; i++) {
            folder.addTask(new Task("Task " + i.toString(), i.toString()+"/10/13", "Now")); 
        }
    }*/
}