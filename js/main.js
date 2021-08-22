const inputEl = document.querySelector('.form-item-input');
const btnEl = document.querySelector('.form-item-btn');
const taskList = document.querySelector('.task-list');

btnEl.addEventListener("click", addnote);
taskList.addEventListener('click', taskDoneRemove);
document.addEventListener('DOMContentLoaded', readLocalStorage);

function taskDoneRemove(e) {
    e.preventDefault();
    clickEl = e.target;

    if(clickEl.classList.contains('task-done')){
        clickEl.parentElement.classList.toggle('task-item-done');
    }
    if(clickEl.classList.contains('task-remove')){

        if(confirm('Are you sure?')){
            clickEl.parentElement.classList.toggle('remove');
            const removeEl = clickEl.parentElement.children[0].innerText;
            console.log(removeEl);
            removeLocalStorage(removeEl);
            
            clickEl.parentElement.addEventListener('transitionend',function(){
                clickEl.parentElement.remove();
            });
        }
        
        
    }
}

function addnote(e){

    e.preventDefault();
    console.log(inputEl.value.length);
    if(inputEl.value.length > 0){
        createItem(inputEl.value);

        writeLocalStorage(inputEl.value);
        inputEl.value = "";
    }else{
        alert("the task cannot be empty");
    }
    console.log(inputEl.value.length);
    
}

function createItem(task){
    // create div
    createDiv = document.createElement('div');
    createDiv.classList.add('task-item');

    // create li
    createLi = document.createElement('li');
    createLi.classList.add('task-desc');
    createLi.innerText = task;

    // create done button
    createDoneBtn = document.createElement('button');
    createDoneBtn.classList.add('task-btn');
    createDoneBtn.classList.add('task-done');
    createDoneBtn.innerHTML='<i class="far fa-check-square">';
    // create done button
    createRemoveBtn = document.createElement('button');
    createRemoveBtn.classList.add('task-btn');
    createRemoveBtn.classList.add('task-remove');
    createRemoveBtn.innerHTML='<i class="far fa-trash-alt">';

    // append parent element
    createDiv.appendChild(createLi);
    createDiv.appendChild(createDoneBtn);
    createDiv.appendChild(createRemoveBtn);
    taskList.appendChild(createDiv);
}

function writeLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function readLocalStorage(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(task => {
        createItem(task);
    });
}

function removeLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    const removeItemIndex = tasks.indexOf(task);
    console.log(removeItemIndex);
    tasks.splice(removeItemIndex,1);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}
