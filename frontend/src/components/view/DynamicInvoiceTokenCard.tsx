import { Button } from "@/components/ui/button";
import { DynamicInvoiceToken } from "@/types";
import { Center, Flex, Heading, Text } from "@chakra-ui/react";
import { Coins01Icon, InvoiceIcon } from "hugeicons-react";
import React from "react";
import { Handle, Position } from '@xyflow/react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    invoiceToken?: DynamicInvoiceToken;
}

// Function to generate a color based on a string (id) with alpha
const generateColorFromId = (id: string, light: number = 1) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const r = (hash >> 24) & 0xFF;
    const g = (hash >> 16) & 0xFF;
    const b = (hash >> 8) & 0xFF;

    // Convert RGB to HSL
    const rNormalized = r / 255;
    const gNormalized = g / 255;
    const bNormalized = b / 255;

    const max = Math.max(rNormalized, gNormalized, bNormalized);
    const min = Math.min(rNormalized, gNormalized, bNormalized);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case rNormalized: h = (gNormalized - bNormalized) / d + (gNormalized < bNormalized ? 6 : 0); break;
            case gNormalized: h = (bNormalized - rNormalized) / d + 2; break;
            case bNormalized: h = (rNormalized - gNormalized) / d + 4; break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100 * light); // Adjust lightness based on the light parameter

    const color = `hsl(${h},${s}%,${l}%)`;
    return color;
};

export const DynamicInvoiceTokenCard = ({ invoiceToken, ...rest }: Props) => {
    const backgroundColor = generateColorFromId("010044e42819e3c863258952b4ea26c86aef23b280359db32c1700b7550096045f", 0.25);
    const color = generateColorFromId("010044e42819e3c863258952b4ea26c86aef23b280359db32c1700b7550096045f", 1);

    const handlePay = async () => {
        console.log("Pay");
    };

    const handleSplit = async () => {
        console.log("Split");
    }

    const CoreOperations = () => {
        return (
            <Flex direction={"row"} gap={"4"} w={"full"} h={"fit-content"}>
                <Button size={"sm"} rounded={"lg"} flex={"1"} bg={"gray.100"} color={"gray.900"}>
                    Pay
                </Button>
                <Button size={"sm"} rounded={"lg"} flex={"1"} bg={color} color={"fg"}>
                    Split
                </Button>
            </Flex>
        )
    };
    return (
        <Flex
            {...rest}
            backgroundColor={backgroundColor}
            padding="2"
            minW={"64"}
            gap={"2"}
            rounded="2xl"
            direction={"column"}
            w={"fit-content"}
            h={"fit-content"}
            cursor={"pointer"}
        >
            <Handle position={Position.Bottom} type="target" />
            <Handle position={Position.Top} type="source" />
            <Flex direction={"row"} gap={"4"} w={"fit"}>
                <Center w={"12"} h={"12"} rounded={"lg"} bg={color}>
                    <InvoiceIcon />
                </Center>
                <Flex direction={"column"}>
                    <Heading size={"md"} as={"h6"}>{invoiceToken?.name || "Token Name"}</Heading>
                    <Flex direction={"row"} gap={"1"} color={"fg.muted"}>
                        <Coins01Icon size={16} />
                        <Text fontSize={"xs"} >{invoiceToken?.amount || "0.00"} {"ETH"}</Text>
                    </Flex>
                </Flex>
            </Flex>
            <CoreOperations />
        </Flex>
    );
};
