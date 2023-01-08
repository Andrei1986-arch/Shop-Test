import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	ListGroupItem,
	FormControl,
} from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'
import Rating from '../components/Rating'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { addToCart } from '../actions/cartAction'

const ProductView = () => {
	//The tutorial appears to be older and using react-router-dom version 5
	//whereas you are using version 6. In version 6 there were many breaking
	//API changes. The Route components no longer use component or render props,
	//the element prop that is passed a valid JSX literal replaced them.
	//route props (history, location, and match) also no longer exist,
	//the routed components must use the React hooks to access them now.

	//Using react hook useParams
	//  const {id} = useParams()
	// const product = products.find( (p) => String(p._id) === id)
	// if (!product) return null

	//const [product , setProduct] = useState({})

	const [qty, setQty] = useState(1)
	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(listProductDetails(id))
	}, [dispatch, id])

	const addToCartHandler = () => {
		dispatch(addToCart(id, qty))
		navigate('/cart')
	}

	return (
		<div>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					{/* fluid keeps image in container */}
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<h4>{product.name}</h4>
							</ListGroupItem>
							<ListGroupItem>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroupItem>
							<ListGroupItem>Price: ${product.price}</ListGroupItem>
							<ListGroupItem>Description: {product.description}</ListGroupItem>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroupItem>
									<Col>Price:</Col>
									<Col>
										<strong>${product.price}</strong>
									</Col>
								</ListGroupItem>
								<ListGroupItem>
									<Col>Status:</Col>
									<Col>
										{product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
									</Col>
								</ListGroupItem>

								{product.countInStock > 0 && (
									<ListGroupItem>
										<Row>
											<Col>QTY</Col>
											<Col>
												<FormControl
													as='select'
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</FormControl>
											</Col>
										</Row>
									</ListGroupItem>
								)}

								<ListGroupItem>
									<Button
										className='btn-block'
										type='button'
										disabled={product.countInStock === 0}
										onClick={addToCartHandler}
									>
										Add To Cart
									</Button>
								</ListGroupItem>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</div>
	)
}

export default ProductView
