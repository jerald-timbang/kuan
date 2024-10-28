import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { supabase } from '@/src/app/lib/supbase'; // Adjust the import path
import { Attendance } from '@/src/app/attendance'; // Adjust the import path for your types
import { Link } from 'expo-router'; // Make sure to import Link correctly

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]); // Define the type here
  const [loading, setLoading] = useState(true);

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('attendance') // Your table name
        .select('*'); // Adjust the fields as needed

      if (error) {
        throw new Error(error.message);
      }

      setAttendanceData(data as Attendance[]); // Type assertion to Attendance[]
    } catch (err) {
      const error = err as Error; // Cast `err` to `Error` type
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Link
        href="/attendancePage" // This should match your route configuration
        style={styles.link} // Apply the link style here
      >
        Go to Attendance
      </Link>
      <FlatList
        data={attendanceData}
        keyExtractor={(item) => item.id.toString()} // Ensure item has 'id'
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Date: {item.created_at}</Text>
            <Text style={styles.itemText}>Name: {item.First_Name} {item.Last_Name}</Text>
            <Text style={styles.itemText}>LRN Number: {item.LRN_Number}</Text>
            {/* Render more fields as needed */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  link: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline', // Underline to indicate it's a link
    marginBottom: 20, // Add margin for spacing
  },
});

export default AttendancePage;
