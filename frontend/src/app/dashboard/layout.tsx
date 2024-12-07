import Providers from "./providers";
import '@xyflow/react/dist/style.css';
import { Panel } from "./_components/Panel";
import { Toolbar } from "./_components/Toolbar";


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
