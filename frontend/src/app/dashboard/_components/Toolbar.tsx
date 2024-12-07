"use client";

import { Flex, Heading, Text, Input, Separator, Image, Span } from "@chakra-ui/react";
import { useAppKit, useWalletInfo } from "@reown/appkit/react";
import { Copy01Icon, CreditCardPosIcon, Search01Icon, WorkflowCircle06Icon } from "hugeicons-react";
import React from "react";
import { useAccount } from "wagmi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CreateInvoiceTokenFormWrapper } from "@/components/form/CreateInvoiceTokenForm";
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import { DynamicInvoiceTokenViewCard } from "@/components/view/DynamicInvoiceTokenCard";
import { mockDynamicInvoiceTokens } from "@/mock";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
}

export function Toolbar({ className, ...props }: Props) {
    const { address } = useAccount();
    const { walletInfo } = useWalletInfo();
    const { open } = useAppKit();

    const ItemGroup = ({ ...props }: React.PropsWithChildren<{
        label?: string;
        icon?: React.ReactNode;
    }>) => {
        const { label, icon, children } = props;

        return (
            <Flex width={"full"} direction={"column"} gap={"4"} flex={"1"}>
                <Flex direction={"row"} justifyContent={"space-between"}>
                    <Text fontSize={"md"} fontWeight={"semibold"}>{label}</Text>
                    {icon}
                </Flex>
                <Separator />
                {children}
            </Flex>
        )
    }

    const Search = () => {
        const pathname = usePathname();
        const searchParams = useSearchParams();
        const router = useRouter();

        const createQueryString = React.useCallback(
            (name: string, value: string) => {
                const params = new URLSearchParams(searchParams.toString())
                params.set(name, value)

                return params.toString()
            },
            [searchParams]
        )
        const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const queryString = createQueryString("id", value);
            router.push(`${pathname}?${queryString}`)
        }

        return (
            <InputGroup
                rounded={"lg"}
                bg={"bg.emphasized"}
                width={"full"}
                startElement={<Search01Icon />}
            >
                <Input
                    placeholder={"Search id"}
                    rounded={"lg"}
                    onChange={handleSearch}
                />
            </InputGroup>
        )
    }

    const Header = () => {
        return (
            <Flex width={"full"} direction={"column"} gap={"4"}>
                <Flex direction={"row"} gap={"4"}>
                    <Heading size={"md"}>
                        Basic Flow
                    </Heading>
                    <Text color={"primary"}>
                        <WorkflowCircle06Icon />
                    </Text>
                </Flex>
                <Search />
                <Separator />
            </Flex>
        )
    }

    const CoreOperations = () => {
        return (
            <Flex direction={"column"} gap={"4"} width={"full"} height={"fit"}>
                <CreateInvoiceTokenFormWrapper />
                <Button width={"full"} rounded={"lg"} justifyContent={"start"}>
                    <Span><CreditCardPosIcon /></Span>
                    Pay
                </Button>
            </Flex>
        )
    }
    const MyInvoiceToken = () => {
        return (
            <ItemGroup label={"My Invoice Token"}>
                <Flex direction={"column"} gap={"4"} height={"full"} overflow={"scroll"} maxH={"full"}>
                    {
                        mockDynamicInvoiceTokens.map((invoiceToken, index) => (
                            <DynamicInvoiceTokenViewCard key={index} invoiceToken={invoiceToken} />
                        ))
                    }
                </Flex>
            </ItemGroup>
        )
    }
    const WalletPanel = () => {
        if (!address) return null;

        return (
            <Flex
                width={"full"}
                rounded={"lg"}
                gap={"1"}
                paddingX={"2"}
                bg={"primary"}
                color={"primary.on-primary"}
                justifyContent={"center"}
                alignItems={"center"}
                overflow={"hidden"}
                onClick={() => {
                    open();
                }}
            >
                <Image src={walletInfo?.icon} width={"6"} height={"6"} alt={walletInfo?.name} />
                <Text flex={"1"} fontWeight={"medium"}>
                    {
                        address?.slice(0, 6) + "..." + address?.slice(-6)
                    }
                </Text>
                <Button variant={"plain"} color={"primary.on-primary"}>
                    <Span>
                        <Copy01Icon />
                    </Span>
                </Button>
            </Flex>
        )
    }

    return (
        <Flex
            backgroundColor={"#161616/95"}
            backdropFilter={"blur(32px)"}
            overflow={"auto"}
            direction={"column"}
            rounded={"3xl"}
            top={"50%"}
            translate={"0 -50%"}
            position={"absolute"}
            alignItems={"center"}
            justifyContent={"space-between"}
            height={"95%"}
            width={"64"}
            padding={"4"}
            gap={"4"}
            borderTopColor={"ActiveBorder/25"}
            borderTopWidth={"1px"}
            zIndex={"sticky"}
            {...props}
        >
            <Header />
            <CoreOperations />
            <MyInvoiceToken />
            <WalletPanel />
        </Flex>
    )
}