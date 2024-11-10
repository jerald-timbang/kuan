import { StyleSheet, View, TouchableOpacity, Modal, Text as RNText } from 'react-native';
import { useState } from 'react';
import { Text } from '@/src/components/Themed';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have this package installed
import { Link } from 'expo-router';
import SignInPage from '@/src/app/(Auth)/SignIn'; // Adjust the import path accordingly


export default function TabOneScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility

  const handleMenuClick = (menuItem: string) => {
    console.log(`${menuItem} clicked`);
    setIsMenuOpen(false); // Close the menu after an item is clicked
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.burgerIcon} onPress={() => setIsMenuOpen(!isMenuOpen)}>
        <MaterialIcons name="menu" size={30} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>QR-Based Attendance with Parental SMS Alert</Text>

      {/* Modal for Burger Menu */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isMenuOpen}
        onRequestClose={() => setIsMenuOpen(false)} // Close on back press
      >
        <View style={styles.menuOverlay}>
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => handleMenuClick('Item 1')}>
              <Link href={'/(tabs)'} style={styles.menuItemText}>Home</Link>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMenuClick('Item 2')}>
              <Link href={'/Records'} style={styles.menuItemText}>Records</Link>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => handleMenuClick('Item 3')}>
              <Link href={'/StudentCrud'} style={styles.menuItemText}>StudentCrud</Link>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => setIsMenuOpen(false)} style={styles.closeMenu}>
              <RNText style={styles.closeMenuText}>Close</RNText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Centered buttons */}
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Link href={'/Records'} style={styles.buttonText}>ICT 11</Link>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Link href={'/Section'} style={styles.buttonText}>ICT 12</Link>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',  // Set background color to white
    paddingTop: 40, // Add more padding at the top to give space for the menu
    alignItems: 'center',
  },
  burgerIcon: {
    position: 'absolute', // Position the icon at the top left
    top: 20,
    left: 20,
    zIndex: 100, // Make sure it appears above other elements
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20, // Increased margin for spacing
    color: '#000',  // Set text color to black
    textAlign: 'center', // Center the text
  },
  buttonWrapper: {
    flex: 1, // Take up remaining space
    justifyContent: 'center', // Center the buttons vertically
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'space-around', // Space buttons evenly
    width: '100%', // Take full width of the screen
    paddingHorizontal: 20, // Add padding on the sides
  },
  button: {
    backgroundColor: 'gray', // Button color set to black
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // White text to contrast the black button
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%', // Width of the menu
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 18,
    marginVertical: 10,
    color: '#000',
  },
  closeMenu: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeMenuText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
