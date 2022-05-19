import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { push as Menu } from 'react-burger-menu';
import { classNames, getPageUrlByType } from '../../common/helpers';
import { PagesByCategory } from '../../common/viwablePages';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useDetectDeviceSize } from '../../hooks/useDetectIsMobileView';
import { Logo } from '../logo';
import { VButton } from './VButton';

const Header: React.FC<{className?: string, isOpen?:boolean, onOpen?:any}> = ({className, isOpen, onOpen}) => {
  const { isDarkMode, toggleMode } = useDarkMode();
  const navbarRef = useRef<HTMLDivElement>(null);
  const { isMobileView } = useDetectDeviceSize();
  const WIDTH = isMobileView ? 250 : 600;

  var styles = {
    bmBurgerButton: {
      position: 'relative',
      height: '20px',
      width: '20px'
    },
    bmBurgerBars: {
      background: isDarkMode ? '#fff' : '#000'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '0px',
      width: '0px'
    },
    bmMenuWrap: {
      position: 'fixed',
      paddingBottom: '2.5rem',
      width: `${WIDTH}px`,
      height: '80vh',
      top: '0px',
      zIndex: '0',
      overflow: 'hidden',
    },
    bmMenu: {
      zIndex: '1',
      paddingTop: '2.5em',
      fontSize: '1.15em',
      height: '80vh',
      overflow: 'hidden',
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#FAFBFF',
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)',
      left:'0',
      top: '0'
    }
  }


  useEffect(() => {
    if(!(navbarRef && navbarRef.current)) return;
    let prevY = 0;
    const handleScroll = () => {
      if(!navbarRef && !navbarRef.current) return;
      
      const currentY = window.scrollY;

      if (currentY > prevY) {
        if(!navbarRef.current) return;
        navbarRef.current.classList.remove('translate-y-0');
        navbarRef.current.classList.add('-translate-y-full');
        navbarRef.current.classList.add('invisible');
      } else {
        if(!navbarRef.current) return;
        navbarRef.current.classList.remove('-translate-y-full');
        navbarRef.current.classList.add('translate-y-0');
        navbarRef.current.classList.remove('invisible');
      }
      prevY = currentY;
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }

  }, [navbarRef])

  useEffect(() => {
    // prevent scroll when open
    if(isOpen) {
      document.getElementById('root_html').style.overflow = 'hidden';
    } else {
      document.getElementById('root_html').style.overflow = 'auto';
    }
    return () => {
      document.getElementById('root_html').style.overflow = 'auto';
    }
  }, [isOpen])

  return (
    <div ref={navbarRef} className='fixed w-full h-[120px] top-0 dark:bg-dark-200 bg-light-200 z-[1000] transition-all duration-300'>
      <div className={classNames('relative h-[120px] w-full flex justify-between items-center p-vlrg transition-all duration-500',
      isOpen ? 'dark:shadow-dark-md shadow-light-md z-auto' : 'max-w-page mx-auto', className)}
      style={{marginLeft: isOpen ? `${-WIDTH}px` : '', transition: 'margin 500ms'}}>
          <Link href="/">
            <p className='hover:cursor-pointer'>
              <Logo/>
            </p>
          </Link>
          <div className='flex justify-center items-center sm:gap-x-vmd gap-x-vsm'>
            <div className=''>
              <VButton special className='group shadow-md' role='group' onClick={() => window.open('https://team3d.io', '_blank')}>
                Play
              </VButton>
            </div>
            <div>
              <button className="hidden sm:block shadow-md dark:text-light-200 text-dark-100 hover:brightness-75 transition-colors duration-150 rounded-full mt-1 px-2 py-1 -ic-swap">
              </button>
            </div>
            <div>
              <button onClick={toggleMode} className={classNames("hidden sm:block shadow-md dark:text-light-200 text-dark-100 hover:brightness-75 transition-colors duration-150 mt-1 rounded-full px-2 py-1", `${isDarkMode ? '-ic-lightmode' : '-ic-darkmode'}`)}>
              </button>
            </div>
            <Menu
          width={WIDTH}
          customBurgerIcon={!isOpen 
            ?  <span className='dark:text-light-200 text-dark-100 -ic-menu'></span> //<FontAwesomeIcon className='dark:text-light-200 text-dark-100' icon={faBars}></FontAwesomeIcon> 
            : <span className='dark:text-light-200 text-dark-100 -ic-close'></span> //<FontAwesomeIcon className='dark:text-light-200 text-dark-100' icon={faXmark}></FontAwesomeIcon>
          } 
          isOpen={isOpen}
          disableOverlayClick={false}
          onOpen={() => onOpen(!isOpen)}
          onClose={() => onOpen(false)}
          noOverlay
          right
          styles={styles}
          pageWrapId="page-wrap"
          outerContainerId="outer-container"
          // noTransition
          >
          <div className='w-full'>
            <div className='px-14 py-4 flex w-full flex-wrap justify-between dark:text-white text-dark-100'>
              {Object.keys(PagesByCategory).map((category, index) => {
                return( 
                  <div key={`cat-${category}-${index}`} className='w-[225px] px-2'>
                    <h1 className='font-bold font-saria text-body-sm p-3'>{category.toUpperCase()}</h1>
                    {PagesByCategory[category].map((page, y) => {
                    return (
                      <div key={`${page.slug}-${y}`} className={classNames('py-2 px-[12px] text-body-sm', page.active ? 'hover:text-indigo-400 w-full hover:cursor-pointer': 'text-zinc-600 flex justify-between items-center')}>
                        <Link href={page.active ? getPageUrlByType(page.type, page.slug) : '/soon'}>
                          <p className="menu-item font-saria">{page.displayName}</p>
                        </Link>
                        {!page.active && <span className='text-xs p-1 px-2 tracking-cta dark:text-light-200/50 text-dark-300 dark:bg-dark-300/50 rounded-lg'>SOON</span>}
                      </div>
                    )
                  })} 
                  </div>
                )
              })}
            </div>
          </div>
            </Menu>
          </div>
      </div>
    </div>
  )
}

export default Header
