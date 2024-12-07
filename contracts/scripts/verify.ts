import { run } from "hardhat";

async function main() {
    const dynamicInvoiceTokenFactoryAddress = "0x4558d3673CEf924A95543Dda7c7cCDC78A69bbc0";
    const payChunkRegistryAddress = "0x35A10b981c2C4894DEa6aF9c67f5a1DF67D640a4";
    try {
        await run("verify:verify", {
            address: payChunkRegistryAddress,
        });

        await run("verify:verify", {
            address: dynamicInvoiceTokenFactoryAddress,
            constructorArguments: [payChunkRegistryAddress],
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