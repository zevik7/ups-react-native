import {
	ScrollView,
	Text,
	SafeAreaView,
	Platform,
	Sta,
	ScrollViewtusBar,
	ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import tw from "twrnc";
import {
	CompositeNavigationProp,
	useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { RootStackParamList } from "../navigator/RootNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Input } from "@rneui/themed";

export type CustomersScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList, "Customers">,
	NativeStackNavigationProp<RootStackParamList>
>;

export default function Customer() {
	const navigation = useNavigation<CustomersScreenNavigationProp>();
	const [input, setInput] = useState<string>("");

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<ScrollView style={{ backgroundColor: "#59c1cc" }}>
			<Image
				source={{ uri: "https://links.papareact.com/3jc" }}
				containerStyle={tw`w-full h-64`}
				PlaceholderContent={<ActivityIndicator />}
			/>

			<Input
				placeholder="Search by Customer"
				value={input}
				onChangeText={(text) => setInput(text)}
				containerStyle={tw`bg-white pt-5 pb-0 px-10`}
			/>
		</ScrollView>
	);
}
