import Loader from '../components/Loader';
import Product from '../components/Product';
import Message from '../components/Message';
import { useParams, Link } from 'react-router-dom';
import Paginate from '../components/Paginate';
import { useGetProductsQuery } from '../slices/productApiSlice';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

// Bootstrap file
import { Row,Col } from 'react-bootstrap';

const HomeScreen = () => {
  const {pageNumber, keyword} = useParams();    // get the page number

const {data, isLoading, error} = useGetProductsQuery({pageNumber,keyword});     // pass here

  return (
    <>
    {!keyword ? <ProductCarousel /> : (
      <Link to="/" className='btn btn-light mt-4'>Go Back</Link>
    )
    }
    {
      isLoading ?( 
        <>
            <span className='loading'><Loader /></span>
        </> ) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
        <>
        <Meta title="Home Page" />
        <h1 className='mt-2'>Latest Products</h1>
        <Row>
            {
                data.products.map((product)=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
                        <Product product={product} />
                    </Col>
                ))
            }
        </Row>
         <Paginate pages={data.pages} page={data.page} keyword = {keyword ? keyword : ""} />  {/* pages = overall PAge && page = single number */}
        </>
        )
    }

    </>
  )
}

export default HomeScreen