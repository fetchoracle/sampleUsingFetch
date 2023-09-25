const { expect } = require("chai");
const { ethers } = require("hardhat");
const {abi, bytecode} = require("usingfetch/artifacts/contracts/FetchPlayground.sol/FetchPlayground.json");

describe("Fetch", function() {
  let sampleUsingFetch;
  let fetchOracle;
  const abiCoder = new ethers.utils.AbiCoder();
  // generate queryData and queryId for pls/usd price
  const PLS_USD_QUERY_DATA_ARGS = abiCoder.encode(["string", "string"], ["pls", "usd"]);
  const PLS_USD_QUERY_DATA = abiCoder.encode(["string", "bytes"], ["SpotPrice", PLS_USD_QUERY_DATA_ARGS]);
  const PLS_USD_QUERY_ID = ethers.utils.keccak256(PLS_USD_QUERY_DATA);

  // Set up Fetch Playground Oracle and SampleUsingFetch
  beforeEach(async function () {
    let FetchOracle = await ethers.getContractFactory(abi, bytecode);
    fetchOracle = await FetchOracle.deploy();
    await fetchOracle.deployed();

    let SampleUsingFetch = await ethers.getContractFactory("SampleUsingFetch");
    sampleUsingFetch = await SampleUsingFetch.deploy(fetchOracle.address);
    await sampleUsingFetch.deployed();
  });

  it("readPLSPrice", async function() {
    // mock value to report
    const mockValue = BigInt(2000e18);
    // convert to bytes
    const mockValueBytes = abiCoder.encode(["uint256"], [mockValue]);
    // submit value to playground
    await fetchOracle.submitValue(PLS_USD_QUERY_ID, mockValueBytes, 0, PLS_USD_QUERY_DATA);
    // advance block timestamp by 15 minutes to allow our value to be retrieved
    await ethers.provider.send("evm_increaseTime", [901]);
    await ethers.provider.send("evm_mine");
    // retrieve value from playground in our sample contract
    await sampleUsingFetch.readPLSPrice();
    // read our saved value from the sample contract
    const retrievedVal = await sampleUsingFetch.plsPrice();
    expect(BigInt(retrievedVal)).to.equal(mockValue);
  })
});
