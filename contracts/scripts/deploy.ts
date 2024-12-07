import { ethers, run } from "hardhat";

async function main() {
    try {
        const PayChunkRegistry = await ethers.getContractFactory("PayChunkRegistry");
        const payChunkRegistry = await PayChunkRegistry.deploy();
        await payChunkRegistry.waitForDeployment();
        const tx = payChunkRegistry.deploymentTransaction();

        console.log("PayChunkRegistry deployed to:", await payChunkRegistry.getAddress());
        console.log("Transaction hash:", tx?.hash);

        const DynamicInvoiceTokenFactory = await ethers.getContractFactory("DynamicInvoiceTokenFactory");
        const dynamicInvoiceTokenFactory = await DynamicInvoiceTokenFactory.deploy(payChunkRegistry.getAddress());
        await dynamicInvoiceTokenFactory.waitForDeployment();
        const tx2 = dynamicInvoiceTokenFactory.deploymentTransaction();

        console.log("DynamicInvoiceTokenFactory deployed to:", await dynamicInvoiceTokenFactory.getAddress());
        console.log("Transaction hash:", tx2?.hash);

        console.log("Verify contracts...");
        await run("verify:verify", {
            address: payChunkRegistry.getAddress(),
        });

        await run("verify:verify", {
            address: dynamicInvoiceTokenFactory.getAddress(),
            constructorArguments: [payChunkRegistry.getAddress()],
        });
    } catch (error) {
        console.error(error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });