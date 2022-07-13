import { useAccount } from '@/hooks/useAccount';
import { faChevronDoubleRight } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { push as Menu } from 'react-burger-menu';
import { classNames, getPageUrlByType } from '../../common/helpers';
import { PagesByCategory } from '../../common/viwablePages';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useDetectDeviceSize } from '../../hooks/useDetectIsMobileView';
import { Logo } from '../logo';
import { SwapSection } from '../molecules/SwapSection';
import { PricesSection } from '../organisms/pricesSection';
import { GradientButton } from './GradientButton';
import { AnimatePresenceModal } from './Modal';
import { VText } from './VText';

const Header: React.FC<{className?: string, isOpen?:boolean, onOpen?:any, pageCategories: any}> = ({className, isOpen, onOpen, pageCategories}) => {
  const { isDarkMode, toggleMode } = useDarkMode();
  const navbarRef = useRef<HTMLDivElement>(null);
  const [showSwapScreen, setShowSwapScreen] = useState(false);
  const { isAuthenticated, isAuthenticating, Connect, Disconnect} = useAccount();
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
      height: '100vh',
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
    if(!(navbarRef && navbarRef.current)) return;
    let prevY = 0;
    if(isOpen) {
      navbarRef.current.classList.remove(...['bg-dark-300/70', 'backdrop-blur-lg']);
    }
    const handleScroll = () => {
      if(!navbarRef && !navbarRef.current) return;
      
      const currentY = window.scrollY;

      if (currentY > prevY) {
        if(!navbarRef.current) return;
        navbarRef.current.classList.remove('translate-y-0');
        navbarRef.current.classList.add('bg-dark-300/70', 'backdrop-blur-lg');
        navbarRef.current.classList.add('-translate-y-full');
        navbarRef.current.classList.add('invisible');
      }
      else if(currentY <= 100 || isOpen) {
        navbarRef.current.classList.remove(...['bg-dark-300/70', 'backdrop-blur-lg']);
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
    if(isOpen || showSwapScreen) {
      if(showSwapScreen){
        document.getElementById('page-wrap').style.transform = 'translateY(1000px)';
      }
      document.getElementById('root_html').style.overflow = 'hidden';
    } else {
      document.getElementById('root_html').style.overflow = 'auto';
      if(!showSwapScreen) {
        document.getElementById('page-wrap').style.transform = 'translateY(0px)';
      }
    }
    return () => {
      document.getElementById('root_html').style.overflow = 'auto';
    }
  }, [isOpen, showSwapScreen])
  
  const dropIn = {
    hidden: {
      y: '-100vh',
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 500,
        damping: 55
      } 
    },
    exit: {
      y: '-100vh',
    }
  }

  return (
    <div ref={navbarRef} className='fixed w-full h-[120px] top-0 z-[100] transition-all duration-300'>
       <AnimatePresenceModal>
        { showSwapScreen &&
          <motion.div variants={dropIn} initial='hidden' animate='visible' exit='exit'
           className='w-screen h-screen dark:bg-dark-200 bg-light-100 fixed transition-transform duration-500 !z-[100000000]'>
            <div className='flex flex-col w-full h-full justify-center items-center'>
              <button onClick={() => setShowSwapScreen(false)} className='absolute top-0 right-0 p-vmd px-vlrg'>
                <span className='dark:text-light-200 text-dark-200 -ic-close'></span>
              </button>
              <SwapSection showBorder={false}/>
              <div className='flex flex-col'>
                <PricesSection source='coinGecko'/>
              </div>
            </div>
          </motion.div>}
        </AnimatePresenceModal>
        <div className={classNames('relative h-[120px] w-full flex justify-between items-center p-vlrg',
          isOpen ? ' z-auto' : 'max-w-page mx-auto', className)}
          style={{marginLeft: isOpen ? `${-WIDTH}px` : '', transition: 'margin 500ms'}}>
          <Link href="/">
            <p className='hover:cursor-pointer'>
              <Logo enableDarkMode={false}/>
            </p>
          </Link>
          <div className='flex justify-center items-center sm:gap-x-vmd gap-x-vsm'>
            <GradientButton onClick={() => window.open('https://team3d.io', '_blank')}>
              Play
            </GradientButton>
            {!isMobileView && <div role='group' className='group flex justify-center items-center gap-x-[5px] hover:cursor-pointer' onClick={async () => {
              isAuthenticated ? Disconnect() : await Connect();
            }}>
              <div className={classNames(
                isAuthenticated ? 'bg-green-400 shadow-[0_0_13px_4px_rgba(74,222,128,0.4)] group-hover:shadow-[0_0_13px_8px_rgba(74,222,128,0.4)]' 
                : isAuthenticating ? 'bg-amber-400 shadow-[0_0_13px_4px_rgba(251,191,36,0.4)] group-hover:shadow-[0_0_13px_8px_rgba(251,191,36,0.4)] animate-pulse' : 'bg-aimbotsRed-100 shadow-[0_0_13px_4px_rgba(255,67,101,0.4)] group-hover:shadow-[0_0_13px_12px_rgba(255,67,101,0.4)]', 'rounded-full w-3 h-3 drop-shadow-sm ')}></div>
              <VText overrideTextColor size='md' className='uppercase font-mono'>{isAuthenticated ? 'Connected' : isAuthenticating ? 'Connecting...' : 'Connect Wallet'}</VText>
            </div>}
            <div>
              <button onClick={() => setShowSwapScreen(true)} className="hidden sm:block shadow-md text-light-200 hover:brightness-75 transition-colors duration-150 rounded-full mt-1 px-2 py-1 -ic-swap">
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
                            <Link href={page.active ? `${getPageUrlByType(page.type, page.slug)}` : '/soon'} passHref={page.type !== 'programs'} >
                              <a href={page.active ? `${getPageUrlByType(page.type, page.slug)}` : '/soon'} onClick={() => {
                                onOpen(() => false);
                              }}>
                                <div className='flex items-center gap-x-2'>
                                  <FontAwesomeIcon className='text-accent-dark-200 group-hover:text-accent-dark-700' icon={faChevronDoubleRight}></FontAwesomeIcon>
                                  <p className="menu-item font-saria uppercase"> {page.displayName}</p>
                                </div>
                              </a>
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
