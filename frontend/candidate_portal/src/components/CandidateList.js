import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function CandidateList() {
    const [candidates, setCandidates] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/candidate-portal/get/candidates');
            setCandidates(res.data);
        } catch (err) {
            console.error('Error fetching candidates:', err);
        }
    };

    const filteredCandidates = candidates.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-4 transparent-bg">
            <h2 className="text-white mb-4">Candidate Portal</h2>

            {/* Add Candidate */}
            <div className="row g-2 mb-3">
                <button
                    className="btn btn-success"
                    onClick={() => navigate('/add/candidate')}
                >
                    + Add Candidate
                </button>
            </div>

            {/* Search */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search candidate by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />


            {/* Candidate Table */}
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Mobile No</th>
                        <th>City</th>
                        <th>Position</th>
                        <th>Experience</th>
                        <th>Current CTC</th>
                        <th>Expected CTC</th>
                        <th>Skills</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Interview Details</th>
                        <th>Schedule interview</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCandidates.length > 0 ? (
                        filteredCandidates.map(c => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.mobile}</td>
                                <td>{c.city}</td>
                                <td>{c.position}</td>
                                <td>{c.experience}</td>
                                <td>{c.current_ctc}</td>
                                <td>{c.expected_ctc}</td>
                                <td>{c.skills}</td>
                                <td>{c.status}</td>
                                <td>{new Date(c.date).toISOString().split('T')[0]}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() => navigate(`/interview/${encodeURIComponent(c.name)}`)}
                                    >
                                        Interview Details
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => navigate(`/add/interview/${c.id}`)}
                                    >
                                        Schedule Interview
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="text-center text-muted">
                                No candidates
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CandidateList;