import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavBar from '../Navigation/AppNavbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const REACT_APP_API_URL="http://127.0.0.1:5005";
const API_URL = REACT_APP_API_URL;

function BodyStatus({ userId }) {
    const [content, setContent] = useState('Loading...');

    useEffect(() => {
        if (userId) {
            axios.get(`${API_URL}/get_body_status/${userId}`)
                .then(response => {
                    if (/<[a-z][\s\S]*>/i.test(response.data)) {
                        // If the data contains HTML tags, set it as HTML
                        setContent({ __html: response.data });
                    } else {
                        // If the data is plain text, set it as text
                        setContent(response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching content', error);
                    setContent('Failed to load content.');
                });
        }
    }, [userId]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Body Status Overview</h1>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {typeof content === 'string' ?
                    <p>{content}</p> :
                    <div dangerouslySetInnerHTML={content} />
                }
            </div>
        </div>
    );
}

export default BodyStatus;