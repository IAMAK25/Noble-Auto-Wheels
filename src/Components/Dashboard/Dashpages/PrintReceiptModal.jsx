import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const PrintReceiptModal = ({ customer, onHide }) => {
    const handlePrint = () => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        const content = document.getElementById('print-content').innerHTML;
        iframe.contentDocument.body.innerHTML = content;
        iframe.contentWindow.print();
        document.body.removeChild(iframe);
    };

    return (
        <Modal show={customer !== null} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Print Receipt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="print-content">
                    <div style={{ marginBottom: '20px' }}>
                        <img src="/path/to/letterhead.png" alt="Letterhead" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p>Receipt Number: [Insert Receipt Number]</p>
                        </div>
                        <div>
                            <p>Date: [Insert Date]</p>
                        </div>
                    </div>
                    {customer && (
                        <>
                            <p>Name: {customer.name}</p>
                            <p>Date of Birth: {customer.dob}</p>
                            <p>Address: {customer.address}</p>
                            <p>Bike Model: {customer.bikeModel}</p>
                            <p>Mobile: {customer.mobile}</p>
                            <p>Price: {customer.price}</p>
                            {/* Add additional receipt information here */}
                        </>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handlePrint}>Print</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PrintReceiptModal;
