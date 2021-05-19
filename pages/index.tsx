import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { map, bookList } from '../lib/data'
import { getAllPostIds } from '../../lib/posts'

export default function Home() {
  return (
    <>
      {
        map.map((data, index) => (
          <div>
            {data.name}
            {data.chapters}
          </div>
        ))
      }
      {
        bookList.map((data, index) => (
          <div>
            {data}
          </div>
        ))
      }
    </>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}