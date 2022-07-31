import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Switch from '../components/FormComponents/switch/Switch';
import TextField from '../components/FormComponents/TextField';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import * as Yup from 'yup';
import { faker } from '@faker-js/faker';
import { DataGrid } from '@mui/x-data-grid';
import uuid from 'react-uuid';

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  margin: 5px;
  background-color: #000000;
  color: white;
  font-weight: 600;
  cursor: pointer;
  width: 5rem;
  &:disabled {
    cursor: not-allowed;
  }
`;

const DataContainer = styled.div`
  flex: 4;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin: auto;
`;

const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ControlTitle = styled.h1``;

const Dashboard = () => {
  const [isDoc, setIsDoc] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const records = JSON.parse(localStorage.getItem('EHR_records'));
    if (records) {
      setRecords(records);
    }
  }, []);

  const generateData = (dataSize, isDoc) => {
    const records = [];

    if (!isDoc) {
      for (let id = 1; id <= dataSize; id++) {
        let name =
          faker.name.firstName() + ' ' + faker.name.lastName().toUpperCase();
        let message = faker.lorem.sentences();

        records.push({
          id: uuid(),
          name: name,
          data: message,
        });
      }
      localStorage.setItem('EHR_records', JSON.stringify(records));
      setRecords(records);
    }
    setGenerating(false);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 300,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 210,
    },
    {
      field: 'data',
      headerName: 'Data',
      width: 350,
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 250,
    },
  ];

  const handleCommit = () => {};

  const handleClear = () => {
    localStorage.removeItem('EHR_records');
    setRecords([]);
  };

  const validate = Yup.object({
    dataSize: Yup.number()
      .integer()
      .min(1)
      .required('required'),
  });

  return (
    <>
      {/* <Topbar /> */}
      <Container>
        <Sidebar />
        <Wrapper>
          {!records.length ? (
            <GDContainer>
              <GDTitle>Generate Data</GDTitle>
              <GDFormContainer>
                <Formik
                  initialValues={{
                    dataSize: '',
                  }}
                  validationSchema={validate}
                  onSubmit={(values, { resetForm }) => {
                    setGenerating(true);
                    generateData(values.dataSize, isDoc);
                    resetForm({});
                  }}
                >
                  {(formik) => (
                    <Form>
                      <TextField
                        name='dataSize'
                        type='number'
                        placeholder='Data Size'
                        label='Data Size'
                      />

                      <Switch
                        type='checkbox'
                        id='dbSwitch'
                        label='Generate Document data'
                        isOn={isDoc}
                        handleToggle={() => setIsDoc(!isDoc)}
                      />
                      <Switch
                        type='checkbox'
                        id='tbSwitch'
                        label='Generate Text data'
                        isOn={!isDoc}
                        handleToggle={() => setIsDoc(!isDoc)}
                      />

                      <ButtonContainer>
                        <Button
                          type='submit'
                          disabled={
                            !formik.dirty || !formik.isValid || generating
                          }
                        >
                          SUBMIT{' '}
                          {generating && (
                            <FontAwesomeIcon icon={faSpinner} spin />
                          )}
                        </Button>
                      </ButtonContainer>
                    </Form>
                  )}
                </Formik>
              </GDFormContainer>
            </GDContainer>
          ) : (
            <DataContainer>
              <ControlContainer>
                <ControlTitle>Generated Data</ControlTitle>
                <ButtonContainer>
                  <Button onClick={handleCommit}>Commit</Button>
                  <Button onClick={handleClear}>Clear</Button>
                </ButtonContainer>
              </ControlContainer>
              <DataGrid
                rows={records}
                columns={columns}
                autoHeight={true}
                pageSize={100}
                rowsPerPageOptions={[100]}
              />
            </DataContainer>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default Dashboard;
