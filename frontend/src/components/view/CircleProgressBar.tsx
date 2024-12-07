import { Center } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    progress?: number;
    color?: string;
}

export function CircleProgressBar({ progress = 0, color }: Props) {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <Center w={"12"} h={"12"} rounded={"full"} bg={"transparent"} position="relative">
            <svg width="48" height="48">
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    fill="none"
                    stroke={"#18181B"}
                    strokeWidth="6"
                />
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 24 24)"
                />
            </svg>
            <Text
                position="absolute"
                fontSize="2xs"
                fontWeight="bold"
                color={color}
            >
                {`${Math.round(progress)}%`}
            </Text>
        </Center>
    );
}