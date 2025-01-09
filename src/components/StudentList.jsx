import React from "react";

const StudentList = ({ students, classes, onEdit, onDelete }) => {
  const getClassNames = (classIds) =>
    classIds.map((id) => classes.find((cls) => cls.id === Number(id))?.name).join(", ");

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Classes</th>
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
            <td>{getClassNames(student.classes)}</td>
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
