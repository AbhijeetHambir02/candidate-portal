import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import CandidateList from './components/CandidateList';
import ScheduleInterview from './components/ScheduleInterview';
import InterviewDetails from './components/InterviewDetails';
import AddCandidate from './components/AddCandidate';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CandidateList />}/>
        <Route path="/add/candidate" element={<AddCandidate />}/>
        <Route path="/interview/:name" element={<InterviewDetails />} />
        <Route path="/add/interview/:id" element={<ScheduleInterview />} />
      </Routes>
    </Router>
  );
}

export default App;
