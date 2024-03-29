// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "usingfetch/contracts/UsingFetch.sol";

contract SampleUsingFetch is UsingFetch {
    bytes public queryData = abi.encode("SpotPrice", abi.encode("pls", "usd"));
    bytes32 public queryId = keccak256(queryData);
    uint256 public plsPrice;

    // Input fetch oracle address
    constructor(address payable _fetchAddress) UsingFetch(_fetchAddress) {}

    function readPlsPrice()
        public
    {
        // Retrieve data at least 15 minutes old to allow time for disputes
        (bytes memory _value, uint256 _timestampRetrieved) =
            getDataBefore(queryId, block.timestamp - 15 minutes);
        // If timestampRetrieved is 0, no data was found
        if(_timestampRetrieved > 0) {
            // Check that the data is not too old
            if(block.timestamp - _timestampRetrieved < 24 hours) {
                // Use the helper function _sliceUint to parse the bytes to uint256
                plsPrice = _sliceUint(_value);
            }
        }
    }
}
