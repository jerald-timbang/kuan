import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/YourCalendarPage.css';

// Map month names to corresponding month index
const monthMapping = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const CalendarPage = () => {
  const { month } = useParams();
  const [date, setDate] = useState(new Date());

  // Update the calendar date when the month parameter changes
  useEffect(() => {
    if (month && monthMapping.hasOwnProperty(month)) {
      // Set the date to the first day of the selected month based on the previous date's year
      setDate((prevDate) => new Date(prevDate.getFullYear(), monthMapping[month], 1));
    }
  }, [month]); // Only re-run the effect if 'month' changes

  // Function to handle date selection changes in the calendar
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    console.log(selectedDate);
  };

  return (
    <div className="calendar-page-container">
      <header className="calendar-header">
        <h1>Calendar for {month}</h1>
      </header>

      <Calendar
        onChange={handleDateChange} // Updates the date state when a new date is selected
        value={date} // Sets the controlled value of the calendar to the current date state
      />

      <div className="attendance-link-container">
        <Link to="/attendance" className="attendance-link">
          Go to Attendance
        </Link>
      </div>
    </div>
  );
};

export default CalendarPage;
