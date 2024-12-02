import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { DynamicInvoiceToken, DynamicInvoiceTokenFactory } from "../../typechain-types";

describe("DynamicInvoiceTokenFactory", function () {
    async function setup() {
        const DynamicInvoiceTokenFactory = await ethers.getContractFactory("DynamicInvoiceTokenFactory");

        const [owner] = await ethers.getSigners();
        const factory = await DynamicInvoiceTokenFactory.deploy();
        await factory.waitForDeployment();

        const name = "Pay Chunk";
        const symbol = "PCK";
        const requestId = "019aee4ddbbb434dbf925ba5a9c768a0ac1212c1055d746c15a2ada588e81d18da";

        const tx = await factory.createDynamicInvoiceToken(
            name,
            symbol,
            owner.address,
            owner.address,
            requestId
        );

        await tx.wait();

        const tokenAddress = await factory.getDynamicInvoiceToken(requestId);
        const token = await ethers.getContractAt("DynamicInvoiceToken", tokenAddress);


        return { owner, factory, name, symbol, requestId, token };
    }

    it("Should create Dynamic Invoice Token", async function () {
        const { owner, factory, name, symbol, requestId, token } = await loadFixture(setup);

        expect(await token.name()).to.equal(name);
        expect(await token.symbol()).to.equal(symbol);
        expect(await token.payer()).to.equal(owner.address);
        expect(await token.payee()).to.equal(owner.address);
        expect(await token.requestId()).to.equal(requestId);
    });
});