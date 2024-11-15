import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; // Ensure this path is correct
import '../styles/Student.css'; // For styling
import Modal from 'react-modal'; // For modals (install this package: npm install react-modal)

const Student = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [lastName, setLastName] = useState('');
  const [lrnNumber, setLrnNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [parentName, setParentName] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false); // Track edit mode
  const [editingStudentId, setEditingStudentId] = useState(null); // Track student being edited

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('User').select('*');
    if (error) {
      console.error('Error fetching students:', error.message);
    } else {
      setStudents(data);
      setFilteredStudents(data); // Set filtered students initially to all students
    }
    setLoading(false);
  };

  const addOrUpdateStudent = async () => {
    if (!firstName || !lastName || !lrnNumber || !contactNumber || !parentName) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true); // Add loading state while processing

    try {
      if (editMode) {
        // Log the student ID and data being updated
        console.log('Updating student with ID:', editingStudentId);
        console.log('Updated data:', {
          First_Name: firstName,
          Last_Name: lastName,
          Middle_Initial: middleInitial,
          LRN_Number: lrnNumber,
          Contact_Number: contactNumber,
          Parent_Name: parentName,
          updated_at: new Date().toISOString(),
        });

        // Update existing student
        const { error } = await supabase
          .from('User')
          .update({
            First_Name: firstName,
            Last_Name: lastName,
            Middle_Initial: middleInitial,
            LRN_Number: lrnNumber,
            Contact_Number: contactNumber,
            Parent_Name: parentName,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingStudentId); // Update by student ID

        if (error) {
          console.error('Error updating student:', error.message); // Log error
          throw new Error(error.message); // Throw error to be caught in the catch block
        }

        // Fetch fresh data after successful update
        await fetchStudents();
        resetForm();
        setSuccessModalVisible(true);
        setEditMode(false);
        setEditingStudentId(null);
      } else {
        // Log the data being inserted
        console.log('Adding new student with data:', {
          First_Name: firstName,
          Last_Name: lastName,
          Middle_Initial: middleInitial,
          LRN_Number: lrnNumber,
          Contact_Number: contactNumber,
          Parent_Name: parentName,
        });

        // Add new student
        const { data, error } = await supabase
          .from('User')
          .insert([{
            First_Name: firstName,
            Last_Name: lastName,
            Middle_Initial: middleInitial,
            LRN_Number: lrnNumber,
            Contact_Number: contactNumber,
            Parent_Name: parentName,
            status_marker: false,
            created_at: new Date().toISOString(),
          }]);

        if (error) {
          console.error('Error adding student:', error.message); // Log error
          throw new Error(error.message); // Throw error to be caught in the catch block
        }

        resetForm();
        setSuccessModalVisible(true); // Show success modal
        // Fetch fresh data from the database
        await fetchStudents();
      }
    } catch (error) {
      console.error('Error processing student data:', error.message); // Log the error
      alert('An error occurred while updating/adding the student. Please try again later.');
    } finally {
      setLoading(false); // Stop loading once done
    }
  };

  const resetForm = () => {
    setFirstName('');
    setMiddleInitial('');
    setLastName('');
    setLrnNumber('');
    setContactNumber('');
    setParentName('');
  };

  const deleteStudent = async (id) => {
    const { error } = await supabase.from('User').delete().eq('id', id);
    if (error) {
      console.error('Error deleting student:', error.message);
    } else {
      const updatedStudents = students.filter(student => student.id !== id);
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = students.filter(student =>
      `${student.First_Name} ${student.Middle_Initial ? student.Middle_Initial + '. ' : ''}${student.Last_Name}`.toLowerCase().includes(query) ||
      student.LRN_Number.toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
    setSearchModalVisible(false); // Close search modal
    setSearchQuery(''); // Clear search input
  };

  const handleEdit = (student) => {
    setFirstName(student.First_Name);
    setMiddleInitial(student.Middle_Initial);
    setLastName(student.Last_Name);
    setLrnNumber(student.LRN_Number);
    setContactNumber(student.Contact_Number);
    setParentName(student.Parent_Name);
    setEditMode(true); // Enable edit mode
    setEditingStudentId(student.id); // Store the ID of the student being edited
  };

  return (
    <div className="student-container">
      <header className="student-header">
        <h1>Student Management</h1>
        <button onClick={() => setSearchModalVisible(true)} className="search-button">Search</button>
      </header>

      <div className="student-form">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Middle Initial"
          value={middleInitial}
          onChange={(e) => setMiddleInitial(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="LRN Number"
          value={lrnNumber}
          onChange={(e) => setLrnNumber(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Parent Name"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
          className="input-field"
        />
        <button onClick={addOrUpdateStudent} className="add-button">{editMode ? 'Update Student' : 'Add Student'}</button>
      </div>

      <h2 className="student-list-heading">Student List</h2>
      {loading ? <p>Loading...</p> : (
        <table className="student-list">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Middle Initial</th>
              <th>Last Name</th>
              <th>LRN Number</th>
              <th>Contact Number</th>
              <th>Parent Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.First_Name}</td>
                <td>{student.Middle_Initial}</td>
                <td>{student.Last_Name}</td>
                <td>{student.LRN_Number}</td>
                <td>{student.Contact_Number}</td>
                <td>{student.Parent_Name}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(student)}>Edit</button>
                  <button className="delete-button" onClick={() => deleteStudent(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Success Modal */}
      <Modal 
        isOpen={successModalVisible} 
        onRequestClose={() => setSuccessModalVisible(false)}
        className="success-modal"
      >
        <h2>Success!</h2>
        <p>Student data has been successfully updated/added.</p>
        <button onClick={() => setSuccessModalVisible(false)}>Close</button>
      </Modal>

      {/* Search Modal */}
      <Modal 
        isOpen={searchModalVisible} 
        onRequestClose={() => setSearchModalVisible(false)}
        className="search-modal"
      >
        <input
          type="text"
          placeholder="Search for a student"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </Modal>
    </div>
  );
};

export default Student;
