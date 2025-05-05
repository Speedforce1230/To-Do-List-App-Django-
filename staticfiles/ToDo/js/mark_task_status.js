import { getCSRFToken } from "./get_csrf.js";
export function addStatusFunctionality(button){
    button.addEventListener("click", async function(){
        const task_id = button.dataset.taskId;
        let response = await fetch(`/get-data/${task_id}/`);
        let data = await response.json();
        try{
            let new_status = !data.status;
            let update_response = await fetch(`/update-status/${task_id}/`, {
                method: "PATCH",
                headers: {
                    "X-CSRFToken": getCSRFToken(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({status: new_status})
            });
            let updated_data = await update_response.json()
            try{
                if (updated_data.message === "Changed Status"){
                    const card = document.getElementById(`card-${task_id}`);
                    if (new_status){
                        card.classList.add("task-completed");
                        card.classList.remove("task-pending");
                    }
                    else{
                        card.classList.add("task-pending");
                        card.classList.remove("task-completed");
                    }
                }
            }
            catch(error){
                console.error("Error updating status: ", error);
            }
            
        }
        catch(error){
            console.error("Error fetching status", error);
        }
    })
}