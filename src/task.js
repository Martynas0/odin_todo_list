import {storage} from "./storage";

export const newTask = (urgency, title, desc, deadline) => {

    
    let open = false;

    const isOpen = () => {
        return open;
    }

    const closeTask = () => {
        open = false;
    }

    const expandToggle = () => {
        if (!open) {
            open = true;
        }
        else {
            open = false;
        }
    }

    const setProps = (u, t, d, dl) => {
        urgency = u;
        title = t;
        desc = d;
        deadline = dl;
        storage.saveData();
    }

    const getProps = () => {
        return {urgency, title, desc, deadline};
    }


    return {urgency, title, desc, deadline, expandToggle, isOpen, closeTask, setProps, getProps};
}