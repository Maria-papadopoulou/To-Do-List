window.addEventListener('load', () => {
    const form = document.querySelector("#new-task");
    const input = document.querySelector("#input-new-task");
    const list = document.querySelector("#tasks");
    const popup = document.querySelector("#popup");
    const closeButton = document.querySelector("#close-popup");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            popup.style.display = 'flex'; // Εμφάνιση του pop-up
            return;
        }

        const task_element = document.createElement("div");
        task_element.classList.add("task");

        const task_content = document.createElement("div");
        task_content.classList.add("content");

        task_element.appendChild(task_content);

        const task_input_element = document.createElement("input");
        task_input_element.classList.add("text");
        task_input_element.type = "text";
        task_input_element.value = task;
        task_input_element.setAttribute("readonly", "readonly");

        task_content.appendChild(task_input_element);

        const task_actions_element = document.createElement("div");
        task_actions_element.classList.add("actions");

        const task_edit_element = document.createElement("button");
        task_edit_element.classList.add("edit");
        task_edit_element.innerHTML = "Edit";

        const task_delete_element = document.createElement("button");
        task_delete_element.classList.add("delete");
        task_delete_element.innerHTML = "Delete";

        const task_complete_element = document.createElement("button");
        task_complete_element.classList.add("complete");
        task_complete_element.innerHTML = "Complete";

        task_actions_element.appendChild(task_edit_element);
        task_actions_element.appendChild(task_delete_element);
        task_actions_element.appendChild(task_complete_element);

        task_element.appendChild(task_actions_element);

        list.appendChild(task_element);

        input.value = "";

        task_edit_element.addEventListener('click', () => {
            if (task_edit_element.innerText.toLowerCase() === "edit") {
                task_edit_element.innerText = "Save";
                task_input_element.removeAttribute("readonly");
                task_input_element.focus();
            } else {
                task_edit_element.innerText = "Edit";
                task_input_element.setAttribute("readonly", "readonly");
            }
        });

        task_delete_element.addEventListener('click', () => {
            list.removeChild(task_element);
        });

        task_complete_element.addEventListener('click', () => {
            task_element.classList.add('completed');
            document.querySelector("#done-tasks").appendChild(task_element);
            task_complete_element.remove(); // Αφαίρεση του κουμπιού Complete

            // Αφαίρεση των κουμπιών Edit και Delete
            task_element.querySelectorAll('.edit, .delete').forEach(btn => btn.remove());
        });
    });

    closeButton.addEventListener('click', () => {
        popup.style.display = 'none'; // Απόκρυψη του pop-up
    });

    // Κλείσιμο του pop-up όταν πατάς έξω από το περιεχόμενο
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});
