// Used to verify requests and prevent malicious requests. Embed the function as a header in every request that changes server data.
export function getCSRFToken(){
    return document.querySelector('[name=csrfmiddlewaretoken]').value;
}
