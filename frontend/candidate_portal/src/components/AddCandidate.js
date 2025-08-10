import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function AddCandidate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        mobile: '',
        city: '',
        position: '',
        experience: '',
        current_ctc: '',
        expected_ctc: '',
        skills: '',
        status: 'Pending',
        date: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (form.mobile.length !== 10) {
                alert('Incorrect mobile number!');
            }
            else {
                await axios.post('http://127.0.0.1:8000/candidate-portal/add/candidate', { ...form });
                navigate('/');
            }
        } catch (err) {
            if (err.response && err.response.status === 409) {
                alert(`Candidate with name "${form.name}" already exists!`);
            } else {
                console.error('Error Adding candidate:', err);
                alert('Failed to add candidate. Please try again.');
            }
        }
    };

    return (
        <div className="container mt-4 transparent-bg text-white" style={{ width: '35%' }}>
            <h2 className='text-center mb-4'>Add Candidate</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>
                <div className="mb-2">
                    <label>Mobile No</label>
                    <input
                        type="text"
                        className="form-control"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    />
                </div>
                <div className="mb-2">
                    <label>City</label>
                    <input
                        type="text"
                        className="form-control"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                    />
                </div>
                <div className="mb-2">
                    <label>Position</label>
                    <input
                        type="text"
                        className="form-control"
                        value={form.position}
                        onChange={(e) => setForm({ ...form, position: e.target.value })}
                    />
                </div>
                <div className="mb-2">
                    <label>Experience</label>
                    <input
                        type="number"
                        className="form-control"
                        value={form.experience}
                        onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    />
                </div>
                <div className="mb-2">
                    <label>Current CTC</label>
                    <input
                        type="number"
                        className="form-control"
                        value={form.current_ctc}
                        onChange={(e) => setForm({ ...form, current_ctc: e.target.value })}
                    />
                </div>
                <div className="mb-2">
                    <label>Expected CTC</label>
                    <input
                        type="number"
                        className="form-control"
                        value={form.expected_ctc}
                        onChange={(e) => setForm({ ...form, expected_ctc: e.target.value })}
                    />
                </div>
                <div className="mb-2">
                    <label>Skills</label>
                    <input
                        type="text"
                        className="form-control"
                        value={form.skills}
                        onChange={(e) => setForm({ ...form, skills: e.target.value })}
                    />
                </div>
                {/* <div className="mb-2">
                    <label>Status</label>
                    <input
                        type="text"
                        className="form-control"
                        value={form.status}
                        readOnly
                    />
                </div> */}
                <div className="mb-4">
                    <label>Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                </div>

                <div className='text-center'>
                    <button className="btn btn-success" type="submit">
                        Add Candidate
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCandidate;