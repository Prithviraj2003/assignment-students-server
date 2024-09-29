const express = require("express");
const app = express();
const port = 8888;
const cors = require("cors");
app.use(cors());
const superAdmin = {
  name: "superAdmin",
  password: "123",
};
const teachers = [
  {
    id: 1,
    name: "prithvi",
    subject: "English",
    password: "123",
  },
  {
    id: 2,
    name: "sandeep",
    subject: "Math",
    password: "123",
  },
  {
    id: 3,
    name: "dinesh",
    subject: "Hindi",
    password: "123",
  },
  {
    id: 4,
    name: "vishal",
    subject: "Science",
    password: "123",
  },
  {
    id: 5,
    name: "kiran",
    subject: "SocialScience",
    password: "123",
  },
];
const students = [
  {
    id: 1,
    name: "Abhishek",
    password: "123",
    marks: {
      English: 97,
      Math: 98,
      Hindi: 96,
      Science: 100,
      SocialScience: 100,
    },
    totalMarks: 491,
  },
  {
    id: 2,
    name: "Bibek",
    password: "123",
    marks: {
      English: 91,
      Math: 94,
      Hindi: 92,
      Science: 99,
      SocialScience: 99,
    },
    totalMarks: 475,
  },
  {
    id: 3,
    name: "Citu",
    password: "123",
    marks: {
      English: 91,
      Math: 93,
      Hindi: 94,
      Science: 97,
      SocialScience: 98,
    },
    totalMarks: 473,
  },
  {
    id: 4,
    name: "Deva",
    password: "123",
    marks: {
      English: 77,
      Math: 88,
      Hindi: 56,
      Science: 90,
      SocialScience: 80,
    },
    totalMarks: 391,
  },
  {
    id: 5,
    name: "Esak",
    password: "123",
    marks: {
      English: 85,
      Math: 95,
      Hindi: 90,
      Science: 90,
      SocialScience: 100,
    },
    totalMarks: 460,
  },
];

app.use(express.json());

app.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (username === superAdmin.name && password === superAdmin.password) {
    res.send({ name: superAdmin.name });
  } else {
    const teacher = teachers.find(
      (teacher) => teacher.name === username && teacher.password === password
    );
    if (teacher) {
      res.send({ name: teacher.name, subject: teacher.subject });
    } else {
      const student = students.find(
        (student) => student.name === username && student.password === password
      );
      if (student) {
        res.send({ name: student.name, student: true });
      } else {
        res.send("Invalid username or password");
      }
    }
  }
});

app.post("/students/add", (req, res) => {
  console.log(req.body);

  if (
    teachers.includes(req.body.username) ||
    superAdmin.name === req.body.username
  ) {
    const { student } = req.body;
    const id = students.length + 1;
    console.log(id);
    students.push({
      id,
      name: student.name,
      password: student.password,
      marks: student.marks,
      totalMarks: student.totalMarks,
    });
    console.log(students);
    res.send(students);
  } else {
    res.status(400).send("Unauthorized");
  }
});

app.post("/addTeacher", (req, res) => {
  if (superAdmin.name === req.body.username) {
    const { name, subject, password } = req.body;
    teachers.push({ name, subject, password });
    res.send(teachers);
  } else {
    res.status(400).send("Unauthorized");
  }
});

app.put("/students/:id", (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const { student } = req.body;
  const index = students.findIndex((student) => student.id === parseInt(id));
  console.log(index);
  students[index] = student;
  res.send(students);
});

app.get("/students", (req, res) => {
  res.send(students);
});

app.get("/teachers", (req, res) => {
  res.send(teachers);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
