import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
	Form,
	Button,
	FormGroup,
	FormLabel,
	FormControl,
	FormCheck,
} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userAction'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditView = () => {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { id } = useParams()
	const userId = id

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userUpdate = useSelector((state) => state.userUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET })
			navigate('/admin/userlist')
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId))
			} else {
				setName(user.name)
				setEmail(user.email)
				setIsAdmin(user.isAdmin)
			}
		}
	}, [user, userId, dispatch, successUpdate, navigate])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(updateUser({ _id: userId, name, email, isAdmin }))
	}

	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit user</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{error}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<FormGroup controlId='name'>
							<FormLabel>Name</FormLabel>
							<FormControl
								type='name'
								placeholder='Enter name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></FormControl>
						</FormGroup>

						<FormGroup controlId='email'>
							<FormLabel>Email Address</FormLabel>
							<FormControl
								type='email'
								placeholder='Enter email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></FormControl>
						</FormGroup>

						<FormGroup controlId='isadmin'>
							<FormCheck
								type='checkbox'
								label='Is Admin'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></FormCheck>
						</FormGroup>

						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}

export default UserEditView
