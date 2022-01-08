export default class Folder {
    
    constructor(name = "") {
        this.name = name;
        this.tasks = [];
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskName) {
        this.tasks = this.tasks.filter(task => task.name != taskName);
    }

    construct(folder) {
        this.name = folder.name;
        this.tasks = folder.tasks;
    }

    
}