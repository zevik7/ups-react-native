import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Card, Icon } from "@rneui/themed";
import tw from "twrnc";
import {
	CompositeNavigationProp,
	useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { RootStackParamList } from "../navigator/RootNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
	item: Order;
};

export type OrderCardNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList, "Orders">,
	NativeStackNavigationProp<RootStackParamList>
>;

export default function OrderCard({ item }: Props) {
	const navigation = useNavigation<OrderCardNavigationProp>();

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("Order", { order: item })}
		>
			<Card containerStyle={tw`px-5 rounded-lg`}>
				<View style={tw`flex-row justify-between items-center`}>
					<View style={tw`flex-column justify-center items-center`}>
						<Icon
							style={tw.style(`mb-5 ml-auto`)}
							name="truck-delivery"
							color={"#eb6a7c"}
							type="material-community"
						/>
						<Text style={{ fontSize: 12 }}>
							{new Date(item.createdAt).toDateString()}
						</Text>
					</View>

					<View>
						<Text style={tw.style(`text-gray-400`, { fontSize: 10 })}>
							{item.carrier} - {item.trackingId}
						</Text>
						<Text style={tw`text-gray-500 text-xl`}>
							{item.trackingItems.customer.name}
						</Text>
					</View>

					<View style={tw.style(`flex-row items-center`)}>
						<Text style={tw.style(`text-sm`, { color: "#eb6a7c" })}>
							{item.trackingItems.items.length} x
						</Text>
						<Icon style={tw`ml-2`} name="box" type="feather" />
					</View>
				</View>
				<Card.Divider />
			</Card>
		</TouchableOpacity>
	);
}
