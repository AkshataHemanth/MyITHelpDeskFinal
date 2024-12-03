import React, { useState } from 'react';
import '../styles/NewTicket.css';
import { useNavigate } from 'react-router-dom';

import Dashboard from './Dashboard_User';

import Dashboard_admin from "./Dashboard_Admin";

import { useUser } from './UserContext';


const NewTicket = ({ createtickets, setCreateTickets }) => {
  // const { setUser,user }  = useUser();
  const [_isTicketCreated, set_isTicketCreated] = useState("");
  // State to track form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    title: '',
    description: '',
    priority: 'Low',
    severity: 'Low',
    issueTypes: [],
    deviceInfo: '',
    street: '',
    unit: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const navigate = useNavigate();

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Handle checkbox changes (for Issue Types)
  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => {
      const issueTypes = prevState.issueTypes.includes(value)
        ? prevState.issueTypes.filter((issue) => issue !== value)
        : [...prevState.issueTypes, value];
      return { ...prevState, issueTypes };
    });
  };

  // Generate a random SubmissionID
  const generateSubmissionID = () => {
    return Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit random number
  };
  
  // Get current machine time
   const currentTime = new Date().toISOString(); // This gets the current date and time in ISO 8601 format

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
   

    const {
      firstName,
      lastName,
      email,
      department,
      title,
      description,
      priority,
      severity,
      issueTypes,
      deviceInfo,
      street,
      unit,
      city,
      state,
      zip,
      phone,
    
    } = formData;

    // Prepare the data payload
    const payload = {
      SubmissionID: generateSubmissionID(),
      AddressCity: city,
      AddressState: state,
      AddressStreet1: street,
      AddressStreet2: unit,
      AddressZip: zip,
      Department: department,
      Description: description,
      DeviceInfo: deviceInfo,
      Email: email,
      FirstName: firstName,
      IssueType: issueTypes.join(', '), // Convert issue types array to a string
      LastName: lastName,
      PhoneNumber: phone,
      PriorityLevel: priority,
      SeverityLevel: severity,
      Username: email, // Assuming email as username
	  CurrentTime: currentTime, // Add the current time to the payload
    };

    try {
      // Send the POST request to the API
      const response = await fetch('https://14ks5879v9.execute-api.us-east-2.amazonaws.com/getDashUser/pushNewTicket', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        console.log('Ticket submitted successfully:', responseData);
        set_isTicketCreated(true);
        setCreateTickets(false);
        // navigate('/Dashboard_User', {
        //   state: { ticket_created: true },
        // });

        // Optionally close the form after successful submission
        // handleClose();
      } else {
        console.error('Failed to submit ticket:', responseData);
        set_isTicketCreated(false);
        // navigate('/Dashboard_User', {
        //   state: { ticket_created: false },
        // });

      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };

  return (
    <div> 
    
    <div className="new-ticket-container">
      <h2 className="new-ticket-header">TeamThree: Create a New Ticket</h2>
      <form className="new-ticket-form" onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" />
          </div>
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Requestor Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
        </div>

        {/* Department Field */}
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select id="department" value={formData.department} onChange={handleChange}>
            <option>Select Department</option>
            <option>IT</option>
            <option>HR</option>
            <option>Finance</option>
          </select>
        </div>

        {/* Title Field */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={formData.title} onChange={handleChange} placeholder="Enter the ticket title" />
        </div>

        {/* Description Field */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" value={formData.description} onChange={handleChange} placeholder="Enter ticket details"></textarea>
        </div>

        {/* Priority and Severity Fields */}
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority" value={formData.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="severity">Severity</label>
          <select id="severity" value={formData.severity} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Issue Types */}
        <div className="form-group">
          <label>Issue Type</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="Website Performance"
                checked={formData.issueTypes.includes('Website Performance')}
                onChange={handleCheckboxChange}
              />
              Website Performance
            </label>
            <label>
              <input
                type="checkbox"
                value="Content Issues"
                checked={formData.issueTypes.includes('Content Issues')}
                onChange={handleCheckboxChange}
              />
              Content Issues
            </label>
            <label>
              <input
                type="checkbox"
                value="User Access/Authentication"
                checked={formData.issueTypes.includes('User Access/Authentication')}
                onChange={handleCheckboxChange}
              />
              User Access/Authentication
            </label>
            <label>
              <input
                type="checkbox"
                value="UI/UX Problems"
                checked={formData.issueTypes.includes('UI/UX Problems')}
                onChange={handleCheckboxChange}
              />
              UI/UX Problems
            </label>
            <label>
              <input
                type="checkbox"
                value="Security/Privacy Concerns"
                checked={formData.issueTypes.includes('Security/Privacy Concerns')}
                onChange={handleCheckboxChange}
              />
              Security/Privacy Concerns
            </label>
          </div>
        </div>

        {/* Device/Asset Information */}
        <div className="form-group">
          <label htmlFor="deviceInfo">Device/Asset Information</label>
          <input
            type="text"
            id="deviceInfo"
            value={formData.deviceInfo}
            onChange={handleChange}
            placeholder="Enter serial number, relevant operating system, etc."
          />
        </div>

        {/* Address Fields */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Enter street"
            />
          </div>
          <div className="form-group">
            <label htmlFor="unit">Unit/Apartment</label>
            <input
              type="text"
              id="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="Unit/Apartment"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip Code</label>
            <input
              type="text"
              id="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="Zip Code"
            />
          </div>
        </div>

        {/* Phone Number Field */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>

        {/* Save Button */}
        <div className="form-group">
          <button type="submit" className="save-button">
            Save Ticket
          </button>
        </div>
      </form>
    </div>
    
    </div>
  );
};

export default NewTicket;
