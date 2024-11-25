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
          .from('attendance')
          .select(`
            student_lrn,
            date,
            status,
            evaluation,
            students (first_name, middle_name, last_name)
          `)
          .order('date', { ascending: false });

        if (error) throw error;
        
        console.log('Fetched data:', data);
        setAttendanceRecords(data);
      } catch (error) {
        console.error('Error fetching attendance records:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceRecords();
  }, []);

  // Display loading message while fetching data
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="attendance-container">
      <header className="attendance-header">
        <h1>Attendance Logs</h1>
      </header>
      <div className="attendance-content">
        {attendanceRecords.length === 0 ? (
          <p>No attendance records found</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Evaluation</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record, index) => (
                  <tr key={index}>
                    <td>
                      {`${record.students.first_name} ${record.students.middle_name || ''} ${record.students.last_name}`}
                    </td>
                    <td>{record.date}</td>
                    <td>{record.status}</td>
                    <td>{record.evaluation}</td>
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

export default Attendance;
