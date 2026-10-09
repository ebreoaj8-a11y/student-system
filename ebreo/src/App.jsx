import { useEffect, useState } from "react";
import axios from "axios";
const API = "http://localhost:5000/students";
function App() {
 const [students, setStudents] = useState([]);
 const [name, setName] = useState("");
 const [course, setCourse] = useState("");
 const [age, setAge] = useState("");
 const [editingId, setEditingId] = useState(null);
 const [error, setError] = useState("");
 const getStudents = async () => {
   try {
     const response = await axios.get(API);
     setStudents(response.data);
   } catch (err) {
     setError("Cannot load students.");
   }
 };
 useEffect(() => {
   getStudents();
 }, []);
 const clearForm = () => {
   setName("");
   setCourse("");
   setAge("");
   setEditingId(null);
 };
 const handleSubmit = async (e) => {
   e.preventDefault();
   setError("");
   const studentData = {
     name,
     course,
     age: Number(age)
   };
   try {
     if (editingId) {
       await axios.put(
         `${API}/${editingId}`,
         studentData
       );
     } else {
       await axios.post(API, studentData);
     }
     clearForm();
     await getStudents();
   } catch (err) {
     setError("Failed to save student.");
   }
 };
 const editStudent = (student) => {
   setEditingId(student._id);
   setName(student.name);
   setCourse(student.course);
   setAge(String(student.age));
 };
 const deleteStudent = async (id) => {
   if (!window.confirm("Delete this student?")) {
     return;
   }
   try {
     await axios.delete(`${API}/${id}`);
     if (editingId === id) clearForm();
     await getStudents();
   } catch (err) {
     setError("Failed to delete student.");
   }
 };
 return (
<div style={{ padding: "30px" }}>
<h1>Student Management System</h1>
<h2>
       {editingId ? "Edit Student" : "Add Student"}
</h2>
<form onSubmit={handleSubmit}>
<input
         type="text"
         placeholder="Name"
         value={name}
         onChange={(e) => setName(e.target.value)}
         required
       />
<input
         type="text"
         placeholder="Course"
         value={course}
         onChange={(e) => setCourse(e.target.value)}
         required
       />
<input
         type="number"
         placeholder="Age"
         value={age}
         onChange={(e) => setAge(e.target.value)}
         min="1"
         required
       />
<button type="submit">
         {editingId ? "Update Student" : "Add Student"}
</button>
       {editingId && (
<button type="button" onClick={clearForm}>
           Cancel
</button>
       )}
</form>
     {error && <p role="alert">{error}</p>}
<h2>Student List</h2>
     {students.map((student) => (
<div key={student._id}>
<p>Name: {student.name}</p>
<p>Course: {student.course}</p>
<p>Age: {student.age}</p>
<button onClick={() => editStudent(student)}>
           Edit
</button>
<button
           onClick={() => deleteStudent(student._id)}
>
           Delete
</button>
<hr />
</div>
     ))}
</div>
 );
}
export default App;
