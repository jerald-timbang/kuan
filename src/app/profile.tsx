// // src/app/(tabs)/profile.tsx
// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, Button, ActivityIndicator } from 'react-native';
// import { useRouter } from 'expo-router'; // Use Expo Router for navigation
// import { supabase } from '@/src/app/lib/supbase'; // Adjust the import path for your Supabase client

// // Define the user profile type
// interface UserProfile {
//   profiles_id: string; // Update to match your column name
//   name: string;
//   email: string;
//   avatar_url: string | null;
// }

// const Profile: React.FC = () => {
//   const [userData, setUserData] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter(); // Use router for navigation

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const {
//         data: { session },
//         error: sessionError,
//       } = await supabase.auth.getSession();

//       if (sessionError) {
//         console.error('Error fetching session:', sessionError.message);
//         setLoading(false);
//         return;
//       }

//       const user = session?.user;

//       if (user) {
//         // Fetch the user's profile by their profiles_id
//         const { data, error: profileError } = await supabase
//           .from('profiles') // Adjust to your table name
//           .select('*')
//           .eq('profiles_id', user.id) // Update to match your column name
//           .single(); // Get a single record

//         if (profileError) {
//           console.error('Error fetching profile:', profileError.message);
//         } else {
//           setUserData(data); // Set user data to the fetched profile
//         }
//       } else {
//         router.push('/SignIn'); // Navigate to SignIn page if no user
//       }

//       setLoading(false);
//     };

//     fetchProfile();
//   }, [router]);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />; // Loading indicator
//   }

//   if (!userData) {
//     return <Text>No profile data found</Text>; // Message if no data found
//   }

//   const handleSignOut = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) {
//       console.error('Error signing out:', error.message);
//     } else {
//       router.push('/SignIn'); // Navigate to SignIn page after sign out
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Image
//         source={{ uri: userData.avatar_url || 'default-avatar.png' }}
//         style={{ width: 100, height: 100, borderRadius: 50 }}
//       />
//       <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{userData.name}</Text>
//       <Text style={{ fontSize: 16 }}>{userData.email}</Text>
      
//       <View style={{ marginTop: 20 }}>
//         {/* <Button title="Edit Profile" onPress={() => router.push('/edit-profile')} /> */}
//         <Button title="Sign Out" onPress={handleSignOut} color="red" />
//       </View>
//     </View>
//   );
// };

// export default Profile;
