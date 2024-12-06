"use client";

import { Button } from '@/components/ui/button';
import { useContracts, useEthers, useRequestNetwork } from '@/hooks';
import { Types } from '@requestnetwork/request-client.js';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { PaymentReferenceCalculator } from '@requestnetwork/request-client.js';

const TestPage = () => {
    const { dynamicInvoiceTokenFactory } = useContracts();
    const { createRequest, getRequest } = useRequestNetwork();
    const [requestData, setRequestData] = useState('');
    const [tokenData, setTokenData] = useState('');
    const { address } = useAccount();

    const handleCreateRequest = async () => {
        const name = 'Test Request';
        const symbol = 'TR';

        try {
            // const request = await createRequest(
            //     {
            //         currency: {
            //             type: Types.RequestLogic.CURRENCY.ETH,
            //             value: 'ETH_Spolia',
            //             network: 'sepolia',
            //         },
            //         expectedAmount: ethers.utils.parseEther('0.0000001').toNumber(),
            //         payee: {
            //             type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
            //             value: '0x0D78A621e71CfeA0d52Cb51C1163adf1457FCF84',
            //         },
            //         payer: {
            //             type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
            //             value: '0xAA2A92059a9134d21D82f5987104030A8c914940',
            //         },
            //     },
            //     {
            //         id: Types.Extension.PAYMENT_NETWORK_ID.ETH_FEE_PROXY_CONTRACT,
            //         parameters: {
            //             paymentAddress: address,
            //             feeAddress: ethers.constants.AddressZero,
            //             feeAmount: '0'
            //         },
            //     },
            //     {
            //         invoiceIterm: 'Test Invoice Item',
            //         invoiceNumber: '123456789',
            //     }
            // );
            // const dynamicInvoiceToken = await dynamicInvoiceTokenFactory.createDynamicInvoiceToken(
            //     name,
            //     symbol,
            //     request.requestId,
            //     '0xAA2A92059a9134d21D82f5987104030A8c914940',
            //     request.getData().payer?.value!,
            //     request.getData().payee?.value!,
            //     Number(request.getData().balance?.balance),
            // );
            // const address = await signer?.getAddress();
            // console.log('Address:', address);
            // console.log('Request', await getRequest("01423331e3ed123510e7ced2deb637dce1eb503ba44235e625bae9bf5c5124e818"));

            // if (address) {
            //     (await getRequest("01b24819aaeb73fadaf98e8605b165af4f6fc3f6ad2e177714d4bd7bf641b9eefc")).accept({
            //         type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
            //         value: address,
            //     })
            // }
            // console.log('Dynamic Invoice Token created:', dynamicInvoiceToken);
            // console.log('Request created:', request);
            // const r = await request.waitForConfirmation();
            // console.log('R', r);

            const request = await getRequest('01e520b753513320335466318d533e7576dcea75c1f25ca50b38073ed43ae31f24')
            const salt = request.getData().extensions[Types.Extension.PAYMENT_NETWORK_ID.ETH_FEE_PROXY_CONTRACT].values.salt
            const paymentAddress = request.getData().extensions[Types.Extension.PAYMENT_NETWORK_ID.ETH_FEE_PROXY_CONTRACT].values.paymentAddress
            console.log(PaymentReferenceCalculator.calculate(
                request.requestId,
                salt,
                paymentAddress,
            ))
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
            <Button onClick={handleCreateRequest}>Create Request</Button>
        </div>
    );
};

export default TestPage;
