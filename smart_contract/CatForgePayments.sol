// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title CatForgePayments
/// @notice Minimal on-chain receipt log for catforge usage receipts.
contract CatForgePayments {
    event PaymentLogged(
        address indexed payer,
        string prompt,
        uint256 amount,
        bool animated,
        string txReference
    );

    /// @notice Records a CatForge payment. In production, restrict access to an authorised relayer.
    function logPayment(
        string calldata prompt,
        uint256 amount,
        bool animated,
        string calldata txReference
    ) external {
        emit PaymentLogged(msg.sender, prompt, amount, animated, txReference);
    }
}
