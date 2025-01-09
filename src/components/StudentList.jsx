import React from "react";

const StudentList = ({ students, classes, onEdit, onDelete }) => {
  const getClassName = (classIds) => {
    if (!classes || classes.length === 0) return "Unknown";
    return classIds
      .map((id) => {
        const foundClass = classes.find((cls) => cls.id === id);
        return foundClass ? foundClass.name : "Unknown";
      })
      .join(", ");
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Classes</th>
          <th>Teacher</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.age}</td>
            <td>{student.email}</td>
            <td>{getClassName(student.classes)}</td>
            <td>{student.teacher}</td>
            <td>
              <button onClick={() => onEdit(student)}>Edit</button>
              <button onClick={() => onDelete(student.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
