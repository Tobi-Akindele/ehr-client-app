import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import Switch from '../components/FormComponents/switch/Switch';
import TextField from '../components/FormComponents/TextField';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Container = styled.div`
  display: flex;
  margin-top: 5px;
`;

const Wrapper = styled.div`
  flex: 4;
  padding: 15px;
`;

const GDContainer = styled.div`
  flex: 2;
  width: 35%;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin: auto;
`;

const GDTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const GDFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Dashboard = () => {
  const [tbSwitch, setTbSwitch] = useState(false);
  const [dbSwitch, setDbSwitch] = useState(false);
  return (
    <>
      <Topbar />
      <Container>
        <ToastContainer
          position='top-center'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Sidebar />
        <Wrapper>
          <GDContainer>
            <GDTitle>Generate Data</GDTitle>
            <GDFormContainer>
              <Formik>
                {(formik) => (
                  <Form>
                    <Switch
                      type='checkbox'
                      id='tb-switch'
                      label='Text-based data'
                      isOn={tbSwitch}
                      handleToggle={() => setTbSwitch(!tbSwitch)}
                    />

                    <Switch
                      type='checkbox'
                      id='db-switch'
                      label='Document-based data'
                      isOn={dbSwitch}
                      handleToggle={() => setDbSwitch(!dbSwitch)}
                    />

                    <TextField
                      name='dataSize'
                      type='number'
                      placeholder='Data Size'
                      label='Data Size'
                    />
                  </Form>
                )}
              </Formik>
            </GDFormContainer>
          </GDContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default Dashboard;
