import React, { useEffect } from 'react'

import Header from './header'
import Footer from './footer'
import { NewsAlert } from './newsAlert'

const Layout = ({ children, pages, displayCallout }) => {
  return (
    <div id="outer-container" className='w-full h-full'>
      <div className="w-full h-full"> {/*flex flex-col h-screen justify-between font-content antialiased */}
        { typeof window !== 'undefined' && window?.localStorage && <Header pages={pages}/>}

        <main id="page-wrap" className='w-full h-full'>
          {displayCallout && <NewsAlert/>}
          {children}
          </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
