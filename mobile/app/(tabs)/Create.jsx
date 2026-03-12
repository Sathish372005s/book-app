import React from 'react'
import { StyleSheet, Text, View,KeyboardAvoidingView,Platform, ScrollView ,TextInput,TouchableOpacity,Image, Button} from 'react-native'
import COLORS from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from "expo-image-picker";
import { useState } from 'react';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.border,
    paddingTop: 60,
    height: "100%",
    alignItems: 'center',
  },
  header:{
    alignItems: 'center',
     marginBottom: 20,
  },
  form:{
    width: 350,
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
  },
  star:{
    flexDirection: 'row',
    gap: 20,
  }
});

export default function Create() {
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
  return (
    <KeyboardAvoidingView
            style={{ flex: 1  }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} >
        <View  >
          {/* Your Create book */}
          <View style={styles.header}>
            <Text style={{color:COLORS.textPrimary,fontSize:24,fontWeight:'bold'}}>ADD YOUR NEW BOOK</Text>
            <Text style={{color:COLORS.textSecondary,fontSize:16,marginTop:5}}>Share your thoughts on the book you just read!</Text>
          </View>
          {/* Form for adding book details */}
          {/* You can use TextInput components for title, author, review, etc. */}
          <View style={styles.form}>
            {/* Example: */}
            <View style={{marginBottom:11}}>
              <Text style={{color:COLORS.textPrimary,fontSize:18, marginBottom:5}}>Book Title</Text>
               <TextInput style={{backgroundColor:COLORS.inputBackground, padding:10, borderRadius:5}} 
               placeholder="Enter book title" 
               value={data.bookname}
               onChangeText={(text) => setData(prev => ({ ...prev, bookname: text }))}
               /> 
            </View>
              <View style={{marginBottom:11}}/>
            <View style={{marginBottom:11}}>
              <Text style={{color:COLORS.textPrimary,fontSize:18, marginBottom:5}}>Rating</Text>
              <View style={styles.star}>
                {[1,2,3,4,5].map((star) => (
                 <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                <Ionicons
                  name={star <= data.starrating ? "star" : "star-outline"}
                  size={32}
                  color="#FFD700"
                />
                </TouchableOpacity>
                ))}
              </View> 
            </View>
            {/* image */}
            <View>
              {!data.image  ? (
                <TouchableOpacity onPress={pickImage} style={{alignItems:'center', gap:10, padding:20, marginTop:30 ,borderWidth:1, borderColor:COLORS.border, borderRadius:10, height:200, justifyContent:'center'}}>
                  <Ionicons name="image" size={50} color={COLORS.textSecondary} style ={styles.imgicon}/>
                  <Text>Select Image</Text>
                </TouchableOpacity>
              ): (
                <View style={styles.imageContainer}>
                  <Image
                  source={{ uri: data.image }}
                  style={{ width: "100%", height: 200 ,borderRadius:10}} 
                  />
                  <TouchableOpacity onPress={removeImage} style={{position:'absolute', top:5, right:5}}>
                    <Ionicons
                      name="close-circle"
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {/* caption */}
            <View>
              <Text style={{color:COLORS.textPrimary,fontSize:18, marginBottom:5, marginTop:20}}>Caption</Text>
              <TextInput 
                style={{backgroundColor:COLORS.inputBackground, padding:10, borderRadius:5, height:100}}
                placeholder="Enter caption"
                value={data.caption}
                onChangeText={(text) => setData(prev => ({ ...prev, caption: text }))}
                multiline
              />
            </View>
            {/* Submit button */}
            <Button>
              submit
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
