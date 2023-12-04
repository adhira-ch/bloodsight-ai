import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavBar from '../Navigation/AppNavbar';
import BodyStatus from './BodyStatus';
import EDPlan from './EDPlan';
import DiseaseSus from './DiseaseSus';
import Overview from './Overview';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const REACT_APP_API_URL="http://127.0.0.1:5005";
const API_URL = REACT_APP_API_URL;

function DashboardPage() {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('user_id');
    
    return (
        <div className="h-screen flex flex-col px-4 py-4">
            {/* Navbar */}
            <div className="w-full mx-auto my-4">
                <NavBar />
            </div>
            <div className='flex flex-col items-center justify-center p-4'>
            {/* Main content */}
            <div className="flex-grow flex flex-row bg-four rounded-3xl w-full mx-auto justify-center items-center p-4 h-[75vh]">
                <div className = "h-full" style={{ width: "80%" }}>
                    <div className = "space-y-6" style={{ width: "95%", height: "100%", display: "flex", flexDirection: "column" }}>
                        {/* Top card */}
                        <div className="rounded-3xl w-4/5 mx-auto bg-five justify-center items-center" style={{ width: "100%", height: "15%", margin: "auto", textAlign: "center", paddingTop: "20px" }}>
                            <Overview userId={userId} />
                        </div>

                        {/* Bottom Section */}
                        <div style={{ width: "100%", height: "85%", display: "flex" }}>
                            {/* Right card */}
                            <div className="rounded-3xl w-4/5 mx-auto bg-five justify-center items-center" style={{ width: "50%", height: "100%", marginLeft: "auto", textAlign: "center", paddingTop: "20px" }}>
                                <BodyStatus userId={userId} />
                            </div>
                            {/* Left card */}
                            <div className = "space-y-6" style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column" }}>
                                <div className="rounded-3xl w-4/5 mx-auto bg-five justify-center items-center" style={{ height: "48%", textAlign: "center", paddingTop: "20px" }}>
                                    < DiseaseSus userId={userId}/>
                                </div>
                                <div className="rounded-3xl w-4/5 mx-auto bg-five justify-center items-center" style={{ height: "48%", textAlign: "center", paddingTop: "20px" }}>
                                    < EDPlan userId={userId}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "h-full" style={{ width: "20%" }}>
                    <div className="rounded-3xl h-full mx-auto bg-five justify-center items-center" style={{ margin: "auto", textAlign: "center", paddingTop: "20px" }}>
                                < Profile userId={userId}/>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default DashboardPage;