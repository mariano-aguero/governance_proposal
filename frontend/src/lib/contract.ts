export const contractAddress = `${process.env.NEXT_PUBLIC_GOVERNANCE_CONTRACT_ADDRESS}`;

export const governanceAbi = [
  {
    type: "function",
    name: "createProposal",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_title", type: "string" },
      { name: "_description", type: "string" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "getAllProposals",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        components: [
          { name: "id", type: "uint256" },
          { name: "proposer", type: "address" },
          { name: "title", type: "string" },
          { name: "description", type: "string" },
        ],
        type: "tuple[]",
      },
    ],
  },
] as const;
