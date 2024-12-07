"use client";

import dynamic from "next/dynamic";
import Providers from "./providers";
import '@xyflow/react/dist/style.css';

const Panel = dynamic(() => import("./_components/Panel").then((mod) => mod.Panel), {
    ssr: false,
});

const Toolbar = dynamic(() => import("./_components/Toolbar").then((mod) => mod.Toolbar), {
    ssr: false,
});
  
export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Providers>
            <Toolbar />
            <Panel />
            {children}
        </Providers>
    );
}
