import React from 'react';
import Modal from 'react-modal';
import Select from 'react-select'
import '../styles/CustomModal.css';
const customStyles = {
    content: {
        top: '35%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '15px',
    },
};
function PackageModal(props) {
    const title = props.title;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {

        setIsOpen(false);
    }
    return (
        <div>
            <input className='primary-button p-2 rounded-lg text-md font-medium px-6 float-right' type='button' onClick={openModal} value='Add package' />
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                overlayClassName="modal-overlay"
                style={customStyles}
            >
                <form className='mx-4'>
                    <div className='heading-color text-lg font-bold block text-center'>{title}</div>
                    <div className="mt-4 w-96 m-auto">
                        <label className='text-blue-800 font-medium text-sm' htmlFor='packageName'>Package Name</label>
                        <div className="relative flex w-full flex-wrap items-stretch mt-1">
                            <input autoComplete='off' id='packageName' type="text" placeholder="Enter package name" className="py-3 placeholder-blue-200 text-blue-800 relative bg-white bg-white rounded-lg text-sm border border-blue-500 outline-none focus:outline-none focus:ring-2 w-full pl-4 font-medium" required />
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className="mt-4 w-44 m-auto">
                            <label className='text-blue-800 font-medium text-sm' htmlFor='packageType'>Package Type</label>
                            <div className="relative flex w-full flex-wrap items-stretch mt-1">
                                <select id='packageType' className="py-3 placeholder-blue-200 text-blue-800 relative bg-white bg-white rounded-lg text-sm border border-blue-500 outline-none focus:outline-none focus:ring-2 w-full pl-4 font-medium" >
                                    <option className='py-10' value="" disabled selected>- Select type -</option>
                                    <option className='py-10' value="Tham quan">Tham quan</option>
                                    <option className='py-10' value="Tham quan">Tham quan</option>
                                    <option className='py-10' value="Tham quan">Tham quan</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4 ml-4 w-48 m-auto">
                            <label className='text-blue-800 font-medium text-sm' htmlFor='packageAddress'>Package Address</label>
                            <div className="relative flex w-full flex-wrap items-stretch mt-1">
                                <select id='packageAddress' className="py-3 placeholder-blue-200 text-blue-800 relative bg-white bg-white rounded-lg text-sm border border-blue-500 outline-none focus:outline-none focus:ring-2 w-full pl-4 font-medium" >
                                    <option className='py-10' value="" disabled selected>- Select city -</option>
                                    <option className='py-10' value="Tham quan">Đà Lạt</option>
                                    <option className='py-10' value="Tham quan">Đà Nẵng</option>
                                    <option className='py-10' value="Tham quan">Thành phố Hồ Chí Minh</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 w-96 m-auto">
                        <label className='text-blue-800 font-medium text-sm' htmlFor='packageDescription'>Package Description</label>
                        <div className="relative flex w-full flex-wrap items-stretch mt-1">
                            <textarea rows="4" style={{ resize: "none" }} autoComplete='off' id='packapackageDescriptiongeName' type="text" placeholder="Enter package description" className="py-3 placeholder-blue-200 text-blue-800 relative bg-white bg-white rounded-lg text-sm border border-blue-500 outline-none focus:outline-none focus:ring-2 w-full pl-4 font-medium" />
                        </div>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <input className='btn-red mt-4 p-2 rounded-lg text-md font-medium px-6 float-left' type='button' value='Close' onClick={closeModal} />
                        <input className='btn-green mt-4 p-2 rounded-lg text-md font-medium px-6 float-right' type='submit' value='Save' />
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default PackageModal;