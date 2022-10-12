import {
	View,
	Text,
	TouchableOpacity,
	StatusBar,
	FlatList,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import tw from "twrnc";
import {
	CompositeNavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { RootStackParamList } from "../navigator/RootNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useCustomerOrders from "../hooks/useCustomerOrders";
import DeliveryCard from "../components/DeliveryCard";

export type ModalScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList>,
	NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, "MyModal">;

export default function ModalScreen() {
	const navigation = useNavigation<ModalScreenNavigationProp>();
	const {
		params: { name, userId },
	} = useRoute<ModalScreenRouteProp>();

	const { loading, error, orders } = useCustomerOrders(userId);

	return (
		<View style={{ paddingTop: StatusBar.currentHeight }}>
			<TouchableOpacity
				style={tw`absolute top-5 right-5 z-10`}
				onPress={navigation.goBack}
			>
				<Icon name="closecircle" type="antdesign" />
			</TouchableOpacity>

			<View>
				<View
					style={tw.style(`py-5 border-b`, {
						borderColor: "#59c1cc",
					})}
				>
					<Text
						style={tw.style(`text-center text-xl font-bold`, {
							color: "#59c1cc",
						})}
					>
						{name}
					</Text>
					<Text style={tw`text-center italic text-sm`}>Delivery</Text>
				</View>

				<FlatList
					contentContainerStyle={{ paddingBottom: 200 }}
					data={orders}
					keyExtractor={(order) => order.trackingId}
					renderItem={({ item: order }) => <DeliveryCard order={order} />}
				/>
			</View>
		</View>
	);
}
