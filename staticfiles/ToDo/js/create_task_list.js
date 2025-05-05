
import { createCard } from "./create_card.js";
import { addTask } from "./add_task.js";
import { assignAnimationObservers } from "./animate.js";
let row_limit = window.innerWidth <= 768? 2: 3;
export async function createTaskList(){
    // Awaiting AJAX response
    const main_page = document.querySelector(".main-page");

    let response = await fetch("/task-list/");
    let data = await response.json();
    try{
        let currentRow = "";
        main_page.innerHTML = "";
        let task_page = document.createElement("div");
        task_page.classList.add("task-page");
        // Loop replicates the exact structure present in task_list.html 
        for (let i=0; i<data.task_list.length; i++){
            let current_task = data.task_list[i];
            if (i % row_limit === 0 || i === 0){
                currentRow = document.createElement("div");
                currentRow.classList.add("row");
                task_page.appendChild(currentRow);
                currentRow.style.opacity = 0;
            }
            let completed_card = createCard(current_task.id, current_task.title, current_task.description, current_task.completed);
            currentRow.appendChild(completed_card);
            
        }
        // For better clarity on the structure, read the file or inspect element.
        let add_task_bar = document.createElement("div");
        add_task_bar.classList.add("add-task-bar");
        
        add_task_bar.id = "add-task-bar";
        let heading_add_task = document.createElement("h1");
        heading_add_task.classList.add("raleway-font-bold");
        heading_add_task.innerText = "Add New Task";
        let icon_add_task = document.createElement("i");
        icon_add_task.classList.add("fa-solid", "fa-plus");
        add_task_bar.appendChild(heading_add_task);
        add_task_bar.appendChild(icon_add_task);
        main_page.appendChild(task_page);
        main_page.appendChild(add_task_bar);
        addTask();
        assignAnimationObservers();
    }
    catch(error){
        console.error(`Error creating task list`, error);
    }
}
export function refreshRows(){
    let all_containers = Array.from(document.querySelectorAll(".container"));
    let task_page = document.querySelector(".task-page");
    let add_task_bar = document.querySelector(".add-task-bar");
    let main_page = document.querySelector(".main-page");
    main_page.removeChild(add_task_bar);
    let i = 0;
    document.querySelectorAll(".row").forEach(row =>{
        // To Prevent Empty rows upon deletion if all the cards in a row are deleted.
        if (row.innerHTML.trim() === ""){
            task_page.removeChild(row);
        }
        else{
            row.innerHTML = "";
            for (let x=0; x<row_limit && i<all_containers.length; x++){
                row.appendChild(all_containers[i]);
                i+=1;
            }
        }
    })
    main_page.appendChild(add_task_bar);
    // fadeIn(task_page);
}

// Preventing excessive requests for DOM when testing responsive layout
let previous_size = window.innerWidth > 768 ? "large" : "small";
// timer to prevent multiple requests for small changes
let debounce_timer;
window.addEventListener("resize", function(){
    clearTimeout(debounce_timer);
    debounce_timer = setTimeout(() =>{
        let current_size = window.innerWidth > 768 ? "large": "small";
        if (current_size !== previous_size){
            console.log("Refreshing list");
            row_limit = window.innerWidth <= 768? 2: 3;
            createTaskList();
        }
        previous_size = current_size;
        }, 300)
    });
document.addEventListener("DOMContentLoaded", () =>{
    createTaskList();
});