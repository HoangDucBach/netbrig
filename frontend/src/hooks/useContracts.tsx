import { useMemo } from 'react';
import { ethers } from 'ethers';

import DynamicInvoiceTokenFactoryContract from '@/artifacts/DynamicInvoiceTokenFactory.json';
import DynamicInvoiceTokenContract from '@/artifacts/DynamicInvoiceToken.json';
import utils from '@/utils';
import { useEthers } from './useEthers';
import { DynamicInvoiceToken } from '@/types';


type DynamicInvoiceTokenHook = {
    createDynamicInvoiceToken: (
        _name: string,
        _symbol: string,
        _requestId: string,
        _paymentReference: string,
        _payer: string,
        _payee: string,
        _amount: number
    ) => Promise<ethers.providers.TransactionResponse>;
    getDynamicInvoiceToken: (_paymentReference: string) => Promise<DynamicInvoiceToken>;
};


type ContractsHooks = {
    dynamicInvoiceTokenFactory: DynamicInvoiceTokenHook;
};

const useDynamicInvoiceTokenFactory = (): DynamicInvoiceTokenHook => {
    if (!utils.core.DYNAMIC_INVOICE_TOKEN_FACTORY_ADDRESS) {
        throw new Error('DYNAMIC_INVOICE_TOKEN_FACTORY_ADDRESS not set');
    }

    const { signer, provider } = useEthers();
    const contract = useMemo(
        () =>
            new ethers.Contract(
                utils.core.DYNAMIC_INVOICE_TOKEN_FACTORY_ADDRESS,
                DynamicInvoiceTokenFactoryContract.abi,
                signer
            ),
        [signer]
    );

    const createDynamicInvoiceToken = async (
        _name: string,
        _symbol: string,
        _requestId: string,
        _paymentReference: string,
        _payer: string,
        _payee: string,
        _amount: number
    ) => {
        const tx = await contract.createDynamicInvoiceToken(
            _name,
            _symbol,
            _requestId,
            _paymentReference,
            _payer,
            _payee,
            ethers.utils.parseUnits(_amount.toString(), 18) // Chuyển đổi số lượng sang đơn vị token
        );
        return tx;
    };

    const getDynamicInvoiceToken = async (_paymentReference: string): Promise<DynamicInvoiceToken> => {
        if (!_paymentReference) {
            throw new Error('Get Dynamic Invoice Token: Payment Reference is required');
        }

        try {
            const result = await contract.getDynamicInvoiceToken(_paymentReference);

            const tokenContract = new ethers.Contract(
                result,
                DynamicInvoiceTokenContract.abi,
                provider
            );

            const children = await tokenContract.getChildren();

            const pay = async (_amount: number) => {
                if (!_amount) throw new Error('Amount is required');

                try {
                    const tx = await tokenContract.pay(
                        ethers.utils.parseUnits(_amount.toString(), 18)
                    );
                    return tx;
                } catch (error) {
                    console.log(error);
                    throw new Error('Pay: Failed');
                }
            };

            const spawnChild = async (
                _requestId: string,
                _paymentReference: string,
                _payer: string,
                _amount: number
            ) => {
                if (!_requestId) throw new Error('Spawn Child: Request ID is required');
                if (!_paymentReference) throw new Error('Spawn Child: Payment Reference is required');
                if (!_payer) throw new Error('Spawn Child: Payer is required');
                if (!_amount) throw new Error('Spawn Child: Amount is required');

                try {
                    const tx = await tokenContract.spawnChild(
                        _requestId,
                        _paymentReference,
                        _payer,
                        ethers.utils.parseUnits(_amount.toString(), 18)
                    );
                    return tx;
                } catch (error) {
                    console.log(error);
                    throw new Error('Spawn Child: Failed');
                }
            };

            const [
                name,
                symbol,
                requestID,
                paymentReference,
                payer,
                payee,
                amount,
                amountPaid,
                status,
            ] = await Promise.all([
                tokenContract.name(),
                tokenContract.symbol(),
                tokenContract.requestID(),
                tokenContract.paymentReference(),
                tokenContract.payer(),
                tokenContract.payee(),
                tokenContract.amount(),
                tokenContract.amountPaid(),
                tokenContract.status(),
            ]);

            return {
                name,
                symbol,
                requestID,
                paymentReference,
                payer,
                payee,
                amount: parseFloat(ethers.utils.formatUnits(amount, 18)),
                amountPaid: parseFloat(ethers.utils.formatUnits(amountPaid, 18)),
                status,
                children,
                pay,
                spawnChild,
            };
        } catch (error) {
            console.log(error);
            throw new Error('Get Dynamic Invoice Token: Failed');
        }
    };

    return {
        createDynamicInvoiceToken,
        getDynamicInvoiceToken,
    };
};



export const useContracts = (): ContractsHooks => {
    const dynamicInvoiceTokenFactory = useDynamicInvoiceTokenFactory();

    return useMemo(() => {
        return {
            dynamicInvoiceTokenFactory,
        };
    }, [dynamicInvoiceTokenFactory]);
};