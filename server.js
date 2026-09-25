const express = require("express");
const db = require("./database");

const app = express();

const PORT = 3000;


app.use(express.static("public"));

app.use(express.json());


app.post("/api/tasks", (req, res) => {

    const task = req.body.task;

    const statement = db.prepare(
        "INSERT INTO tasks (task) VALUES (?)"
    );

    statement.run(task);

    res.json({
        message: "Task saved successfully"
    });

});


app.get("/api/tasks", (req, res) => {

    const tasks = db.prepare(
        "SELECT * FROM tasks"
    ).all();

    res.json(tasks);

});

app.delete("/api/tasks/:id", (req, res) => {

    const id = req.params.id;

    db.prepare(
        "DELETE FROM tasks WHERE id = ?"
    ).run(id);

    res.json({
        message: "Task deleted successfully"
    });

});

app.patch("/api/tasks/:id", (req, res) => {

    const id = req.params.id;
    const completed = req.body.completed;

    db.prepare(
        "UPDATE tasks SET completed = ? WHERE id = ?"
    ).run(completed, id);

    res.json({
        message: "Task updated successfully"
    });

});


app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});