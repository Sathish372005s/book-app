
import { StyleSheet, Text, View, Image ,TextInput,Button,Platform,TouchableOpacity,ActivityIndicator,KeyboardAvoidingView} from 'react-native'
// import styles from '../../assets/styles/login.styles.js'
import COLORS from '../../constants/colors.js'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react'
import { Link, router } from 'expo-router';
import { ScrollView } from 'react-native';
import useAuthStore from '../store/Authstore.js';



export default function index() {
  const [data, setData] =useState({
    email: "",
    password: "",
    secureTextEntry: true,
  });

  const {user,token,login,loading} =useAuthStore();

  function changepasstype(){
    setData({...data, secureTextEntry: !data.secureTextEntry})
  }
  async function handleLogin(){
    const result= await login(data.email, data.password);
    if(!result.success){
      alert(result.error);
      return;
    }
    alert(result.message);
    console.log("User:", user);
    console.log("Token:", token);
    router.push("/(tabs)"); // Navigate to the main app after successful login
  }

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Login screen</Text>
      <View style={styles.ilucontainer}>
        <Image source={require('../../assets/images/l.png')} style={styles.iluimage} />
      </View>
      <View>
        <View style={styles.wholeform}>
            {/* Email field */}
            <View style={styles.email}>
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
            <View style={styles.password}>
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
                    <Ionicons name={data.secureTextEntry ? "eye" : "eye-off"} size={20} onPress={changepasstype} color={COLORS.textSecondary} style={{marginLeft: 8}} />
                </View>
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                {loading ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                    <Text style={styles.btntext}>Login</Text>
                )}
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text>do you dont have an account? <Link href="/Signup">Sign up</Link></Text>
            </View>
        </View>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  ilucontainer:{
    alignItems: "center",
    width: "100%",
  },
  iluimage:{
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  wholeform:{
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    height: 400,
    width: 300,
    elevation: 4,
  },
  inputtext:{
    // take remaining space next to the icon
    flex: 1,
    marginLeft: 8,
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: COLORS.textPrimary,
    fontWeight: "800",
  },
  email:{
      // stack items vertically and give full width to form field
      flexDirection: 'column',
      width: '100%',
      marginBottom: 24,
  },
  password:{
      // same as email field for consistent styling
      flexDirection: 'column',
      width: '100%',
      marginBottom: 24,
  },
  content:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  btn:{
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  footer:{
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
})
