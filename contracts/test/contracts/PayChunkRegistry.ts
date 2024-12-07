import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { PayChunkRegistry } from "../../typechain-types";

describe("PayChunkRegistry", function () {
    async function setup() {
        const PayChunkRegistry = await ethers.getContractFactory("PayChunkRegistry");

        const EthereumProxy = await ethers.getContractFactory("EthereumProxy");
        const ethereumProxy = await EthereumProxy.deploy();
        const ethereumProxyAddress = await ethereumProxy.getAddress();

        const registry = await PayChunkRegistry.deploy();
        await registry.waitForDeployment();

        return { registry, ETHEREUM_PROXY: ethereumProxyAddress };
    }

    it("Should register a contract", async function () {
        const { registry, ETHEREUM_PROXY } = await loadFixture(setup);

        await registry.registerContract("ETHEREUM_PROXY", ETHEREUM_PROXY);
        expect(await registry.contracts("ETHEREUM_PROXY")).to.equal(ETHEREUM_PROXY);
    });
});