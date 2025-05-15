// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Governance {
    struct Proposal {
        uint id;
        address proposer;
        string title;
        string description;
    }

    Proposal[] public proposals;
    uint public nextId;

    event ProposalCreated(uint id, address proposer, string title);

    function createProposal(string calldata _title, string calldata _description) external {
        proposals.push(Proposal({
            id: nextId,
            proposer: msg.sender,
            title: _title,
            description: _description
        }));

        emit ProposalCreated(nextId, msg.sender, _title);
        nextId++;
    }

    function getAllProposals() external view returns (Proposal[] memory) {
        return proposals;
    }
}
