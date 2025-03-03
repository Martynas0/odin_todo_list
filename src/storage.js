import {projects} from "./project";

export const storage = (function () {

    
    // requests data in JSON format from localStorage and converts it back to object literals without methods
    const getData = () => {
        const requestedData = localStorage.getItem("data");
        return JSON.parse(requestedData);
    }
    // sends data to localStorage after converting to JSON
    const saveData = () => {

       const dataObj = projects.getData();
       dataObj.forEach((item) => {
        item.tasks = item.getTasks().map(task => task.getProps());
       })

       localStorage.setItem("data", JSON.stringify(dataObj));
    }

    return {getData, saveData}
})();