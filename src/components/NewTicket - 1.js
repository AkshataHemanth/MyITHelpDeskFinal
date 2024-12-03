import React from 'react';
import '../styles/NewTicket.css';

const NewTicket = ({ handleClose }) => {
  return (
    <div className="new-ticket-container">
      <h2 className="new-ticket-header">TeamThree: Create a New Ticket</h2>
      <form className="new-ticket-form">
        {/* Name Fields */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" placeholder="Enter first name" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" placeholder="Enter last name" />
          </div>
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Requestor Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>

        {/* Department Field */}
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select id="department">
            <option>Select Department</option>
            <option>IT</option>
            <option>HR</option>
            <option>Finance</option>
          </select>
        </div>

        {/* Title Field */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Enter the ticket title" />
        </div>

        {/* Description Field */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" placeholder="Enter ticket details"></textarea>
        </div>

        {/* Priority and Severity Fields */}
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="severity">Severity</label>
          <select id="severity">
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
              <input type="checkbox" /> Website Performance
            </label>
            <label>
              <input type="checkbox" /> Content Issues
            </label>
            <label>
              <input type="checkbox" /> User Access/Authentication
            </label>
            <label>
              <input type="checkbox" /> UI/UX Problems
            </label>
            <label>
              <input type="checkbox" /> Security/Privacy Concerns
            </label>
          </div>
        </div>

        {/* Device/Asset Information */}
        <div className="form-group">
          <label htmlFor="deviceInfo">Device/Asset Information</label>
          <input
            type="text"
            id="deviceInfo"
            placeholder="Enter serial number, relevant operating system, etc."
          />
        </div>

        {/* Address Fields */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input type="text" id="street" placeholder="Enter street" />
          </div>
          <div className="form-group">
            <label htmlFor="unit">Unit/Apartment</label>
            <input type="text" id="unit" placeholder="Unit/Apartment" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" placeholder="City" />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input type="text" id="state" placeholder="State" />
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip Code</label>
            <input type="text" id="zip" placeholder="Zip Code" />
          </div>
        </div>

        {/* Phone Number Field */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="text" id="phone" placeholder="Enter phone number" />
        </div>

        {/* Upload Attachment */}
        <div className="form-group">
          <label htmlFor="attachment">Upload Attachment</label>
          <input type="file" id="attachment" />
        </div>

        {/* Submit Button */}
        <div className="button-group">
          <button type="submit" className="submit-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTicket;
