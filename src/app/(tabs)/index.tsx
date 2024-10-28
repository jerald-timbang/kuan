import { StyleSheet, View, TouchableOpacity, Modal, Text as RNText } from 'react-native';
import { useState } from 'react';
import { Text } from '@/src/components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import Screelogo from '@/src/app/screen';
import { Link, useRouter } from 'expo-router';
import { supabase } from '@/src/app/lib/supbase'; // Adjust the import path for your Supabase client

export default function TabOneScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleMenuClick = (menuItem: string) => {
    console.log(`${menuItem} clicked`);
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      router.push('/SignIn'); // Navigate to the SignInPage after signing out
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.burgerIcon} onPress={() => setIsMenuOpen(!isMenuOpen)}>
        <MaterialIcons name="menu" size={30} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>QR-Based Attendance with Parental SMS Alert</Text>

      <View>
        <Screelogo />
      </View>

      {/* Modal for Burger Menu */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isMenuOpen}
        onRequestClose={() => setIsMenuOpen(false)} // Close on back press
      >
        <View style={styles.menuOverlay}>
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => handleMenuClick('Home')} style={styles.menuItem}>
              <RNText style={styles.menuItemText}>Home</RNText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleMenuClick('Records')} style={styles.menuItem}>
              <Link href={'/Records'} style={styles.menuItemText}>
                Records
              </Link>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleMenuClick('Student')} style={styles.menuItem}>
              <RNText style={styles.menuItemText}>Student</RNText>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignOut} style={styles.menuItem}>
              <RNText style={styles.menuItemText}>Sign Out</RNText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsMenuOpen(false)} style={styles.closeMenu}>
              <RNText style={styles.closeMenuText}>Close</RNText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  burgerIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#000',
    textAlign: 'center',
  },
  menuOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  menuItem: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    fontSize: 18,
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
