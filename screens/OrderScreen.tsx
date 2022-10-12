import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { RootStackParamList } from "../navigator/RootNavigator";
import {
	CompositeNavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import tw from "twrnc";
import useOrders from "../hooks/useOrders";
import { Button, Image } from "@rneui/themed";
import OrderCard from "../components/OrderCard";
import DeliveryCard from "../components/DeliveryCard";

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

export type OrdersScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList, "Orders">,
	NativeStackNavigationProp<RootStackParamList>
>;

export default function OrderScreen() {
	const navigation = useNavigation<OrdersScreenNavigationProp>();
	const {
		params: { order },
	} = useRoute<OrderScreenRouteProp>();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: order.trackingItems.customer.name,
			headerTitleStyle: { color: "black" },
			headerBackTitle: "Deliveries",
			headerTintColor: "#eb6a7c",
		});
	}, [order]);

	return (
		<View style={tw.style(`-mt-2`)}>
			<DeliveryCard order={order} fullWidth/>
		</View>
	);
}
