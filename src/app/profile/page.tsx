'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
import ProfileCard from '@/components/myComponents/userCard';
import ProjectGradesChart from '@/components/graphs/lineChart';
import XpGainedChart from '@/components/graphs/lineChart';
import XPChart from '@/components/graphs/barChart';

const GET_PROFILE_DATA = gql`
  query {
    user { 
      id
      login
      campus
      attrs
      auditRatio
      totalDown
      totalUp

    }
  
    transaction(where: {  type: { _eq: "xp" } } ) {
      amount
      createdAt   
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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      <div className="grid grid-cols-1 gap-8">
        <ProfileCard user={data.user[0]} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectGradesChart response={data} />
          <XPChart data={data.user[0]} />
        </div>
      </div>
    </div>
  );
}

