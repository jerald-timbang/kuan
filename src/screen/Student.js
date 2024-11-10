// src/pages/Student.js
import React, { useState, useEffect } from 'react';
import '../styles/Student.css';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ id: null, firstName: '', lastName: '' });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStudents([
        { id: 1, first_name: 'John', last_name: 'Doe' },
        { id: 2, first_name: 'Jane', last_name: 'Smith' }
      ]);
    }, 2000);  // Simulating a delay like fetching data
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateStudent = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update student
      setStudents((prevStudents) => prevStudents.map((student) => 
        student.id === formData.id ? { ...student, first_name: formData.firstName, last_name: formData.lastName } : student
      ));
    } else {
      // Add new student
      setStudents((prevStudents) => [
        ...prevStudents,
        { id: prevStudents.length + 1, first_name: formData.firstName, last_name: formData.lastName }
      ]);
    }
    setFormData({ id: null, firstName: '', lastName: '' });
  };

  const handleEdit = (student) => {
    setFormData({ id: student.id, firstName: student.first_name, lastName: student.last_name });
  };

  const handleDelete = (id) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };

  return (
    <div className="student-container">
      <header className="student-header">
        <h1>Student Management</h1>
      </header>
      <div className="student-content">
        <form onSubmit={handleAddOrUpdateStudent} className="student-form">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{formData.id ? 'Update' : 'Add'} Student</button>
        </form>
        
        {loading ? (
          <p>Loading students...</p>
        ) : (
          <div className="student-list">
            <h2>Student List</h2>
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.first_name}</td>
                    <td>{student.last_name}</td>
                    <td>
                      <button onClick={() => handleEdit(student)}>Edit</button>
                      <button onClick={() => handleDelete(student.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
