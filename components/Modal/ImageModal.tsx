import { Modal } from "components/Modal/Modal";
import Image from "next/legacy/image";
import { useState } from "react";

const ImageModal = ({ imageUrl }: { imageUrl: string }) => {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<div>
			<button onClick={() => setModalOpen(true)}>
				<Image alt="restaurant-image" width={200} height={150} src={imageUrl} />
			</button>
			<Modal open={modalOpen} setOpen={setModalOpen}>
				<Image alt="restaurant-image" width={800} height={600} src={imageUrl} />
			</Modal>
		</div>
	);
};

export default ImageModal;
