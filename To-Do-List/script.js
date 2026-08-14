// select Dom Element 
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// Try to load saved todos from local storage (if any )
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    // Save current todos array to localstorage 
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Create a dom node for a todo object and append it to the list 
function createNode(todo, index) {
    const li = document.createElement('li');
    // Checkbox to toggle complement 
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        // todo : Visual Feedback: Strike-through when completed
        textSpan.style.textDecoration = todo.completed? 'line-through':"";
        saveTodos();
    })

    // text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }

    // Add double click event listner to edit todo
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim()
            textSpan.textContent = todo.text;
            saveTodos();
        }

    })

    // Delete todo Button
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li
}
// Render the whole todo list from todos array
function render() {
    list.innerHTML = '';

    // Recreate each item
    todos.forEach((todo, index) => {
        const node = createNode(todo, index);
        list.appendChild(node)
    });

}
function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    todos.push({ text, completed: false });
    input.value = '';
    render();
    saveTodos();
}

addBtn.addEventListener("click", addTodo);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});

render();