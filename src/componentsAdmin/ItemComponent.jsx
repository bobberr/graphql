import React from "react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

const deleteItemMutation = gql`
	mutation deleteItemMutation(
		$_id: ID
		$category: String
		$subCategory: String
	) {
		deleteItemMutation(
			_id: $_id
			category: $category
			subCategory: $subCategory
		) {
			brand
			model
			_id
			category
			subCategory
			specs {
				name
				value
			}
			img
		}
	}
`;

const ItemComponent = props => {
	const deleteItemHandler = () => {
		props.client
			.mutate({
				mutation: deleteItemMutation,
				variables: {
					_id: props._id,
					category: props.category,
					subCategory: props.subCategory
				}
			})
			.then(returned => {
				props.setItemsCall(returned.data.deleteItemMutation);
				if (props.activeItem && props.activeItem._id === props._id) {
					props.setActiveItem(null);
				} else {
					return null;
				}
			});
	};
	return (
		<li>
			<div
				onClick={() => {
					props.setActiveItem(props.item);
				}}
			>
				<span>{props.brand}</span> <span>{props.model}</span>
			</div>
			<button onClick={deleteItemHandler}>x</button>
		</li>
	);
};

export default withApollo(ItemComponent);
