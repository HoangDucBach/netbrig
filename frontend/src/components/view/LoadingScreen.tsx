import utils from "@/utils";
import { Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { Logo } from "../Icons";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

export function LoadingScreen({ className, ...props }: Props) {
    return (
        <Center
            w={"svw"}
            h={"svh"}
            {...props}
        >
            <Flex
                direction={"column"}
                gap={"4"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Logo width={"64px"} height={"64px"} />
                <Text fontSize={"lg"} fontWeight={"semibold"}>
                    {utils.constants.APP_NAME} is loading!
                </Text>
                <Spinner />
            </Flex>
        </Center>
    );
}