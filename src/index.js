import './style.css';
import Folder from './modules/Folder.js';
import Task from './modules/Task.js';
import BuildTask from './modules/BuildTask.js';
import StorageManager from './modules/StorageManager.js';
import DOMMAnager from './modules/DOMMAnager';

let DM = new DOMMAnager();
DM.initialize();

/*let inbox = new Folder("Inbox");

console.log([inbox])
localStorage.setItem('folders', JSON.stringify([inbox]));
console.log(JSON.parse(localStorage.getItem('folders')));

console.log(JSON.parse(localStorage.getItem('folders')));
let inbox = new Folder();
inbox.construct(JSON.parse(localStorage.getItem('folders'))[0]);
console.log(inbox);
inbox.buildFolder(document.getElementById("todoContainer"));*/
