import React, { useEffect } from 'react'

import Header from './header'
import Footer from './footer'
import { NewsAlert } from './newsAlert'
import { classNames } from '@/common/helpers'

const Layout = ({ children, displayCallout }) => {
  return (
    <div id="outer-container" className='w-full h-full mx-auto'>
      <div className="w-full h-full relative"> {/*flex flex-col h-screen justify-between font-content antialiased */}
        { typeof window !== 'undefined' && window?.localStorage && <Header/>}
        <main id="page-wrap" className='dark:bg-true-dark-200 bg-true-light-200 w-full h-full dark:shadow-dark-md shadow-light-md z-auto relative'>
            {displayCallout && <NewsAlert/>}
            <div className={classNames('mx-auto w-full h-full max-w-[1180px] flex flex-col justify-center items-center')}>
              {children}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
