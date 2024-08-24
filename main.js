window.addEventListener('load', () => {
    const form = document.querySelector("#new-task");
    const input = document.querySelector("#input-new-task");
    const list = document.querySelector("#tasks");
    const doneList = document.querySelector("#done-tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("Please add a task");
            return;
        }

        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const taskContent = document.createElement("div");
        taskContent.classList.add("content");

        taskElement.appendChild(taskContent);

        const taskInputElement = document.createElement("input");
        taskInputElement.classList.add("text");
        taskInputElement.type = "text";
        taskInputElement.value = task;
        taskInputElement.setAttribute("readonly", "readonly");

        taskContent.appendChild(taskInputElement);

        const taskActionsElement = document.createElement("div");
        taskActionsElement.classList.add("actions");

        const taskEditElement = document.createElement("button");
        taskEditElement.classList.add("edit");
        taskEditElement.innerHTML = "Edit";

        const taskDeleteElement = document.createElement("button");
        taskDeleteElement.classList.add("delete");
        taskDeleteElement.innerHTML = "Delete";

        const taskCompleteElement = document.createElement("button");
        taskCompleteElement.classList.add("complete");
        taskCompleteElement.innerHTML = "Complete";

        taskActionsElement.appendChild(taskEditElement);
        taskActionsElement.appendChild(taskDeleteElement);
        taskActionsElement.appendChild(taskCompleteElement);

        taskElement.appendChild(taskActionsElement);

        list.appendChild(taskElement);

        input.value = "";

        taskEditElement.addEventListener('click', () => {
            if (taskEditElement.innerText.toLowerCase() == "edit") {
                taskEditElement.innerText = "Save";
                taskInputElement.removeAttribute("readonly");
                taskInputElement.focus();
            } else {
                taskEditElement.innerText = "Edit";
                taskInputElement.setAttribute("readonly", "readonly");
            }
        });

        taskDeleteElement.addEventListener('click', () => {
            list.removeChild(taskElement);
        });

        taskCompleteElement.addEventListener('click', () => {
            taskElement.classList.add("completed");
            taskElement.removeChild(taskActionsElement); // Αφαιρεί τα κουμπιά
            doneList.appendChild(taskElement); // Μεταφέρει το task στη λίστα ολοκληρωμένων
        });
    });
});
