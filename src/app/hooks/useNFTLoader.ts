"use client"
import { useEffect, useMemo, useState } from 'react'
import { useNFTInfo } from './useNftInfo';
  
export const useNFTLoader = () => {
  const [pfpLinks, setPfpLinks] = useState<string[]>([])
  const { total, uriPrefix } = useNFTInfo();
  useEffect(()=> {
    const getPfpLinks = async (uriPrefix: string, total: number = 10 ) => {
      const links = [];
      for (let i = 0; i < total; i++) {
        const uri = uriPrefix + i.toString()
        // const pfpMetadata = await fetch(uri)
        // const pfpLink = pfpMetadata?.image;
        links.push(uri);
      }
      try {
        const resolvedLinks: string[] = await Promise.all(links.map(async link => {
          const res = await fetch(link)
          if (!res.ok) {
            return null
          }
          const data = await res.json();
          // console.log(data);
          return data.image
        }))
        setPfpLinks(resolvedLinks)
      } catch {
        console.error("Failed to retrieve nft pfp links!")
      }
  }
   getPfpLinks(uriPrefix!, Number(total)) 
  }, [total, uriPrefix])
  // const pfpLinks = useMemo(() => getPfpLinks(uriPrefix!, Number(total)),[total, uriPrefix]);
  return { pfpLinks }
}
