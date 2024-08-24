window.addEventListener('load', () => 
{
    const form=document.querySelector("#new-task");
    const input=document.querySelector("#input-new-task");
    const list=document.querySelector("#tasks");

    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        const task=input.value;

        if(!task)
        {
            alert("Please add a task");
            return;
        }
        const task_element=document.createElement("div");
        task_element.classList.add("task");

        const task_contenet=document.createElement("div");
        task_contenet.classList.add("content");
        

        task_element.appendChild(task_contenet);

        const task_input_element=document.createElement("input");
        task_input_element.classList.add("text");
        task_input_element.type="text";
        task_input_element.value=task;
        task_input_element.setAttribute("readonly", "readonly");

        task_contenet.appendChild(task_input_element);
        
        const task_actions_element=document.createElement("div");
        task_actions_element.classList.add("actions");

        const task_edit_element=document.createElement("button");
        task_edit_element.classList.add("edit");
        task_edit_element.innerHTML="Edit";

        const task_delete_element=document.createElement("button");
        task_delete_element.classList.add("delete");
        task_delete_element.innerHTML="Delete";
        
        task_actions_element.appendChild(task_edit_element);
        task_actions_element.appendChild(task_delete_element);

        task_element.appendChild(task_actions_element);


        list.appendChild(task_element);

        input.value="";


        task_edit_element.addEventListener('click', () =>{
            if (task_edit_element.innerText.toLowerCase() == "edit") {
				task_edit_element.innerText = "Save";
				task_input_element.removeAttribute("readonly");
				task_input_element.focus();
			} else {
				task_edit_element.innerText = "Edit";
				task_input_element.setAttribute("readonly", "readonly");
			}
        });
 
        task_delete_element.addEventListener('click', (e) => {
			list.removeChild(task_element);
		});
    });
});