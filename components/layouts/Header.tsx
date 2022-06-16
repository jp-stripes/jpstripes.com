import Link from 'next/link'
import { FC } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Learn', href: '/learn' },
]

export const Header: FC = () => {
  return (
    <header className='bg-indigo-600'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' aria-label='Top'>
        <div className='w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none'>
          <div className='flex items-center'>
            <a href='#'>
              <span className='sr-only'>Workflow</span>
              <img className='h-10 w-auto' src='/jp_stripe_logo.png' alt='' />
            </a>
            <div className='hidden ml-10 space-x-8 lg:block'>
              {navigation.map((link) => (
                <Link key={link.name} href={link.href} passHref>
                  <a className='text-base font-medium text-white hover:text-indigo-50'>
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className='ml-10 space-x-4'>
            {/*}
            <a
              href='#'
              className='inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75'
            >
              Discord
            </a>
            */}
            <a
              href='https://github.com/jp-stripes'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50'
            >
              GitHub
            </a>
          </div>
        </div>
        <div className='py-4 flex flex-wrap justify-center space-x-6 lg:hidden'>
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className='text-base font-medium text-white hover:text-indigo-50'
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
