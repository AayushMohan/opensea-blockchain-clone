import React, { useEffect, useMemo, useState } from 'react'
import { ThirdwebWeb3Provider, useWeb3 } from '@3rdweb/hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { client } from '../../lib/sanityClient'
import Header from '../../components/Header'
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'
import NFTCard from '../../components/NFTCard'

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Collection = () => {
  const router = useRouter()
  const { provider } = useWeb3()
  const { collectionId } = router.query
  const [collection, setCollection] = useState({})
  const [nfts, setNfts] = useState([])
  const [listings, setListings] = useState([])

  const nftModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://eth-rinkeby.alchemyapi.io/v2/rljYzpFHeHk60JLsmEkZMwjdnUzoHznO'
    )
    return sdk.getNFTModule(collectionId)
  }, [provider])
  // Get All NFTs in the collection
  useEffect(() => {
    if (!nftModule) return
    ;(async () => {
      const nfts = await nftModule.getAll()

      setNfts(nfts)
    })()
  }, [nftModule])

  const marketPlaceModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://eth-rinkeby.alchemyapi.io/v2/rljYzpFHeHk60JLsmEkZMwjdnUzoHznO'
    )
    return sdk.getMarketplaceModule(
      '0x70876A94f84bCD095D3750b230C7fCB27cB50938'
    )
  }, [provider])

  // Get All Listings in the collection
  useEffect(() => {
    if (!marketPlaceModule) return
    ;(async () => {
      setListings(await marketPlaceModule.getAllListings())
    })()
  }, [marketPlaceModule])

  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "marketItems" && contractAddress == "${collectionId}"] {
    "imageUrl": bannerImage.asset->url,
    "bannerImageUrl": bannerImage.asset->url,
    volumeTraded,
    createdBy,
    contactAddress,
    "creator": createdBy->userName,
    title, floorPrice,
    "allOwners": owners[]->,
    description
  }`

    const collectionData = await sanityClient.fetch(query)

    console.log(collectionData, '🔥')

    // the query returns 1 object inside of an array

    await setCollection(collectionData[0])
  }

  useEffect(() => {
    fetchCollectionData()
  }, [collectionId])

  console.log(router.query)
  console.log(router.query.collectionId)

  return (
    <div className="overflow-hidden">
      <Header />

      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src="https://lh3.googleusercontent.com/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs=h600"
          alt="banner"
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src="https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s0"
            alt="profile image"
          />
        </div>
        <div className={style.endRow}>
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIcon}>
                <CgWebsite />
              </div>
              <div className={style.divider} />
              <div className={style.socialIcon}>
                <AiOutlineInstagram />
              </div>

              <div className={style.divider} />
              <div className={style.socialIcon}>
                <AiOutlineTwitter />
              </div>

              <div className={style.divider} />
              <div className={style.socialIcon}>
                <HiDotsVertical />
              </div>
            </div>
          </div>
        </div>

        <div className={style.midRow}>
          <div className={style.title}>{collection?.title}</div>
        </div>
      </div>
      <div className={style.midRow}>
        <div className={style.createdBy}>
          Created by{' '}
          <span className="text-[#2081e2]">{collection?.creator}</span>
        </div>
      </div>
    </div>
  )
}

export default Collection
