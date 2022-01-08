export default class Task {
    constructor(name, dueDate, priority) {
        this.name = name;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    getDueDate() {
        return dueDate.dueDate;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    getPriority() {
        return this.priority;
    }



}