import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { DataGrid } from '@mui/x-data-grid';
import uuid from 'react-uuid';
import { format } from 'timeago.js';
import ViewDetailsModal from '../components/modal/ViewDetailsModal';
import { useNavigate } from 'react-router';

const Container = styled.div`
  display: flex;
  margin-top: 5px;
`;

const Wrapper = styled.div`
  flex: 4;
  padding: 15px;
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
  margin: 10px 0px;
`;

const ControlTitle = styled.h1``;

const Home = () => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [record, setRecord] = useState({});
  const navigate = useNavigate();

  const openViewModal = () => {
    setShowViewModal((prev) => !prev);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Record ID',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Record Owner',
      flex: 0.8,
    },
    // {
    //   field: !isDoc ? 'textData' : 'fileName',
    //   headerName: !isDoc ? 'Data' : 'File Name',
    //   flex: 1.2,
    //   minWidth: 300,
    // },
    {
      field: 'createdAt',
      headerName: ' Created Date',
      flex: 0.4,
      renderCell: (params) => {
        return <span>{format(params.row.createdAt)}</span>;
      },
    },
  ];

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    bookMark: '',
    previousBookMark: '',
    pageSize: 10,
    skip: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPageState((old) => ({ ...old, isLoading: true }));
        const response = await fetch(
          `http://localhost:8080/api/ehrdata/page?skip=${pageState.skip}&pageSize=${pageState.pageSize}`
        );
        const json = await response.json();
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: json.data,
          bookMark: json.bookMark,
          previousBookMark: json.previousBookMark,
        }));
      } catch (err) {
        let message = err.response?.data?.message
          ? err.response?.data?.message
          : err.message;
        // alert(message);
        setPageState((old) => ({ ...old, isLoading: false }));
      }
    };
    fetchData();
  }, [pageState.skip, pageState.pageSize]);

  return (
    <>
      <Topbar />
      <Container>
        <Sidebar />
        <Wrapper>
          <DataContainer>
            <ControlContainer>
              <ControlTitle>Records</ControlTitle>
              <ButtonContainer>
                <Button>Input Record</Button>
              </ButtonContainer>
            </ControlContainer>
            <DataGrid
              rows={pageState.data}
              columns={columns}
              autoHeight={true}
              pageSize={pageState.pageSize}
              rowCount={100}
              page={pageState.skip}
              rowsPerPageOptions={[10, 20, 50, 100]}
              hideFooterSelectedRowCount
              loading={pageState.isLoading}
              pagination
              paginationMode='server'
              onPageChange={(newPage) => {
                setPageState((old) => ({
                  ...old,
                  page: newPage + pageState.pageSize,
                }));
              }}
              onPageSizeChange={(newPageSize) =>
                setPageState((old) => ({ ...old, pageSize: newPageSize }))
              }
              onCellDoubleClick={(params, event) => {
                navigate(`/ehr-record/${params.row.id}`, { replace: true });
              }}
            />
          </DataContainer>
        </Wrapper>

        <ViewDetailsModal
          showModal={showViewModal}
          setShowModal={setShowViewModal}
          data={record}
          isDoc={record.doc}
          setData={setRecord}
        />
      </Container>
    </>
  );
};

export default Home;
