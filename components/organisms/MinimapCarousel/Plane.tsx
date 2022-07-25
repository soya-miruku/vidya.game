import * as THREE from "three"
import React, { forwardRef, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import "./CustomMaterial"
import { useBlock } from "./blocks"
import state from "./store"

export default forwardRef(({ color = "white", shift = 100, opacity = 1, frustumCulled, args, map, aspect, scale, ...props }: {frustumCulled?:boolean, color?: string, shift?: number, opacity?: number, args?: any, map?:any, aspect?:any, scale?:any}, ref:any) => {
  const { viewportWidth, offsetFactor } = useBlock()
  const material = useRef<any>()
  let last:any = state.top.current

  useFrame(() => {
    const { pages, top } : any = state
    if(!material?.current) return;
    
    material.current.scale = THREE.MathUtils.lerp(material.current.scale, offsetFactor - top.current / ((pages - 1) * viewportWidth), 0.1);
    material.current.shift = THREE.MathUtils.lerp(material.current.shift, -(top.current - last) / shift, 0.1)
    last = top.current
  })

  return (
    <mesh ref={ref} scale={scale} frustumCulled={frustumCulled} {...props}>
      <planeGeometry args={args} />
      <customMaterial ref={material} color={color} map={map} map-minFilter={THREE.LinearFilter} transparent opacity={opacity} />
    </mesh>
  )
})
