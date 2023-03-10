import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Form,
	Button,
	FormGroup,
	FormLabel,
	FormControl,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingView = () => {
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

	const [address, setAddress] = useState(shippingAddress.address)
	const [city, setCity] = useState(shippingAddress.city)
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
	const [country, setCountry] = useState(shippingAddress.country)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(saveShippingAddress({ address, city, postalCode, country }))
		navigate('/payment')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<FormGroup controlId='address'>
					<FormLabel>Address</FormLabel>
					<FormControl
						type='text'
						placeholder='Enter address'
						value={address}
						required
						onChange={(e) => setAddress(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId='city'>
					<FormLabel>City</FormLabel>
					<FormControl
						type='text'
						placeholder='Enter city'
						value={city}
						required
						onChange={(e) => setCity(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId='postalCode'>
					<FormLabel>Postal Code</FormLabel>
					<FormControl
						type='text'
						placeholder='Enter postalCode'
						value={postalCode}
						required
						onChange={(e) => setPostalCode(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId='country'>
					<FormLabel>Country</FormLabel>
					<FormControl
						type='text'
						placeholder='Enter country'
						value={country}
						required
						onChange={(e) => setCountry(e.target.value)}
					></FormControl>
				</FormGroup>

				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingView
