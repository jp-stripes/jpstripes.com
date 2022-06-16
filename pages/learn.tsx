import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { parse, transform } from '@markdoc/markdoc'
import axios from 'axios'
import { Markdoc } from '../components/Markdoc'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  return (
    <>
      <Head>
        <title>Learn Stripe</title>
      </Head>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' aria-label='Top'>
        <div className='w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none'>
          <Markdoc content={props.markdownFile} />
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<any> = async () => {
  const { data: markdownFile } = await axios.get(
    'https://raw.githubusercontent.com/jp-stripes/awesome-stripe-ja/main/README.md',
  )
  const transformedNode = transform(parse(markdownFile))
  if (transformedNode && typeof transformedNode !== 'string') {
    transformedNode.children.forEach((child, i) => {
      if (!child || typeof child === 'string') return
      if (!transformedNode.children[i] || typeof transformedNode.children[i] === 'string') return
      switch (child.name) {
        case 'h1': {
          child.attributes = {
            ...child.attributes,
            className: 'font-medium leading-tight text-5xl mt-4 mb-2',
          }
          break
        }
        case 'h2': {
          child.attributes = {
            ...child.attributes,
            className: 'font-medium leading-tight text-4xl mt-4 mb-2',
          }
          break
        }
        case 'h3': {
          child.attributes = {
            ...child.attributes,
            className: 'font-medium leading-tight text-3xl mt-4 mb-2',
          }
          break
        }
        case 'p': {
          child.children.forEach((grandChild, j) => {
            if (!grandChild || typeof grandChild === 'string') return
            if (!child.children[j] || typeof child.children[j] === 'string') return
            if (grandChild.name === 'a') {
              grandChild.attributes = {
                ...grandChild.attributes,
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'text-underline text-indigo-600',
              }
            }
            child.children[j] = grandChild
          })
          break
        }
        case 'ul': {
          child.children.forEach((grandChild, j) => {
            if (!grandChild || typeof grandChild === 'string') return
            if (!child.children[j] || typeof child.children[j] === 'string') return
            if (grandChild.name === 'li') {
              grandChild.attributes = {
                ...grandChild.attributes,
                className: 'list-disc ml-3',
              }

              grandChild.children.forEach((greatGrandChild, k) => {
                if (!greatGrandChild || typeof greatGrandChild === 'string') return
                if (!grandChild.children[k] || typeof grandChild.children[k] === 'string') return
                if (greatGrandChild.name === 'a') {
                  greatGrandChild.attributes = {
                    ...greatGrandChild.attributes,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: 'text-underline text-indigo-600',
                  }
                }
                grandChild.children[k] = greatGrandChild
              })
              child.children[j] = grandChild
            }
          })

          break
        }
        default:
          return
      }
      transformedNode.children[i] = child
    })
  }
  return {
    props: {
      markdownFile: JSON.stringify(transformedNode),
    },
  }
}

export default Home
