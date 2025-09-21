import React, { useEffect } from "react";
import Home from "./components/Home";
import { useDispatch, useSelector } from "react-redux";
import { TotalItems, getCartItems } from "./features/cartSlice";
import { Toaster } from "react-hot-toast";

const App = () => {
	const { amount, cartItems, isLoading } = useSelector((store) => store.cart);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(TotalItems());
	}, [cartItems, dispatch]);

	useEffect(() => {
		dispatch(getCartItems());
	}, [dispatch]);

	return (
		<div className='bg-gray-50 min-h-screen'>
			<Toaster position='top-center' />
			<header className='bg-blue-600 text-white shadow-lg'>
				<nav className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
					<h1 className='text-xl font-bold tracking-wider'>Redux Store</h1>
					<div className='relative'>
						<i className='fa-solid fa-cart-shopping text-2xl'></i>
						<span className='absolute -top-2 -right-3 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center'>
							{amount}
						</span>
					</div>
				</nav>
			</header>
			<main>
				{isLoading ? (
					<div className='h-screen flex justify-center items-center -mt-20'>
						<div
							className='w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'
							role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					</div>
				) : (
					<Home />
				)}
			</main>
		</div>
	);
};

export default App;
