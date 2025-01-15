'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import ProfileCard from '@/components/myComponents/userCard';
import XpGainedChart from '@/components/graphs/lineChart';
import XPChart from '@/components/graphs/barChart';
import SkillsRadarChart from '@/components/graphs/radarChart';
import ProjectPassFailChart from '@/components/graphs/pieChart';
import Navbar from '@/components/myComponents/navBar';
import ProjectList from '@/components/myComponents/ProjectsList';
import Loading from '@/components/myComponents/loading';
import AuditList from '@/components/myComponents/auditList';
import Errorview from '@/components/myComponents/error';

const GET_USER_PROFILE = gql`
  query GetUserProfile {
    user {
      id
      login
      campus
      attrs
      auditRatio
      totalDown
      totalUp
      audits_aggregate(
        where: { grade: { _is_null: false } }
        order_by: { createdAt: desc }
      ) {
        nodes {
          grade
          group {
            captainLogin
            createdAt
          }
        }
      }
    }
    xpTransactions: transaction(where: { type: { _eq: "xp" } }) {
      amount
      createdAt
    }
    skillTransactions: transaction(
      where: {
        _and: [
          { type: { _neq: "xp" } },
          { type: { _neq: "up" } },
          { type: { _neq: "down" } },
          { type: { _neq: "level" } }
        ]
      }
    ) {
      type
      amount
    }
    ProjectsList: transaction(
      where: {
        type: { _eq: "xp" }
        object: { type: { _eq: "project" } }
      }
      order_by: { createdAt: asc }
    ) {
      amount
      object {
        name
      }
    }
  }
`;


const GET_FAIL_AUDIT_AGGREGATE = gql`
  query GetFailAuditAggregate($login: String!) {
    audit_aggregate(
      where: { grade: { _lt: "1" }, auditor: { login: { _eq: $login } } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const GET_PASS_AUDIT_AGGREGATE = gql`
  query GetPassAuditAggregate($login: String!) {
    audit_aggregate(
      where: { grade: { _gte: "1" }, auditor: { login: { _eq: $login } } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export default function Profile() {
  const router = useRouter();
  const [userLogin, setUserLogin] = useState<string | null>(null);
  const { loading, error, data } = useQuery(GET_USER_PROFILE);

  const [fetchFailAuditAggregate, { data: failAuditData, loading: failAuditLoading }] =
    useLazyQuery(GET_FAIL_AUDIT_AGGREGATE);

  const [fetchPassAuditAggregate, { data: passAuditData, loading: passAuditLoading }] =
    useLazyQuery(GET_PASS_AUDIT_AGGREGATE);

  useEffect(() => {
    if (data?.user?.[0]?.login) {
      const login = data.user[0].login;
      setUserLogin(login);
      fetchFailAuditAggregate({ variables: { login } });
      fetchPassAuditAggregate({ variables: { login } });
    }
  }, [data, fetchFailAuditAggregate, fetchPassAuditAggregate]);

  if (loading || failAuditLoading || passAuditLoading) {
    return (
      <Loading/>
    );
  }

  if (error || !data) {
    return (
      localStorage.getItem("jwt")? <Errorview message="Error fetching user data" /> : <Errorview message="you must login first" />
    );
  }

  const PassFail = [
    { name: 'Passed', value: passAuditData?.audit_aggregate?.aggregate?.count },
    { name: 'Failed', value: failAuditData?.audit_aggregate?.aggregate?.count },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-8">
          Welcome {data.user[0].login} #{data.user[0].id}
        </h1>
        <div className="grid grid-cols-1 gap-8">
          <ProfileCard user={data.user[0]} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectList transactions={data.ProjectsList} />
          <AuditList nodes={data.user[0].audits_aggregate.nodes} />
            <XpGainedChart response={data} />
            <XPChart data={data.user[0]} />
            <SkillsRadarChart data={data.skillTransactions} />
            <ProjectPassFailChart data={PassFail} />
          </div>
        </div>
      </div>
    </>
  );
}
