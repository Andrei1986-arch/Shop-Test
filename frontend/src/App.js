import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeView from './views/HomeView'
import ProductView from './views/ProductView'
import CartView from './views/CartView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ProfileView from './views/ProfileView'
import ShippingView from './views/ShippingView'
import PaymentView from './views/PaymentView'
import PlaceOrderView from './views/PlaceOrderView'
import OrderView from './views/OrderView'
import UserListView from './views/UserListView'
import UserEditView from './views/UserEditView'
import ProductListView from './views/ProductListView'

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Routes>
						<Route path='/product/:id' element={<ProductView />} />
						<Route path='/cart/:id' element={<CartView />} />
						<Route path='/shipping' element={<ShippingView />} />
						<Route path='/order/:id' element={<OrderView />} />
						<Route path='/placeorder' element={<PlaceOrderView />} />
						<Route path='/payment' element={<PaymentView />} />
						<Route path='/login' element={<LoginView />} />
						<Route path='/profile' element={<ProfileView />} />
						<Route path='/register' element={<RegisterView />} />
						<Route path='/cart' element={<CartView />} exact />
						<Route path='/admin/userlist' element={<UserListView />} />
						<Route path='/admin/user/:id/edit' element={<UserEditView />} />
						<Route path='/admin/productlist' element={<ProductListView />} />
						<Route path='/' element={<HomeView />} exact />
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
