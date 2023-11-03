import React, { Fragment } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import NavBar from './Navbar';
import { Container } from '@mui/material';
import NotFound from './NotFound';
import AiracFile from '../../features/airac-files/AiracFile';

const App = () => {
  return (
    // <div className="App" style={{padding: '1.5em'}}>
    //   <h1>React and NodeJs Sample</h1>
    //   <Monster/>
    //   <br/>
    //   <Live/>
    //   <br/>
    //   <Habitat/>
    // </div>
    <Fragment>
      {/* <ModalContainer /> */}
      <ToastContainer position="bottom-right" />
      <NavBar />
      <Container style={{ padding: '1.5em' }}>
          <Routes>
            <Route exact path="/" element={<AiracFile />} />
            <Route path="/airac-files" element={<AiracFile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </Container>
    </Fragment >
  );
}

export default App;
