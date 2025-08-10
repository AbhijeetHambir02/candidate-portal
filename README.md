# Candidate Portal

The Candidate Portal is a React-based web application designed to efficiently manage candidate information and streamline interview scheduling and tracking processes.

## Prerequisites
- Python (v3.13) installed for backend service
- Node.js (v22.13 or higher) and npm installed for frontend setup
- PostgreSQL database configured locally or remotely

## Steps to Run Project

## Backend Service
1. Configure your PostgreSQL database credentials in the backend configuration file.
2. Create and activate a virtual environment:

```bash
cd backend
python -m venv venv
venv\Scripts\activate #on Windows
source venv/bin/activate #on MacOS/Linux
```
3. Install required Python packages:
```bash
pip install -r requirements.txt
```
4. Start fastapi application
```bash
python run.py
```
## 2. Run Frontend
Navigate to the frontend directory and start the React app:

```bash
cd frontend/candidate_portal
npm install
npm start
```

## Note
- You must have Node.js and Python installed on your system to run this project.
- Ensure the backend service is running before starting the frontend application to allow API communication.
- Update API endpoints in the frontend code if your backend runs on a different host or port.
- This project uses React Router for client-side routing and Axios for HTTP requests.
