import ModalWrapper from 'components/Modal/ModalWrapper';
import Image from 'next/legacy/image';
import { useState } from 'react';

const ImageModal = ({ imageUrl }: { imageUrl: string }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <Image alt="restaurant-image" width={200} height={150} src={imageUrl} />
      </button>
      <ModalWrapper modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <Image alt="restaurant-image" width={800} height={600} src={imageUrl} />
      </ModalWrapper>
    </div>
  );
};

export default ImageModal;
