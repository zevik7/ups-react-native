import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";

const RootStack = createNativeStackNavigator();

export type RootStackParamList = {
  Main: undefined
  MyModal: { userId: string; name: string}
  Order: {order: any}
} 

export default function RootNavigator() {
	return (
		<RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Main" component={TabNavigator} />
      </RootStack.Group>
    </RootStack.Navigator>
	);
}
