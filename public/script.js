const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");


function addTaskToPage(task) {

    const li = document.createElement("li");

    const taskText = document.createElement("span");

    taskText.textContent = task.task;

    if (task.completed === 1) {
        taskText.classList.add("completed");
    }


    const completeButton = document.createElement("button");

    completeButton.textContent = "✓";

    completeButton.addEventListener("click", async function () {

    const newStatus = task.completed === 0 ? 1 : 0;

    await fetch(`/api/tasks/${task.id}`, {

        method: "PATCH",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            completed: newStatus
        })

    });

    task.completed = newStatus;

    taskText.classList.toggle(
        "completed",
        newStatus === 1
    );

});


    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", async function () {

    await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE"
    });

    li.remove();

});


    li.appendChild(taskText);

    li.appendChild(completeButton);

    li.appendChild(deleteButton);

    taskList.appendChild(li);
}


async function loadTasks() {

    const response = await fetch("/api/tasks");

    const tasks = await response.json();

    tasks.forEach(function (task) {

        addTaskToPage(task);

    });
}


addButton.addEventListener("click", async function () {

    const task = taskInput.value.trim();

    if (task === "") {
        return;
    }


    const response = await fetch("/api/tasks", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            task: task
        })

    });


    const data = await response.json();

    console.log(data);


    addTaskToPage({
        task: task
    });


    taskInput.value = "";

});


loadTasks();