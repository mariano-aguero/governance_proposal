import { ethers } from "hardhat";
import { expect } from "chai";
import { Governance } from "../typechain-types";
import type { Signer } from "ethers";

describe("Governance", function () {
  let governance: Governance;
  let owner: Signer & { address: string };
  let addr1: Signer & { address: string };
  let addr2: Signer & { address: string };

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners() as unknown as (Signer & { address: string })[];
    const Governance = await ethers.getContractFactory("Governance");
    governance = await Governance.deploy();
    await governance.waitForDeployment();
  });

  it("should create a proposal and retrieve it", async function () {
    const title = "My Proposal";
    const description = "Proposal description";

    await governance.createProposal(title, description);

    const proposals = await governance.getAllProposals();
    expect(proposals.length).to.equal(1);
    expect(proposals[0].title).to.equal(title);
    expect(proposals[0].description).to.equal(description);
    expect(proposals[0].id).to.equal(0);
    expect(proposals[0].proposer).to.equal(await owner.getAddress());
  });

  it("should emit ProposalCreated with correct data", async function () {
    const title = "Test Title";
    const description = "Test Description";

    await expect(governance.connect(addr1).createProposal(title, description))
      .to.emit(governance, "ProposalCreated")
      .withArgs(0, addr1.address, title);
  });

  it("should increment nextId after each proposal", async function () {
    await governance.connect(addr1).createProposal("Title1", "Desc1");
    await governance.connect(addr2).createProposal("Title2", "Desc2");

    expect(await governance.nextId()).to.equal(2);
  });

  it("should store multiple proposals correctly", async function () {
    await governance.connect(addr1).createProposal("Title A", "Desc A");
    await governance.connect(addr2).createProposal("Title B", "Desc B");

    const proposals = await governance.getAllProposals();
    expect(proposals.length).to.equal(2);

    expect(proposals[0].proposer).to.equal(addr1.address);
    expect(proposals[0].title).to.equal("Title A");
    expect(proposals[0].description).to.equal("Desc A");

    expect(proposals[1].proposer).to.equal(addr2.address);
    expect(proposals[1].title).to.equal("Title B");
    expect(proposals[1].description).to.equal("Desc B");
  });

  it("should return correct proposer", async function () {
    await governance.connect(addr1).createProposal("Test", "Proposer Check");

    const proposals = await governance.getAllProposals();
    expect(proposals[0].proposer).to.equal(addr1.address);
    expect(proposals[0].id).to.equal(0);
  });
});
