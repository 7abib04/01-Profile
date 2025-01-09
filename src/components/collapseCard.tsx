import React, { useState } from 'react';

interface UserData {
  attrs: {
    firstName: string;
    lastName: string;
    email: string;
    Phone: string;
    gender: string;
    country: string;
    Degree: string;
    graddate: string;
    jobtitle: string;
    placeOfBirth: string;
    emergencyTel: string;
  };
}

interface CollapsibleCardProps {
  userData: UserData;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen((prev) => !prev);
  };

  return (
      <div className="collapsible-card">
        <div className="card-header" onClick={toggleCard}>
          <span className="title">User Information</span>
          <span className="toggle-icon">{isOpen ? '▲' : '▼'}</span>
        </div>
        <div className={`card-content ${isOpen ? 'open' : 'closed'}`}>
          <p>
            <strong>
              {userData.attrs.firstName} {userData.attrs.lastName}
            </strong>
          </p>
          <p>{userData.attrs.email}</p>
          <p>
            <strong>Phone:</strong> {userData.attrs.Phone}
          </p>
          <p>
            <strong>Gender:</strong> {userData.attrs.gender}
          </p>
          <p>
            <strong>Country:</strong> {userData.attrs.country}
          </p>
          <p>
            <strong>Degree:</strong> {userData.attrs.Degree}
          </p>
          <p>
            <strong>Graduation Date:</strong> {userData.attrs.graddate}
          </p>
          <p>
            <strong>Job Title:</strong> {userData.attrs.jobtitle}
          </p>
          <p>
            <strong>Place of Birth:</strong> {userData.attrs.placeOfBirth}
          </p>
      </div>
      

      <style>
        {`
          

          h1 {
            font-size: 28px;
            margin-bottom: 20px;
            text-align: center;
          }

          .collapsible-card {
          align-items: center;
            background-color: #1a1a2e;
            border: 1px solid #2e3440;
            border-radius: 10px;
            overflow: hidden;
            transition: box-shadow 0.3s ease;
            width: 100%;
            
          }

          .collapsible-card:hover {
            box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.3);
          }

          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #2e3440;
            padding: 20px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .card-header:hover {
            background-color: #3b4252;
          }

          .card-header .title {
            font-size: 20px;
            font-weight: bold;
          }

          .card-header .toggle-icon {
            font-size: 18px;
          }

          .card-content {
            background-color: #1a1a2e;
            border-top: 1px solid #2e3440;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease, padding 0.4s ease, opacity 0.4s ease;
            opacity: 0;
          }

          .card-content.open {
            max-height: 500px;
            padding: 20px;
            opacity: 1;
          }

          .card-content.closed {
            max-height: 0;
            padding: 0 20px;
            opacity: 0;
          }

          .card-content p {
            margin: 10px 0;
            font-size: 16px;
            line-height: 1.6;
            color: #d8dee9;
          }

          @media (max-width: 768px) {
            .card-header {
              padding: 15px;
            }

            .card-content p {
              font-size: 14px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CollapsibleCard;
