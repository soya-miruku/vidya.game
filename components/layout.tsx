import React, { useState } from 'react'

import { classNames } from '@/common/helpers'
import { NewsAlert } from './atoms/NewsAlert';
import Footer from './atoms/Footer';
import Header from './atoms/Header';

interface ILayoutProps {
  children: React.ReactNode;
  displayCallout?: boolean;
  pageCategories?: any[];
}

const Layout = ({ children, displayCallout, pageCategories }: ILayoutProps) => {
  const [opened, setOnMenu] = useState(false);

  return (
    <div id="outer-container" className={classNames('w-full h-full', opened ? '' : 'mx-auto')}>
      <div className="w-full h-full relative"> {/*flex flex-col h-screen justify-between font-content antialiased */}
        { typeof window !== 'undefined' && window?.localStorage && <Header pageCategories={pageCategories} isOpen={opened} onOpen={(e) => setOnMenu(e)}/>}
        <main id="page-wrap" className={classNames('w-full h-full z-auto relative', opened ? 'dark:shadow-dark-md shadow-light-md' : '')}>
            {displayCallout && <NewsAlert/>}
            <div className={classNames('mx-auto max-w-kl  w-full h-full flex flex-col justify-center items-center')}>
              {children}
            </div>
            <Footer />
        </main>
      </div>
    </div>
  )
}

export default Layout
