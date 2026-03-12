import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../constants/colors';

export default function TabLayout() {
  return (
    <Tabs 
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.white,
            headerStyle: { backgroundColor: COLORS.primary },
            headerTitleStyle: { color: COLORS.black },
            tabBarIcon:{
                focused: true,
                size: 20,
            },
            tabBarStyle: { 
                backgroundColor: COLORS.tabbar,
                borderTopEndRadius: 25,
                borderTopStartRadius: 25,
                position: 'absolute',
                left: 20,
                right: 20,
            },
            
        }}
    >
        <Tabs.Screen name="index" 
            options={{ title: "Home" ,
                tabBarIcon :({size,color})=>(<Ionicons name="home" size={size} color={color} />)
            }}
        />
        <Tabs.Screen name="Create" 
            options={{ title: "Create" 
                ,tabBarIcon :({size,color})=>(<Ionicons name="add" size={size} color={color} />)
            }} 
        />
        <Tabs.Screen name="Profile" 
            options={{ title: "Profile" ,
                tabBarIcon :({size,color})=>(<Ionicons name="person" size={size} color={color} />)}} 
        />
    </Tabs>
  )
}