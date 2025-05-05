function slideIn(element, animation="slide-left-to-right"){
    if (!element || !(element instanceof HTMLElement)){
        console.error("Not a valid HTML element: ", element);
        return;
    }
    element.style.opacity = 1;
    if (animation === "slide-left-to-right"){
        element.classList.add("slide-left-to-right");
        element.addEventListener("animationend", function(){
            element.classList.remove("slide-left-to-right")
        })
    }
    else if (animation === "slide-right-to-left"){
        element.classList.add("slide-right-to-left");
        element.addEventListener("animationend", function(){
            element.classList.remove("slide-right-to-left")
        })
    }
}
export function assignAnimationObservers(){
    //todo Consider refactoring to make it a bit clener. For now, it works.
    const rows = document.querySelectorAll(".row");
    
    const row_observer = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if (entry.isIntersecting){
                const index = entry.target.dataset.index;
                slideIn(entry.target, index%2 === 0 ? "slide-left-to-right": "slide-right-to-left");
                row_observer.unobserve(entry.target);
                entry.target.removeAttribute("data-index");
            }
        })
    }, {
        threshold: 0.5
    })
    rows.forEach((row, index)=>{
        row.dataset.index = index;
        row_observer.observe(row);
    });
}