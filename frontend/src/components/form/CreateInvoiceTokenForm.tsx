"use client";

import { Flex, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { DynamicInvoiceToken } from "@/types";
import { useContracts, useRequestNetwork } from "@/hooks";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTrigger,
} from "../ui/dialog"
import { useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import { InputGroup } from "../ui/input-group";
import React from "react";
import { toast } from "react-toastify";
import { Add01Icon } from "hugeicons-react";

type FormValues = {
    name: DynamicInvoiceToken["name"];
    symbol: DynamicInvoiceToken["symbol"];
}

interface Props extends React.HTMLAttributes<HTMLFormElement> { }

const CreateInvoiceTokenForm = ({ ...rest }: Props) => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const { dynamicInvoiceTokenFactory } = useContracts();
    const { getRequest, calulatePaymentReference } = useRequestNetwork();
    const { register, handleSubmit, formState: {
        isSubmitting,
    } } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        if (!id) return;
        const invoiceRequest = await getRequest(id);

        if (!invoiceRequest) {
            throw new Error("Invoice not found");
        }

        const paymentReference = await calulatePaymentReference(id);
        const payer = invoiceRequest.getData().payer?.value;
        const paymentAddress = invoiceRequest.getData().extensionsData[0].parameters.paymentAddress;
        const expectedAmount = invoiceRequest.getData().expectedAmount;

        if (!paymentReference || !payer || !paymentAddress || !expectedAmount) {
            throw new Error("Invalid invoice request");
        }

        try {
            await dynamicInvoiceTokenFactory.createDynamicInvoiceToken(
                data.name,
                data.symbol,
                id,
                paymentReference,
                payer,
                paymentAddress,
                Number(expectedAmount)
            )

            toast.success("Dynamic invoice token created");

        } catch (error) {
            console.error(error);
            toast.error("Failed to create dynamic invoice token");
        }
    };

    const onSubmitError = (error: any) => {
        console.error(error);
    }

    return (
        <form id="CreateInvoiceToken-form" onSubmit={handleSubmit(onSubmit, onSubmitError)} {...rest}>
            <Flex width={"full"} direction={"column"} gap={"4"}>
                <InputGroup
                    rounded={"lg"}
                    bg={"bg.emphasized"}
                    width={"full"}
                >
                    <Input
                        placeholder={"Name"}
                        rounded={"lg"}
                        {...register("name")}
                    />
                </InputGroup>

                <InputGroup
                    rounded={"lg"}
                    bg={"bg.emphasized"}
                    width={"full"}
                >
                    <Input
                        placeholder={"Symbol"}
                        rounded={"lg"}
                        {...register("symbol")}
                    />
                </InputGroup>
                <Flex
                    direction={"row"}
                    gap={"4"}
                    justifyContent={"flex-end"}
                >
                    <Button
                        type="submit"
                        width={"fit-content"}
                        rounded={"lg"} bg={"primary"}
                        color={"primary.on-primary"}
                        loading={isSubmitting}
                    >
                        Create
                    </Button>
                </Flex>
            </Flex>
        </form>
    );
};

interface SplitFormWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: string;
}
const CreateInvoiceTokenFormWrapper = ({ color, ...rest }: SplitFormWrapperProps) => {
    const [open, setOpen] = React.useState(false)

    return (
        <DialogRoot
            placement={"center"}
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
        >
            <DialogTrigger >
                <Button width={"full"} rounded={"lg"} justifyContent={"start"}>
                    <Add01Icon />
                    Create Invoice Token
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
                        Create Invoice Token
                    </Text>
                </DialogHeader>
                <DialogBody >
                    <CreateInvoiceTokenForm />
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    );
}

export {
    CreateInvoiceTokenForm,
    CreateInvoiceTokenFormWrapper
}