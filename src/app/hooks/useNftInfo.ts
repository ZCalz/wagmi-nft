import { useReadContracts } from 'wagmi'
import { abi } from '../../abi/coolCats'
import { COOL_CATS_ADDRESS } from '../../utils/constants'
export const useNFTInfo = () => {
  const { 
    data,
    error,
    isPending
  } = useReadContracts({
    contracts: [{
        abi,
        functionName: 'maxSupply',
        address: COOL_CATS_ADDRESS,
    },
    {
        abi,
        functionName: 'totalSupply',
        address: COOL_CATS_ADDRESS,
    },
    {
        abi,
        functionName: 'uriPrefix',
        address: COOL_CATS_ADDRESS,
    }]
  })

  const max = data? data[0].result : null;
  const total = data? data[1].result : null;
  const uriPrefix = data? data[2].result : null;

  return ({ max, total, uriPrefix, error, isPending })
}