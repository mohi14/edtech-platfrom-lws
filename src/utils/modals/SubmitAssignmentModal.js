import React from 'react';

const SubmitAssignmentModal = ({ showModal, setShowModal }) => {
    const handleSubmit = () => { }
    return (
        <>
            <input
                type="checkbox"
                id="my-modal-3"
                className="modal-toggle"
                checked={showModal}
            />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="my-modal-3"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                        onClick={() => setShowModal(false)}
                    >
                        ✕
                    </label>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" value="true" />

                        <div className='mb-3'><label for="email-address" className="">
                            Github Link
                        </label></div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>

                                <input
                                    id="email-address"
                                    name="duration"
                                    type="text"
                                    required
                                    className="login-input rounded-t-md"
                                    placeholder=" Github Link"
                                //   onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SubmitAssignmentModal;