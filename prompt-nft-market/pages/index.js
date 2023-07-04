import styles from "../styles/Home.module.css"
import { useMoralisQuery, useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox"
import networkMapping from "../constants/networkMapping.json"
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"
import { useQuery } from "@apollo/client"
import { useEffect } from "react"

export default function Home() {
    const { chainId, isWeb3Enabled } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : null
    const marketplaceAddress = chainId ? networkMapping[chainString].NftMarketplace[0] : null

    const { loading, error, data } = useQuery(GET_ACTIVE_ITEMS)

    useEffect(() => {
        console.log(chainString)
        console.log(networkMapping[chainString])
        console.log(isWeb3Enabled)
        console.log(data)
    }, [chainString, chainId, isWeb3Enabled])

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled && chainId ? (
                    loading || !data ? (
                        <div>Loading...</div>
                    ) : (
                        data.activeItems.map((nft) => {
                            const { price, nftAddress, tokenId, seller } = nft
                            console.log(nftAddress)
                            return marketplaceAddress ? (
                                <NFTBox
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    marketplaceAddress={marketplaceAddress}
                                    seller={seller}
                                    key={`${nftAddress}${tokenId}`}
                                />
                            ) : (
                                <div>Network error, please switch to a supported network. </div>
                            )
                        })
                    )
                ) : (
                    <div>Web3 Currently Not Enabled</div>
                )}
            </div>
        </div>
    )
}
