import Modal from '@/Components/Modal';

export default function ModalExample({
    title,
    showModal,
    setShowModal,
    ...props
}) {
    return (
        <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            maxWidth="5xl"
            aria-modal="true"
            role="dialog"
        >
            <div className="p-4 border">
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                        {title}
                    </h2>

                    <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        aria-label="Cerrar modal"
                    >
                        ✕
                    </button>
                </div>
            </div>
            {props.children}
        </Modal>
    );
}