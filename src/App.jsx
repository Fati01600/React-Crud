import { useState, useEffect } from 'react';
import './App.css';
import PersonForm from "./components/PersonForm";
import StudentList from "./components/StudentList";
import { fetchData } from "./utils/fetchData";

function App() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // Hent data
  useEffect(() => {
    fetchData("http://localhost:3000/students", setStudents);
    fetchData("http://localhost:3000/classes", setClasses);
  }, []);

  // Tilføj ny studerende
  const addStudent = (student) => {
    fetchData(
      "http://localhost:3000/students",
      (newStudent) => setStudents([...students, newStudent]),
      "POST",
      student
    );
  };

  // Slet en studerende
  const deleteStudent = (id) => {
    fetchData(
      `http://localhost:3000/students/${id}`,
      () => setStudents(students.filter((s) => s.id !== id)),
      "DELETE"
    );
  };

  // Opdater en studerende
  const editStudent = (updatedStudent) => {
    fetchData(
      `http://localhost:3000/students/${updatedStudent.id}`,
      (newStudent) =>
        setStudents(
          students.map((s) => (s.id === newStudent.id ? newStudent : s))
        ),
      "PUT",
      updatedStudent
    );
    setEditingStudent(null);
  };

  // Håndter "Edit"-knappen
  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  return (
    <div className="container">
      <div className="left-section">
        <h1>Student List</h1>
        <StudentList
          students={students}
          classes={classes}
          onEdit={handleEdit}
          onDelete={deleteStudent}
        />
      </div>
      <div className="right-section">
        <h1>{editingStudent ? "Edit Student" : "Add Student"}</h1>
        <PersonForm
          classes={classes}
          onSubmit={editingStudent ? editStudent : addStudent}
          editingStudent={editingStudent}
        />
      </div>
    </div>
  );
}

export default App;
