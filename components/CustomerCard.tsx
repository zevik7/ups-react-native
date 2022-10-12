import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useCustomerOrders from "../hooks/useCustomerOrders";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { CustomersScreenNavigationProp } from "../screens/CustomersScreen";
import { Card, Icon } from "@rneui/themed";

type Props = {
	userId: string;
	name: string;
	email: string;
};

export default function CustomerCard({ email, name, userId }: Props) {
	const { loading, error, orders } = useCustomerOrders(userId);
	const navigation = useNavigation<CustomersScreenNavigationProp>();

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate("MyModal", { name, userId })
			} 
		>
			<Card containerStyle={tw`p-5 rounded-lg`}>
				<View>
					<View style={tw`flex-row justify-between`}>
						<View>
							<Text style={tw`text-2xl font-bold`}>{name}</Text>
							<Text style={tw.style("text-sm", { color: "#59c1cc" })}>
								ID {userId}
							</Text>
						</View>

						<View style={tw`flex-row items-center justify-end`}>
							<Text
								style={{
									color: "#59c1cc",
								}}
							>
								{loading ? "loading..." : `${orders.length} x`}
							</Text>
							<Icon
								style={tw`mb-5 ml-auto`}
								name="box"
								type="entypo"
								color={"#59c1cc"}
								size={50}
							/>
						</View>
					</View>
					<Card.Divider />
					<Text>{email}</Text>
				</View>
			</Card>
		</TouchableOpacity>
	);
}
