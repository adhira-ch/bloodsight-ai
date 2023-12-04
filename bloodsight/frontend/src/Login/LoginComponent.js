import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bloodsight from '../art_assets/bloodsight_logo.png'
const REACT_APP_API_URL="http://127.0.0.1:5005";
const API_URL = REACT_APP_API_URL;
console.log(REACT_APP_API_URL);

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [race, setRace] = useState('');
    const [gender, setGender] = useState('');
    const [doctorsOffice, setDoctorsOffice] = useState('');
    const [labReport, setLabReport] = useState(null);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handleBirthdayChange = (e) => setBirthday(e.target.value);
    const handleRaceChange = (e) => setRace(e.target.value);
    const handleGenderChange = (e) => setGender(e.target.value);
    const handleDoctorsOfficeChange = (e) => setDoctorsOffice(e.target.value);

    const handleFileChange = (event) => {
        setLabReport(event.target.files[0]);
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        if (isRegistering) {
            // Append additional registration fields to formData
            // formData.append('firstName', firstName);
            // ...
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('birthday', birthday);
            formData.append('gender', gender);
            formData.append('race', race);
            formData.append('doctorsOffice', doctorsOffice);
            formData.append('labReport', labReport);

            try {
                const response = await axios.post(`${API_URL}/register`, formData);
                if (response.data.status === 'success') {
                    navigate(`/dashboard?user_id=${response.data.user_id}`);
                } else {
                    window.alert(response.data.message || 'Registration failed');
                }
            } catch (error) {
                console.error('Registration failed:', error);
                window.alert('Failed to register');
            }
        } else {
            try {
                const response = await axios.post(`${API_URL}/login`, { email, password });
                if (response.data.status === 'success') {
                    navigate(`/dashboard?user_id=${response.data.user_id}`);
                } else {
                    window.alert('Email or password is invalid. Make sure you use the correct credentials. If you have not registered for an account yet, click Register to get started.');
                }
            } catch (error) {
                console.error('Login failed:', error);
                window.alert('Login failed');
            }
        }
    };

    const toggleRegister = () => {
        setIsRegistering(!isRegistering);
        setErrorMessage('');
    };

    return (
        <div className='font-vango w-3/4'>
            <div className="w-full bg-transparent rounded-lg dark:border dark:white dark:white justify-center">
                <div className="p-6 space-y-4 md:space-y-3 justify-center items-center flex flex-col">
                    <img
                                className="h-auto w-3/4 flex" // Added margin-bottom for spacing
                                src={bloodsight}
                                alt="Log In"
                            />
                    <h1>BloodSight AI</h1>
                    <form className="space-y-4 md:space-y-6 w-full" onSubmit={handleSubmit}>
                        {/* Email field */}
                        <div className="relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {/* SVG for Email */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <input 
                                        type="text" 
                                        name="email" 
                                        id="email" 
                                        placeholder="sample@gatech.edu" 
                                        required 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 pr-4 bg-gray-100 border border-gray-300 text-black text-base rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5"
                                    />
                        </div>

                        {/* Password field */}
                        <div className="relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {/* SVG for Password */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                </svg>
                            </div>
                            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required 
                                className="pl-10 pr-4 bg-gray-100 border border-gray-300 text-black text-base rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        {/* Adding all the new elements for registration */}
                        {isRegistering && (
                            <>
                                {/* First Name */}
                                <div className="relative rounded-lg shadow-sm">
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        id="firstName" 
                                        placeholder="First Name" 
                                        required 
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="pl-4 pr-4 bg-gray-100 border border-gray-300 text-black text-base rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5"
                                    />
                                </div>

                                {/* Last Name */}
                                <div className="relative rounded-lg shadow-sm">
                                    <input 
                                        type="text" 
                                        name="lastName" 
                                        id="lastName" 
                                        placeholder="Last Name" 
                                        required 
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="pl-4 pr-4 bg-gray-100 border border-gray-300 text-black text-base rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5"
                                    />
                                </div>

                                {/* Birthday */}
                                <div className="relative rounded-lg shadow-sm">
                                    <input 
                                        type="date" 
                                        name="birthday" 
                                        id="birthday" 
                                        required 
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                        className="pl-4 pr-4 bg-gray-100 border border-gray-300 text-black text-base rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5"
                                    />
                                </div>

                                {/* Gender */}
                                <div className="relative rounded-lg shadow-sm">
                                    <select 
                                        name="gender" 
                                        id="gender" 
                                        required 
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="pl-4 pr-4 bg-gray-100 border border-gray-300 text-black text-base rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5">
                                        <option value="">Biological Gender</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </select>
                                </div>

                                {/* Race */}
                                <div className="relative rounded-lg shadow-sm">
                                    <select 
                                        name="race" 
                                        id="race" 
                                        required 
                                        value={race}
                                        onChange={(e) => setRace(e.target.value)}
                                        className="pl-4 pr-4 bg-gray-100 border border-gray-300 text-black text-base rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5">
                                        <option value="">Select Your Race</option>
                                        <option value="White">White</option>
                                        <option value="African American">Black or African American</option>
                                        <option value="American Indian">American Indian or Alaska Native</option>
                                        <option value="Asian">Asian</option>
                                        <option value="Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                                        <option value="Mixed">Mixed Race</option>
                                        <option value="Other">Other Race</option>
                                    </select>
                                </div>

                                {/* Lab Report */}
                                <div className="relative rounded-lg shadow-sm">
                                    <input 
                                        type="file" 
                                        name="labReport" 
                                        id="labReport" 
                                        accept=".pdf" 
                                        onChange={handleFileChange}
                                        className="pl-4 pr-4 bg-gray-100 border border-gray-300 text-black text-base rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5" 
                                    />
                                </div>

                                {/* Doctor's Office Dropdown */}
                                <div className="relative rounded-lg shadow-sm">
                                    <select 
                                        name="doctorsOffice" 
                                        id="doctorsOffice" 
                                        required 
                                        value={doctorsOffice}
                                        onChange={(e) => setDoctorsOffice(e.target.value)}
                                        className="pl-4 pr-4 bg-gray-100 border border-gray-300 text-black text-base rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5">
                                        <option value="">Select Doctor's Office</option>
                                        <option value="Peach Clinic">Peach Clinic</option>
                                        <option value="GaTech STAMPS">GaTech STAMPS</option>
                                        <option value="Emory Hospital">Emory Hospital</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="flex:grow flex flex-row items-center h-full justify-center">
                            <button type="submit" className="text-white text-base w-fit py-3 px-16 rounded-full bg-one hover:bg-two/[0.5] border-2 border-white">
                                {isRegistering ? 'Register' : 'Log in'}
                            </button>
                        </div>

                        {!isRegistering && (
                            <div className="flex:grow flex flex-row items-center h-full justify-center">
                                <button type="button" onClick={toggleRegister} className="text-white text-base w-fit py-3 px-16 rounded-full bg-two hover:bg-two/[0.8] border-white border-2 shadow-lg">
                                    Register
                                </button>
                            </div>
                        )}

                        {isRegistering && (
                            <div className="flex:grow flex flex-row items-center h-full justify-center">
                                <button type="button" onClick={toggleRegister} className="text-white text-base w-fit py-3 px-16 rounded-full bg-two hover:bg-two/[0.5] border-2 border-white">
                                    Back to Login
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;