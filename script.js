const inputToDo = document.querySelector("#input-to-do");
const btnToDo = document.querySelector("#add-to-do-btn");
const ulToDo = document.querySelector("#to-do-list");
const urlToDoAPI = "http://localhost:4730/todos";

let todos = [];
function getRequestAPI() {
  fetch(urlToDoAPI)
    .then((request) => request.json())
    .then((toDosFromAPI) => {
      todos = toDosFromAPI;
      renderState();
    });
}
getRequestAPI();

function renderState() {
  todos.forEach((todo) => {
    const newLi = document.createElement("li");
    const checkbox = document.createElement("input");
    const toDoDescription = todo.description;
    newLi.innerText = toDoDescription;
    checkbox.type = "checkbox";
    newLi.appendChild(checkbox);
    ulToDo.appendChild(newLi);
  });
}

btnToDo.addEventListener("click", () => {
  const newToDoDescription = inputToDo.value;
  const newTodo = {
    description: newToDoDescription,
    done: false,
  };
  fetch(urlToDoAPI, {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  })
    .then((response) => response.json())
    .then((backendState) => {});
});
