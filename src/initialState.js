import {projects, newProject} from "./project";
import {newTask} from "./task";

(function(){
    
    const initialProjectNames = ["My First Project"];

    const initialTasks = [{
                          urgency: 1,
                          title: "Have fun",
                          desc: "Try out all the features of this client-side task tracker, create new projects, add desired tasks and edit them as you wish ! You can also delete this default generated task by using the bin icon to your right.",
                          deadline: "2025-03-12"}]

    projects.addProject(newProject(initialProjectNames[0]));

    projects.getData()[0].addTask(newTask(initialTasks[0].urgency, initialTasks[0].title, initialTasks[0].desc, initialTasks[0].deadline));

    projects.currentProject(0);
    
    return console.log("Initial data load complete...");
})();

