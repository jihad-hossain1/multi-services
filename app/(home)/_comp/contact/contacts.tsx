'use client'

import React, { useState } from 'react'
import ContactUs from './contactusform';
import DialogComponent from '@/components/modal/Modal';
import Quotation from '../quotation/quotation';

const Contacts = () => {
    const [confirmModal, setConfirmModal] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
    const [modalTitle, setModalTitle] = useState<string>(''); // Title for the modal

    const openModal = (component: JSX.Element, title: string) => {
        setModalContent(component);
        setModalTitle(title);
        setConfirmModal(true);
    };

    const closeModal = () => setConfirmModal(false);

    return (
        <div>
            <h1 className='text-3xl font-bold text-center py-4 '>Contact Us</h1>

            <div className='flex justify-center gap-3 mt-10'>
                <button
                    className=' border border-gray-600  px-6 py-2 rounded shadow-sm hover:shadow'
                    onClick={() => openModal(<ContactUs />, 'Contact Us')}
                >
                    Contact Us
                </button>

                <button
                    className=' border border-gray-600  px-6 py-2 rounded shadow-sm hover:shadow'
                    onClick={() => openModal(<Quotation />, 'Request For Quotation')}
                >
                    Request For Quotation
                </button>
            </div>

            {/* Dynamic Modal */}
            <DialogComponent
                isOpen={confirmModal}
                onClose={closeModal}
                title={modalTitle} // Dynamically set title
                size="lg"
                closeOnOverlayClick={true}
            >
                {modalContent} {/* Dynamically set content */}
            </DialogComponent>
        </div>
    );
}

export default Contacts;
