import { refreshRows } from "./create_task_list.js";
import {getCSRFToken} from "./get_csrf.js"
export function addDeleteFunction(button){
        button.addEventListener("click", async() => {
            const task_id = button.dataset.taskId;
            console.log(`Deleting task with task id: ${task_id}`);
            const response = await fetch(`/delete-task/${task_id}/`, {
                method: "DELETE",
                headers: {
                    "X-CSRFToken": getCSRFToken(),
                }
            })
            const data = await response.json()
            try{
                if (data.message === "Task Deleted") {
                    const delete_element = document.getElementById(`container-${task_id}`);
                    const rows = document.querySelectorAll(".row");
                    rows.forEach(row =>{
                        // Rows that haven't displayed yet won't be affected by the delete animation.
                        if (!row.hasAttribute("data-index")){
                            row.style.opacity = 0;
                        }
                    })
                    // Make sure to match the timer to the transition duration in styles.css
                    setTimeout(() =>{
                        delete_element.remove();
                        refreshRows();
                        rows.forEach(row =>{
                            if (!row.hasAttribute("data-index")){
                                row.style.opacity = 1;
                            }
                        })
                    }, 800);
                }
            }
            catch(error){
                console.error(`Error deleting task with id: ${task_id}`, error)
            }
        })
}
