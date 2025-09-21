import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Card from "./Card";
import { clearCart } from "../features/cartSlice";
const Home = () => {
	const dispatch = useDispatch();
	const { cartItems, total, amount } = useSelector((store) => store.cart);
	const [isModalOpen, setIsModalOpen] = useState(false);

	if (amount < 1) {
		return (
			<section className='h-screen flex flex-col justify-center items-center text-center px-4'>
				<h2 className='text-4xl sm:text-5xl uppercase font-bold'>
					Your cart is empty
				</h2>
				<a
					href='/'
					className='mt-8 px-10 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 uppercase font-mono transition-colors duration-200'>
					Continue Shopping
				</a>
			</section>
		);
	}
	return (
		<>
			{isModalOpen && (
				<aside className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
					<div className='bg-white p-8 rounded-lg shadow-xl text-center max-w-sm mx-4'>
						<h3 className='text-xl font-bold mb-4'>Clear Cart</h3>
						<p className='text-gray-700 mb-6'>
							Are you sure you want to remove all items from your cart?
						</p>
						<div className='flex justify-center gap-4'>
							<button
								onClick={() => {
									dispatch(clearCart());
									toast.success("Cart cleared successfully");
									setIsModalOpen(false);
								}}
								className='px-6 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 font-semibold'>
								Confirm
							</button>
							<button
								onClick={() => setIsModalOpen(false)}
								className='px-6 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors duration-200 font-semibold'>
								Cancel
							</button>
						</div>
					</div>
				</aside>
			)}
			<section className='py-12'>
				<div className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold text-center mb-8 uppercase'>
						Your Cart
					</h1>
					<div className='space-y-6'>
						{cartItems.map((item) => (
							<Card
								key={item.id}
								{...item}
							/>
						))}
					</div>
					<footer className='mt-12 pt-8 border-t-2 border-gray-300'>
						<div className='flex justify-between items-center text-2xl font-bold mb-8'>
							<h4>Total</h4>
							<span>${total.toFixed(2)}</span>
						</div>
						<div className='flex justify-center'>
							<button
								onClick={() => setIsModalOpen(true)}
								className='px-12 py-4 rounded-lg text-red-500 border border-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-600 active:text-white uppercase font-mono transition-colors duration-200'>
								Clear Cart
							</button>
						</div>
					</footer>
				</div>
			</section>
		</>
	);
};

export default Home;
