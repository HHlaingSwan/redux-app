import React from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { decrease, increase, removeItem } from "../features/cartSlice";

const Card = ({ id, title, price, image, amount }) => {
	const dispatch = useDispatch();

	const handleRemove = () => {
		dispatch(removeItem(id));
		toast.success("Item removed from cart");
	};

	const handleIncrease = () => {
		dispatch(increase({ id }));
	};

	const handleDecrease = () => {
		if (amount === 1) {
			dispatch(removeItem(id));
			toast.success("Item removed from cart");
			return;
		}
		dispatch(decrease({ id }));
	};

	return (
		<article className='flex items-center gap-4 sm:gap-6 p-4 bg-white rounded-lg shadow-md'>
			<img
				className='w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-md'
				src={image}
				alt={title}
			/>
			<div className='flex-1 min-w-0'>
				<h4 className='font-semibold text-gray-800 truncate'>{title}</h4>
				<p className='text-gray-600 mt-1'>${price.toFixed(2)}</p>
				<button
					onClick={handleRemove}
					className='text-red-500 hover:text-red-700 transition-colors duration-200 mt-2 text-sm font-medium'>
					Remove
				</button>
			</div>
			<div className='flex flex-col items-center gap-2'>
				<button
					aria-label='Increase quantity'
					onClick={handleIncrease}
					className='text-blue-600 hover:text-blue-800 transition-colors duration-200'>
					<i className='fa-solid fa-chevron-up'></i>
				</button>
				<span className='font-bold text-lg text-gray-800 w-8 text-center'>
					{amount}
				</span>
				<button
					aria-label='Decrease quantity'
					onClick={handleDecrease}
					className='text-blue-600 hover:text-blue-800 transition-colors duration-200'>
					<i className='fa-solid fa-chevron-down'></i>
				</button>
			</div>
		</article>
	);
};

export default Card;
