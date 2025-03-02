
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
    }

    const removeCurrentProject = () => {
        data.splice(currentProjectIndex, 1);
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
    }

    const addTask = (task) => {
        tasks.push(task);
    }

    return {name, addTask, getTasks, removeTask}
};

export {projects, newProject};

