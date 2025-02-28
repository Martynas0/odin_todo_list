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


    return {urgency, title, desc, deadline, expandToggle, isOpen, closeTask};
}