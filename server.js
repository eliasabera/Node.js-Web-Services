const express = require("express");
const fs = require("fs");
const soap = require("soap");
const http = require("http");

// Load student data
const studentsData = JSON.parse(fs.readFileSync("students.json", "utf8"));
const students = studentsData.students;

// Load WSDL
const wsdl = fs.readFileSync("studentService.wsdl", "utf8");

// Service implementation
const service = {
  StudentInfoService: {
    StudentInfoPort: {
      // Get student by ID
      GetStudent: function (args) {
        const studentId = parseInt(args.studentId, 10);
        console.log(`🔍 Searching for student with ID: ${studentId}`);

        const student = students.find((s) => s.id === studentId);

        if (!student) {
          console.log(`❌ Student not found with ID: ${studentId}`);
          throw {
            Fault: {
              Code: { Value: "soap:Sender" },
              Reason: { Text: "Student not found" },
              detail: {
                StudentNotFoundError: {
                  errorCode: 404,
                  errorMessage: `Student with ID ${studentId} not found`,
                },
              },
            },
          };
        }

        console.log(`✅ Found student: ${student.name}`);
        return { student: student };
      },

      // Get all students
      GetAllStudents: function (args) {
        console.log(`📋 Retrieving all ${students.length} students`);
        return { students: students };
      },

      // Search students by course
      SearchStudentsByCourse: function (args) {
        const course = args.course;
        console.log(`🎓 Searching students in course: ${course}`);

        const filteredStudents = students.filter((s) =>
          s.course.toLowerCase().includes(course.toLowerCase())
        );

        console.log(
          `✅ Found ${filteredStudents.length} students in ${course}`
        );
        return { students: filteredStudents };
      },
    },
  },
};

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// SOAP endpoint
const soapPath = "/wsdl";
soap.listen(server, soapPath, service, wsdl);

// Basic routes for testing
app.get("/", (req, res) => {
  res.send(`
    <h1>Student Info SOAP Service</h1>
    <p>Service is running. Available endpoints:</p>
    <ul>
      <li><a href="/wsdl?wsdl">WSDL Definition</a></li>
      <li><a href="/students">View All Students (JSON)</a></li>
    </ul>
  `);
});

// REST endpoint for quick testing (optional)
app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.json(student);
});

// Start server
const PORT = 8001;
server.listen(PORT, () => {
  console.log(
    `🚀 Student Info SOAP Service running at http://localhost:${PORT}`
  );
  console.log(`📖 WSDL available at: http://localhost:${PORT}/wsdl?wsdl`);
  console.log(
    `👨‍🎦 Sample student IDs: ${students.map((s) => s.id).join(", ")}`
  );
});
