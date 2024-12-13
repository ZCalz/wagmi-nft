import * as React from 'react'
import { 
  type BaseError,
  useWaitForTransactionReceipt, 
  useWriteContract,
} from 'wagmi'
import { abi } from '../../abi/coolCats'
import { COOL_CATS_ADDRESS } from '@/utils/constants'
import { useNFTInfo } from '../hooks/useNftInfo'
export function MintNFT() {
  const { 
    data: hash,
    error,
    isPending, 
    writeContract 
  } = useWriteContract() 
  const { mintCost } = useNFTInfo();

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const tokenId = formData.get('tokenId') as string 
    writeContract({
      address: COOL_CATS_ADDRESS,
      abi,
      functionName: 'mint',
      value: mintCost!,
      args: [BigInt(tokenId)],
    })
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

  return (
    <form onSubmit={submit}>
        <h3>Mint Cost: 0.1 Ether</h3>
      <input className='text-black' name="tokenId" placeholder="69420" required />
      <button 
        disabled={isPending} 
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Mint'} 
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>} 
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </form>
  )
}