import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loadings from '../Shared/Loadings';

const Tasks = ({ refresh, setRefresh }) => {
    const [user, loading, error] = useAuthState(auth);
    const [task, setTask] = useState([]);
    const [refresh2, setRefresh2] = useState('');
    const [open, setOpen] = useState(false);
    const [showData, setShowData] = useState({});

    useEffect(() => {
        fetch(`https://rocky-scrubland-06202.herokuapp.com/task/${user?.email}`)
            .then(res => res.json())
            .then(data => setTask(data));
    }, [refresh2, refresh]);

    if (loading) {
        return <Loadings></Loadings>;
    }
    let tasks;
    let reverseTask;
    tasks = [...task];
    reverseTask = tasks.reverse();

    const handleComplete = (id) => {
        fetch(`https://rocky-scrubland-06202.herokuapp.com/task/${user?.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    setRefresh(new Date().getTime());
                }
            })
    }
    const handleDelete = (id) => {
        fetch(`https://rocky-scrubland-06202.herokuapp.com/task/${user?.email}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    setRefresh(new Date().getTime());
                }
            })
    }

    return (
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5 md:p-8 lg:p-10'>
            {
                reverseTask.map(data => <div
                    key={data._id}
                    className='w-full md:w-48 lg:w-48 shadow-md p-3 flex flex-col justify-between bg-base-200 justify-self-center'
                >
                    <h2>Task: {data.taskName}</h2>
                    <div className='mt-4'>
                        <button onClick={() => {
                            setShowData(data);
                            setOpen(true);
                        }} className='btn btn-xs block w-full my-1'>Show Details</button>
                        {
                            data.complete ?
                                <button className='btn btn-xs btn-success block w-full my-1'>Completed</button>
                                :
                                <button onClick={() => handleComplete(data._id)} className='btn btn-xs block w-full my-1'>Complete Now</button>
                        }
                        <button onClick={() => handleDelete(data._id)} className='btn btn-xs block w-full my-1'>Delete</button>
                    </div>
                </div>)
            }


            {/* modal */}
            <input type="checkbox" checked={open} id="my-modal-6" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box w-11/12 max-w-5xl">
                    <label onClick={() => setOpen(false)} class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className='p-3'>
                        <h2 className='text-2xl font-semibold my-2'>Task Name: {showData.taskName}</h2>
                        <h2 className='text-justify'>Task Details: {showData.taskDetails}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tasks;