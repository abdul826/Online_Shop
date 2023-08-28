import Loader from '../components/Loader';
import Product from '../components/Product';
import Message from '../components/Message';
import { useGetProductsQuery } from '../slices/productApiSlice';

// Bootstrap file
import { Row,Col } from 'react-bootstrap';

const HomeScreen = () => {
const {data: products, isLoading, error} = useGetProductsQuery();

  return (
    <>
    {
      isLoading ?( 
        <>
            <span className='loading'><Loader /></span>
        </> ) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
        <>
        <h1 className='mt-2'>Latest Products</h1>
        <Row>
            {
                products.map((product)=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
                        <Product product={product} />
                    </Col>
                ))
            }
        </Row>
        </>
        )
    }

    </>
  )
}

export default HomeScreen