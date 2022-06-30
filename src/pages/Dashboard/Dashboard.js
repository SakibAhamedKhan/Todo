import React, { useState } from 'react';
import Navbar from '../Shared/Navbar';
import { BsPlusSquareDotted } from 'react-icons/bs'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Tasks from './Tasks';

const Dashboard = () => {
    const [open, setOpen] = useState(false);
	const [user, loading, error] = useAuthState(auth);
    const [refresh, setRefresh] = useState('');


    const handleSubmitTask = async (event) => {
		event.preventDefault();
		const taskName = event.target.taskName.value;
		const taskDetails = event.target.taskDetails.value;

		const doc = {
			email: user?.email,
			taskName,
			taskDetails,
			complete: false
		}
        console.log(doc);
            fetch('https://rocky-scrubland-06202.herokuapp.com/addTask', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(doc)
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        event.target.reset();
                        setOpen(false);
                        setRefresh(new Date().getTime());
                    }
                })

	}
    return (
        <div>
            <Navbar></Navbar>

            <div className='my-5'>
                <div  onClick={() => setOpen(true)} className='shadow-md btn h-16 w-16 mx-auto flex justify-center items-center rounded-lg'><BsPlusSquareDotted className='text-4xl'></BsPlusSquareDotted></div>

                {/* modal */}
                <input type="checkbox" checked={open} id="my-modal-6" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-center">Add your Task</h3>

                        <div className='flex justify-center'>
                            <form onSubmit={handleSubmitTask}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Task Name</span>
                                    </label>
                                    <input name='taskName' type="text" placeholder="task name" className="input input-bordered w-80" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Details</span>
                                    </label>
                                    <textarea name='taskDetails' className="textarea textarea-bordered w-80" placeholder="detalis" required></textarea>
                                </div>
                                <div className="flex justify-center mt-5">
                                    <p onClick={() => setOpen(false)} className="btn mr-2 bg-red-500 hover:bg-red-600 text-white border-none">Cancel</p>
                                    <button type='submit' for="my-modal-6" className="btn bg-green-500 hover:bg-green-600 text-white border-none">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <Tasks refresh={refresh} setRefresh={setRefresh}></Tasks>


            </div>
        </div>
    );
};

export default Dashboard;