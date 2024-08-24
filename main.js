window.addEventListener('load', () => {
    const form = document.querySelector("#new-task");
    const input = document.querySelector("#input-new-task");
    const taskList = document.querySelector("#tasks");
    const completedList = document.querySelector("#done-tasks");
    const popup = document.querySelector("#popup");
    const closePopup = document.querySelector("#close-popup");
    const editPopup = document.querySelector("#edit-popup");
    const saveEdit = document.querySelector("#save-edit");
    const closeEditPopup = document.querySelector("#close-edit-popup");
    const editTextarea = document.querySelector("#edit-textarea");

    let currentTask;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskText = input.value.trim();

        if (taskText === '') {
            popup.style.display = 'flex'; // Εμφανίστε το pop-up αν το κείμενο είναι κενό
            return;
        }

        const task = document.createElement('div');
        task.classList.add('task');

        task.innerHTML = `
            <div class="content">
                <p class="text">${taskText}</p>
            </div>
            <div class="actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
                <button class="complete">Complete</button>
            </div>
        `;

        task.querySelector('.edit').addEventListener('click', () => {
            currentTask = task;
            editTextarea.value = task.querySelector('.text').textContent;
            editPopup.style.display = 'flex'; // Εμφανίστε το pop-up επεξεργασίας
        });

        task.querySelector('.delete').addEventListener('click', () => {
            task.remove();
        });

        task.querySelector('.complete').addEventListener('click', () => {
            task.classList.toggle('completed');
            if (task.classList.contains('completed')) {
                // Αφαίρεση των κουμπιών από το task που μεταφέρεται στην ενότητα ολοκληρωμένων
                const actions = task.querySelector('.actions');
                actions.remove(); // Αφαίρεση των κουμπιών

                completedList.appendChild(task);
            } else {
                taskList.appendChild(task);
            }
        });

        taskList.appendChild(task);
        input.value = '';
    });

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none'; // Κλείστε το pop-up όταν κάνετε κλικ στο κουμπί
    });

    closeEditPopup.addEventListener('click', () => {
        editPopup.style.display = 'none'; // Κλείστε το pop-up επεξεργασίας όταν κάνετε κλικ στο κουμπί
    });

    saveEdit.addEventListener('click', () => {
        if (currentTask) {
            const textElement = currentTask.querySelector('.text');
            textElement.textContent = editTextarea.value.trim();
            editPopup.style.display = 'none'; // Κλείστε το pop-up επεξεργασίας μετά την αποθήκευση
        }
    });
});
