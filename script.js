const inputToDo = document.querySelector("#input-to-do");
const btnToDo = document.querySelector("#add-to-do-btn");
const ulToDo = document.querySelector("#to-do-list");
const urlToDoAPI = "http://localhost:4730/todos";
const btnDeleteDone = document.querySelector("#delete-done-to-do");

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
    checkbox.checked = todo.done;
    checkbox.value = toDoDescription;
    checkbox.id = todo.id;
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

ulToDo.addEventListener("change", (e) => {
  e.checked = true;

  const updatedToDo = {
    id: e.target.id,
    description: e.target.value,
    done: true,
  };
  const urlIdToDoAPI = urlToDoAPI + "/" + e.target.id;
  fetch(urlIdToDoAPI, {
    method: "PUT",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(updatedToDo),
  })
    .then((response) => response.json())
    .then((backendState) => {});
});

btnDeleteDone.addEventListener("click", () => {
  getRequestAPI();
  todos.forEach((todo) => {
    if (todo.done === true) {
      fetch(urlToDoAPI + "/" + todo.id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((backendState) => {});
    }
  });
});
