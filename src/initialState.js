import {projects, newProject} from "./project";
import {newTask} from "./task";

(function(){
    
    const initialProjectNames = ["Initial project", "2nd initial project"]

    const initialTasks = [{
                          urgency: 1,
                          title: "Initial task",
                          desc: "This is an initial task to be loaded upon the webpage rendering, if you are seeing this - mission success !",
                          deadline: "12 / 03 / 2025"},
                         {
                            urgency: 3,
                            title: "Initial 2nd task",
                            desc: "This is an initial second task to be loaded upon the webpage rendering, if you are seeing this - Hooray !",
                            deadline: "27 / 03 / 2025"}]

    projects.addProject(newProject(initialProjectNames[0]));
    projects.addProject(newProject(initialProjectNames[1]));

    projects.getData()[0].addTask(newTask(initialTasks[0].urgency, initialTasks[0].title, initialTasks[0].desc, initialTasks[0].deadline));
    projects.getData()[0].addTask(newTask(initialTasks[1].urgency, initialTasks[1].title, initialTasks[1].desc, initialTasks[1].deadline));
    projects.getData()[1].addTask(newTask(initialTasks[1].urgency, initialTasks[1].title, initialTasks[1].desc, initialTasks[1].deadline));

    projects.currentProject(0);
    
    return console.log("Initial data load complete...");
})();

