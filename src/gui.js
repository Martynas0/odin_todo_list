import "./styles/style.css";
import "./styles/task.css";
import "./styles/project.css";
import "./styles/new-task.css";

import {projects, newProject} from "./project";
import {newTask} from "./task";


export const display = (function(){
    
    const currentProjectTasks = document.querySelector("div.task-container");
    const currentProjectTitle = document.querySelector(".current-project-title > h3");
    const menu = document.querySelector("div.project-menu");
    const myProjects = document.querySelector("nav");
    const newProjectForm = document.querySelector("form.add-project");
    const newTaskModal = document.querySelector("dialog");
    const newTaskForm = document.querySelector("#new-task-form");
    const projectTab = document.querySelector(".current-project-container");
    const noProjectsWarning = document.querySelector(".no-projects-available");


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
        
        while (menu.firstChild) menu.removeChild(menu.lastChild);
        if (!nodeList.length) showEmptyMenuMessage();
        nodeList.forEach(item => menu.appendChild(item));

    }

    const renderProject = () => {

        // Display warning message div instead of current project div if no projects are available
        if (!projects.getData().length) {
            const text = document.createTextNode("No projects available...");
            currentProjectTitle.removeChild(currentProjectTitle.lastChild);
            currentProjectTitle.appendChild(text);

            projectTab.style.display = "none";
            noProjectsWarning.style.display = "block";
            return;
        }
        // Hide warning message div and display current project div again if projects have been added afterwards...
        projectTab.style.display = "flex";
        noProjectsWarning.style.display = "none";

        const title = projects.getCurrentProject().name;
        const tasks = projects.getCurrentProject().getTasks();

        // Update title
        const text = document.createTextNode(title);
        currentProjectTitle.removeChild(currentProjectTitle.lastChild);
        currentProjectTitle.appendChild(text);

        // Update tasks
        const nodeList = tasks.map((item, index) => {
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
            expandIcon.classList.add("mdi", item.isOpen() ? "mdi-chevron-up" : "mdi-chevron-down");
            dueDate.classList.add("due-date");
            dueDateTitleIcon.classList.add("mdi", "mdi-clock");
            deleteIcon.classList.add("mdi", "mdi-delete");
            desc.classList.add("task-desc", showDesc(item.isOpen()) );

            title.textContent = item.title;
            dueDateDate.textContent = item.deadline;
            desc.textContent = item.desc;

            dueDateTitle.append(dueDateTitleIcon, dueDateTitleText);
            dueDate.append(dueDateTitle, dueDateDate);

            container.dataset.index = index;
            container.append(title, expandIcon, dueDate, deleteIcon, desc);
            
            return container;
        })
        
        while (currentProjectTasks.firstChild) currentProjectTasks.removeChild(currentProjectTasks.lastChild);
        if (!nodeList.length) showEmptyProjectMessage();
        nodeList.forEach(item => currentProjectTasks.appendChild(item));
    }

    const showEmptyProjectMessage = () => {
        const message = document.createElement("p");
        message.classList.add("no-tasks-message");
        message.textContent = "Your project appears to not have any tasks, you may add tasks using the above button.";
        currentProjectTasks.appendChild(message);
    }

    const showEmptyMenuMessage = () => {
        const message = document.createElement("p");
        message.classList.add("empty-menu-message");
        message.textContent = "Nothing !";
        menu.appendChild(message);
    }

    const showDesc = (open) => {
        if (open) return "task-desc-show";
    }

    const taskBorderColor = (urgency) => {
        if (urgency === 1) return "optional";
        if (urgency === 2) return "normal";
        if (urgency === 3) return "urgent";
    }

    const handleNavigation = (e) => {
        if (e.target.dataset.index) {
            projects.currentProject(e.target.dataset.index);
            projects.getCurrentProject().getTasks().forEach(item => item.closeTask());
            render();
        }
        else if (e.target.className === "new-project-btn") {
            newProjectForm.classList.toggle("hide");
            newProjectForm.reset();
        }
        
    }

    const handleProjectTab = (e) => {
        // Expand / Close tasks
        if (e.target.className.includes("mdi-chevron-down")) { 
            projects.getCurrentProject().getTasks().forEach(item => item.closeTask());
            projects.getCurrentProject().getTasks()[e.target.parentNode.dataset.index].expandToggle();
            render();
            console.log(e.target.parentNode.dataset.index);
        }
        else if (e.target.className.includes("mdi-chevron-up")) {
            projects.getCurrentProject().getTasks()[e.target.parentNode.dataset.index].expandToggle();
            render();
        }
        else if (e.target.className.includes("mdi-delete")) {
            const i = projects.getCurrentProject().getTasks()[e.target.parentNode.dataset.index];
            projects.getCurrentProject().removeTask(i);
            render();
        }
        else if (e.target.className === "add-task") {
            newTaskModal.showModal();
            newTaskForm.reset();    
        }
        else if (e.target.className === "remove-project") {
            projects.removeCurrentProject();
            projects.currentProject(projects.getData().length - 1);
            render();
        }
        
    }

    const handleNewProject = (e) => {
        e.preventDefault();
        console.log(e.target[1].value)
        projects.addProject(newProject(e.target[1].value));
        newProjectForm.classList.toggle("hide");
        projects.currentProject(projects.getData().length - 1);
        render();
    }

    const handleNewTask = (e) => {
        const urgency = [e.target[1], e.target[2], e.target[3]].find(item => item.checked);
        projects.getCurrentProject().addTask(newTask(Number(urgency.value), e.target[4].value, e.target[6].value, e.target[5].value))
        render();
        
    }

    // -------------
    render(); // Render upon initial page load
    myProjects.addEventListener("click", handleNavigation);
    projectTab.addEventListener("click", handleProjectTab);
    newProjectForm.addEventListener("submit", handleNewProject);
    newTaskForm.addEventListener("submit", handleNewTask);

    newTaskModal.addEventListener("click", (e) => {
        if (e.target.className.includes("mdi-window-close")) newTaskModal.close();
    })
    
    

})();

