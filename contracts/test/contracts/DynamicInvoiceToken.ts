import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { DynamicInvoiceToken } from "../../typechain-types";

describe("DynamicInvoiceToken", function () {
    async function setup() {
        const DynamicInvoiceTokenFactory = await ethers.getContractFactory("DynamicInvoiceTokenFactory");

        const [payer, payee] = await ethers.getSigners();

        const factory = await DynamicInvoiceTokenFactory.deploy();
        await factory.waitForDeployment();

        const name = "Pay Chunk";
        const symbol = "PCK";
        const requestId = "019aee4ddaab434dbf925ba5a9c768a0ac1212c1055d746c15a2ada588e81d18da";

        const tx = await factory.createDynamicInvoiceToken(
            name,
            symbol,
            payer.address,
            payee.address,
            requestId
        );

        await tx.wait();

        const tokenAddress = await factory.getDynamicInvoiceToken(requestId);
        const token = await ethers.getContractAt("DynamicInvoiceToken", tokenAddress);

        return { payer, payee, factory, name, symbol, requestId, token };
    }

    it("Should have all the correct values", async function () {
        const { payer, payee, requestId, name, symbol, token } = await loadFixture(setup);

        expect(await token.name()).to.equal(name);
        expect(await token.symbol()).to.equal(symbol);
        expect(await token.payer()).to.equal(payer.address);
        expect(await token.payee()).to.equal(payee.address);
        expect(await token.requestId()).to.equal(requestId);
    });

    it("Should spawn child", async function () {
        it("Should spawn a child", async function () {
            const { factory, token } = await loadFixture(setup);

            const childRequestId = "019aee4ddccc434dbf925ba5a9c768a0ac1212c1055d746c15a2ada588e81d18da";
            const [newPayer] = await ethers.getSigners();

            const tx = await token.spawnChild(
                newPayer.address,
                childRequestId
            );

            await tx.wait();

            const childTokenAddress = await factory.getDynamicInvoiceToken(childRequestId);
            const childToken = await ethers.getContractAt("DynamicInvoiceToken", childTokenAddress);

            expect(await childToken.name()).to.equal(await token.name());
            expect(await childToken.symbol()).to.equal(await token.symbol());
            expect(await childToken.payer()).to.equal(newPayer.address);
            expect(await childToken.payee()).to.equal(await token.getAddress());
            expect(await childToken.requestId()).to.equal(childRequestId);

        });
    });
});