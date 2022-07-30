import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import Switch from '../components/FormComponents/switch/Switch';
import TextField from '../components/FormComponents/TextField';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import * as Yup from 'yup';
import { faker } from '@faker-js/faker';

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
  background-color: #000000;
  color: white;
  font-weight: 600;
  cursor: pointer;
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

const Dashboard = () => {
  const [isDoc, setIsDoc] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
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
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let message = faker.lorem.sentences();

        records.push({
          id: id,
          firstName: firstName,
          lastName: lastName,
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
      width: 210,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 210,
      renderCell: (param) => {
        return (
          <span>
            {param.firstName} {param.lastName.toUpperCase()}
          </span>
        );
      },
    },
    {
      field: 'data',
      headerName: 'Data',
      width: 250,
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 250,
    },
  ];

  const validate = Yup.object({
    dataSize: Yup.number()
      .integer()
      .min(1)
      .required('required'),
  });

  return (
    <>
      <Topbar />
      <Container>
        <Sidebar />
        <Wrapper>
          {records ? (
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
            <DataContainer></DataContainer>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default Dashboard;
