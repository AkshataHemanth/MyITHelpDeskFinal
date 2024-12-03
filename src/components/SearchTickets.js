import React, { useEffect, useState } from 'react';
import '../styles/SearchTickets.css';

const SearchTickets = () => {
    const [tickets, setTickets] = useState([]); // Ensure tickets is initialized as an array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            const apiEndpoint = `https://14ks5879v9.execute-api.us-east-2.amazonaws.com/getAll/getAll`; // Replace with your API endpoint

            try {
                const response = await fetch(apiEndpoint);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setTickets(data.tickets || []); // Fallback to empty array if "tickets" is undefined
            } catch (err) {
                setError(err.message || 'Failed to fetch tickets.');
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div className="search-tickets-wrapper">
            <h2>Search Results</h2>

            {loading && <p>Loading tickets...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && tickets.length > 0 && (
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Submission ID</th>
                            <th>Address City</th>
                            <th>Address State</th>
                            <th>Address Street 1</th>
                            <th>Address Street 2</th>
                            <th>Address Zip</th>
                            <th>Department</th>
                            <th>Description</th>
                            <th>Device Info</th>
                            <th>Email</th>
                            <th>File Link</th>
                            <th>First Name</th>
                            <th>Issue Type</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Priority Level</th>
                            <th>Severity Level</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket, index) => (
                            <tr key={index}>
                                <td>{ticket.SubmissionID || 'N/A'}</td>
                                <td>{ticket.AddressCity || 'N/A'}</td>
                                <td>{ticket.AddressState || 'N/A'}</td>
                                <td>{ticket.AddressStreet1 || 'N/A'}</td>
                                <td>{ticket.AddressStreet2 || 'N/A'}</td>
                                <td>{ticket.AddressZip || 'N/A'}</td>
                                <td>{ticket.Department || 'N/A'}</td>
                                <td>{ticket.Description || 'N/A'}</td>
                                <td>{ticket.DeviceInfo || 'N/A'}</td>
                                <td>{ticket.Email || 'N/A'}</td>
                                <td>
                                    {ticket.FileLink ? (
                                        <a href={ticket.FileLink} target="_blank" rel="noopener noreferrer">
                                            File
                                        </a>
                                    ) : 'N/A'}
                                </td>
                                <td>{ticket.FirstName || 'N/A'}</td>
                                <td>{ticket.IssueType || 'N/A'}</td>
                                <td>{ticket.LastName || 'N/A'}</td>
                                <td>{ticket.PhoneNumber || 'N/A'}</td>
                                <td>{ticket.PriorityLevel || 'N/A'}</td>
                                <td>{ticket.SeverityLevel || 'N/A'}</td>
                                <td>{ticket.Username || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {!loading && !error && tickets.length === 0 && <p>No tickets found.</p>}
        </div>
    );
};

export default SearchTickets;
