import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { RootStackParamList } from "../navigator/RootNavigator";
import {
	CompositeNavigationProp,
	RouteProp,
	useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import tw from "twrnc";
import useOrders from "../hooks/useOrders";
import { Button, Image } from "@rneui/themed";
import OrderCard from "../components/OrderCard";

export type OrdersScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList, "Orders">,
	NativeStackNavigationProp<RootStackParamList>
>;

export default function OrdersScreen() {
	const navigation = useNavigation<OrdersScreenNavigationProp>();
	const { loading, error, orders } = useOrders();
	const [ascending, setAscending] = useState<boolean>(false);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
			tabBarLabel: ({ focused, color }) => (
				<Text style={{ color: focused ? "#eb6a7c" : color, fontSize: 10 }}>
					Orders
				</Text>
			),
		});
	}, []);

	return (
		<ScrollView style={{ backgroundColor: "#eb6a7c" }}>
			<Image
				source={{
					uri: "https://links.papareact.com/m51",
				}}
				containerStyle={tw.style(`w-full h-64`)}
				PlaceholderContent={<ActivityIndicator />}
			/>

			<View>
				<View style={tw`px-5`}>
					<Button
						color="pink"
						titleStyle={{ color: "gray", fontWeight: "400" }}
						style={tw`py-2 px-5`}
						onPress={() => setAscending(!ascending)}
					>
						{ascending ? "Showing: Oldest First" : "Showing: Most Recent First"}
					</Button>
				</View>

				{orders
					?.sort((a, b) => {
						if (ascending) {
							return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
						} else {
							return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
						}
					})
					.map((order) => (
						<OrderCard key={order.trackingId} item={order} />
					))}
			</View>
		</ScrollView>
	);
}
