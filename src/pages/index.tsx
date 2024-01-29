import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Houses from '../modules/houses/Houses'
import useStorage from '../common/hooks/useStorage'

const Home: NextPage = () => {
  const router = useRouter()

  const { getItem, setItem } = useStorage()

  useEffect(() => {
    if (window.location.search) {
      setItem('search', window.location.search, 'local')
    } else {
      const savedSearchUrl = getItem('search', 'local')

      if (savedSearchUrl) {
        router.push(savedSearchUrl)
      }
    }
  }, [])

  return (
    <div className='container mx-auto max-w-4xl my-12'>
      <Houses />
    </div>
  )
}

export default Home
