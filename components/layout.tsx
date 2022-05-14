import React, { useEffect, useState } from 'react'

import Header from './header'
import Footer from './footer'
import { NewsAlert } from './newsAlert'
import { classNames } from '@/common/helpers'

const Layout = ({ children, displayCallout }) => {
  const [opened, setOnMenu] = useState(false);

  return (
    <div id="outer-container" className={classNames('w-full h-full max-w-[1380px]', opened ? '' : 'mx-auto')}>
      <div className="w-full h-full relative"> {/*flex flex-col h-screen justify-between font-content antialiased */}
        { typeof window !== 'undefined' && window?.localStorage && <Header isOpen={opened} onOpen={(e) => setOnMenu(e)}/>}
        <main id="page-wrap" className={classNames('dark:bg-true-dark-200 bg-true-light-200 w-full h-full z-auto relative', opened ? 'dark:shadow-dark-md shadow-light-md' : '')}>
            {displayCallout && <NewsAlert/>}
            <div className={classNames('mx-auto w-full h-full flex flex-col justify-center items-center')}>
              {children}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
