import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function ScheduleInterview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState({})
    const [form, setForm] = useState({
        name: '', 
        mobile: '',
        position: '',
        city: '',
        skills: '',
        interviewer: '', 
        status: '', 
        remarks: '', 
        date: ''
    });

    useEffect(() => {
        fetchCandidate();
    }, []);

    const fetchCandidate = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/candidate-portal/get/candidate/${id}`);
            setCandidates(res.data);

            setForm(form => ({
                ...form,
                name: res.data.name || '',
                mobile: res.data.mobile || '',
                city: res.data.city || '',
                position: res.data.position || '',
                skills: res.data.skills || ''
            }));

        } catch (err) {
            console.error('Error fetching candidates:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://127.0.0.1:8000/candidate-portal/update/candidate/${id}`, {
                status: form.status
            });
            await axios.post('http://127.0.0.1:8000/candidate-portal/add/interview', {
                ...form
            });
            navigate('/');
        } catch (err) {
            console.error('Error scheduling interview:', err);
        }
    };

    return (
        <div className="container mt-4 transparent-bg text-white" style={{ width: '35%' }}>
            <h2>Add Interview - Id: {id}</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={candidates.name}
                        readOnly
                        // onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>
                <div className="mb-2">
                    <label>Mobile No</label>
                    <input
                        type="text"
                        className="form-control"
                        value={candidates.mobile}
                        readOnly
                        // onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>
                <div className="mb-2">
                    <label>Position/Role</label>
                    <input
                        type="text"
                        className="form-control"
                        value={candidates.position}
                        readOnly
                        // onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>
                <div className="mb-2">
                    <label>City</label>
                    <input
                        type="text"
                        className="form-control"
                        value={candidates.city}
                        readOnly
                        // onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>
                <div className="mb-2">
                    <label>Skills</label>
                    <input
                        type="text"
                        className="form-control"
                        value={candidates.skills}
                        readOnly
                        // onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>
                <div className="mb-2">
                    <label>Interviewer</label>
                    <input
                        type="text"
                        className="form-control"
                        value={form.interviewer}
                        onChange={(e) => setForm({ ...form, interviewer: e.target.value })}
                    />
                </div>
                <div className="mb-2">
                    <label>Status</label>
                    <input
                        type="text"
                        className="form-control"
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                    />
                </div>
                <div className="mb-2">
                    <label>Remark</label>
                    <input
                        type="text"
                        className="form-control"
                        value={form.remarks}
                        onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                    />
                </div>
                <div className="mb-2">
                    <label>Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                </div>
                <br />
                <div className='text-center'>
                    <button className="btn btn-success" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ScheduleInterview;