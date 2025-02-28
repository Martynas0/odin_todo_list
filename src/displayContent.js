import "./styles/style.css";
import "./styles/task.css";
import "./styles/project.css";

import {projects, newProject, newTask} from "./initialState";


export const display = (function(){
    
    const currentProjectTasks = document.querySelector("div.task-container");
    const currentProjectTitle = document.querySelector(".current-project-title > h3");
    const menuItems = document.querySelectorAll("div.project-menu > button[type='button']");
    const menu = document.querySelector("div.project-menu");

    const render = () => {
        renderMenu();
        renderProject();
    }

    const renderMenu = () => {
        
        const nodeList = projects.getData().map((item, index) => {
            const menuItem = document.createElement("button");
            const icon = document.createElement("span");
            const text = document.createTextNode(item.name);
            
            menuItem.setAttribute("type", "button");
            menuItem.dataset.index = index;
            icon.classList.add("mdi", "mdi-clipboard-text-play");
            
            menuItem.append(icon, text);
            
            return menuItem;
        })
        
        menuItems.forEach(item => item.remove());
        nodeList.forEach(item => menu.appendChild(item));

    }

    const renderProject = () => {

        const title = projects.getData()[projects.currentProject()].name;
        const tasks = projects.getData()[projects.currentProject()].getTasks();

        // Update title
        const text = document.createTextNode(title);
        currentProjectTitle.removeChild(currentProjectTitle.lastChild);
        currentProjectTitle.appendChild(text);

        // Update tasks
        const nodeList = tasks.map((item) => {
            const container = document.createElement("div");
            const title = document.createElement("p");
            const expandIcon = document.createElement("span");
            // yikes... would love to use some of that jQuery now :(
            const dueDate = document.createElement("div");
            const dueDateTitle = document.createElement("p");
            const dueDateTitleIcon = document.createElement("span");
            const dueDateTitleText = document.createTextNode("Deadline");
            const dueDateDate = document.createElement("p");

            const deleteIcon = document.createElement("span");
            const desc = document.createElement("div");

            container.classList.add("task", taskBorderColor(item.urgency));
            expandIcon.classList.add("mdi", "mdi-chevron-down");
            dueDate.classList.add("due-date");
            dueDateTitleIcon.classList.add("mdi", "mdi-clock");
            deleteIcon.classList.add("mdi", "mdi-delete");
            desc.classList.add("task-desc");

            title.textContent = item.title;
            dueDateDate.textContent = item.deadline;
            desc.textContent = item.desc;

            dueDateTitle.append(dueDateTitleIcon, dueDateTitleText);
            dueDate.append(dueDateTitle, dueDateDate);

            container.append(title, expandIcon, dueDate, deleteIcon, desc);
            
            return container;
        })
        
        while (currentProjectTasks.firstChild) currentProjectTasks.removeChild(currentProjectTasks.lastChild);
        nodeList.forEach(item => currentProjectTasks.appendChild(item));
    }

    const taskBorderColor = (urgency) => {
        if (urgency === 1) return "optional";
        if (urgency === 2) return "normal";
        if (urgency === 3) return "urgent";
    }

    projects.currentProject(1);
    render(); // Render upon initial page load

})();

export {projects};