import { Center, Image } from "@chakra-ui/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

export function Cover({ className, ...props }: Props) {
    return (
        <>
            <Image
                src={"/pattern-left.png"}
                alt={"Cover"}
                objectFit={"cover"}
                w={"25%"}
                left={"4"}
                bottom={"4"}
                position={"absolute"}
                zIndex={"0"}
                {...props}
            />
            <Image
                src={"/pattern-right.png"}
                alt={"Cover"}
                objectFit={"cover"}
                w={"25%"}
                right={"4"}
                top={"4"}
                position={"absolute"}
                zIndex={"0"}
                {...props}
            />
        </>
    );
}