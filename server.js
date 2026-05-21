const express = require("express");

const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Олександр Данилюк", group: "ІКЗ-33" },
    { id: 2, name: "Іван Петренко", group: "ІПЗ-31" },
    { id: 3, name: "Марія Коваль", group: "ІПЗ-32" }
];

app.get("/", (req, res) => {
    res.send("Hello from Node.js server");
});

app.get("/students", (req, res) => {
    res.json(students);
});
app.post("/students", (req, res) => {

    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        group: req.body.group
    };

    students.push(newStudent);

    res.json({
        message: "Student added",
        student: newStudent
    });
});

app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(item => item.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.group = req.body.group;

    res.json({
        message: "Student updated",
        student: student
    });
});
app.delete("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    students = students.filter(item => item.id !== id);

    res.json({
        message: "Student deleted"
    });
});
app.listen(3000, () => {
    console.log("Server started on port 3000");
});