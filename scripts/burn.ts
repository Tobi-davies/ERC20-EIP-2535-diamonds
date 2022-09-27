import { ethers } from "hardhat";

export async function mintToken() {
  const diamond = await ethers.getContractAt(
    "ERC20V2Facet",
    "0xd5100cE8d14033b6d847a4692159B3090895F0bd"
  );
  let name = await diamond.name();
  console.log("name: ", name);

  let symbol = await diamond.symbol();
  console.log("symbol: ", symbol);

  let decimals = await diamond.decimals();
  console.log("decimals: ", decimals);

  let burn = await (await diamond.burn(20)).toString();
  console.log(burn);
  console.log("burnt token");
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
