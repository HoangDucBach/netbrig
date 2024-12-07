"use client";

interface Props extends React.PropsWithChildren<{}> { }
export default function Providers({ children }: Props) {
    return (
        <>
            {children}
        </>
    );
}