let optionButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let  spacingButtons = document.querySelectorAll(".spacing");
let  formatButtons = document.querySelectorAll(".format");
let  scriptButtons = document.querySelectorAll(".script");

//list of  fontList
let  fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "Poppins",
  "cursive",
];

//initial settings
const initializer = () => {
//function calls for highlighting buttons
//no highlights for link, unlink, lists, undo, redo since they are one time operation
highlighter(alignButtons, true);
highlighter(spacingButtons, true);
highlighter(formatButtons, false);
highlighter(scriptButtons, true);

//create options for font names
fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
   fontName.appendChild(option);
 });

//fontSize allows only till 7
for (let i = 1; i <=7; i++){
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
}
fontSizeRef.value = 3;
};

//main logic
const modifyText = (command,defaultui, value) => {
    //execCommand executes command on selected text 
document.execCommand(command, defaultui, value);
};

//for basic operations which don"t need value parameter
optionButtons.forEach((button) => {
button.addEventListener("click", ()=> {
    modifyText(button.id, false, null);
});
});

//option that require value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", ()=> {
    modifyText(button.id, false, button.value);
});
});
//link 
linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL");
    //if the link has http then pass directly else add http 
    if(/http/i.test(userLink)) { modifyText(linkButton.id, false, userLink);
    }else{
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

//Highlight clicked button
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
   button.addEventListener("click", () => {

if (needsRemoval) {
    let alreadyActive = false;
 if ( button.classList.contains("active"))  {
    alreadyActive = true;
 }
 
 highlighterRemover(className);
 if(!alreadyActive) {
    button.classList.add("active");
 }
}
 else {
    button.classList.toggle("active");
}
    });
    });
};

const highlighterRemover = (className) => {
    className.forEach((button) => {
   button.classList.remove("active");
});
};
window.onload = initializer();