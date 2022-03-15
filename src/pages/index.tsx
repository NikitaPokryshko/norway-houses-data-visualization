import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Houses from '../modules/houses/Houses'
import useStorage from '../common/hooks/useStorage'

import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const router = useRouter()

  const { getItem, setItem } = useStorage();

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
    <div className={styles.container}>
      <Houses />
    </div>
  )
}

export default Home
