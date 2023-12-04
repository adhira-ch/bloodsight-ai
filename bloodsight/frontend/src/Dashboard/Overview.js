import React, { useEffect, useState } from 'react';
import axios from 'axios';
const REACT_APP_API_URL="http://127.0.0.1:5005";
const API_URL = REACT_APP_API_URL;

function Overview({ userId }) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${API_URL}/get_user_data/${userId}`);
                if (response.data.status === 'success') {
                    setUserName(`${response.data.firstName} ${response.data.lastName}`);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    return (
        <div className="justify-center">
            <h1 className="text-2xl font-bold mb-4">{userName ? `Welcome, ${userName}!` : 'Loading...'}</h1>
        </div>
    );
}

export default Overview;