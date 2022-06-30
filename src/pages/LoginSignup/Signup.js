import { async } from '@firebase/util';
import React from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loadings from '../Shared/Loadings';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const Signup = () => {
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error1,
      ] = useCreateUserWithEmailAndPassword(auth);
      const [updateProfile, updating, error2] = useUpdateProfile(auth);

    if (loading || updating) {
        return <Loadings></Loadings>;
    }

    if(user){
        navigate('/dashboard');
    }


    if (error1 || error2) {
        Swal.fire(
            'Ops!',
            `${error1.message} ${error2.message}`,
            'error'
          )
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({displayName:name});
    }
    return (
        <div class="hero min-h-screen bg-base-200">
            <div class="flex-col lg:flex-row-reverse">
                <div class="card w-full md:w-96 lg:w-96 shadow-2xl bg-base-100">
                    <div class="card-body">
                        <form onSubmit={handleSubmit} >
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="user name" class="input input-bordered" required />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" class="input input-bordered" required />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" class="input input-bordered" required />
                            </div>
                            <div class="form-control mt-6">
                                <button type='submit' class="btn btn-primary">Signup</button>
                            </div>
                            <p className='text-center my-1'>If you have a already account? <Link className='text-blue-500 underline' to='/'>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
