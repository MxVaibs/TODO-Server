const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let TODOs = [];

app.post("/POST/todos", (req, res) => {
  var todoTitle = req.body.title;
  var todoDescription = req.body.description;
  var todoID = Date.now();
  var todoStatus = false;

  var newTodo = {
    title: todoTitle,
    description: todoDescription,
    id: todoID,
    status: todoStatus,
  };
  TODOs.push(newTodo);
  res.status(200).send("Created ToDo successfully!!");
});

app.get("/GET/todos", (req, res) => {
  res.status(200).send(TODOs);
});

app.get("/GET/todos/:id", (req, res) => {
  var searchId = Number(req.params.id);
  var Todo = TODOs.find((todo) => todo.id === searchId);
  if (Todo) {
    res.status(200).send(Todo);
  } else {
    res.status(404).send("ToDo Not Found!!");
  }
});

app.put("/PUT/todos/:id", (req, res) => {
  var searchId = Number(req.params.id);
  var searchTodo = TODOs.find((todo) => todo.id === searchId);
  if (searchTodo) {
    searchTodo.title = req.body.title;
    searchTodo.description = req.body.description;
    res.status(200).send("ToDo Updated Successfully!!");
  } else {
    res.status(404).send("ToDo not Found!!");
  }
});

app.delete("/DELETE/todos/:id", (req, res) => {
  const searchId = Number(req.params.id);
  const Todo = TODOs.find((todo) => todo.id === searchId);
  if (Todo) {
    TODOs = TODOs.filter((todo) => todo.id !== searchId);
    res.status(200).send("ToDo Deleted Successfully!!");
  } else {
    res.status(404).send("ToDO not Found!!");
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
