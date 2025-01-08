import React from 'react';

const Graphs = ({ transactions }: { transactions: any[] }) => {
  const totalXP = transactions.reduce((acc, txn) => acc + txn.amount, 0);

  return (
    <div>
      <svg width="400" height="200">
        <rect x="50" y="50" width="300" height="20" fill="blue" />
        <text x="50" y="45" fontSize="14">
          Total XP: {totalXP}
        </text>
      </svg>
      {/* Add additional graphs as needed */}
    </div>
  );
};

export default Graphs;
