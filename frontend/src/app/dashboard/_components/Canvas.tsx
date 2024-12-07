"use client";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
}
import { DynamicInvoiceToken } from '@/types';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Background,
    BackgroundVariant,
    Controls,
} from '@xyflow/react';
import React, { use, useCallback } from 'react';

import { DynamicInvoiceTokenCard } from '@/components/view/DynamicInvoiceTokenCard';
import { Box } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useContracts, useRequestNetwork } from '@/hooks';

const nodeTypes = {
    dynamicInvoiceToken: React.memo(({ data }: { data: { invoiceToken: DynamicInvoiceToken } }) => {
        return (
            <DynamicInvoiceTokenCard invoiceToken={data.invoiceToken} />
        );
    }),
}

export function Canvas({ className, ...props }: Props) {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { dynamicInvoiceTokenFactory, dynamicInvoiceToken } = useContracts();
    const { calulatePaymentReference } = useRequestNetwork();
    const { data: invoiceToken, ...invoiceTokenQuery } = useQuery<DynamicInvoiceToken>({
        queryKey: ["invoiceToken", id],
        queryFn: async () => {
            const paymentReference = await calulatePaymentReference(id!);
            const invoiceToken = await dynamicInvoiceTokenFactory.getDynamicInvoiceToken(paymentReference);
            return invoiceToken
        },
    });


    const [nodes, setNodes, onNodesChange] = useNodesState([] as any);
    const [edges, setEdges, onEdgesChange] = useEdgesState([] as any);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const generateAllNodesWithChilds = async (invoiceToken: DynamicInvoiceToken) => {
        const x = Math.floor(Math.random() * 1000);
        const y = Math.floor(Math.random() * 1000);

        setNodes((nodes) => {
            const newNodes = [...nodes];
            newNodes.push({
                id: invoiceToken.paymentReference,
                type: 'dynamicInvoiceToken',
                data: { invoiceToken },
                position: { x, y },
            });
            return newNodes;
        });

        if (invoiceToken.children) {
            invoiceToken.children.forEach(async childAddress => {
                const childInvoiceToken = await dynamicInvoiceToken.getDynamicInvoiceToken(childAddress);

                generateAllNodesWithChilds(childInvoiceToken);
                const xChild = x + Math.floor(Math.random() * 10) + 256;
                const yChild = y + Math.floor(Math.random() * 10) + 256;

                setNodes((nodes) => {
                    const newNodes = [...nodes];
                    newNodes.push({
                        id: childInvoiceToken.paymentReference,
                        type: 'dynamicInvoiceToken',
                        data: { invoiceToken: childInvoiceToken },
                        position: { x: xChild, y: yChild },
                    });
                    return newNodes;
                });

                setEdges((edges) => {
                    const newEdges = [...edges];
                    newEdges.push({
                        id: `${invoiceToken.paymentReference}-${childInvoiceToken.paymentReference}`,
                        source: invoiceToken.paymentReference,
                        target: childInvoiceToken.paymentReference,
                    });
                    return newEdges;
                });

            });
        }
    }
    // recursion to create the nodes
    React.useEffect(() => {
        if (invoiceToken) {
            generateAllNodesWithChilds(invoiceToken);
        }
    }, [invoiceToken]);

    return (
        <Box
            width={"svw"}
            height={"svh"}
            position={"fixed"}
            top={0}
            left={0}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                colorMode='dark'
                nodeTypes={nodeTypes}
                fitView
            >
                <Controls
                    position='bottom-center'
                    orientation='horizontal'
                />
                <Background color="#111111" variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </Box>
    );
}