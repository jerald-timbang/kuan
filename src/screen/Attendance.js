import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import '../styles/Attendance.css';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch attendance records from Supabase when component mounts
    const fetchAttendanceRecords = async () => {
      try {
        const { data, error } = await supabase
          .from('User') // Make sure this table name matches your Supabase table
          .select('id, created_at, Last_Name, First_Name, status_name');

        if (error) throw error;

        // Set fetched data to state
        setAttendanceRecords(data);
      } catch (error) {
        console.error('Error fetching attendance records:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceRecords();
  }, []);

  // Function to update the status in Supabase and the local state
  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('User')
        .update({ status_name: newStatus })
        .eq('id', id);

      if (error) throw error;

      // Update the state locally to reflect the change
      setAttendanceRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === id ? { ...record, status_name: newStatus } : record
        )
      );
    } catch (error) {
      console.error('Error updating status:', error.message);
    }
  };

  // Display loading message while fetching data
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="attendance-container">
      <header className="attendance-header">
        <h1>Attendance</h1>
      </header>
      <div className="attendance-content">
        <p>This is the attendance page. You can manage attendance records here.</p>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record.id}>
                  <td>{new Date(record.created_at).toLocaleDateString()}</td>
                  <td>{record.Last_Name}</td>
                  <td>{record.First_Name}</td>
                  <td>{record.status_name ? 'Present' : 'Absent'}</td>
                  <td>
                    <button 
                      onClick={() => updateStatus(record.id, true)} 
                      disabled={record.status_name === true}
                    >
                      Present
                    </button>
                    <button 
                      onClick={() => updateStatus(record.id, false)} 
                      disabled={record.status_name === false}
                    >
                      Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
