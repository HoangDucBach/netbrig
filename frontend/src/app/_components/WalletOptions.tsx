"use client";

import { Button } from '@/components/ui/button'
import * as React from 'react'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { Wallet03Icon } from 'hugeicons-react';

export function WalletOption() {
  const { open } = useAppKit()
  const { address, isConnecting, isConnected } = useAccount()
  const [addr, setAddr] = React.useState<string | null>(null)
  const [connected, setConneted] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (address) {
      setAddr(address)
    }

    setConneted(isConnected)
  }, [address, isConnected])

  if (connected) return null;

  return (
    <Button
      rounded={"full"}
      bg={"primary"}
      color={"primary.on-primary"}
      loading={isConnecting}
      loadingText={"Connecting"}
      width={"fit-content"}
      padding={"2"}
      onClick={() => {
        open()
      }}
    >
      <Wallet03Icon />
      Connect
    </Button>
  )
}

