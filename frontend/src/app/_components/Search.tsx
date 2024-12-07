"use client";

import { Flex, Input } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { Search01Icon } from "hugeicons-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

export function Search({ className, ...props }: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const createQueryString = React.useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const value = (e.target as HTMLInputElement).value;
            const queryString = createQueryString("id", value);
            router.push(`${pathname}/dashboard?${queryString}`);
        }
    }

    return (
        <Flex
            rounded={"full"}
            bg={"#161616/95"}
            width={"full"}
            maxW={"3xl"}
            height={"12"}
            zIndex={"1"}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <input
                type={"text"}
                style={{
                    width: "100%",
                    height: "100%",
                    padding: "0 1rem",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "white",
                    fontSize: "1rem",
                    borderRadius: "9999px"
                }}
                placeholder={"Search any invoice"}
                onKeyDown={handleSearch}
            />
            <Search01Icon style={{
                marginRight: "1rem",
            }}/>
        </Flex>
    )
}