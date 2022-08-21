// http://127.0.0.1:7545

async function main() {
  const ethers = require("ethers");
  const fs = require("fs-extra");

  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );

  const wallet = new ethers.Wallet(
    "74fc2d71c1bf0067fe189cc704bc4948314b1ca8dd843d6644d804aa2654f4bc",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "binary"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  console.log("Deploying... Please, wait!");

  const contract = await contractFactory.deploy();

  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
