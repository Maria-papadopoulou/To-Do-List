window.addEventListener('load', () => {
    const form = document.querySelector("#new-task");
    const input = document.querySelector("#input-new-task");
    const taskList = document.querySelector("#tasks");
    const completedList = document.querySelector("#done-tasks");
    const popup = document.querySelector("#popup");
    const closePopupButton = document.querySelector("#close-popup");
    const editPopup = document.querySelector("#edit-popup");
    const saveEditButton = document.querySelector("#save-edit");
    const closeEditPopupButton = document.querySelector("#close-edit-popup");
    const editTextarea = document.querySelector("#edit-textarea");
    let currentTask;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskText = input.value.trim();

        if (taskText === '') {
            popup.style.display = 'flex';
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
            editPopup.style.display = 'flex';
        });

        task.querySelector('.delete').addEventListener('click', () => {
            task.remove();
        });

        task.querySelector('.complete').addEventListener('click', () => {
            task.classList.toggle('completed');
            if (task.classList.contains('completed')) {
                // Αφαίρεση των κουμπιών από τις ολοκληρωμένες εργασίες
                task.querySelector('.actions').innerHTML = '';
                completedList.appendChild(task);
            } else {
                // Προσθήκη ξανά των κουμπιών όταν η εργασία μετακινείται πίσω στις μη ολοκληρωμένες εργασίες
                task.querySelector('.actions').innerHTML = `
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                    <button class="complete">Complete</button>
                `;
                taskList.appendChild(task);
                addTaskActions(task);
            }
        });

        taskList.appendChild(task);
        input.value = '';
    });

    closePopupButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    saveEditButton.addEventListener('click', () => {
        if (currentTask) {
            const textElement = currentTask.querySelector('.text');
            textElement.textContent = editTextarea.value.trim();
            editPopup.style.display = 'none';
        }
    });

    closeEditPopupButton.addEventListener('click', () => {
        editPopup.style.display = 'none';
    });

    function addTaskActions(task) {
        task.querySelector('.edit').addEventListener('click', () => {
            currentTask = task;
            editTextarea.value = task.querySelector('.text').textContent;
            editPopup.style.display = 'flex';
        });

        task.querySelector('.delete').addEventListener('click', () => {
            task.remove();
        });

        task.querySelector('.complete').addEventListener('click', () => {
            task.classList.toggle('completed');
            if (task.classList.contains('completed')) {
                task.querySelector('.actions').innerHTML = '';
                completedList.appendChild(task);
            } else {
                task.querySelector('.actions').innerHTML = `
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                    <button class="complete">Complete</button>
                `;
                taskList.appendChild(task);
                addTaskActions(task);
            }
        });
    }
});
