import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function InterviewDetails() {
    // const { id } = useParams();
    const navigate = useNavigate();
    const [interviews, setInterview] = useState([]);
    const { name } = useParams();
    const candidateName = decodeURIComponent(name);

    useEffect(() => {
        fetchInterview();
    }, []);

    const fetchInterview = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/candidate-portal/get/interview/${encodeURIComponent(candidateName)}`);
            setInterview(res.data);
        } catch (err) {
            console.error('Error fetching interview details:', err);
        }
    };

    return (
        <div className='container'>
            <h2 className='text-center mt-4'>Interview Details - {candidateName}</h2>
            { interviews.length > 0 ? (
                interviews.map(interview => 
            <div className="container mt-4 transparent-bg text-white">
                <p><strong>Candidate id:</strong> {interview.id}</p>
                <p><strong>Candidate Name:</strong> {interview.name}</p>
                <p><strong>Candidate Contact:</strong> {interview.mobile}</p>
                <p><strong>City:</strong> {interview.city}</p>
                <p><strong>Skills:</strong> {interview.skills}</p>
                <p><strong>Position/Role:</strong> {interview.position}</p>
                <p><strong>Interviewer:</strong> {interview.interviewer}</p>
                <p><strong>Interview Status:</strong> {interview.status}</p>
                <p><strong>Interview Remark:</strong> {interview.remarks}</p>
                <p><strong>Interview Date:</strong> {new Date(interview.date).toISOString().split('T')[0]}</p>
            </div>
            )) : (
                <p className='text-center mt-4'>No interview details found for this candidate.</p>
            )
            }
            <button className="btn btn-primary my-3" style={{width: '5%'}} onClick={() => navigate('/')}>
                Back
            </button>
        </div>
    );
}

export default InterviewDetails;