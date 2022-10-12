import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
	query GetCustomers {
		getCustomers {
			value {
				email
				name
			}
			name
		}
	}
`;

export const GET_ORDERS = gql`
	query GetOrders {
		getOrders {
			value {
				Address
				City
				Lng
				Lat
				createdAt
				carrier
				trackingId
				shippingCost
				trackingItems {
					customer {
						email
						name
					}
					customer_id
					items {
						item_id
						name
						price
						quantity
					}
				}
			}
		}
	}
`;
