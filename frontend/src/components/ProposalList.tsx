'use client';

import { useProposals } from '@/hooks/useProposals'

export function ProposalList() {
  const { data, isLoading, error } = useProposals()

  if (isLoading) return <p style={{ padding: 24 }}>Loading proposals...</p>
  if (error) return <p style={{ padding: 24, color: 'red' }}>Error loading proposals</p>

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16, color: '#333333' }}>
        List of Proposals
      </h1>
      <ul
        style={{
          listStyleType: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {data?.map((proposal) => (
          <li
            key={proposal.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 8,
              padding: 16,
            }}
          >
            <h2
              style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                margin: '0 0 8px 0',
                color: '#333333',
              }}
            >
              {proposal.title}
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#666666', margin: 0 }}>
              By: {proposal.proposer}
            </p>
            <p style={{ marginTop: 12, fontSize: '1rem', color: '#333333' }}>
              {proposal.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
