import { classNames } from '@/common/helpers';
import { faCircleInfo } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { VImage } from '../atoms/VImage';
import { VItemContainer } from '../atoms/VItemContainer';
import { VLabel } from '../atoms/VLabel';
import { VTitle } from '../atoms/VTitle';
import 'react-popper-tooltip/dist/styles.css';
import { useDetectIsMobileView } from '@/hooks/useDetectIsMobileView';
import { VText } from '../atoms/VText';

export interface IStakingCardProps {
  pool?: string;
  image?: string;
  label1?: string;
  title1?: string;
  rate?:  number | string;
  bordered?: boolean;
}

export const StakingCard: React.FC<IStakingCardProps> = ({ bordered=true, label1, title1, rate, image, pool}) => {
  const { isMobileView, isTabletView } = useDetectIsMobileView(1000);
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    placement: isMobileView ? 'top': 'left',
    trigger: 'click',
  });

  useEffect(() => {
    console.log(isMobileView, innerWidth)
  }, [isMobileView])

  return (
    <VItemContainer showBorder={bordered} widthSize="v2xl" heightSize={(isMobileView || isTabletView) ? 'vsm' : 'vxxs'} className='px-vsm'>
      <div className={classNames('flex w-full flex-wrap gap-x-vsm gap-y-vsm justify-between items-center', bordered ? '' : 'px-4')}>
        <div className='flex w-[40%] lg:w-[40%] md:w-full sm:w-full mobile:w-full justify-start items-center gap-x-vsm'>
          <div className='w-[82px]'>
            <VImage objectFit='contain' src={`/generator/${pool}.png`} width={80} height={80} className="rounded-full"></VImage>
          </div>
          <div className='flex flex-col gap-y-vsm justify-start items-start text-left w-[120px]'>
            <VLabel padding={false} secondary>{label1}</VLabel>
            <VTitle type='h5'>{title1}</VTitle>
          </div>
        </div>
        <div className='flex max-w-[230px] lg:max-w-[230px] md:max-w-full sm:max-w-full mobile:max-w-full w-full justify-center items-center'>
          <button className='absolute right-0 top-0 p-vsm px-vmd' ref={setTriggerRef}>
            <FontAwesomeIcon className='dark:text-accent-dark-100 text-accent-dark-700 w-4 h-4' icon={faCircleInfo}></FontAwesomeIcon>
          </button>
          {visible && (
              <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
                <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                <div className='flex flex-col justify-start gap-y-vsm items-start text-left p-vsm'>
                  <VTitle type='h6'>APR</VTitle>
                  <VText size='md'>
                    Calculated based on current rates. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.
                  </VText>
                </div>
              </div>
          )}
          <div className='flex divide-x dark:divide-light-200/20 divide-dark-200/20 gap-x-vsm justify-center items-center flex-wrap w-full pt-vsm'>
            <div className='flex flex-col items-center gap-y-vsm w-[70px]'>
                <VLabel padding={false} secondary>balance</VLabel>
                <VTitle type='h6' className='!text-accent-dark-200'>7.74K</VTitle>
            </div>
            <div className='flex flex-col items-center gap-y-vsm w-[70px] '>
              <VLabel padding={false} secondary>rate</VLabel>
              <VTitle type='h6' className='!text-accent-dark-200'>{rate}</VTitle>
            </div>
            <div className='flex flex-col items-center gap-y-vsm w-[70px]'>
              <VLabel padding={false} secondary>apr</VLabel>
              <VTitle type='h6' className='!text-accent-dark-200'>121%</VTitle>
            </div>
          </div>
        </div>
      </div>
    </VItemContainer>
  )
}