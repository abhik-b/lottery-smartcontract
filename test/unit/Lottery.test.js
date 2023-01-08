const { network, getNamedAccounts, deployments, ethers } = require('hardhat')
const { developmentChains, networkConfig } = require('../../helper-hardhat-config')
const { assert } = require('chai')

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Lottery Unit Tests", async function () {
        let lottery, vrfCoordinatorV2
        beforeEach(async function () {
            const { deployer } = await getNamedAccounts()
            await deployments.fixture(["all"])
            lottery = await ethers.getContract("Lottery", deployer)
            vrfCoordinatorV2 = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
        })
        describe("constructor", async function () {
            it("initializes the lottery", async function () {
                const lotteryState = await lottery.getLotteryState()
                assert.equal(lotteryState.toString(), "0")
            })
            it("interval get set correctly", async function () {
                const interval = await lottery.getInterval()
                assert.equal(interval.toString(), networkConfig[network.config.chainId]["interval"])
            })
        })
    })