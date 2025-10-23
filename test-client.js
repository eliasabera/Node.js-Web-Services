const soap = require("soap");
const url = "http://localhost:8001/wsdl?wsdl";

// Test the SOAP service
async function testService() {
  try {
    const client = await soap.createClientAsync(url);

    console.log(
      "🧪 Testing Student Info SOAP Service with Ethiopian Students...\n"
    );

    // Test 1: Get student with ID 103
    console.log("1. Getting student with ID 103 (Eyob Birhanu):");
    const result1 = await client.GetStudentAsync({ studentId: 103 });
    console.log("✅ Response:", JSON.stringify(result1[0], null, 2));

    // Test 2: Get student with ID 101
    console.log("\n2. Getting student with ID 101 (Elias Abera):");
    const result2 = await client.GetStudentAsync({ studentId: 101 });
    console.log("✅ Name:", result2[0].student.name);
    console.log("✅ Department:", result2[0].student.department);
    console.log("✅ GPA:", result2[0].student.gpa);

    // Test 3: Get non-existent student
    console.log("\n3. Getting student with ID 999 (should fail):");
    try {
      await client.GetStudentAsync({ studentId: 999 });
    } catch (error) {
      console.log("❌ Expected error:", error.body);
    }

    // Test 4: Get all students
    console.log("\n4. Getting all Software Engineering students:");
    const result4 = await client.GetAllStudentsAsync({});
    console.log(`✅ Found ${result4[0].students.length} students`);
    result4[0].students.forEach((student) => {
      console.log(
        `   - ${student.name} (ID: ${student.id}, GPA: ${student.gpa})`
      );
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

testService();
