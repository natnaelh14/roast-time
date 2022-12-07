import Image from 'next/image';
import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1e1e1e',
    borderRadius: '16px',
    border: 0,
  },
  overlay: {
    background: 'rgb(0 0 0 / 87%)',
  },
};

const ImageModal = ({ imageUrl }: { imageUrl: string }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>
        <Image alt="restaurant-image" width={200} height={150} src={imageUrl} />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        data={{ background: 'green' }}
        contentLabel="restaurant-image-modal">
        <Image alt="restaurant-image" width={800} height={600} src={imageUrl} />
      </Modal>
    </div>
  );
};

export default ImageModal;
