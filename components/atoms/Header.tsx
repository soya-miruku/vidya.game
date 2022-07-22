import { useAccount } from '@/hooks/useAccount';
import { faChevronDoubleRight } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { push as Menu } from 'react-burger-menu';
import { classNames, getPageUrlByType } from '../../common/helpers';
import { PagesByCategory } from '../../common/viwablePages';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useDetectDeviceSize, useDetectIsMobileView } from '../../hooks/useDetectIsMobileView';
import { Logo } from '../logo';
import { SwapSection } from '../molecules/SwapSection';
import { PricesSection } from '../organisms/pricesSection';
import { GradientButton } from './GradientButton';
import Image from 'next/image';
import { VText } from './VText';

const Header: React.FC<{className?: string, isOpen?:boolean, useDarkFonts?:boolean, onOpen?:any, pageCategories: any}> = ({className, useDarkFonts, isOpen, onOpen, pageCategories}) => {
  const { isDarkMode, toggleMode } = useDarkMode();
  const navbarRef = useRef<HTMLDivElement>(null);
  const [showSwapScreen, setShowSwapScreen] = useState(false);
  const [showingNavBar, setShowingNavBar] = useState(false);
  const { isAuthenticated, isAuthenticating, Connect, Disconnect} = useAccount();
  const { isMobileView } = useDetectIsMobileView();
  const WIDTH = isMobileView ? 250 : 550;

  var styles = {
    bmBurgerButton: {
      position: 'relative',
      paddingTop: '1px',
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
      paddingTop: isMobileView ? '0em' : '3em',
      fontSize: '1.15em',
      height: isMobileView ? '100vh': '100%',
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

  const isBusy = useMemo(() => {
    return showSwapScreen || isOpen;
  }, [isOpen, showSwapScreen])


  useEffect(() => {
    if(!(navbarRef && navbarRef.current)) return;
    let prevY = 0;
    if(isBusy) {
      navbarRef.current.classList.remove(...['dark:bg-dark-300/80', 'bg-accent-dark-700/60', 'backdrop-blur-lg']);
      setShowingNavBar(false);
    }
    else {
      // navbarRef.current.classList.add('dark:bg-dark-300/70', 'bg-accent-dark-700/60', 'backdrop-blur-lg');
    }
    const handleScroll = () => {
      if(!navbarRef && !navbarRef.current) return;
      
      const currentY = window.scrollY;

      if (currentY > prevY) {
        if(!navbarRef.current) return;
        navbarRef.current.classList.remove('translate-y-0');
        navbarRef.current.classList.add('dark:bg-dark-300/80', 'bg-accent-dark-700/60', 'backdrop-blur-lg');
        navbarRef.current.classList.add('-translate-y-full');
        navbarRef.current.classList.add('invisible');
        setShowingNavBar(true);
      }
      else if(currentY <= 100 || isOpen) {
        navbarRef.current.classList.remove(...['dark:bg-dark-300/80', 'bg-accent-dark-700/60', 'backdrop-blur-lg']);
        setShowingNavBar(false);
      } 
      else {
        if(!navbarRef.current) return;
        navbarRef.current.classList.remove('-translate-y-full');
        navbarRef.current.classList.add('translate-y-0');
        navbarRef.current.classList.remove('invisible');
        // setShowingNavBar(false);
      }
      prevY = currentY;
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }

  }, [navbarRef, isBusy])

  useEffect(() => {
    // prevent scroll when open
    if(isBusy) {
      document.getElementById('root_html').style.overflow = 'hidden';
    } else {
      document.getElementById('root_html').style.overflow = 'auto';
    }
    return () => {
      document.getElementById('root_html').style.overflow = 'auto';
    }
  }, [isBusy]);

  useEffect(() => {
    if(showSwapScreen) {
      navbarRef.current.style.transform = 'translateY(70vh)';
      document.getElementById('page-wrap').classList.add('blur-xl');
      document.getElementById('page-wrap').style.transform = 'translateY(70vh)';
      navbarRef.current.classList.add('dark:bg-dark-300/80', 'bg-accent-dark-700/60', 'backdrop-blur-lg');
      setShowingNavBar(true);
    }
    else{
      navbarRef.current.style.transform = 'translateY(0)';
      document.getElementById('page-wrap').style.transform = 'translateY(0vh)';
      document.getElementById('page-wrap').classList.remove('blur-xl');
    }
  }, [showSwapScreen])
  
  const dropIn = {
    hidden: {
      y: '-100vh',
    },
    visible: {
      y: showSwapScreen ? '-10vh' : '-100vh',
      opacity: 1,
      transition: {
        duration: 0.025,
      } 
    },
    exit: {
      y: '-100vh',
    }
  }

  return (
    <>
      <motion.div variants={dropIn} initial='hidden' animate='visible' exit='exit' className='w-screen h-[80vh] overflow-y-auto dark:bg-dark-200 bg-light-100 fixed transition-transform duration-500 z-[1000] flex justify-end items-end'>
        <div className='h-[69vh] w-full relative'>
          <div className='overflow-y-scroll flex justify-center flex-col items-center'>
            {showSwapScreen && <SwapSection showBorder={false} className="p-0 px-[5px]"/>}
            <div className='flex flex-col'>
              <PricesSection source='coinGecko'/>
            </div>
          </div>
        </div>
      </motion.div>
      <div ref={navbarRef} className='fixed w-full h-[120px] top-0 z-[100] transition-all duration-300'>
          <div className={classNames('relative h-[120px] w-full flex justify-between items-center sm:p-vlrg p-vsm z-0',
            isOpen ? ' z-auto' : 'max-w-page mx-auto', className)}
            style={{marginLeft: isOpen ? `${-WIDTH}px` : '', transition: 'margin 500ms'}}>
            <Link href="/">
              <p className='hover:cursor-pointer'>
                <Logo enableDarkMode={!showingNavBar && useDarkFonts}/>
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
                  : isAuthenticating ? 'bg-amber-400 shadow-[0_0_13px_4px_rgba(251,191,36,0.4)] group-hover:shadow-[0_0_13px_8px_rgba(251,191,36,0.4)] animate-pulse' 
                  : 'bg-aimbotsRed-100 shadow-[0_0_13px_4px_rgba(255,67,101,0.4)] group-hover:shadow-[0_0_13px_12px_rgba(255,67,101,0.4)]', 'rounded-full w-3 h-3 drop-shadow-sm ')}></div>
                <VText overrideTextColor={!(!showingNavBar && useDarkFonts)} size='md' className='uppercase font-mono'>{isAuthenticated ? 'Connected' : isAuthenticating ? 'Connecting...' : 'Connect Wallet'}</VText>
              </div>}
                {!showSwapScreen && !isOpen && <button onClick={() => setShowSwapScreen(true)} className={classNames((!showingNavBar && useDarkFonts) ? 'dark:text-light-200 text-dark-200' : 'text-light-200','shadow-md hover:brightness-75 transition-colors duration-150 rounded-full mt-1 px-2 py-1 -ic-swap')}>
                </button>}
                {!isOpen && <button onClick={toggleMode} className={classNames("shadow-md hover:brightness-75 transition-colors duration-150 mt-1 rounded-full px-2 py-1", (!showingNavBar && useDarkFonts) ? 'dark:text-light-200 text-dark-200' : 'text-light-200', `${isDarkMode ? '-ic-lightmode' : '-ic-darkmode'}`)}>
                </button>}
              <Menu
                width={WIDTH}
                customBurgerIcon={!isBusy 
                  ?  <span className={classNames(!(!showingNavBar && useDarkFonts) ? 'text-light-200': 'dark:text-light-200 text-dark-200','-ic-menu')}></span>
                  : <span className={classNames(showSwapScreen ? 'text-light-200' : 'dark:text-light-200 text-dark-200', '-ic-close')}></span> 
                } 
                isOpen={isOpen}
                disableOverlayClick={false}
                onOpen={() => {
                  if(!showSwapScreen){
                    onOpen(!isOpen);
                  }
                  else {
                    setShowSwapScreen(false);
                  }
                  
                }}
                onClose={() => {
                  if(showSwapScreen) setShowSwapScreen(false)
                  else onOpen(false);
                }}
                noOverlay
                right
                styles={styles}
                pageWrapId="page-wrap"
                outerContainerId="outer-container"
                // noTransition
                >
                <div className='w-full h-full overflow-y-auto'>
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
                                    <FontAwesomeIcon width={12} height={12} className='text-accent-dark-200 group-hover:text-accent-dark-700' icon={faChevronDoubleRight}></FontAwesomeIcon>
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
    </>
  )
}

export default Header
