import {
	ScrollView,
	Text,
	SafeAreaView,
	Platform,
	ActivityIndicator,
	View,
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
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/query";
import CustomerCard from "../components/CustomerCard";

export type CustomersScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList, "Customers">,
	NativeStackNavigationProp<RootStackParamList>
>;

export default function Customer() {
	const navigation = useNavigation<CustomersScreenNavigationProp>();
	const [input, setInput] = useState<string>("");
	const { loading, error, data } = useQuery(GET_CUSTOMERS);

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

			{data?.getCustomers
				.filter((customer: CustomerList) => customer.value.name.includes(input))
				.map(({ name: ID, value: { email, name } }: CustomerResponse) => (
					<CustomerCard key={ID} email={email} name={name} userId={ID} />
				))}
		</ScrollView>
	);
}
