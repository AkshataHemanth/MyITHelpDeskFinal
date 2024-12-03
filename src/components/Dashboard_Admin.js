import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Dashboard.css';
import { useUser } from './UserContext';

const Dashboard_admin = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { setUser,user }  = useUser();


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
	  ticketSummary: '',
	  issueTypes: [],  // Initialize as an empty array
	  Email: '',
	  FirstName: '',
	  TicketStatus: '',
	  LastName: ''
	});

	const [tickets, setTickets] = useState([]); // Tickets state

	useEffect(() => {
		if (user.username) {
			const apiUrl = `https://14ks5879v9.execute-api.us-east-2.amazonaws.com/getDashUser/getTicketsbyEmail?email=${user.username}`;

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
	}, [setUser]);

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
						toDate: '',
						FirstName: data.FirstName.S || '',
						LastName: data.LastName.S || ''
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

	const handleRunReport = () => {
		console.log('Redirecting to run report...');
		const reportUrl = 'https://www.google.com/';
        window.open(reportUrl, '_blank');
		navigate('/NewTicket');
	};

	const handleAssignedTickets = () => {
		console.log('Redirecting to assigned tickets...');
		navigate('/AssignedTickets');
	};
	
//SAVE CHANGES TO BE ADDED HERE 
// New handleSaveChanges function with API push
	const handleSaveChanges = () => {
		console.log('Saving changes...');
		const payload = {
			SubmissionID: formData.ARNumber,
			Description: formData.ticketSummary,	
			PriorityLevel: formData.priority,
			SeverityLevel: formData.severity,
			assigneeUsername: formData.assigneeUsername,
			TicketStatus: formData.status
		};

		fetch('https://14ks5879v9.execute-api.us-east-2.amazonaws.com/getDashUser/pushNewTicket', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
		.then(response => response.json())
		.then(data => {
			console.log('Ticket saved successfully:', data);
		})
		.catch(error => {
			console.error('Error saving ticket:', error);
		});
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
						<button onClick={handleAssignedTickets} className="navigation-button">
							Assigned Tickets
						</button>
						<button onClick={handleRunReport} className="navigation-button">
							Run Report
						</button>
						<button onClick={handleSaveChanges} className="navigation-button">
							Save Changes
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

						></textarea>
					</div>

					<div className="form-group">
						<label htmlFor="priority">Ticket Priority</label>
						<select
							id="priority"
							name="priority"
							value={formData.priority}
							onChange={handleInputChange}
						>
							<option value="">Select Priority</option>
							<option value="Low">Low</option>
							<option value="Medium">Medium</option>
							<option value="High">High</option>
						</select>

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

						/>
					</div>

					<div className="form-group">
						<label htmlFor="status">Ticket Status</label>
						<select
							id="status"
							name="status"
							value={formData.status}
							onChange={handleInputChange}
						>
							<option value="">Select Status</option>
							<option value="Assigned">Assigned </option>
							<option value="In Progress">In Progress </option>
							<option value="Pending">Pending </option>
							<option value="Resolved">Resolved </option>
							<option value="Closed">Closed </option>
						</select>
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

						/>
					</div>
				</form>
			</div>

			<div className="right-column">
				<div className="user-info">
					<p><strong>User: {user.username}</strong></p>
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

export default Dashboard_admin;
