
# SOAP Student Information Service

## Overview
The **SOAP Student Information Service** is a web service built using **Node.js** and **Express** that demonstrates how the **SOAP (Simple Object Access Protocol)** works for structured data exchange.  
It allows retrieving, listing, and searching student information using SOAP requests and WSDL definitions.

This project was developed as part of the **Web Services course** to illustrate how SOAP-based communication functions in distributed systems.

---

## Project Purpose / Learning Outcomes
The main goal of this project is to understand how SOAP services operate within service-oriented architecture (SOA).  
By completing this project, the student has learned to:
- Design and implement a SOAP web service using Node.js.  
- Define service operations using WSDL.  
- Handle SOAP requests and responses in XML format.  
- Manage data exchange between client and server securely and reliably.  
- Demonstrate integration of traditional web service standards with modern JavaScript tools.

---

## Features
- Implements **SOAP 1.1 protocol**
- Uses **WSDL** for service contract definition
- Supports operations to:
  - Retrieve a student by ID
  - List all students
  - Search students by course
- Provides structured XML responses and SOAP fault handling
- Includes sample **Ethiopian student data**

---

## System Architecture
The system is composed of:
1. **SOAP Server** – Handles incoming SOAP requests and responses  
2. **WSDL File** – Defines available operations, messages, and bindings  
3. **Data Layer** – JSON file acting as a local data source  

---

## Project Structure
```

soap-student-service/
├── package.json
├── server.js
├── studentService.wsdl
├── students.json
└── README.md

````

---

## Installation
```bash
git clone https://github.com/@eliasabera/soap-student-service.git
cd soap-student-service
npm install
````

---

## Usage

Start the service:

```bash
npm start
```

The server will be available at:

```
http://localhost:8001
```

WSDL endpoint:

```
http://localhost:8001/wsdl?wsdl
```

---

## Service Operations

### GetStudent

Retrieves details of a student by ID.

**Request**

```xml
<GetStudentRequest xmlns="http://example.com/student">
  <studentId>103</studentId>
</GetStudentRequest>
```

**Response**

```xml
<GetStudentResponse xmlns="http://example.com/student">
  <student>
    <id>103</id>
    <name>Eyob Birhanu</name>
    <course>Software Engineering</course>
    <gpa>3.9</gpa>
  </student>
</GetStudentResponse>
```

---

### GetAllStudents

Returns a list of all student records.

### SearchStudentsByCourse

Finds students enrolled in a specific course.

---

## Sample Data

| ID  | Name             | Course               | GPA  |
| --- | ---------------- | -------------------- | ---- |
| 101 | Elias Abera      | Software Engineering | 3.3  |
| 102 | Tsehaynesh Biruh | Software Engineering | 3.7  |
| 103 | Eyob Birhanu     | Software Engineering | 3.9  |
| 104 | Yeabsira Fekadu  | Software Engineering | 3.67 |
| 105 | Natnael Zewdu    | Software Engineering | 3.78 |

---

## Error Handling

Example SOAP fault response:

```xml
<soap:Fault>
  <faultcode>soap:Sender</faultcode>
  <faultstring>Student not found</faultstring>
  <detail>
    <StudentNotFoundError>
      <errorCode>404</errorCode>
      <errorMessage>Student with ID 999 not found</errorMessage>
    </StudentNotFoundError>
  </detail>
</soap:Fault>
```

---

## Testing

You can test using **Postman** :

1. Method: `POST`
2. URL: `http://localhost:8001/wsdl`
3. Header: `Content-Type: text/xml`
4. Body:

```xml
<GetStudentRequest xmlns="http://example.com/student">
  <studentId>101</studentId>
</GetStudentRequest>
```

---

## Technologies Used
* Node.js
* Express.js
* SOAP npm library
* WSDL (Web Service Definition Language)
* XML / JSON

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------list of students section 2 team-------------------------------------------------------------------------------------------
1. Tsehaynesh Biruh     RU0485/14
2. Eyob Birhanu          RU0039/14
3. Yeabsira Fekadu       RU4737/14
4. Natnael Zewdu         RU4687/14
5. Elias Abera           RU1738/14




