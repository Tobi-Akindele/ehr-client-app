import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
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

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.h1``;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const RecordContainer = styled.div`
  flex-direction: column;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const RecordTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: rgb(175, 170, 170);
`;

const RecordInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;

const RecordInfoText = styled.span`
  margin-left: 10px;
`;

const Object = styled.object`
  width: 100%;
  height: 50vh;
`;

const TextView = styled.textarea`
  width: 100%;
  height: 50vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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

const ViewRecord = () => {
  const [fetching, setFetching] = useState(false);
  const [record, setRecord] = useState({});
  const location = useLocation();
  const recordId = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchRecord = async () => {
      setFetching(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/ehrdata/${recordId}`
        );
        const data = await response.json();
        setRecord(data);
        setFetching(false);
      } catch (err) {
        // alert(message);
        setFetching(false);
      }
    };

    fetchRecord();
  }, [recordId]);

  return (
    <>
      <Topbar />
      <Container>
        <Sidebar />
        <Wrapper>
          <TitleContainer>
            <Title>Record</Title>
          </TitleContainer>
          {fetching ? (
            <LoadingContainer>
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                style={{ fontSize: '50px' }}
              />
            </LoadingContainer>
          ) : (
            <RecordContainer>
              <RecordTitle>Record Details</RecordTitle>
              <RecordInfo>
                Record ID: <RecordInfoText>{record.id}</RecordInfoText>
              </RecordInfo>

              <RecordInfo>
                Name: <RecordInfoText>{record.name}</RecordInfoText>
              </RecordInfo>

              {record?.doc && (
                <>
                  <RecordInfo>
                    File Name:{' '}
                    <RecordInfoText>{record.fileName}</RecordInfoText>
                  </RecordInfo>

                  <RecordInfo>
                    File Type:{' '}
                    <RecordInfoText>{record.fileType}</RecordInfoText>
                  </RecordInfo>
                </>
              )}

              <RecordInfo>
                Data Size: <RecordInfoText>{record.size}</RecordInfoText>
              </RecordInfo>

              <RecordInfo>
                Created: <RecordInfoText>{record.createdAt}</RecordInfoText>
              </RecordInfo>

              <RecordInfo>
                {record?.doc ? (
                  <Object
                    data={`data:${record?.fileType};base64,${record?.base64String}`}
                    type={record?.fileType}
                  ></Object>
                ) : (
                  <TextView value={record.textData} readOnly />
                )}
              </RecordInfo>

              <ButtonContainer>
                <Button type='submit'>UPDATE</Button>
              </ButtonContainer>
            </RecordContainer>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default ViewRecord;
