"use client";

import { WagmiConfig, createConfig } from 'wagmi'
import { arbitrum } from 'viem/chains'
import { ReactNode, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http } from 'viem'

// Configure chains
const chains = [arbitrum] as const

// Create wagmi config without WalletConnect
const config = createConfig({
  chains,
  transports: {
    [arbitrum.id]: http()
  }
})

// Create a client
const queryClient = new QueryClient()

export function Web3Provider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        {children}
      </WagmiConfig>
    </QueryClientProvider>
  )
} 