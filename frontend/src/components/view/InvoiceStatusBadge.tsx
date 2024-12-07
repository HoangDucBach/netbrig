import { Text } from "@chakra-ui/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    status: number;
}

const InvoiceStatusBadge: React.FC<Props> = ({ status, ...rest }) => {
    const bg = {
        0: "gray.500",
        1: "orange.500",
        2: "primary.10",
        3: "red.600",
    }[status];

    const color = [
        "gray.100",
        "orange.100",
        "primary.1",
        "red.100",
    ][status];

    const statusMap = {
        0: "Pending",
        1: "Partially Paid",
        2: "Paid",
        3: "Cancelled",
    }[status];

    return (
        <Text
            fontSize={"xs"}
            fontWeight={"medium"}
            bg={bg}
            color={`${color}`}
            rounded={"full"}
            px={"2"}
            py={"1"}
            {...rest}
        >
            {statusMap}
        </Text>
    );
};

export default InvoiceStatusBadge;