import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { classNames } from "@/common/helpers"
import { useDetectIsMobileView } from "@/hooks/useDetectIsMobileView";
import { VTitle } from "./VTitle";
import { VText } from "./VText";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export interface IVTabsProps {
  children: React.ReactElement<IVTabProps>[];
  defaultActiveIndex: number
  rounded?: boolean
}

export const VTabs = ({children, defaultActiveIndex=0, rounded=true}: IVTabsProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [currentContent, setCurrentContent] = useState(children[activeIndex]?.props?.children);
  const currentTabRef = useRef(children[activeIndex]);
  const { isMobileView } = useDetectIsMobileView();

  const changeTab = useCallback((index) => {
    setActiveIndex(index);
    currentTabRef.current = children[index];
  }, []);
  
  useEffect(() => {
    if(children?.length <=0) return;
    setCurrentContent(children[activeIndex]?.props?.children);
  }, [children, activeIndex]);

  return (
    <div className="flex flex-col justify-start items-start w-full">
      <div className={classNames('font-thin dark:bg-black/10 bg-light-100 w-full h-20 flex flex-row items-center sm:justify-center justify-start overflow-y-hidden overflow-x-auto ', rounded ? 'rounded-t-xl' : '')}>
        {children && children?.length > 0 && children.filter((child) => child.props?.show !== false).map((child, index) => {
          const isLast = index === children.length - 1;
          const isFirst = index === 0;
          return (
            <div key={index} className={classNames('w-full h-20', rounded ? 'rounded-t-xl': '')}>
              {React.cloneElement(child, {
                onClick: () => {
                  changeTab(index);
                },
                isActive: activeIndex === index,
                isFirst: isFirst && rounded,
                isLast: isLast && rounded,
              })}
            </div>
          )
        })}
      </div>
    
    {currentContent&& 
      <div className={classNames("w-full p-vsm gap-y-vsm dark:bg-black/50 bg-light-300", rounded ? 'rounded-b-xl' : '')}>
        {isMobileView &&
          <div>
            {/* <VTitle type="h5" className='font-medium'>{currentTabRef.current.props?.title}</VTitle> */}
            <VText size="md" className='font-medium !text-accent-dark-100'>{currentTabRef.current.props?.description}</VText>
          </div>
        }
        {currentContent}
      </div>
    }
    </div>
  )
}

export interface IVTabProps {
  title: string;
  description?: string;
  show?: boolean;
  isActive?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onClick?: () => void;
  icon?: any;
  className?: string;
  enabled?: boolean;
  children?: any;
  containerClassName?: string;
}

export const VTab = ({isActive, show=true, enabled=true, isFirst, isLast, onClick, icon='circle', title, description, className, containerClassName}: IVTabProps) => {
  const { isMobileView } = useDetectIsMobileView();

  if(!show) return null;
  return (
    <div onClick={() => {
      if(enabled) onClick();
    }} className={classNames(
      enabled ? 'dark:hover:bg-black/50 hover:bg-light-300 hover:cursor-pointer dark:bg-black/10 bg-light-200' : 'brightness-50',
      isActive ? 'dark:bg-black/50 bg-light-300 border-b-4 border-b-accent-dark-200' : 'dark:border-b-dark-300 border-b-light-400', 
      'h-full w-full p-6 flex flex-row justify-center items-center space-x-4 border-b-2', 
      isFirst ? 'rounded-tl-xl' : isLast ? 'rounded-tr-xl' : '', containerClassName
      )}>

      {!isMobileView && icon && <div className={classNames(isActive ? 'text-accent-dark-200' : 'text-[#2d323d]', 'p-3 rounded-xl', className)}>
        <FontAwesomeIcon className='w-8 h-8' icon={icon==='circle' ? faCircle : icon}/>
      </div>}
      <div className='sm:text-left flex flex-col gap-[3px] text-center'>
        {title  && <VTitle type="h6">{title}</VTitle>}
        {description && !isMobileView && <VText size="sm" className='!text-accent-dark-100 !leading-none'>{description}</VText>}
      </div>
    </div>
  )
}