import * as THREE from "three"
import React, { useEffect, useRef, useMemo, useState } from "react"
import { extend, useFrame, useThree, createPortal, NodeProps, ExtendedColors, Overwrite } from "@react-three/fiber"
import { EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass } from "three-stdlib"
import { WaterPass } from "./WaterPass"
import { EffectPass } from "./EffectPass"
import state from "./store"
import { WebGLRenderTarget } from "three"

extend({ EffectComposer, ShaderPass, RenderPass, WaterPass, UnrealBloomPass, FilmPass, EffectPass })
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'effectComposer': ExtendedColors<Overwrite<Partial<EffectComposer<WebGLRenderTarget>>, NodeProps<EffectComposer<WebGLRenderTarget>, typeof EffectComposer>>>;
      'shaderPass': ExtendedColors<Overwrite<Partial<ShaderPass>, NodeProps<ShaderPass, typeof ShaderPass>>>;
      'renderPass': ExtendedColors<Overwrite<Partial<RenderPass>, NodeProps<RenderPass, typeof RenderPass>>>;
      'waterPass': any;
      'unrealBloomPass': any;
      'filmPass': any;
      'effectPass': any;
    }
  }
}
export default function Effects({ children }) : any {
  const [scene] = useState(() => new THREE.Scene())
  const composer = useRef<any>()
  const effect = useRef<any>()
  const water = useRef<any>()
  const bloom = useRef<any>()
  const { gl, size, camera } = useThree()
  let last:any = state.top.current
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => {
    const { top }:any = state
    effect.current.factor = THREE.MathUtils.lerp(effect.current.factor, (top.current - last) / -30, 0.1)
    bloom.current.strength = THREE.MathUtils.lerp(bloom.current.strength, Math.abs((top.current - last) / 200), 0.1)
    water.current.factor = THREE.MathUtils.lerp(water.current.factor, Math.abs((top.current - last) / 30), 0.1)
    last = top.current
    gl.autoClear = true
    composer.current.render()
  }, 1)
  return createPortal(
    <>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" scene={scene} camera={camera} />
        <unrealBloomPass attachArray="passes" ref={bloom} args={[undefined, 0.0, 1, 0.0]} />
        <effectPass attachArray="passes" ref={effect} />
        <waterPass attachArray="passes" ref={water} />
      </effectComposer>
      {children}
    </>,
    scene
  )
}
