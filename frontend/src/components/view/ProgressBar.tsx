import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

interface Props {
    value: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    bgColor?: string;
    rounded?: string;
}

const ProgressBar: React.FC<Props> = ({
    value,
    max = 100,
    size = 'md',
    color = 'primary',
    rounded = 'full',
}) => {
    const percentage = (value / max) * 100;

    return (
        <Flex direction="row" width="full" gap="2" alignItems={"center"} height={"fit-content"}>
            <Box
                width="full"
                height={size?.replace('sm', '1').replace('md', '2').replace('lg', '4')}
                rounded={rounded}
                bgColor="bg.muted"
                position="relative"
                overflow="hidden"
            >
                <Box
                    width={`${percentage}%`}
                    bg={color}
                    height="full"
                    rounded={rounded}
                    transition="width 0.3s ease"
                />
            </Box>
            <Text fontSize={size?.replace('sm', 'xs').replace('md', 'sm').replace('lg', 'md')} textAlign="center" color={"primary"}>
                {percentage.toFixed(0)}%
            </Text>
        </Flex>
    );
};

export default ProgressBar;