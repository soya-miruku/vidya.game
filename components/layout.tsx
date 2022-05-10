import React, { useEffect } from 'react'

import Header from './header'
import Footer from './footer'
import { NewsAlert } from './newsAlert'

const Layout = ({ children, displayCallout }) => {
  return (
    <div id="outer-container" className='w-full h-full mx-auto'>
      <div className="w-full h-full"> {/*flex flex-col h-screen justify-between font-content antialiased */}
        { typeof window !== 'undefined' && window?.localStorage && <div className='w-full h-full mx-auto max-w-[1140px]'><Header/></div>}
        <main id="page-wrap" className='dark:bg-true-dark-200 bg-true-light-200 w-full h-full ' style={{ zIndex: 2}}>
          {displayCallout && <NewsAlert/>}
          <div className='mx-auto w-full h-full max-w-[1140px] flex flex-col justify-center items-center'>
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default Layout
