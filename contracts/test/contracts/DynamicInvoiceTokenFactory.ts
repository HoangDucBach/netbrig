import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("DynamicInvoiceTokenFactory", function () {
    async function setup() {
        const PayChunkRegistry = await ethers.getContractFactory("PayChunkRegistry");
        const DynamicInvoiceTokenFactory = await ethers.getContractFactory("DynamicInvoiceTokenFactory");

        const [payer, payee] = await ethers.getSigners();
        const registry = await PayChunkRegistry.deploy();
        await registry.waitForDeployment();

        const factory = await DynamicInvoiceTokenFactory.deploy(await registry.getAddress());
        await factory.waitForDeployment();

        const name = "Pay Chunk";
        const symbol = "PCK";
        const requestID = "0xed043a928505e412";
        const paymentReference = "0xed043a928505e412"
        const amount = 1;

        const tx = await factory.createDynamicInvoiceToken(
            name,
            symbol,
            requestID,
            paymentReference,
            payer,
            payee,
            amount
        );

        await tx.wait();

        const tokenAddress = await factory.getDynamicInvoiceToken(paymentReference);
        const token = await ethers.getContractAt("DynamicInvoiceToken", tokenAddress);


        return { payer, payee, name, symbol, requestID, paymentReference, token, registry, factory };
    }

    it("Should create DynamicInvoiceToken", async function () {
        const { payee, payer, requestID, paymentReference, name, symbol, token } = await loadFixture(setup);

        expect(await token.name()).to.equal(name);
        expect(await token.symbol()).to.equal(symbol);
        expect(await token.payer()).to.equal(payer.address);
        expect(await token.payee()).to.equal(payee.address);
        expect(await token.requestId()).to.equal(requestID);
        expect(await token.paymentReference()).to.equal(paymentReference);
    });
});