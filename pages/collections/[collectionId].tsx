import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Collection = () => {
  const router = useRouter()
  return (
    <div>
      <Link href="/">
        <h2>{router.query.collectionId}</h2>
      </Link>
    </div>
  )
}

export default Collection
