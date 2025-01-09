'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
import CollapsibleCard from '../../components/collapseCard';
import "../../styles/profile.css";

const GET_PROFILE_DATA = gql`
  query {
    user { 
      id
      login
      campus
      attrs
    }
  
    progress(where: { object: { type: { _eq: "project" } } }) {
      id
      createdAt
      userId
      groupId
      eventId
      version
      grade
      isDone
      path
      campus
      objectId
      object {
        name
        type
      }
    }
  }
`;

export default function Profile() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_PROFILE_DATA);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="profile-container">
        <h1>Profile Page</h1>
        <button onClick={handleLogout} className="logout">
          Logout
        </button>
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="profile-container">
        <h1>Profile Page</h1>
        <button onClick={handleLogout} className="logout">
          Logout
        </button>
        <p style={{ color: 'red' }}>Error loading data.{error?.message}</p>
      </div>
    );
  }
  return (
    <div className="profile-container">
     <h1>Profile Page {data.user[0].login}</h1>
     
        <CollapsibleCard userData={data.user[0]} />
      
    </div>
  );
}

