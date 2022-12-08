import { useColorScheme } from 'contexts/ColorSchemeContext';
import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'react-modal';

const ModalWrapper = ({
  children,
  modalIsOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { colorScheme } = useColorScheme();

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor:
        colorScheme === 'dark' ? '#1e1e1e' : 'rgb(198 198 198 / 75%)',
      borderRadius: '16px',
      border: 0,
    },
    overlay: {
      background:
        colorScheme === 'dark' ? 'rgb(0 0 0 / 87%)' : 'rgb(0 0 0 / 25%)',
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      ariaHideApp={false}
      data={{ background: 'green' }}
      contentLabel="restaurant-modal">
      {children}
    </Modal>
  );
};

export default ModalWrapper;
