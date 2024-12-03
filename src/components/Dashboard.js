import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Dashboard.css';
import { useUser } from './UserContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
	const {username} = useUser();
    
    const [formData, setFormData] = useState({
        ARNumber: '',
        severity: '',
        priority: '',
        requestorUsername: '',
        assigneeUsername: '',
        status: '',
        fromDate: '',
        toDate: '',
        ticketTitle: '',
        ticketSummary: ''
    });

    const [tickets, setTickets] = useState([]); // Tickets state

	useEffect(() => {
	    if (username) {
	        const apiUrl = `https://14ks5879v9.execute-api.us-east-2.amazonaws.com/getDashUser/getTicketsbyEmail?email=${username}`;

	        fetch(apiUrl)
	            .then(response => response.json())
	            .then(data => {
	                if (data && data.tickets && data.tickets.length > 0) {
	                    setTickets(data.tickets.map(ticket => ({
	                        ARNumber: ticket.SubmissionID?.S || '',
	                        status: 'Pending',  // Defaulting status to Pending
	                        assignee: ticket.Email?.S || ''
	                    })));
	                } else {
	                    console.log('No tickets found');
	                }
	            })
	            .catch(error => {
	                console.error('Error fetching tickets:', error);
	            });
	    }
	}, [username]);
		
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSearchTickets = (e) => {
        e.preventDefault();
        console.log('Searching for tickets:', formData.ARNumber);

        const apiUrl = `https://14ks5879v9.execute-api.us-east-2.amazonaws.com/getDashUser/getDashQw-user?submissionId=${formData.ARNumber}`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setFormData({
                        ...formData,
                        ticketTitle: data.SubmissionID.S || '',
                        ticketSummary: data.Description.S || '',
                        priority: data.PriorityLevel.S || '',
                        assigneeUsername: data.Username.S || '',
                        status: data.IssueType.S || '',
                        fromDate: '',
                        toDate: ''
                    });
                } else {
                    console.log("Ticket not found");
                }
            })
            .catch(error => {
                console.error("Error fetching ticket data:", error);
            });
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const arNumberFromUrl = params.get('arNumber');
        if (arNumberFromUrl) {
            setFormData(prevData => ({
                ...prevData,
                ARNumber: arNumberFromUrl
            }));
            handleSearchTickets(new Event('submit')); // Trigger search based on URL param
        }
    }, [location.search]);

    const handleCreateTicket = () => {
        console.log('Redirecting to create ticket...');
        navigate('/NewTicket');
    };

    const handleAssignedTickets = () => {
        console.log('Redirecting to assigned tickets...');
        navigate('/AssignedTickets');
    };

    const handleTicketsApproval = () => {
        console.log('Redirecting to tickets needing approval...');
        navigate('/TicketsApproval');
    };

    const handleLogout = () => {
        console.log('Logging out...');
        navigate('/components/Login');
    };

    return (
        <div className="dashboard-wrapper">
		<div className="left-column">
		              <h3>My Tickets</h3>
		              <table className="tickets-table">
		                  <thead>
		                      <tr>
		                          <th>AR Number</th>
		                          <th>Ticket Status</th>
		                          <th>Ticket Assigned to</th>
		                      </tr>
		                  </thead>
		                  <tbody>
		                      {tickets.length > 0 ? (
		                          tickets.map(ticket => (
		                              <tr key={ticket.ARNumber}>
		                                  <td>{ticket.ARNumber}</td>
		                                  <td>{ticket.status}</td>
		                                  <td>{ticket.assignee}</td>
		                              </tr>
		                          ))
		                      ) : (
		                          <tr>
		                              <td colSpan="3">No tickets found</td>
		                          </tr>
		                      )}
		                  </tbody>
		              </table>

		              <div className="navigation">
		                  <button onClick={handleCreateTicket} className="navigation-button">
		                      Create a Ticket
		                  </button>
		                  <button onClick={handleAssignedTickets} className="navigation-button">
		                      Assigned Tickets
		                  </button>
		                  <button onClick={handleTicketsApproval} className="navigation-button">
		                      Tickets that need my approval
		                  </button>
		              </div>
		          </div>

            <div className="middle-column">
                <h2>IT Support Dashboard</h2>
                <form onSubmit={handleSearchTickets}>
                    <div className="form-group">
                        <label htmlFor="ARNumber">AR Number</label>
                        <input
                            type="text"
                            id="ARNumber"
                            name="ARNumber"
                            value={formData.ARNumber}
                            onChange={handleInputChange}
                            placeholder="Enter AR Number"
                        />
                        <button type="submit">Search Tickets</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ticketTitle">Ticket Title</label>
                        <input
                            type="text"
                            id="ticketTitle"
                            name="ticketTitle"
                            value={formData.ticketTitle}
                            onChange={handleInputChange}
                            placeholder=" "
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ticketSummary">Ticket Summary</label>
                        <textarea
                            id="ticketSummary"
                            name="ticketSummary"
                            value={formData.ticketSummary}
                            onChange={handleInputChange}
                            placeholder=" "
                            rows="7"
                            disabled
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="priority">Ticket Priority</label>
                        <input
                            type="text"
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                            placeholder=" "
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="assigneeUsername">Assignee Username</label>
                        <input
                            type="text"
                            id="assigneeUsername"
                            name="assigneeUsername"
                            value={formData.assigneeUsername}
                            onChange={handleInputChange}
                            placeholder="Enter Assignee Username"
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Ticket Status</label>
                        <input
                            type="text"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            placeholder=" "
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fromDate">Ticket Created on</label>
                        <input
                            type="date"
                            id="fromDate"
                            name="fromDate"
                            value={formData.fromDate}
                            onChange={handleInputChange}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="toDate">Ticket Due on</label>
                        <input
                            type="date"
                            id="toDate"
                            name="toDate"
                            value={formData.toDate}
                            onChange={handleInputChange}
                            disabled
                        />
                    </div>
                </form>
            </div>

            <div className="right-column">
                <div className="user-info">
                    <p><strong>User: {username}</strong></p>
                    <a href="/MyAccount">
                        <i className="fas fa-user"></i>
                        <span className="icon">👤</span>
                        <span>User Info</span>
                    </a>
                    <a href="/settings">
                        <i className="fas fa-cog"></i>
                        <span className="icon">⚙️</span>
                        <span>Settings</span>
                    </a>
                    <a href="/logout" onClick={handleLogout} className="logout">
                        <i className="fas fa-sign-out-alt"></i>
                        <span className="icon">🔓</span>
                        <span>Logout</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
