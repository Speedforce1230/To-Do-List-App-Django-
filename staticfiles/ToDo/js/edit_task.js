import {getCSRFToken} from "./get_csrf.js"
export function addEditSaveFunction(edit_button, save_button, undo_button){
    
    edit_button.addEventListener("click", function(){
        const task_id = edit_button.dataset.taskId;
        const card = document.getElementById(`card-${task_id}`);
        const description_element = card.querySelector(".task-description");
        const title_element = card.querySelector(".task-heading");
        const original_title = title_element.innerText;
        const original_description = description_element.innerText;
        title_element.contentEditable = "true";
        description_element.contentEditable = "true";
        
        edit_button.classList.add("hidden");
        save_button.classList.remove("hidden");
        undo_button.classList.remove("hidden");
        title_element.focus();
        undo_button.onclick = function(){
            title_element.innerText = original_title;
            description_element.innerText = original_description;
            title_element.contentEditable = "false";
            description_element.contentEditable = "false";
            edit_button.classList.remove("hidden");
            save_button.classList.add("hidden");
            undo_button.classList.add("hidden");
        }
    })
    save_button.addEventListener("click", async function(){
        const task_id = save_button.dataset.taskId;
        const card = document.getElementById(`card-${task_id}`);
        const description = card.querySelector(".task-description");
        const title = card.querySelector(".task-heading");
        const new_title = title.textContent.trim();
        const new_description = description.textContent.trim();
        const response = await fetch(`/edit-task/${task_id}/`, {
            method: "PATCH",
            headers: {
                "X-CSRFToken": getCSRFToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({description: new_description, title: new_title})
        });
        const data = await response.json();
        try{
            if (data.message === "Changed"){
                description.contentEditable = "false";
                title.contentEditable = "false";
                save_button.classList.add("hidden");
                undo_button.classList.add("hidden");
                edit_button.classList.remove("hidden");
            }
        }
        catch(error){
            console.error("Error editing task: ", error);
        }
        
    })
}
