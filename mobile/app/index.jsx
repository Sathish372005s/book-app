import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text>hello</Text>
      <Link href="/(auth)/Signup">Go to Signup</Link>
      <Link href="/(auth)">Go to Login</Link>
    </View>
  );
}

const styles= StyleSheet.create({
  container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }
});
