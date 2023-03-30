

const main = async()=> {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;
  // const lockedAmount = hre.ethers.utils.parseEther("0.001");

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();
  //class generate instances of  contract
// one specific instance of contract

  await transactions.deployed();
  console.log("Transaction deployed to :", transactions.address)

 
}


const runMain = async()=> {
   try{
    await main();
    process.exit(0);

   } catch(error){
    console.error(error);
    process.exit(1);

   }
}
runMain(); //responsibile for deploying contract

// async await is dijust diffrent way to write .then() and .catch() method