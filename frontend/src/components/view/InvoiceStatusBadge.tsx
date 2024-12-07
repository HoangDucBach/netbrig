import { Text } from "@chakra-ui/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    status: "pending" | "partially_paid" | "paid" | "cancelled";
}

const InvoiceStatusBadge: React.FC<Props> = ({ status, ...rest }) => {
    const bg = {
        pending: "gray.500",
        partially_paid: "orange.500",
        paid: "primary.10",
        cancelled: "red.600",
    }[status];

    const color = {
        pending: "gray.100",
        partially_paid: "orange.100",
        paid: "primary.1",
        cancelled: "red.100",
    }[status];

    const statusMap = {
        pending: "Pending",
        partially_paid: "Partially Paid",
        paid: "Paid",
        cancelled: "Cancelled",
    };

    return (
        <Text
            fontSize={"xs"}
            fontWeight={"medium"}
            bg={`${bg}`}
            color={`${color}`}
            rounded={"full"}
            px={"2"}
            py={"1"}
            {...rest}
        >
            {statusMap[status]}
        </Text>
    );
};

export default InvoiceStatusBadge;