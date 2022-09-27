import { ContractReceipt } from "ethers";
import { ethers } from "hardhat";
import { DiamondCutFacet } from "../typechain-types";
import { getSelectors, FacetCutAction } from "./libraries/diamond";

export async function UpgradeERC20() {
  const diamondAddress = "0xd5100cE8d14033b6d847a4692159B3090895F0bd";
  const diamondInitAddress = "0xfa443369734dDE258Ff083B9c1976c1784Ce28c0";
  const diamondInit = await ethers.getContractAt(
    "DiamondInit",
    diamondInitAddress
  );

  console.log("Deploying facets");
  const FacetNames = ["ERC20V2Facet"];
  const cut = [];
  for (const FacetName of FacetNames) {
    const Facet = await ethers.getContractFactory(FacetName);
    const facet = await Facet.deploy();
    await facet.deployed();
    console.log(`${FacetName} deployed: ${facet.address}`);
    cut.push({
      facetAddress: facet.address,
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(facet),
    });
  }

  // upgrade diamond with facets
  console.log("");
  console.log("Diamond Cut:", cut);
  const diamondCut = (await ethers.getContractAt(
    "IDiamondCut",
    diamondAddress
  )) as DiamondCutFacet;
  let tx;
  let receipt: ContractReceipt;
  // call to init function
  let functionCall = diamondInit.interface.encodeFunctionData("init");
  tx = await diamondCut.diamondCut(cut, diamondInitAddress, functionCall);
  console.log("Diamond cut tx: ", tx.hash);
  receipt = await tx.wait();
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`);
  }
  console.log("Completed diamond upgrade");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  UpgradeERC20()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

exports.UpgradeERC20 = UpgradeERC20;

// ERC20V2Facet deployed: 0xF32f53dE4809A4AC918cB6F1a3e75375501ad159
