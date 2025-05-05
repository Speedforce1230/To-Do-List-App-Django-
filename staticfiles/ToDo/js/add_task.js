import {createCard } from "./create_card.js"
import { getCSRFToken } from "./get_csrf.js"
import { refreshRows } from "./create_task_list.js";
export function addTask(){
    const add_task_bar_element = document.querySelector(".add-task-bar");
    add_task_bar_element.addEventListener("click", async function(){
        let new_description = "New Description";
        let new_title = "New Title";
        let response = await fetch("/add-task/", {
            method: "POST",
            headers: {
                "X-CSRFToken": getCSRFToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title: new_title, description: new_description})
        });
        let data = await response.json();
        try{
            if (data.message === "Added"){
                let new_card = createCard(data.task_id, new_title, new_description, false);
                let rows = document.querySelectorAll(".row");
                let last_row = rows[rows.length - 1];
                let rowLimit = window.innerWidth <= 768 ? 2: 3;
                // To prevent overflow of the rows
                if (last_row.querySelectorAll(".container").length >= rowLimit){
                    const task_page = document.querySelector(".task-page");
                    let new_row = document.createElement("div");
                    new_row.classList.add("row");
                    task_page.appendChild(new_row);
                    new_row.appendChild(new_card);
                    refreshRows();
                }
                else{
                    last_row.appendChild(new_card);
                }
                new_card.querySelector(".edit-button").click();
                new_card.scrollIntoView({behavior: "smooth", block: "center"});
            }
        }
        catch(error){
            console.error("Error adding task: ", error);
        }
    })
}