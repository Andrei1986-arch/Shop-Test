import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
	Form,
	Button,
	Row,
	Col,
	FormGroup,
	FormLabel,
	FormControl,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userAction'
import FormContainer from '../components/FormContainer'

const LoginView = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (userInfo) {
			navigate(redirect)
		}
	}, [userInfo, navigate, redirect])

	function submitHandler(e) {
		e.preventDefault()

		dispatch(login(email, password))
	}

	return (
		<FormContainer>
			<h1>Sign in</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<FormGroup controlId='email'>
					<FormLabel>Email Address</FormLabel>
					<FormControl
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId='password'>
					<FormLabel>Password</FormLabel>
					<FormControl
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></FormControl>
				</FormGroup>
				<Button type='submit' variant='primary'>
					Sign in
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					New Customer?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginView
