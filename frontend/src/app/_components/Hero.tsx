"use client";

import { TypeAnimation } from 'react-type-animation';
import { Center, Flex, Heading, Text } from "@chakra-ui/react";
interface Props extends React.HTMLAttributes<HTMLDivElement> { }

export default function Hero({ className, ...props }: Props) {
    return (
        <Flex w={"full"} h={"fit"} zIndex={"1"} direction={"column"}>
            <Flex justifyContent={"center"} alignItems={"center"} direction={"column"}>
                <Heading size={"6xl"} as={"h1"} textAlign={"center"}>
                    NFT platform allows
                </Heading>
                <Flex gap={"4"} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <Heading size={"6xl"} as={"h1"} textAlign={"center"}>
                        spliting
                    </Heading>
                    <Heading size={"6xl"} as={"h1"} textAlign={"center"} color={"primary"}>
                        <TypeAnimation
                            sequence={[
                                "payments invoices",
                                1000,
                                ""
                            ]}
                            wrapper={"span"}
                            cursor={true}
                            repeat={Infinity}
                        />
                    </Heading>
                </Flex>
                <Text
                    fontSize={"lg"}
                    textAlign={"center"}
                    color={"fg.subtle"}
                    maxW={"3xl"}
                    w={"full"}
                >
                    Revolutionary platform for dynamic invoicing, allowing businesses and individuals to create, manage, and split invoices based on NFTs (ERC-721) and Request Network protocols
                </Text>
            </Flex>
        </Flex>
    );
}