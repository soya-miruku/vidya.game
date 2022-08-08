import { classNames } from "@/common/helpers";
import { useRef } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const GlowSvg = styled.svg`
  filter: drop-shadow( 0px 0px 5px white ) drop-shadow( 0px 0px 5px white ) drop-shadow(0px 0px 5px rgb(127,0,255));
  color: white;
`;

function randomVal(from, to) {
  return Math.floor(Math.random() * to) + from
}

function callForever(callback,delay) {
  callback();
  return setInterval(function() {
    callback()
  },delay)
}


export interface IElectricityProps {
  className?: string;
  length?: number | string;
  timeout?: number;
  color?: string;
  strength?: number;
}

export const Electricity = ({strength=50, length=200, timeout=200, className}: IElectricityProps) => {
  let oldPoints;
  const svgRef = useRef<any>();

  function drawPath(el,start,stops,totalLength,randomFactor,timeout) {
    if(typeof(totalLength === 'string') && svgRef?.current) {
      //calculate width by using length of parent element
      const perct = parseInt(totalLength.toString().replace('%',''));
      totalLength = svgRef.current?.parentElement.getBoundingClientRect().width;
      totalLength = (totalLength * (perct / 100)) - 1;
    }
    randomFactor = typeof randomFactor == 'function' ? randomFactor() : randomFactor
    timeout = typeof timeout == 'function' ? timeout() : timeout
    let points = `${start.x},${start.y}`
    let distanceBetweenStops = totalLength / stops
    let x,y;
    for(var i=1; i<stops; i++){
      let internalRandomFactor = randomVal(0,100) > 90 ? randomFactor*2 : randomFactor
      x = start.x + (distanceBetweenStops*i)
      y = start.y + randomVal(0,internalRandomFactor)-internalRandomFactor/2
      points+=` ${Math.round(x)},${Math.round(y)}`
    }
    
    points+=` ${x+distanceBetweenStops},${start.y}`
    el.setAttribute('from',oldPoints || points)
    setTimeout(() => {
      el.setAttribute('to',points)
    },timeout/10) 
    el.setAttribute('points',points)
    oldPoints=points
  }
  
  function animateLightning(el,start,stops,totalLength,randomFactor,timeout) {
    el.setAttribute('dur',`${timeout}ms`)
    return callForever(() =>{
      drawPath(el,start,stops,totalLength,randomFactor,timeout)
    },timeout)
  }


  useEffect(() => {
    // let animationFrameId;
    let el = document.querySelector('#electricity animate');
    let el2 = document.querySelector('#electricity2 animate');
    el.setAttribute('dur',`${timeout}ms`);
 
    const reqId = animateLightning(el,{x:-10,y:25},20, length, () => {return strength},timeout)
    const reqId2 = animateLightning(el2,{x:-10,y:25},20, length,() => {return strength/100},timeout+100)

    return () => {
      clearInterval(reqId);
      clearInterval(reqId2);
    }
    
  }, [length, strength, timeout])

  return (
    <GlowSvg ref={svgRef} className={classNames(className, 'absolute left-0 z-[10000]')} width="100%" height="250px" version="1.2" xmlns="http://www.w3.org/2000/svg">
      <polyline height='100%' color="white" stroke-width="7" stroke-linecap="round" stroke="rgba(127,0,255,.2)" fill="none" id="electricity2">
      <animate attributeName="points" dur="100ms" repeatCount="indefinite" fill="freeze" />
      </polyline>
      
        <polyline height='100%' color="white" stroke-width="4" stroke-linecap="round" stroke="white" fill="none" id="electricity">
          <animate attributeName="points" dur="100ms" repeatCount="indefinite" fill="freeze" />
      </polyline>
    </GlowSvg>
  )
}