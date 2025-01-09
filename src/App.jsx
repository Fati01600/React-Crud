import { useState, useEffect } from "react";
import "./App.css";
import PersonForm from "./components/PersonForm";
import StudentList from "./components/StudentList";
import { fetchData } from "./utils/fetchData";

function App() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // Henter data fra API'et
  useEffect(() => {
    fetchData("/students", setStudents);
    fetchData("/classes", setClasses);
    fetchData("/teachers", setTeachers);
  }, []);

 
  const addStudent = (student) => {
    fetchData(
      "/students",
      (newStudent) => setStudents([...students, newStudent]),
      "POST",
      student
    );
  };

  
  const deleteStudent = (id) => {
    fetchData(
      `/students/${id}`,
      () => setStudents(students.filter((s) => s.id !== id)),
      "DELETE"
    );
  };

  
  const editStudent = (updatedStudent) => {
    fetchData(
      `/students/${updatedStudent.id}`,
      (newStudent) =>
        setStudents(
          students.map((s) => (s.id === newStudent.id ? newStudent : s))
        ),
      "PUT",
      updatedStudent
    );
    setEditingStudent(null);
  };

  // redigeringstilstand for en specifik elev
  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  return (
    <div className="container">
      {/* Studenterlisten */}
      <div className="left-section">
        <h1>Student List</h1>
        <StudentList
          students={students}
          classes={classes}
          teachers={teachers}
          onEdit={handleEdit}
          onDelete={deleteStudent}
        />
      </div>

      {/* tilføjelse eller redigering */}
      <div className="right-section">
        <h1>{editingStudent ? "Edit Student" : "Add Student"}</h1>
        <PersonForm
          classes={classes}
          teachers={teachers}
          onSubmit={editingStudent ? editStudent : addStudent}
          editingStudent={editingStudent}
        />
      </div>
    </div>
  );
}

export default App;
