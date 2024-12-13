import { useReadContracts } from 'wagmi'
import {abi} from '../../abi/coolCats'

export function ReadNFTContract() {
  const { 
    data,
  } = useReadContracts({
    contracts: [{
        abi,
        functionName: 'maxSupply',
        address: '0x5E28ab57D09C589ff5C7a2970d911178E97Eab81',
    },
    {
        abi,
        functionName: 'totalSupply',
        address: '0x5E28ab57D09C589ff5C7a2970d911178E97Eab81',
    }]
  })

  const max = data? data[0].result : null;
  const total = data? data[1].result : null;


  return (
    <>
        <div>Max Supply: {max?.toString()}</div>
        <div>Total Supply: {total?.toString()}</div>
    </>
  )
}