import React, { useState, useEffect } from 'react';
import axios from 'axios';
import female from '../art_assets/avatar.png';
import male from '../art_assets/male.png';

const REACT_APP_API_URL = "http://127.0.0.1:5005";
const API_URL = REACT_APP_API_URL;

function Profile({ userId }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (userId) {
            axios.get(`${API_URL}/get_user_info/${userId}`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => console.error('Error fetching user data', error));
        }
    }, [userId]);

    const getUserImage = (gender) => {
        return gender === 'Male' ? male : female;
    };

    return (
        <div className="flex flex-col items-center justify-center h-full y-4 p-2">
            <h1 className="text-2xl font-bold mb-4">Overall Patient Profile</h1>
            {userData ? (
                <div className="text-center items-center justify-center">
                    <div className="text-lg font-bold">
                        {userData.firstName} {userData.lastName}
                    </div>
                    <div className="flex justify-center items-center">
                        <img
                            className="h-16 w-16 rounded-full"
                            src={getUserImage(userData.gender)}
                            alt={userData.gender}
                        />
                    </div>
                    <div>Gender: {userData.gender}</div>
                    <div>Age: {userData.age}</div>
                    <div>Race: {userData.race}</div>
                    <div>Blood Type: {userData.bloodType || 'A'}</div>
                    <div>Doctor's Office: {userData.doctorsOffice}</div>
                    <div>Last Uploaded Lab Date: November 26, 2023</div>
                    <div>Upcoming Appointments: None</div>
                    <div>Latest Notes from Physicial: Watch your excercise & diet plan.</div>
                </div>
            ) : 'Loading user data...'}
        </div>
    );
}

export default Profile;