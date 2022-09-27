import { ethers } from "hardhat";

export async function mintToken() {
  const diamond = await ethers.getContractAt(
    "ERC20Facet",
    "0xd5100cE8d14033b6d847a4692159B3090895F0bd"
  );

  //   let minting = await diamond.mint(100);
  //   console.log(minting);

  //   console.log(diamond);
  let supply = await (await diamond.totalSupply()).toString();
  console.log("totalsupply: ", supply);

  let balance = await (
    await diamond.balanceOf("0xB6E63c79B4dF12DF083f6Ca8AD56D655b63653b7")
  ).toString();
  console.log("balance: ", balance);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  mintToken()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

exports.mintToken = mintToken;
