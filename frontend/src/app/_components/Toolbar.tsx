"use client";

import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import { Flex, Heading, Text, Input, Separator, Image } from "@chakra-ui/react";
import { useWalletInfo } from "@reown/appkit/react";
import { Add01Icon, Copy01Icon, CreditCardPosIcon, Search01Icon, WorkflowCircle06Icon } from "hugeicons-react";
import { useAccount } from "wagmi";
1
interface Props extends React.HTMLAttributes<HTMLDivElement> {
}

export function Toolbar({ className, ...props }: Props) {
    const { address } = useAccount();
    const { walletInfo } = useWalletInfo();

    const Search = () => {
        return (
            <InputGroup
                rounded={"lg"}
                bg={"bg.emphasized"}
                width={"full"}
                startElement={<Search01Icon />}
            >
                <Input
                    placeholder={"Search"}
                    rounded={"lg"}
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
            <Flex direction={"column"} gap={"4"} width={"full"} flex={"1"}>
                <Button width={"full"} rounded={"lg"} justifyContent={"start"}>
                    <Add01Icon />
                    Create Invoice
                </Button>
                <Button width={"full"} rounded={"lg"} justifyContent={"start"}>
                    <CreditCardPosIcon />
                    Pay
                </Button>
            </Flex>
        )
    }

    const WalletPanel = () => {
        return (
            <Flex width={"full"} rounded={"lg"} gap={"1"} paddingX={"2"} bg={"primary"} color={"primary.on-primary"} justifyContent={"center"} alignItems={"center"}>
                <Image src={walletInfo?.icon} width={"8"} height={"8"} />
                <Text truncate flex={"1"} fontWeight={"medium"}>
                    {address}
                </Text>
                <Button variant={"plain"} color={"primary.on-primary"}>
                    <Copy01Icon />
                </Button>
            </Flex>
        )
    }

    return (
        <Flex
            backgroundColor={"#2A2A2A/50"}
            backdropBlur={"lg"}
            direction={"column"}
            rounded={"3xl"}
            top={"50%"}
            translate={"0 -50%"}
            position={"absolute"}
            alignItems={"center"}
            justifyContent={"space-between"}
            height={"80%"}
            width={"64"}
            padding={"4"}
            borderTopColor={"ActiveBorder/25"}
            borderTopWidth={"1px"}
            zIndex={"max"}
            {...props}
        >
            <Header />
            <CoreOperations />
            <WalletPanel />
        </Flex>
    )
}