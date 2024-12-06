import { DynamicInvoiceToken } from "@/types"
import { Flex } from "@chakra-ui/react";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    invoiceToken: DynamicInvoiceToken;
}

export const DynamicInvoiceTokenCard: React.FC<Props> = ({ invoiceToken, ...rest }) => {
    return (
        <Flex>

        </Flex>
    )
}