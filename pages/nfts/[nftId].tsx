import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'

const style = () => {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContainer: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {
  const { provider } = useWeb3() 
  const [selectedNft, setSelectedNft] = useState()
  const [listings, setListings] = useState()
  const router = useRouter()

  const nftModule = useMemo(() => {
    if (!provider) return
    
    const sdk = new ThirdwebSDK(
    provider?.getSigner(),
    'https://eth-rinkeby.alchemyapi.io/v2/rljYzpFHeHk60JLsmEkZMwjdnUzoHznO',
    )
    return sdk.getNFTModule('0xF9a55237B4Ffc9D0C8F466AE59E30Cc0A3084d18')
  }, [provider])

  // Get all NFTs in the collection
  useEffect(() => {
    if (!nftModule) return
    ;(async () => {
      const nfts = await nftModule.getAll()
      
      const selectedNftArray = nfts.find(
        (nft) => nft.id === router.query.assetId
      )
      
      setSelectedNft(selectedNftArray)
    })()
      
    
  },[nftModule])










  return <Header/>
}


export default NFT