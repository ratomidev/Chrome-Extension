const inputField = document.getElementById("input-el"); 
const saveBtn = document.getElementById("save-btn"); 
const currentLinkBtn = document.getElementById("currentLink-btn"); 
const resetBtn = document.getElementById("reset-btn");
const listUl = document.getElementById("id-ul") ; 
const state = JSON.parse(localStorage.getItem("listOfLinks")); ; 
let listOfLinks= state? state: []; 

renderListUl(listOfLinks); 

saveBtn.addEventListener("click", ()=>{
    if(validInput(inputField.value)) { 
        
    listOfLinks.push(inputField.value);
    inputField.value = ""; 
    renderListUl(listOfLinks);
    }
});

currentLinkBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(validInput(tabs[0].url)) {
        listOfLinks.push(tabs[0].url); 
        renderListUl(listOfLinks);
        }
    })
     
}); 

resetBtn.addEventListener("click", ()=>{
    listUl.innerHTML= ""; 
    listOfLinks= []; 
    localStorage.clear();  
});

function renderListUl(listOfLinks) {
    localStorage.setItem("listOfLinks", JSON.stringify(listOfLinks)); 
    listUl.innerHTML=""; 
    for(const item of listOfLinks) {
        listUl.innerHTML += `<li><a href="${item}" target="_blank">${item}</a></li>` 
    }
}

function validInput(str) {
        if(str==="")
            return false; 
        for(const item of listOfLinks){
            if(item===str)
                return false; 
        }
        return true; 
}
