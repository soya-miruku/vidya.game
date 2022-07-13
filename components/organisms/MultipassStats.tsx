import { useMultiPassStats } from "@/hooks/dapps/multipass/useMultiPassStats";
import { useEffect, useRef, useState } from "react";
import { VTitle } from "../atoms/VTitle";
import { StatCard } from "../molecules/StatCard";

export const MultiPassStats = ({}) => {
  const { circulatingSupply, levelsBrought, levelsBurned, pooledEther, multipassBurned, multipassMinted, highestLevel, totalLevels } = useMultiPassStats();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const maxScrollWidth = useRef(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current - 100
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
    setIsNextDisabled(isDisabled('next'));
    setIsPrevDisabled(isDisabled('prev'));
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current ? carousel.current.scrollWidth - carousel.current.offsetWidth : 0;
    setIsNextDisabled(isDisabled('next'));
    setIsPrevDisabled(isDisabled('prev'));

    window.onresize = () => {
      maxScrollWidth.current = carousel.current ? carousel.current.scrollWidth - carousel.current.offsetWidth : 0;
      setIsNextDisabled(isDisabled('next'));
      setIsPrevDisabled(isDisabled('prev'));
    }

    return () => {
      window.onresize = null;
    }
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="my-12 mx-auto prose gap-y-vmd flex flex-col px-vsm ">
        <VTitle type="h4">Statistics</VTitle>
        <div className="relative overflow-hidden h-[390px]">
          { !isNextDisabled || !isPrevDisabled  &&
            <div className="flex absolute bottom-0 justify-center items-center w-full gap-x-vmd">
            <button onClick={movePrev} className="border-[1px] disabled:text-accent-light-100/40 disabled:border-accent-light-100/50 text-accent-dark-100 border-accent-dark-100/60 px-vsm py-1 z-10" disabled={isPrevDisabled}> Prev</button>
            <button onClick={moveNext} className="border-[1px] disabled:text-accent-light-100/40 disabled:border-accent-light-100/50 text-accent-dark-100 border-accent-dark-100/60 px-vsm py-1 z-10" disabled={isNextDisabled}> Next</button>
            </div>
          }
          <div ref={carousel} className="relative flex overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 gap-x-vsm">
            <div className="relative min-w-[400px] h-full snap-start grid grid-cols-2 gap-vsm">
              <StatCard dropShadow={false} bordered={true} title={<VTitle type="h4" className="!text-accent-dark-200">{circulatingSupply.toFixed(0)}</VTitle>} md label='Circulating Supply'></StatCard>
              <StatCard dropShadow={false} bordered={false} title={<VTitle type="h4" className="!text-accent-dark-200">{levelsBrought.toFixed(0)}</VTitle>} md label='Levels Brought'></StatCard>
              <StatCard dropShadow={false} bordered={false} title={<VTitle type="h4" className="!text-accent-dark-200">{levelsBurned.toFixed(0)}</VTitle>} md label='Leves Burned'></StatCard>
              <StatCard dropShadow={false} bordered={true} title={<VTitle type="h4" className="!text-accent-dark-200">{pooledEther.toFixed(3)}</VTitle>} md label='Pooled Ether'></StatCard>
            </div>
            <div className="relative min-w-[400px] h-full snap-start grid grid-cols-2 gap-vsm">
              <StatCard dropShadow={false} bordered={true} title={<VTitle type="h4" className="!text-accent-dark-200">{multipassBurned.toFixed(0)}</VTitle>} md label='MultiPass Burned'></StatCard>
              <StatCard dropShadow={false} bordered={false} title={<VTitle type="h4" className="!text-accent-dark-200">{multipassMinted.toFixed(0)}</VTitle>} md label='MultiPass Minted'></StatCard>
              <StatCard dropShadow={false} bordered={false} title={<VTitle type="h4" className="!text-accent-dark-200">{highestLevel.toFixed(0)}</VTitle>} md label='Highest Level'></StatCard>
              <StatCard dropShadow={false} bordered={true} title={<VTitle type="h4" className="!text-accent-dark-200">{totalLevels.toFixed(0)}</VTitle>} md label='Total Levels'></StatCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}