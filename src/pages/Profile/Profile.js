import React from 'react';
import Navbar from '../Shared/Navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Swal from 'sweetalert2';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import Loadings from '../Shared/Loadings';
import { useUpdatePassword } from 'react-firebase-hooks/auth';


const Profile = () => {
    const [user, loading, error1] = useAuthState(auth);
    const [updateProfile, updating, error2] = useUpdateProfile(auth);
    const [updatePassword, updatingPassword, error] = useUpdatePassword(auth);

    if(loading || updating || updatingPassword) {
        return <Loadings></Loadings>;
    }

    if(error1 || error2 || error){
      Swal.fire(
        'Ops!',
        `${error1.message} ${error2.message} ${error.message}`,
        'error'
      )
    }

    const handleUpdateName = async() => {
        const { value } = await Swal.fire({
            title: 'Enter your updated name',
            input: 'text',
            inputLabel: 'Updated Name',
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return 'You need to write something!'
              }
            }
          })
          if(value){
            await updateProfile({displayName: value});
            Swal.fire(
                'Good job!',
                'You name is updated!',
                'success'
              )
          }
    }
    
    const handleUpdatePassword = async() => {
      const { value } = await Swal.fire({
        title: 'Enter your updated password',
        input: 'text',
        inputLabel: 'Updated Password',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        }
      })
      if(value){
        await updatePassword(value);
        Swal.fire(
            'Good job!',
            'You password is updated!',
            'success'
          )
      }
    }
    return (
        <div>
            <Navbar></Navbar>
            <h2 className='text-center text-2xl font-semibold my-5'>Profile</h2>
            <div class="card w-96 bg-base-100 shadow-xl mx-auto p-5">
                <h2 className='my-3 text-xl font-semibold'>Name: {user?.displayName}</h2>
                <button onClick={handleUpdateName} className='btn btn-xs w-fit'>Update Name</button>
                <h2 className='my-3 text-xl font-semibold'>Email: {user?.email}</h2>
                <button onClick={handleUpdatePassword} className='btn btn-xs w-fit'>Update password</button>
            </div>
        </div>
    );
};

export default Profile;