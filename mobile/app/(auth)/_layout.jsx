import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Stack} from 'expo-router'
import { HeaderShownContext } from '@react-navigation/elements'

export default function _layout() {
    
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack screenOptions={{headerShown:false}} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})