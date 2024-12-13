"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'
import { config } from './config'
import { Account } from './components/account'
import { WalletOptions } from './components/wallet-options'
import { ReadNFTContract } from './components/nfts'
import { NftDisplay } from './components/nft-display'
import { MintNFT } from './components/mint'

const queryClient = new QueryClient()

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}> 
                <div className="flex gap-10"><ConnectWallet /></div>
                <ReadNFTContract />
                <NftDisplay />
                <MintNFT />
            </QueryClientProvider> 
        </WagmiProvider>
    </div>
  )
}