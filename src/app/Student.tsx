// src/app/(Screen)/StudentCrud.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '@/src/app/lib/supbase'; // Ensure this path is correct
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing the vector icon

interface Student {
  id: number;
  created_at: string;
  First_Name: string;
  Middle_Initial: string;
  Last_Name: string;
  LRN_Number: string;
  Contact_Number: string;
  Parent_Name: string;
  status_marker: boolean;
}

const StudentCrud: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [firstName, setFirstName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [lastName, setLastName] = useState('');
  const [lrnNumber, setLrnNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [parentName, setParentName] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Modal for student management info
  const [successModalVisible, setSuccessModalVisible] = useState(false); // Modal for success confirmation
  const [searchModalVisible, setSearchModalVisible] = useState(false); // Modal for search
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('User').select('*');
    if (error) {
      console.error('Error fetching students:', error.message);
    } else {
      setStudents(data as Student[] || []);
      setFilteredStudents(data as Student[] || []); // Set filtered students initially to all students
    }
    setLoading(false);
  };

  const addStudent = async () => {
    if (!firstName || !lastName || !lrnNumber || !contactNumber || !parentName) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

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
      console.error('Error adding student:', error.message);
    } else {
      setStudents([...students, ...(data || [])]);
      setFirstName('');
      setLastName('');
      setMiddleInitial('');
      setLrnNumber('');
      setContactNumber('');
      setParentName('');
      setSuccessModalVisible(true); // Show the success modal
      fetchStudents(); // Refresh the student list
    }
  };

  const deleteStudent = async (id: number) => {
    const { error } = await supabase.from('User').delete().eq('id', id);
    if (error) {
      console.error('Error deleting student:', error.message);
    } else {
      setStudents(students.filter((student) => student.id !== id));
      setFilteredStudents(filteredStudents.filter((student) => student.id !== id)); // Update filtered list
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = students.filter(student => 
      `${student.First_Name} ${student.Middle_Initial ? student.Middle_Initial + '. ' : ''}${student.Last_Name}`.toLowerCase().includes(query) ||
      student.LRN_Number.toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
    setSearchModalVisible(false); // Close the search modal
    setSearchQuery(''); // Clear the search input
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Student Management</Text>
        <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
          <Icon name="search" size={24} color="white" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Middle Initial"
        value={middleInitial}
        onChangeText={setMiddleInitial}
      />
      <TextInput
        style={styles.input}
        placeholder="LRN Number"
        value={lrnNumber}
        onChangeText={setLrnNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Parent Name"
        value={parentName}
        onChangeText={setParentName}
      />
      <Button title="Add Student" onPress={addStudent} />

      <Text style={styles.listTitle}>
        Student List
      </Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={filteredStudents} // Use filteredStudents for displaying
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.studentItem}>
              <Text style={styles.studentText}>
                {item.First_Name} {item.Middle_Initial ? `${item.Middle_Initial}. ` : ''}{item.Last_Name}
              </Text>
              <Text style={styles.lrnText}>
                LRN: {item.LRN_Number}
              </Text>
              <Button title="Delete" onPress={() => deleteStudent(item.id)} />
            </View>
          )}
        />
      )}

      {/* Modal for success confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalText}>Student added successfully!</Text>
            <Button title="Close" onPress={() => setSuccessModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal for Student Management */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Student Management Info</Text>
            <Text style={styles.modalText}>Here you can manage your students.</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal for Search */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={searchModalVisible}
        onRequestClose={() => setSearchModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Search Students</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter student name or LRN"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <View style={styles.buttonContainer}>
              <Button title="Search" onPress={handleSearch} />
              <Button title="Close" onPress={() => setSearchModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  searchIcon: {
    marginLeft: 10,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    color: '#000',
    backgroundColor: 'white',
    
  },
  listTitle: {
    fontSize: 20,
    marginTop: 20,
    color: 'white',
  },
  loadingText: {
    color: 'white',
  },
  studentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  studentText: {
    color: '#000',
  },
  lrnText: {
    color: '#000',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText: {
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default StudentCrud;
