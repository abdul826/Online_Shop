import React from 'react';
import {ToastContainer} from 'react-toastify';

// Component file
import Header from './components/Header';
import Footer from './components/Footer';
import {Outlet} from 'react-router-dom';


// bootstrap File
import { Container } from 'react-bootstrap';


// import CSS
import './assets/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Header />
      <main classNAme="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer/>
    </>
  )
}

export default App