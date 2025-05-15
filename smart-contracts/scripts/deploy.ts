import { ethers } from "hardhat";

async function main() {
  const Governance = await ethers.getContractFactory("Governance");
  const governance = await Governance.deploy();

  await governance.waitForDeployment();

  console.log("Governance deployed to:", await governance.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
