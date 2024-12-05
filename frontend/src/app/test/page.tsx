"use client";


import { useContracts, useRequestNetwork } from '@/hooks';
import { Types } from '@requestnetwork/request-client.js';
import { ethers } from 'ethers';
import React, { useState } from 'react';

const TestPage = () => {
    const { dynamicInvoiceTokenFactory } = useContracts();
    const { createRequest, getRequest } = useRequestNetwork();
    const [requestData, setRequestData] = useState('');
    const [tokenData, setTokenData] = useState('');

    const handleCreateRequest = async () => {
        const name = 'Test Request';
        const symbol = 'TR';

        try {
            const request = await createRequest(
                {
                    currency: {
                        type: Types.RequestLogic.CURRENCY.ETH,
                        value: 'ETH_Spolia',
                        network: 'sepolia',
                    },
                    expectedAmount: ethers.utils.parseEther('0.0001').toNumber(),
                    payee: {
                        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
                        value: '0xAA2A92059a9134d21D82f5987104030A8c914940',
                    },
                    payer: {
                        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
                        value: '0xAA2A92059a9134d21D82f5987104030A8c914940',
                    },
                },
                {
                    id: Types.Extension.PAYMENT_NETWORK_ID.ETH_FEE_PROXY_CONTRACT,
                    parameters: {
                        feeAddress: ethers.constants.AddressZero,
                        feeAmount: '0'
                    },
                },
                {
    
                }
            );
            const dynamicInvoiceToken = await dynamicInvoiceTokenFactory.createDynamicInvoiceToken(
                name,
                symbol,
                request.requestId,
                '0xAA2A92059a9134d21D82f5987104030A8c914940',
                request.getData().payer?.value!,
                request.getData().payee?.value!,
                Number(request.getData().balance?.balance),
            );
    
         } catch (error) {
            console.error(error);
        }
        
    };

    const handleCreateToken = () => {
        // Logic to create dynamic token
        console.log('Creating token with data:', tokenData);
    };

    return (
        <div>
            <button onClick={handleCreateRequest}>Create Request</button>
        </div>
    );
};

export default TestPage;
