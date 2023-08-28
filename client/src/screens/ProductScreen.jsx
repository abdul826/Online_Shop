import { useParams,useNavigate } from 'react-router-dom';
import {Row,Col,Image,ListGroup,Card,Form, Button} from 'react-bootstrap';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
    const {id:productId} = useParams();
    const [qty, setQty] = useState(1);

    const {data: product, isLoading,error} = useGetProductDetailsQuery(productId);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCartHandler = ()=>{
        dispatch(addToCart({...product, qty}));
        navigate('/cart');
    }

  return (
    <>
     <Link className="btn btn-light my-3" to="/">
            Go Back 
        </Link>
    {
        isLoading ? ( 
        <>
            <span className='loading'><Loader /></span>
        </> ) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
            <>
        <Row>
            <Col md={5}>
                <Image src={product.image} alt={product.image} fluid />
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p>Price: ${product.price}</p>
                        <p>Description: {product.description}</p>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                                <strong>${product.countInStock > 0 ? 'In Stock' :  'Out Of Stock'}</strong>
                            </Col>
                        </Row>   
                    </ListGroup.Item>

                    {
                        product.countInStock > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col>Qty</Col>
                                <Col>
                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                        {[...Array(product.countInStock). keys()].map((x)=> (
                                            <option key={x + 1} value={x + 1} >{x + 1}</option>
                                        ))}
                                     </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        )
                    }

                    <ListGroup.Item>
                        <Button className='btn btn-secondary' type="button" onClick={addToCartHandler} disabled={product.countInStock === 0}>
                            Add To Cart
                        </Button>
                    </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
            </>
        )
    }
       
    </>
  )
}

export default ProductScreen