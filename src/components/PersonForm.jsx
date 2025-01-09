import React, { useState, useEffect } from "react";

const PersonForm = ({ classes, teachers, onSubmit, editingStudent }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    email: "",
    classes: [],
    teacher: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      setFormData({
        id: "",
        name: "",
        age: "",
        email: "",
        classes: [],
        teacher: "",
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "class") {
      const selectedClasses = Array.from(e.target.selectedOptions, (option) =>
        parseInt(option.value)
      );
      setFormData({ ...formData, classes: selectedClasses });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      id: "",
      name: "",
      age: "",
      email: "",
      classes: [],
      teacher: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="id">Id</label>
      <input
        id="id"
        type="number"
        placeholder="Enter id"
        value={formData.id || ""}
        onChange={handleChange}
      />

      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="age">Age</label>
      <input
        id="age"
        type="number"
        min="1"
        max="120"
        placeholder="Enter age"
        value={formData.age}
        onChange={handleChange}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="class">Classes</label>
      <select id="class" multiple value={formData.classes} onChange={handleChange}>
        {classes.map((cls) => (
          <option key={cls.id} value={cls.id}>
            {cls.name}
          </option>
        ))}
      </select>

      <label htmlFor="teacher">Teacher</label>
<select
  id="teacher"
  value={formData.teacher || ""}
  onChange={handleChange}
>
  <option value="" disabled>
    Select a teacher
  </option>
  {teachers.map((teacher) => (
    <option key={teacher.id} value={teacher.name}>
      {teacher.name}
    </option>
  ))}
</select>


      <button type="submit">{editingStudent ? "Update" : "Save"}</button>
    </form>
  );
};

export default PersonForm;
