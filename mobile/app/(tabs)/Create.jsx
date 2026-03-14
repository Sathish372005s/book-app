import React from 'react'
import { StyleSheet, Text, View,KeyboardAvoidingView,Platform, ScrollView ,TextInput,TouchableOpacity,Image, Button, Alert} from 'react-native'
import COLORS from '../../constants/colors';
import useBookStore from '../store/Bookstore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from "expo-image-picker";
import { useState } from 'react';
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.border,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header:{
    alignItems: 'center',
     marginBottom: 20,
  },
  form:{
    width: '100%',
    backgroundColor: COLORS.cardBackground,
    padding: 24,
    borderRadius: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  star:{
    flexDirection: 'row',
    gap: 15,
  },
  input: {
    backgroundColor: COLORS.inputBackground, 
    padding: 14, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  imagePickerPlaceholder: {
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 10, 
    padding: 20, 
    marginTop: 10,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#9ca3af', 
    borderRadius: 12, 
    height: 200,
    backgroundColor: '#f9fafb'
  },
  submitBtn: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default function Create() {
  const { createbook } = useBookStore();
  const [data, setData] = useState({
    bookname: "",
    caption: "",
    starrating: 0,
    image: "",
  });

  const handleRating = (value) => {
    setData({...data, starrating: value});
    console.log("Selected rating:", value);
  };

  const pickImage = async () => {

    // Ask permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Please allow access to your media library.");
      return;
    }

    // Open gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
      aspect: [4, 3],
      quality: 1,
      base64:true,
    });

    if (!result.canceled) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setData(prev => ({
        ...prev,
        image: base64Image
      }));
     
    }
  };
   

  const removeImage = () => {
    setData(prev => ({
      ...prev,
      image: ""
    }));
  }

  const handleSubmit = async () => {
    if (!data.bookname || !data.caption || !data.starrating || !data.image) {
      Alert.alert("Please fill in all fields");
      return;
    }
    try {
      const result = await createbook(data.bookname, data.caption, data.starrating, data.image);
      if (result.success) {
        setData({
          bookname: "",
          caption: "",
          starrating: 0,
          image: "",
        });
        Alert.alert("Success", result.message);
      } else {
        Alert.alert("Error", result.error || "Failed to create book");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };
  return (
    <KeyboardAvoidingView
            style={{ flex: 1  }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} >
        <View  >
          {/* Your Create book */}
          <View style={styles.header}>
            <Text style={{color:COLORS.textPrimary,fontSize:24,fontWeight:'bold'}}>ADD YOUR favorite BOOK</Text>
            <Text style={{color:COLORS.textSecondary,fontSize:16,marginTop:5}}>Share your thoughts on the book you just read!</Text>
          </View>
          {/* Form for adding book details */}
          {/* You can use TextInput components for title, author, review, etc. */}
          <View style={styles.form}>
            {/* Title Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Book Title</Text>
               <TextInput 
                 style={styles.input} 
                 placeholder="Enter book title" 
                 placeholderTextColor="#9ca3af"
                 value={data.bookname}
                 onChangeText={(text) => setData(prev => ({ ...prev, bookname: text }))}
               /> 
            </View>

            {/* Rating Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Rating</Text>
              <View style={styles.star}>
                {[1,2,3,4,5].map((star) => (
                 <TouchableOpacity key={star} onPress={() => handleRating(star)} activeOpacity={0.7}>
                  <Ionicons
                    name={star <= data.starrating ? "star" : "star-outline"}
                    size={36}
                    color="#FFD700"
                  />
                </TouchableOpacity>
                ))}
              </View> 
            </View>

            {/* Image Picker */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cover Image</Text>
              {!data.image ? (
                <TouchableOpacity onPress={pickImage} style={styles.imagePickerPlaceholder} activeOpacity={0.7}>
                  <Ionicons name="image-outline" size={48} color="#9ca3af" />
                  <Text style={{color: '#6b7280', fontSize: 16, fontWeight: '500'}}>Tap to Select Image</Text>
                </TouchableOpacity>
              ): (
                <View style={[styles.imageContainer, {marginTop: 10}]}>
                  <Image
                  source={{ uri: data.image }}
                  style={{ width: "100%", height: 200, borderRadius: 12 }} 
                  resizeMode="cover"
                  />
                  <TouchableOpacity 
                    onPress={removeImage} 
                    style={{
                      position: 'absolute', 
                      top: 10, 
                      right: 10, 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      borderRadius: 15
                    }}
                  >
                    <Ionicons name="close-circle" size={30} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Caption Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Review / Caption</Text>
              <TextInput 
                style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
                placeholder="Enter your thoughts on the book..."
                placeholderTextColor="#9ca3af"
                value={data.caption}
                onChangeText={(text) => setData(prev => ({ ...prev, caption: text }))}
                multiline
              />
            </View>

            {/* Submit button */}
            <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>Submit Book</Text>
            </TouchableOpacity>
            <View style={{marginBottom:20}}>
              <Text>            </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
