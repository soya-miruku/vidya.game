import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { push as Menu } from 'react-burger-menu';
import { classNames } from '../common/helpers';
import { PagesByCategory } from '../common/viwablePages';
import { useDarkMode } from '../hooks/useDarkMode';
import { Logo } from './logo';

const Header = ({}) => {
  const { isDarkMode, toggleMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const WIDTH = 600;

  var styles = {
    bmBurgerButton: {
      position: 'relative',
      // right: '36px',
      // width: '30px',
      height: '20px',
      width: '20px'
      // top: '40px'
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
      paddingTop: '2.5rem',
      borderRight: `25px solid ${!isDarkMode ? '#11081F' : '#FAFBFF'}`,
      borderTop: `25px solid ${!isDarkMode ? '#11081F' : '#FAFBFF'}`,
      borderBottom: `25px solid ${!isDarkMode ? '#11081F' : '#FAFBFF'}`,
      paddingBottom: '2.5rem',
      height: '100%',
      width: `${WIDTH}px`,
      top: '0px',
      zIndex: '1',
    },
    bmMenu: {
      zIndex: '1',
      background: isDarkMode ? '#11081F' : '#FAFBFF',
      paddingTop: '2.5em',
      fontSize: '1.15em',
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

  return (
    <div className='dark:bg-true-dark-200 bg-true-light-200 h-28 w-full flex justify-between px-10 py-10 transition-width duration-800' 
    style={{marginLeft: isOpen ? `-${styles.bmMenuWrap.width}` : '', transition: 'margin 500ms', zIndex: 9999}}>
      <div className='-mt-2'>
        <Link href="/">
          <a>
            <Logo/>
          </a>
        </Link>
      </div>
        <div className='flex justify-center items-center space-x-7'>
          <div className=''>
            <button className='group text-white bg-gradient-to-r from-accent-dark-200 to-accent-light-100 py-3 px-10 rounded-[10px] font-normal shadow-md' role='group'>       
              <div className='flex flex-row justify-center items-start animate-pulse'>
                <div className='text-lg'>
                  Play
                </div>
                <div className='group-hover:opacity-100 ml-1 opacity-0 ease-in duration-400 transition-all'>
                  <FontAwesomeIcon className='group-hover:right-84 absolute w-6 h-6 right-80 transition-all duration-700 mt-[2px]' icon={faPlay}/>
                </div>
              </div>
            </button>
          </div>
          <div>
            <button className="shadow-md dark:text-true-light-200 text-true-dark-100 hover:brightness-75 transition-colors duration-150 rounded-full mt-1 px-2 py-1 -ic-swap">
            </button>
          </div>
          <div>
            <button onClick={toggleMode} className={classNames("shadow-md dark:text-true-light-200 text-true-dark-100 hover:brightness-75 transition-colors duration-150 mt-1 rounded-full px-2 py-1", `${isDarkMode ? '-ic-lightmode' : '-ic-darkmode'}`)}>
            </button>
          </div>
          <Menu
        width={WIDTH}
        customBurgerIcon={!isOpen 
          ?  <span className='dark:text-true-light-200 text-true-dark-100 -ic-menu'></span> //<FontAwesomeIcon className='dark:text-true-light-200 text-true-dark-100' icon={faBars}></FontAwesomeIcon> 
          : <span className='dark:text-true-light-200 text-true-dark-100 -ic-close'></span> //<FontAwesomeIcon className='dark:text-true-light-200 text-true-dark-100' icon={faXmark}></FontAwesomeIcon>
        } 
        isOpen={isOpen}
        disableOverlayClick={false}
        onOpen={() => setIsOpen(!isOpen)}
        onClose={() => setIsOpen(false)}
        noOverlay
        right
        styles={styles}
        pageWrapId="page-wrap"
        outerContainerId="outer-container"
        noTransition
        >
        <div className='w-full'>
          <div className='px-20 py-4 flex w-full flex-wrap justify-between dark:text-white text-true-dark-100'>
            {Object.keys(PagesByCategory).map((category, index) => {
              return( 
                <div className='w-1/2 px-2'>
                  <h1 className='font-bold text-[14px] p-3'>{category.toUpperCase()}</h1>
                  {PagesByCategory[category].map(page => {
                  return (
                    <div className={classNames('py-2 px-[12px] text-[14px]', page.active ? 'hover:text-indigo-400 w-full hover:cursor-pointer': 'text-zinc-600 flex justify-between items-center')}>
                      <Link href={page.active ? page.url : '/soon'}>
                        <a className="menu-item">{page.displayName}</a>
                      </Link>
                      {!page.active && <span className='text-[8px] p-1 px-2 tracking-high-wide dark:text-true-light-200/50 text-true-dark-300 dark:bg-true-dark-300/50 rounded-lg'>SOON</span>}
                    </div>
                  )
                })} 
                </div>
              )
            })}
          </div>
          {/* {Object.keys(PagesByCategory).map((category, i) => {
            return (
              <div key={category} className={classNames('text-xl p-0 font-normal', i > 0 ? 'mt-5': '')}>
                <h1 className='font-light text-lg p-3'>{category.toUpperCase()}</h1>
                 {PagesByCategory[category].map(page => {
                  return (
                    <div className={classNames('p-4', page.active ? 'hover:bg-indigo-700 w-full hover:cursor-pointer': 'text-zinc-600 flex justify-between items-center')}>
                      <Link href={page.active ? page.url : '/soon'}>
                        <a className="menu-item">{page.displayName}</a>
                      </Link>
                      {!page.active && <p className='text-sm'>Soon</p>}
                    </div>
                  )
                })} 
              </div>
            )
          })} */}
        </div>
          </Menu>
        </div>
    </div>
  )
}

export default Header
