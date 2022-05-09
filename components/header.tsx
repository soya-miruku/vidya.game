import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faCloudMoon, faSunHaze } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { pushRotate as Menu } from 'react-burger-menu';
import { classNames } from '../common/helpers';
import { PagesByCategory } from '../common/viwablePages';
import { useDarkMode } from '../hooks/useDarkMode';
import { Logo } from './logo';

const Header = ({}) => {
  const { isDarkMode, toggleMode } = useDarkMode();

  var styles = {
    bmBurgerButton: {
      position: 'absolute',
      right: '36px',
      width: '30px',
      height: '25px',
      top: '40px'
    },
    bmBurgerBars: {
      background: isDarkMode ? '#fff' : '#000'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
      width: '320px'
    },
    bmMenu: {
      background: 'rgb(36, 35, 34)',
      paddingTop: '2.5em',
      fontSize: '1.15em',
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

  return (
    <div className='h-28 w-full flex'>
      <div className='absolute top-[40px] left-[36px]'>
        <Link href="/">
          <a>
            <Logo/>
          </a>
        </Link>
      </div>
      <div className='absolute top-[29px] right-[100px] '>
        <div className='flex justify-center items-center space-x-4'>
          <button onClick={toggleMode} className="shadow-md text-white bg-gradient-to-t dark:from-[#fe5f75] dark:to-[#fc9842] from-[#5f0a87] to-[#a4508b] hover:brightness-75 transition-colors duration-150 rounded-full px-2 py-1">
            <FontAwesomeIcon icon={isDarkMode ? faSunHaze : faCloudMoon}/>
          </button>
          <button className='group text-white bg-gradient-to-r from-accent-dark-200 to-accent-light-100 py-3 px-10 rounded-3xl font-normal shadow-md' role='group'>
            <div className='flex flex-row justify-center items-start animate-pulse'>
              <div className='text-lg'>
                Play
              </div>
              <div className='group-hover:opacity-100 ml-1 opacity-0 ease-in duration-400 transition-all'>
                <FontAwesomeIcon className='group-hover:right-4 absolute w-6 h-6 right-0 transition-all duration-700 mt-[2px]' icon={faPlay}/>
              </div>
            </div>
          </button>
        </div>
      </div>
      <Menu styles={styles} pageWrapId="page-wrap" outerContainerId="outer-container" className='w-full'>
        {Object.keys(PagesByCategory).map((category, i) => {
          return (
            <div key={category} className={classNames('flex text-xl w-full p-0 font-normal', i > 0 ? 'mt-5': '')}>
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
        })}
      </Menu>
    </div>
  )
}

export default Header
