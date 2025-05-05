import { createTaskList } from "./create_task_list.js";
let main_page = document.querySelector(".main-page");
let about = document.getElementById("about");
let todo = document.getElementById("todo");
about.addEventListener("click", async function(){
    main_page.style.opacity = 0;
    await new Promise(resolve=> setTimeout(resolve, 150));
    try{
        let response = await fetch("/about-me/");
        let html = await response.text();
        main_page.innerHTML = html
        main_page.style.opacity = 1;
    }
    catch(error){
        console.error("Failed to load content: ", error);
    }
})

todo.addEventListener("click", function(){
    main_page.style.opacity = 0;
    setTimeout(()=>{
        createTaskList();
        main_page.style.opacity = 1;
    }, 150)
})
