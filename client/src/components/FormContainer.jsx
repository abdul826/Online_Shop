import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';

const FormController = ({children}) => {
  return (
    <>
        <Container className='mt-5'>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6} mt={5}>
                    {children}
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default FormController