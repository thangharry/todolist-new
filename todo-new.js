const form = document.querySelector("form");
const input = document.querySelector("input");
const btn = document.querySelector("button");
const todos = document.querySelector("ul");
const clear = document.querySelector(".clear");
// const replace = document.querySelector(".replace");

// const replace = document.querySelector(".replace");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let val = input.value.trim();

    if (val) {
        todolist({
            text: val,
            // status: "complete",
        });
        saveTodo();
    }
    input.value = "";
});

let todolist = (todo) => {
    let liItem = document.createElement("li");
    liItem.innerHTML = `
       
            <span>${todo.text}</span>
            <i class="fa-solid fa-pencil replace"></i>
            <i class="fa-solid fa-trash-can clear"></i>
       
    `;
    // if (todo.status === "complete") {
    //     liItem.setAttribute("class", "completed");
    // }

    liItem.querySelector("span").addEventListener("click", () => {
        // liItem.addEventListener("click", () => {
        liItem.classList.toggle("completed");
        saveTodo();
        // });
    });
    todos.appendChild(liItem);

    liItem.querySelector(".clear").addEventListener("click", () => {
        if (
            confirm(
                `bạn có muốn xóa ${
                    liItem.querySelector(".clear").previousElementSibling
                        .previousElementSibling.innerText
                } ko?`
            ) == true
        ) {
            liItem.querySelector(".clear").parentElement.remove();
            saveTodo();
        }
    });
    // saveTodo();

    liItem.querySelector(".replace").addEventListener("click", function () {
        input.value =
            liItem.querySelector(".replace").previousElementSibling.innerText;
        console.log(liItem.querySelector(".replace").previousElementSibling);
        btn.innerText = "EDIT ";

        liItem.querySelector(".replace").parentElement.remove();
    });

    btn.addEventListener("click", function () {
        let val = input.value.trim();

        if (val) {
            todolist({
                text: val,
            });
            saveTodo();
        }
        input.value = "";
        btn.innerText = "ADD";
    });
};

let saveTodo = () => {
    let todogroup = document.querySelectorAll("li");
    let todostorage = [];
    todogroup.forEach((value) => {
        let text = value.querySelector("span").innerText;
        todostorage.push(text);
    });

    localStorage.setItem("todo", JSON.stringify(todostorage));
};
let init = () => {
    let todos = JSON.parse(localStorage.getItem("todo"));
    if (todos) {
        todos.forEach((value) => {
            todolist({
                text: value,
            });
        });
    }
};
init();
