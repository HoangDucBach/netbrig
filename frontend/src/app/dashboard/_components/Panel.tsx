"use client";

import { useSearchParams } from 'next/navigation'
import { Flex, Heading, Text, Separator, Skeleton, Center } from "@chakra-ui/react";
import React from "react";
import { CreditCardPosIcon, DollarReceive01Icon, DollarSend01Icon, InformationCircleIcon, Search01Icon, SidebarTopIcon } from 'hugeicons-react';
import { useContracts, useRequestNetwork } from '@/hooks';
import { DynamicInvoiceToken } from '@/types';
import { Request } from '@requestnetwork/request-client.js';
import { useQuery } from "@tanstack/react-query";

import ProgressBar from "@/components/view/ProgressBar"
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { truncateAddress } from '@/libs';
import utils from '@/utils';
import InvoiceStatusBadge from '@/components/view/InvoiceStatusBadge';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
}

export function Panel({ className, ...props }: Props) {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { dynamicInvoiceTokenFactory } = useContracts();
    const { getRequest, calulatePaymentReference } = useRequestNetwork();

    const { data: invoiceRequest, ...invoiceRequestQuery } = useQuery<Request>({
        queryKey: ["invoiceRequest", id],
        queryFn: async () => {
            const request = await getRequest(id!);
            return request;
        },
    });

    const { data: invoiceToken, ...invoiceTokenQuery } = useQuery<DynamicInvoiceToken>({
        queryKey: ["invoiceToken", id],
        queryFn: async () => {
            const paymentReference = await calulatePaymentReference(id!);
            const invoiceToken = await dynamicInvoiceTokenFactory.getDynamicInvoiceToken(paymentReference);
            return invoiceToken
        },
    });
    
    const Placeholder = () => {
        return (
            <Flex w={"full"} flex={"1"} direction={"column"} gap={"4"} justifyContent={"center"} alignItems={"center"}>
                <Search01Icon />
                <Text
                    fontSize={"md"}
                    color={"fg.muted"}
                    textAlign={"center"}
                >
                    Search any invoice to view
                </Text>
            </Flex>
        )
    }
    const Header = () => {
        return (
            <Flex width={"full"} direction={"column"} gap={"4"}>
                <Flex direction={"row"} gap={"4"}>
                    <Heading size={"md"}>
                        Panel
                    </Heading>
                    <Text color={"primary"}>
                        <SidebarTopIcon />
                    </Text>
                </Flex>
                <Separator />
            </Flex>
        )
    }

    const ItemGroup = ({ ...props }: React.PropsWithChildren<{
        label?: string;
        icon?: React.ReactNode;
    }>) => {
        const { label, icon, children } = props;

        return (
            <Flex width={"full"} direction={"column"} gap={"4"}>
                <Flex direction={"row"} justifyContent={"space-between"}>
                    <Text fontSize={"md"} fontWeight={"semibold"}>{label}</Text>
                    {icon}
                </Flex>
                <Separator />
                {children}
            </Flex>
        )
    }

    const DynamicInvoiceTokenDemo = () => {
        if (invoiceTokenQuery.isLoading) return (
            <Skeleton height={"32"} width="full" rounded={"lg"} />
        )

        if (!invoiceToken) return (
            <Text
                fontSize={"md"}
                color={"fg.muted"}
                textAlign={"center"}
            >
                Invoice Token have not created
            </Text>
        )

        return (
            <ItemGroup>
                <Flex direction={"column"} gap={"4"}>
                    <Flex direction={"row"} justifyContent={"space-between"} width={"full"}>
                        <Heading size={"md"} fontWeight={"semibold"} width={"full"} truncate>
                            {invoiceToken?.name}
                        </Heading>
                        <InformationCircleIcon />
                    </Flex>
                    <Flex direction={"column"} gap={"4"} width={"full"} rounded={"2xl"} bg={"bg.emphasized"} p={"4"}>
                        <Flex width={"full"} justifyContent={"space-between"} alignItems={"center"}>
                            <Text fontWeight={"semibold"}>Token</Text>
                            <InvoiceStatusBadge status={invoiceToken?.status} />
                        </Flex>
                        <Flex
                            direction={"column"}
                            gap={"1"}
                            width={"full"}
                        >
                            <Text fontSize={"2xl"} truncate w={"full"} fontWeight={"semibold"} color={"fg"}>
                                {invoiceToken?.amount} ETH
                            </Text>
                            <Text
                                fontSize={"md"}
                                color={"fg.muted"}
                            >
                                Paid {invoiceToken?.amountPaid} ETH
                            </Text>
                            <ProgressBar value={invoiceToken?.amountPaid * 100 / invoiceToken?.amount} />
                        </Flex>
                    </Flex>
                </Flex>
            </ItemGroup>

        )
    }

    const InvoiceDetails = () => {
        const [data, setData] = React.useState<{
            requestId: string;
            paymentReference: string;
            payer: string;
            payee: string
        } | null>(null);

        React.useEffect(() => {
            if (!invoiceRequest) return;

            const fetchData = async () => {
                const invoiceRequestData = invoiceRequest.getData();

                const paymentReference = await calulatePaymentReference(invoiceRequest.requestId);
                setData({
                    requestId: invoiceRequest.requestId,
                    paymentReference,
                    payer: invoiceRequestData.payer?.value || "-",
                    payee: invoiceRequestData.payee?.value || "-"
                });
            };

            fetchData();
        }, [invoiceRequest]);

        if (invoiceRequestQuery.isError) return null;

        if (!data || invoiceRequestQuery.isFetching || invoiceRequestQuery.isLoading) return (
            <Flex
                direction={"column"}
                gap={"4"}
                width={"full"}
            >
                {
                    Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} height={"12"} width="full" rounded={"lg"} />
                    ))
                }
            </Flex>
        )

        const items = [
            {
                label: "Request ID",
                value: data.requestId ? truncateAddress(data.requestId) : "-",
                icon: <Search01Icon />,
                url: `${utils.scan.request}/request/${data.requestId}`
            },
            {
                label: "Payment Reference",
                value: data.paymentReference || "-",
                icon: <CreditCardPosIcon />,
            },
            {
                label: "Payer",
                value: data.payer ? truncateAddress(data.payer) : "-",
                icon: <DollarSend01Icon />,
                url: `${utils.scan.sepoliaScan}/address//${data.payer}`
            },
            {
                label: "Payee",
                value: data.payee ? truncateAddress(data.payee) : "-",
                icon: <DollarReceive01Icon />,
                url: `${utils.scan.sepoliaScan}/address//${data.payee}`
            },
        ];

        return (
            <ItemGroup
                label={"Invoice"}
            >
                <Flex direction={"column"} gap={"4"} width={"full"}>
                    {
                        items.map((item, index) => {
                            if (invoiceRequestQuery.isLoading) return (
                                <Skeleton key={index} height={"12"} width="full" rounded={"lg"} />
                            )

                            return (
                                <Tooltip key={index} content={item.label}>
                                    <Button
                                        key={index}
                                        width={"full"}
                                        rounded={"lg"}
                                        justifyContent={"start"}
                                        onClick={() => {
                                            window.open(item.url || "", "_blank");
                                        }}
                                    >
                                        {item.icon}
                                        {item.value}
                                    </Button>
                                </Tooltip>
                            )
                        })
                    }
                </Flex>
            </ItemGroup>
        )
    }
    React.useEffect(() => {
        console.log(invoiceToken)
        console.log(invoiceTokenQuery.error)
    }, [invoiceToken])

    return (
        <Flex
            backgroundColor={"#161616/95"}
            backdropFilter={"blur(32px)"}
            direction={"column"}
            rounded={"3xl"}
            top={"50%"}
            right={"0"}
            translate={"0 -50%"}
            position={"absolute"}
            alignItems={"center"}
            height={"95%"}
            width={"64"}
            gap={"4"}
            overflowY={"scroll"}
            padding={"4"}
            borderTopColor={"ActiveBorder/25"}
            borderTopWidth={"1px"}
            zIndex={"max"}
            {...props}
        >
            <Header />
            {id ? (
                <>
                    <DynamicInvoiceTokenDemo />
                    <InvoiceDetails />
                </>
            )
                :
                <Placeholder />
            }
        </Flex>
    )
}