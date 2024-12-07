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
import { useCallback } from 'react';

import { DynamicInvoiceTokenCard } from '@/components/view/DynamicInvoiceTokenCard';

const nodeTypes = {
    dynamicInvoiceToken: DynamicInvoiceTokenCard,
}

const initialNodes = [
    {
        id: '1', position: { x: 0, y: 0 }, data: {
            invoiceToken: {
                requestId: '0x123',
                paymentReference: '0x456',
                amount: 100,
                amountPaid: 0,
                status: 'pending',
                name: 'Invoice 1',
                payee: '0x123',
                payer: '0x456',
                symbol: 'DAI',
            } as DynamicInvoiceToken,
        }, type: 'dynamicInvoiceToken',
    },
    {
        id: '2', position: { x: 30, y: 0 }, data: {
            invoiceToken: {
                requestId: '0x123',
                paymentReference: '0x456',
                amount: 100,
                amountPaid: 0,
                status: 'pending',
                name: 'Invoice 2',
                payee: '0x123',
                payer: '0x456',
                symbol: 'DAI',
            } as DynamicInvoiceToken,
        }, type: 'dynamicInvoiceToken',
    },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
];

export function Canvas({ className, ...props }: Props) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div style={{ width: '100%', height: '100%' }}>
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
                    position='top-center'
                    orientation='horizontal'
                />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}