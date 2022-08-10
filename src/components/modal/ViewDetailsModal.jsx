import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 60%;
  height: 80%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: flex;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  flex-direction: column;
  overflow-y: scroll;
`;

const ModalContentTop = styled.div`
  margin: 10px;
`;

const ModalContentTopTitle = styled.h2``;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 10px;
  color: #444;
`;

const InfoText = styled.div`
  margin-left: 10px;
`;

const closeModalIcon = {
  cursor: 'pointer',
  position: 'absolute',
  top: '10px',
  right: '10px',
  width: '32px',
  height: '32px',
  padding: '0',
  zIndex: '10',
};

const Object = styled.object`
  width: 100%;
  height: 50vh;
`;

const TextView = styled.textarea`
  width: 100%;
  height: 50vh;
`;

const ViewDetailsModal = ({ showModal, setShowModal, data, isDoc }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return showModal ? (
    <Background onClick={closeModal} ref={modalRef}>
      <ModalWrapper showModal={showModal}>
        <ModalContentTop>
          <ModalContentTopTitle>Record</ModalContentTopTitle>
        </ModalContentTop>
        <InfoContainer>
          Name: <InfoText>{data.name}</InfoText>
        </InfoContainer>

        {isDoc && (
          <InfoContainer>
            File Name: <InfoText>{data.fileName}</InfoText>
          </InfoContainer>
        )}

        <InfoContainer>
          Data Size: <InfoText>{data.size}</InfoText>
        </InfoContainer>

        <FontAwesomeIcon
          icon={faXmark}
          style={closeModalIcon}
          aria-label='Close modal'
          onClick={() => setShowModal((prev) => !prev)}
        />

        <InfoContainer>
          {isDoc ? (
            <Object
              data={`data:${data.fileType};base64,${data.base64String}`}
              type={data.fileType}
            ></Object>
          ) : (
            <TextView value={data.textData} readOnly />
          )}
        </InfoContainer>
      </ModalWrapper>
    </Background>
  ) : null;
};

export default ViewDetailsModal;
