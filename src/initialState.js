import {projects, newProject} from "./project";
import {newTask} from "./task";
import {storage} from "./storage";

(function(){
    // if there are projects/tasks in localstorage or an empty data array from previous initialization
    if (storage.getData()) {
        
        storage.getData().forEach((item, index) => {
            projects.addProject(newProject(item.name));
            projects.currentProject(index)
            item.tasks.forEach((item) => {
                projects.getCurrentProject().addTask(newTask(item.urgency, item.title, item.desc, item.deadline));
            })

        })
        projects.currentProject(0);
    }
    else { // initialize default and send to localstorage.
        const initialProjectNames = ["My First Project"];

        const initialTasks = [{
                            urgency: 1,
                            title: "Have fun",
                            desc: "Try out all the features of this client-side task tracker, create new projects, add desired tasks and edit them as you wish ! You can also delete this default generated task by using the bin icon to your right.",
                            deadline: "2025-03-12"}]

        projects.currentProject(0)
        projects.addProject(newProject(initialProjectNames[0]));
        projects.getCurrentProject().addTask(newTask(initialTasks[0].urgency, initialTasks[0].title, initialTasks[0].desc, initialTasks[0].deadline));

    }
    
    
    return console.log("Initial data load complete...");
})();

