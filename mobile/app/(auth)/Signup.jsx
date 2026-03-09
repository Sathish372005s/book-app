import { StyleSheet, Text, View,KeyboardAvoidingView,Platform ,TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import COLORS from '../../constants/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react'
import { Link, useRouter } from 'expo-router';
import  useAuthStore  from '../store/Authstore';


export default function Signup() {
  const [data, setData] =useState({
      fullName: "",
      email: "",
      password: "",
      secureTextEntry: true,
    });
    
    const router = useRouter();
    const {register,user,token,isloading} =useAuthStore();
    const handlesignup = async () => {
      const result = await register(data.fullName, data.email, data.password);
        if(!result.succes){
          alert(result.error);
        }
        console.log("Signup Result:", result);
        console.log("User:", user);
        console.log("Token:", token);
    }
  return (
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
          <View style={styles.moto}>
            <Ionicons name="book" size={40} color={COLORS.textDark} />
            <Text style={styles.mototext}>saturn <Text style={styles.span}>books</Text></Text>
            <Text style={styles.mototext}>Create your account</Text>
          </View>
          <View style={styles.form}>
            {/* form fields will go here */}
            {/*full name field */}
            <View style={{marginBottom: 16}}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.content}>
                    <Ionicons name="person" size={20} color={COLORS.textSecondary} />
                    <TextInput
                      placeholder="Enter your full name"
                      style={styles.inputtext}
                      autoCapitalize="words"
                      value={data.fullName}
                      onChangeText={(text) => setData({ ...data, fullName: text })}
                    />
                </View>
            </View>
            <View style={{marginBottom: 16}}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.content}>
                    <Ionicons name="mail" size={20} color={COLORS.textSecondary} />
                    {/* stretch the input so it takes remaining space */}
                    <TextInput
                      placeholder="Enter your email"
                      style={styles.inputtext}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={data.email}
                      onChangeText={(text) => setData({ ...data, email: text })}
                    />
                </View>
            </View>
            {/* Password field */}
            <View style={{marginBottom: 16}}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.content}>
                    <Ionicons name="lock-closed-sharp" size={20} color={COLORS.textSecondary} />
                    <TextInput
                      placeholder="Enter your password"
                      style={styles.inputtext}
                      secureTextEntry={data.secureTextEntry}
                      autoCapitalize="none"
                      value={data.password}
                      onChangeText={(text) => setData({ ...data, password: text })}
                    />
                    <Ionicons name={data.secureTextEntry ? "eye" : "eye-off"} size={20}  color={COLORS.textSecondary} style={{marginLeft: 8}} />
                </View>
            </View>
            <TouchableOpacity style={styles.btn} onPress={handlesignup} disabled={isloading}>
              {isloading ? (
                <Text style={{color: COLORS.white}}>Loading...</Text>
              ) : (
                <Text style={{color: COLORS.white}}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>
          {/*footer*/}
          <Text style={styles.footerText}>
            already have account ?
            <TouchableOpacity onPress={()=>router.back()}>
              <Text>login</Text>
            </TouchableOpacity>
          </Text>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    gap: 34,
    backgroundColor: COLORS.primary,
    width: "85%",            // a bit wider to reduce horizontal gap
    alignSelf: "center",
      borderRadius: 16,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4, 
      justifyContent: "center",
  },
  footerText:{
    
  },
  btn:{
    backgroundColor: COLORS.textPrimary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
  moto:{
    // removed flex:1 so header doesn't push form down
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    marginBottom: 24,      // small gap under header
  },
  mototext:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  span:{
    color: COLORS.textDark,
  },
  inputtext:{
    // take remaining space next to the icon
    flex: 1,
    marginLeft: 8,
    // remove top margin so text lines up with icon
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "800",
  },
  email:{
      // stack items vertically and give full width to form field
      flexDirection: 'column',
      width: '100%',
      marginBottom: 16,
  },
  password:{
      // same as email field for consistent styling
      flexDirection: 'column',
      width: '100%',
      marginBottom: 16,
  },
  content:{
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "90%",             // narrower than parent so it doesn’t hug edges
    alignSelf: "center",      // center the input horizontally
  },
  form:{
    // no flex so it sizes to content
    alignItems: "center",
    justifyContent: "center",
  },
})