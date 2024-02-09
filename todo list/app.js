const inputBox = document.getElementById('input-box') 
const listContainer = document.getElementById('List-container')
function addTask(){
    if (inputBox === '') {
        alert("You must write Something!");
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
    }
} 