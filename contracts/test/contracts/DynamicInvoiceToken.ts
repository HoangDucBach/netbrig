import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";


import { DynamicInvoiceToken } from "../../typechain-types";

describe("DynamicInvoiceToken", function () {
    async function setup() {
        const PayChunkRegistry = await ethers.getContractFactory("PayChunkRegistry");
        const DynamicInvoiceTokenFactory = await ethers.getContractFactory("DynamicInvoiceTokenFactory");
        const EthereumProxy = await ethers.getContractFactory("EthereumProxy");

        const [payer, payee] = await ethers.getSigners();

        // const ethereumProxy = await EthereumProxy.deploy();
        // await ethereumProxy.waitForDeployment();

        const ethereumProxy = await ethers.getContractFactory("EthereumProxy");
        const ethereumProxyAddress = await (await ethereumProxy.deploy()).getAddress();

        const registry = await PayChunkRegistry.deploy();
        await registry.waitForDeployment();

        const factory = await DynamicInvoiceTokenFactory.deploy(await registry.getAddress());
        await factory.waitForDeployment();

        const name = "Pay Chunk";
        const symbol = "PCK";
        const requestID = "0xed043a928505e412";
        const paymentReference = "0xed043a928505e412"
        const amount = ethers.parseEther("1");

        registry.registerContract("ETHEREUM_PROXY", ethereumProxyAddress);

        const tx = await factory.createDynamicInvoiceToken(
            name,
            symbol,
            requestID,
            paymentReference,
            payer.address,
            payee.address,
            amount
        );
        await tx.wait();

        const tokenAddress = await factory.getDynamicInvoiceToken(paymentReference);
        const token = await ethers.getContractAt("DynamicInvoiceToken", tokenAddress);

        return { payer, payee, name, symbol, paymentReference, token, factory, registry, ethereumProxy };
    }

    it("Should have all the correct values", async function () {
        const { payer, payee, paymentReference, name, symbol, token } = await loadFixture(setup);

        expect(await token.name()).to.equal(name);
        expect(await token.symbol()).to.equal(symbol);
        expect(await token.payer()).to.equal(payer.address);
        expect(await token.payee()).to.equal(payee.address);
        expect(await token.paymentReference()).to.equal(paymentReference);
    });

    it("Should have correct progress and status", async function () {
        const { token } = await loadFixture(setup);

        expect(await token.progress()).to.equal(0);
        expect(await token.status()).to.equal(0);
    });

    describe("Actions: Spawn", function () {
        it("Should spawn child", async function () {
            const { factory, token } = await loadFixture(setup);

            const childPaymentReference = "0xed043a928505e123"
            const [newPayer] = await ethers.getSigners();
            const newRequestID = "0xed043a928505e123";
            const newAmount = ethers.parseEther("0.5");
            const tx = await token.spawnChild(
                newRequestID,
                childPaymentReference,
                newPayer.address,
                newAmount
            );

            await tx.wait();

            const childTokenAddress = await factory.getDynamicInvoiceToken(childPaymentReference);
            const childToken = await ethers.getContractAt("DynamicInvoiceToken", childTokenAddress);

            expect(await childToken.name()).to.equal(await token.name());
            expect(await childToken.symbol()).to.equal(await token.symbol());
            expect(await childToken.payer()).to.equal(newPayer.address);
            expect(await childToken.payee()).to.equal(await token.getAddress());
            expect(await childToken.paymentReference()).to.equal(childPaymentReference);
        });
    });

    describe("Actions: Pay", function () {
        it("Should pay, status should be PAID and progress should be 100%", async function () {
            const { payer, token } = await loadFixture(setup);

            const amount = ethers.parseEther("1");

            const tx = await token.connect(payer).pay({ value: amount });

            await tx.wait();

            expect(await token.progress(), "Progress should be 100%").to.equal(100);
            expect(await token.status(), "Status should be PAID").to.equal(2);
        });

        it("Should pay partially, status should be PARTIALLY_PAID and progress should be 50%", async function () {
            const { payer, token, factory } = await loadFixture(setup);

            const invoiceChilds = [];
            for (let i = 0; i < 4; i++) {
                const childPaymentReference = ethers.hexlify(ethers.randomBytes(16));
                const newRequestID = ethers.hexlify(ethers.randomBytes(16));
                const newAmount = ethers.parseEther("0.5");
                const tx = await token.spawnChild(
                    newRequestID,
                    childPaymentReference,
                    payer.address,
                    newAmount
                );

                await tx.wait();

                const childTokenAddress = await factory.getDynamicInvoiceToken(childPaymentReference);
                const childPayment = await ethers.getContractAt("DynamicInvoiceToken", childTokenAddress);

                invoiceChilds.push(childPayment);
            }

            // Pay 1 child
            const invoiceChild = invoiceChilds[0];
            const amount = ethers.parseEther("0.5");
            const tx = await invoiceChild.connect(payer).pay({ value: amount });
            await tx.wait();
// 
            expect(await token.progress()).to.equal(25);
            expect(await token.status(), "Status should be PARTIALLY_PAID").to.equal(1);
        });
    });
});