import React, { useState } from 'react';

const winnerModal = () => {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }


    return (
        <div>
            <button onClick={handleOpenModal}>Trigger Modal</button>
            <ReactModal
                isOpen={state.showModal}
                contentLabel="Minimal Modal Example"
                className="Modal"
                overlayClassName="Overlay"
                onRequestClose={handleCloseModal}
            >
                <button onClick={handleCloseModal}>Close Modal</button>
            </ReactModal>
        </div>
    );

}

export default winnerModal;