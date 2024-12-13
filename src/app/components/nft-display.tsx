"use client"
import React, { useEffect, useState } from 'react'
import { useNFTLoader } from '../hooks/useNFTLoader'
import { useNFTInfo } from '../hooks/useNftInfo'
import Image
 from 'next/image'
export const NftDisplay = () => {
    const { pfpLinks } = useNFTLoader()
    const { max } = useNFTInfo()
    const [view, setView] = useState(0)
    return (
        <>
            <div className="flex gap-2">
                {Array.from({ length: 5 }, (_, index) => (
                    <div key={index}>
                        <img src={pfpLinks[index + view]} alt="nft pic" width="100" height="100"/>
                        <p>Token Id: {index + view}</p>
                    </div>
                ))}
            </div>
            <div className="flex gap-6">
                <button className="text-white hover:font-bold" onClick={() => setView((prev) => {
                    if (prev > 0) {
                            return prev - 5
                        } else {
                            return prev
                        }
                    })}>
                    PREV
                </button>
                <button className="text-white hover:font-bold" onClick={() => setView((prev) => {
                    if (prev + 5 < max! || 100) {
                        return prev + 5
                    } else {
                        return prev
                    }
                })}>
                    NEXT
                </button>
            </div>
        </>
    )
}
