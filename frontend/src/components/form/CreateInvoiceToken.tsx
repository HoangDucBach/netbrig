"use client";

import { Flex, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";

import { DynamicInvoiceToken } from "@/types";
import { useContracts, useRequestNetwork } from "@/hooks";
import {
    DialogBackdrop,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import { InputGroup } from "../ui/input-group";
import React from "react";
import { Types } from "@requestnetwork/request-client.js";
import { toast } from "react-toastify";

type FormValues = {
    amount: DynamicInvoiceToken["amount"];
    payer: DynamicInvoiceToken["payer"];
}

interface Props extends React.HTMLAttributes<HTMLFormElement> { }

const SplitForm = ({ ...rest }: Props) => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const { dynamicInvoiceTokenFactory } = useContracts();
    const { createRequest, calulatePaymentReference } = useRequestNetwork();
    const { register, handleSubmit, watch, setValue } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        if (!id) return;

        try {
            const invoiceToken = await dynamicInvoiceTokenFactory.getDynamicInvoiceToken(await calulatePaymentReference(id));

            if (!invoiceToken) {
                throw new Error("Invoice not found");
            }

            const addressOfInvoiceToken = await dynamicInvoiceTokenFactory.getDynamicInvoiceTokenAddress(invoiceToken.paymentReference);

            const request = await createRequest(
                {
                    currency: Types.RequestLogic.CURRENCY.ETH,
                    expectedAmount: ethers.utils.parseUnits(data.amount.toString(), 18).toString(),
                    payee: {
                        type: Types.Identity.TYPE.ETHEREUM_SMART_CONTRACT,
                        value: addressOfInvoiceToken,
                    },
                    payer: {
                        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
                        value: data.payer,
                    },
                    timestamp: new Date().getTime(),
                },
                {
                    id: Types.Extension.PAYMENT_NETWORK_ID.ETH_FEE_PROXY_CONTRACT,
                    parameters: {
                        paymentNetworkName: "sepolia",
                        feeAddress: ethers.constants.AddressZero,
                        feeAmount: "0",
                        paymentAddress: data.payer,
                    },
                },
                {
                    creationDate: new Date().toISOString(),
                    meta: {
                        format: "rnf_invoice",
                        version: "0.0.3",
                    },
                    invoiceItems: [],
                    invoiceNumber: invoiceToken.paymentReference,
                }
            )
            await request.waitForConfirmation();
            await invoiceToken.spawnChild(
                request.requestId,
                await calulatePaymentReference(request.requestId),
                data.payer,
                data.amount
            )
        } catch (error) {
            console.error(error);
            toast.error("Failed to split invoice");
        }
    };

    const onSubmitError = (error: any) => {
        console.error(error);
    }

    return (
        <form id="split-form" onSubmit={handleSubmit(onSubmit, onSubmitError)} {...rest}>
            <Flex width={"full"} direction={"column"} gap={"4"}>
                <InputGroup
                    rounded={"lg"}
                    bg={"bg.emphasized"}
                    width={"full"}
                >
                    <Input
                        placeholder={"Amount"}
                        rounded={"lg"}
                        {...register("amount")}
                    />
                </InputGroup>

                <InputGroup
                    rounded={"lg"}
                    bg={"bg.emphasized"}
                    width={"full"}
                >
                    <Input
                        placeholder={"Payer"}
                        rounded={"lg"}
                        {...register("payer")}
                    />
                </InputGroup>

            </Flex>
        </form>
    );
};

interface SplitFormWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: string;
}
const SplitFormWrapper = ({ color, ...rest }: SplitFormWrapperProps) => {
    const [open, setOpen] = React.useState(false)

    return (
        <DialogRoot
            placement={"center"}
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
        >
            <DialogTrigger >
                <Button size={"sm"} rounded={"lg"} flex={"1"} bg={color} color={"fg"}>
                    Split
                </Button>
            </DialogTrigger>
            <DialogContent
                padding={"6"}
                rounded={"2xl"}
                bg={"#161616/95"}
                gap={"4"}
                backdropFilter={"blur(64px)"}
            >
                <DialogCloseTrigger />
                <DialogHeader>
                    <Text
                        fontSize={"lg"}
                        fontWeight={"semibold"}
                        color={"fg"}
                    >
                        Split Invoice
                    </Text>
                </DialogHeader>
                <DialogBody >
                    <SplitForm />
                </DialogBody>
                <DialogFooter
                    direction={"row"}
                    gap={"4"}
                    justifyContent={"flex-end"}
                >
                    <Button type="submit" form="split-form" width={"fit-content"} rounded={"lg"} variant={"outline"} onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" form="split-form" width={"fit-content"} rounded={"lg"} bg={"primary"} color={"primary.on-primary"}>
                        Split
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
}

export {
    SplitForm,
    SplitFormWrapper
}