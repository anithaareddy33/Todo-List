/*let inputElement = document.createElement('input');
inputElement.type = "checkbox";
inputElement.id = "myCheckbox";
document.body.appendChild(inputElement);

let labelElement = document.createElement('label');
//labelElement.htmlFor = "myCheckbox"; instead we can us setAttribute method
labelElement.setAttribute("for","myCheckbox");
labelElement.textContent = "Graduated";
document.body.appendChild(labelElement);*/

/*<li class="todo-items-container d-flex flex-row">
<input type="checkbox" class="checkbox-input" id="checkboxInput"/>
<div class="d-flex flex-row label-container">
<label for="checkboxInput" class="checkbox-label">
Learn HTML
</label>
<div class="delete-icon-container">
<i class="fa-solid fa-trash-can delete-icon"></i>
</div>
</div>
</li>
 */

let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage()
{
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);

    if(parsedTodoList === null)
    {
        return [];
    }
    else{
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();


/*let todoList = [
         {
            text : "Learn HTML",
            uniqueNo: 1
         },
         {
            text : "Learn CSS",
            uniqueNo: 2
         },
         {
            text : "Learn JavaScript",
            uniqueNo: 3
         },
         {
            text : "Learn React",
            uniqueNo: 4
         }
];*/

saveTodoButton.onclick = function()
{
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function getTodoListFromLocalStorage()
{
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);

    if(parsedTodoList === null)
    {
        return [];
    }
    else{
        return parsedTodoList;
    }
}
addTodoButton.onclick = function ()
{
    onAddTodo();
}


function onTodoStatusChange (checkboxId, labelId, todoId)
{
    let checkboxElement = document.getElementById(checkboxId);
    console.log(checkboxElement.checked);

    let labelElement = document.getElementById(labelId);
    /*
    if(checkboxElement.checked === true){
        labelElement.classList.add("checked");}
    else{
        labelElement.classList.remove("checked");}*/
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId)
        {
            return true;
        }
        else
        {
            return false;
        }

    });
    
    let todoObject = todoList[todoObjectIndex];

    if(todoObject.isChecked === true)
    {
        todoObject.isChecked = true;
    }

}

function onDeleteTodo(todoId)
{
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(function (eachTodo)
    {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId)
        {
            return true;
        }
        else {
            return false;
        }
    })
    todoList.splice(deleteElementIndex, 1);

}


function createAndAppendTodo(todo)
{
let todoId = "todo" + todo.uniqueNo;

let checkboxId = "checkbox" + todo.uniqueNo;
let labelId = "label" + todo.uniqueNo;

let todoElement = document.createElement("li");
todoElement.classList.add("todo-item-container","d-flex","flex-row");
todoElement.id = todoId;
todoItemsContainer.appendChild(todoElement);
//console.log(todoItemsContainer);

//creating a checkbox
let inputElement = document.createElement("input");
inputElement.type = "checkbox";
inputElement.id = checkboxId;
inputElement.checked = todo.isChecked;
inputElement.onclick = function()
{
    onTodoStatusChange(checkboxId, labelId,todoId);
}
inputElement.classList.add("checkbox-input");
todoElement.appendChild(inputElement);

let labelContainer = document.createElement("div");
labelContainer.classList.add("d-flex","flex-row","label-container");
todoElement.appendChild(labelContainer);

let labelElement = document.createElement("label");
labelElement.setAttribute("for", checkboxId);
labelElement.id = labelId;  
labelElement.classList.add("checkbox-label");
labelElement.textContent = todo.text;

if(todo.isChecked === true)
{
    labelElement.classList.add("checked");
}
labelContainer.appendChild(labelElement);

let deleteIconContainer = document.createElement("div");
deleteIconContainer.classList.add("delete-icon-container");
labelContainer.appendChild(deleteIconContainer);

let deleteIcon = document.createElement("i");
deleteIcon.classList.add("fa-solid","fa-trash-can","delete-icon");

deleteIcon.onclick = function ()
{
    onDeleteTodo(todoId);
}
deleteIconContainer.appendChild(deleteIcon);

}


function onAddTodo ()
{
    let todosCount = todoList.length;
    todosCount = todosCount+1;
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if(userInputValue === "")
    {
        alert("Enter valid input");
        return;
    }

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    }
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value="";

}


/*createAndAppendTodo(todoList[0]);
createAndAppendTodo(todoList[1]);
createAndAppendTodo(todoList[2]);*/

for (let eachTodo of todoList)
{
    createAndAppendTodo(eachTodo);
}
