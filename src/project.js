import {storage} from "./storage";

const projects = (function(){
    
    const data = []
    let currentProjectIndex;

    const currentProject = (value) => {
        if (value || value === 0) {
            currentProjectIndex = value;
        }
        return currentProjectIndex;
    }

    const getCurrentProject = () => {
        return data[currentProjectIndex];
    }

    const getData = () => {
        return data;
    }

    const addProject = (project) => {
        data.push(project);
        storage.saveData();
    }

    const removeCurrentProject = () => {
        data.splice(currentProjectIndex, 1);
        storage.saveData();
    }

    return {getData, addProject, currentProject, getCurrentProject, removeCurrentProject};
})();


const newProject = (name) => {  

    const tasks = [];

    const getTasks = () => {
        return tasks;
    }
    
    const removeTask = (index) => {
        tasks.splice(index, 1);
        storage.saveData();
    }

    const addTask = (task) => {
        tasks.push(task);
        storage.saveData();
    }

    return {name, addTask, getTasks, removeTask}
};

export {projects, newProject};

