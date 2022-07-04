import { faChevronDoubleRight } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { push as Menu } from 'react-burger-menu';
import { classNames, getPageUrlByType } from '../../common/helpers';
import { PagesByCategory } from '../../common/viwablePages';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useDetectDeviceSize } from '../../hooks/useDetectIsMobileView';
import { Logo } from '../logo';
import { GradientButton } from './GradientButton';

const Header: React.FC<{className?: string, isOpen?:boolean, onOpen?:any, pageCategories: any}> = ({className, isOpen, onOpen, pageCategories}) => {
  const { isDarkMode, toggleMode } = useDarkMode();
  const navbarRef = useRef<HTMLDivElement>(null);
  const { isMobileView } = useDetectDeviceSize();
  const WIDTH = isMobileView ? 250 : 550;

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
      height: isMobileView ? '100vh' : '80vh',
      top: '0px',
      zIndex: '0',
      overflow: 'hidden',
    },
    bmMenu: {
      zIndex: '1',
      paddingTop: isMobileView ? '0em' : '2.5em',
      fontSize: '1.15em',
      height: isMobileView ? '100vh': '80vh',
      overflow: 'hidden',
      overflowY: isMobileView ? 'auto' : 'hidden',
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
    if(!(navbarRef && navbarRef.current) || isOpen) return;
    let prevY = 0;
    const handleScroll = () => {
      if(!navbarRef && !navbarRef.current) return;
      
      const currentY = window.scrollY;

      if (currentY > prevY) {
        if(!navbarRef.current) return;
        navbarRef.current.classList.remove('translate-y-0');
        navbarRef.current.classList.add('bg-dark-200/80');
        navbarRef.current.classList.add('-translate-y-full');
        navbarRef.current.classList.add('invisible');
      }
      else if(currentY <= 100) {
        navbarRef.current.classList.remove('bg-dark-200/80');
      } 
      else {
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

  }, [navbarRef, isOpen])

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
    <div ref={navbarRef} className='fixed w-full h-[120px] top-0 z-[1000] transition-all duration-300'>
      <div className={classNames('relative h-[120px] w-full flex justify-between items-center p-vlrg transition-all duration-500',
      isOpen ? ' z-auto' : 'max-w-page mx-auto', className)}
      style={{marginLeft: isOpen ? `${-WIDTH}px` : '', transition: 'margin 500ms'}}>
          <Link href="/">
            <p className='hover:cursor-pointer'>
              <Logo enableDarkMode={false}/>
            </p>
          </Link>
          <div className='flex justify-center items-center sm:gap-x-vmd gap-x-vsm'>
            <div className=''>
              <GradientButton onClick={() => window.open('https://team3d.io', '_blank')}>
                Play
              </GradientButton>
            </div>
            <div>
              <button className="hidden sm:block shadow-md text-light-200 hover:brightness-75 transition-colors duration-150 rounded-full mt-1 px-2 py-1 -ic-swap">
              </button>
            </div>
            <div>
              <button onClick={toggleMode} className={classNames("hidden sm:block shadow-md text-light-200 hover:brightness-75 transition-colors duration-150 mt-1 rounded-full px-2 py-1", `${isDarkMode ? '-ic-lightmode' : '-ic-darkmode'}`)}>
              </button>
            </div>
            <Menu
          width={WIDTH}
          customBurgerIcon={!isOpen 
            ?  <span className='text-light-200 -ic-menu'></span>
            : <span className='text-light-200 -ic-close'></span> 
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
            <div className='sm:px-10 px-3 sm:py-4 py-0 flex w-full flex-wrap justify-start gap-x-5 dark:text-white text-dark-100 gap-y-5'>
              {PagesByCategory && Object.keys(PagesByCategory).map((category, index) => {
                return( 
                  <div key={`cat-${category}-${index}`} className='w-[225px] px-4 flex flex-col justify-start items-start'>
                    <h1 className='font-bold font-saria text-standfirst py-3 px-1 uppercase dark:text-white/90 text-dark-400/90'>{category}</h1>
                    <div className='relative dark:shadow-dark hover:brightness-150 shadow-light rounded-xl w-[190px] h-[180px] mb-4'>
                    <Image loading="lazy" className='animate-brightGlow ' src={PagesByCategory[category].image} objectFit='cover' width={190} height={180} style={{
                      borderRadius: '15px',
                    }}/>
                    </div>
                    {PagesByCategory[category].pages.map((page, y) => {
                    return (
                      <div key={`${page.slug}-${y}`} className={classNames('group py-[7px] px-[5px] text-body-sm', page.active ? 'hover:text-indigo-400 w-full hover:cursor-pointer': 'text-zinc-600/50 flex justify-between items-center')}>
                        <Link href={page.active ? `${getPageUrlByType(page.type, page.slug)}` : '/soon'}>
                          <div className='flex items-center gap-x-2'>
                            <FontAwesomeIcon className='text-accent-dark-200 group-hover:text-accent-dark-700' icon={faChevronDoubleRight}></FontAwesomeIcon>
                            <p className="menu-item font-saria uppercase"> {page.displayName}</p>
                          </div>
                        </Link>
                        {!page.active && <span className='text-xs p-1 px-2 tracking-cta dark:text-light-200/50 text-dark-300/50 dark:bg-dark-300/50 bg-light-300/50 rounded-lg'>SOON</span>}
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
