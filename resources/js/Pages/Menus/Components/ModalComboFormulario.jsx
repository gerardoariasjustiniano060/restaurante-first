import { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import { router, useForm } from '@inertiajs/react';

export default function ModalMenuProductoFormulario({

}) {


    return (
        <Modal
            show={showProductModal}
            onClose={() => setShowProductModal(false)}
            maxWidth="5xl"
            aria-modal="true"
            role="dialog"
        >
            <div className="p-6">

            </div>
        </Modal>
    );
}