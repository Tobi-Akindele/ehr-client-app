import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from '../components/FormComponents/switch/Switch';
import TextField from '../components/FormComponents/TextField';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import * as Yup from 'yup';
import { faker } from '@faker-js/faker';
import { DataGrid } from '@mui/x-data-grid';
import uuid from 'react-uuid';
import { getAsset } from '../utils/ConstantUtils';
import PDF from '../assets/PDF_File_data.json';
import JPEG from '../assets/JPEG_File_data.json';
import MP4 from '../assets/MP4_File_data.json';
import DOCX from '../assets/DOCX_File_data.json';
import PNG from '../assets/PNG_File_data.json';
import MP3 from '../assets/MP3_File_data.json';
import WAV from '../assets/WAV_File_data.json';
import TextData from '../assets/Text_data.json';
import ViewDetailsModal from '../components/modal/ViewDetailsModal';

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
  const [showViewModal, setShowViewModal] = useState(false);
  const [record, setRecord] = useState({});

  const docs = [PDF, JPEG, MP4, DOCX, PNG, MP3, WAV];

  const openViewModal = () => {
    setShowViewModal((prev) => !prev);
  };

  const generateData = (dataSize, isDoc) => {
    let records = [];

    if (!isDoc) {
      for (let id = 1; id <= dataSize; id++) {
        let name =
          faker.name.firstName() + ' ' + faker.name.lastName().toUpperCase();

        records.push({
          id: uuid(),
          name: name,
          textData: TextData.text,
          size: TextData.size,
        });
      }
      setRecords(records);
    } else {
      let record = {};
      for (let id = 1; id <= dataSize; id++) {
        let name =
          faker.name.firstName() + ' ' + faker.name.lastName().toUpperCase();

        let file = getAsset(docs);

        record = {
          id: uuid(),
          name: name,
          fileName: file.name,
          size: file.size,
          base64String: file.base64String,
          fileType: file.type,
        };
        records.push(record);
      }
      setRecords(records);
    }
    setGenerating(false);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.8,
    },
    {
      field: !isDoc ? 'textData' : 'fileName',
      headerName: !isDoc ? 'Data' : 'File Name',
      flex: 1.2,
      minWidth: 300,
    },
    {
      field: 'size',
      headerName: ' Byte Size',
      flex: 0.4,
    },
  ];

  const handleCommit = () => {};

  const handleClear = () => {
    setRecords([]);
  };

  const validate = Yup.object({
    dataSize: Yup.number().integer().min(1).required('required'),
  });

  return (
    <>
      <Topbar />
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
                hideFooterSelectedRowCount
                onCellDoubleClick={(params, event) => {
                  setRecord(params.row);
                  openViewModal();
                }}
              />
            </DataContainer>
          )}
        </Wrapper>

        <ViewDetailsModal
          showModal={showViewModal}
          setShowModal={setShowViewModal}
          data={record}
          isDoc={isDoc}
        />
      </Container>
    </>
  );
};

export default Dashboard;
