// credits for majority of this code goes to drcmda from codesandbox XD
import * as THREE from "three"
import React, { Suspense, useEffect, useRef, useState } from "react"
React.useLayoutEffect = React.useEffect;
import { Canvas, useFrame, useThree, createPortal } from "@react-three/fiber"
import { Text, Loader, Line, Shadow, useTexture, meshBounds } from "@react-three/drei"
import { useDrag } from "react-use-gesture";
import Plane from "./Plane"
import Effects from "./Effects"
import { Block, useBlock } from "./blocks"
import state from "./store"
import { useDetectIsMobileView } from "@/hooks/useDetectIsMobileView";

const LineV = Line as any;
const TextV = Text as any;
const ShadowV = Shadow as any;

function HeadsUpDisplay({ children }): any {
  const [scene] = useState(() => new THREE.Scene())
  const { gl, camera } = useThree()
  useFrame(() => ((gl.autoClear = false), gl.clearDepth(), gl.render(scene, camera)), 2)
  return createPortal(children, scene)
}

function Rect({ scale, ...props }) {
  return (
    <group scale={scale}>
      <LineV points={[-0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0, -0.5, 0.5, 0] as any} color="white" linewidth={1} position={[0, 0, 0]} />
      <mesh {...props} raycast={meshBounds}>
        <planeGeometry />
        <meshBasicMaterial transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

function Dot() {
  const [hovered, set] = useState(false)
  const { offset, sectionWidth } = useBlock()
  useEffect(() => void (document.body.style.cursor = hovered ? "pointer" : "auto"), [hovered])
  return <Rect scale={0.15} onPointerOver={() => {
    set(true);
  }} onPointerOut={() => set(false)} onClick={() => ((state.ref.scrollLeft as any) = offset * sectionWidth * state.zoom)} />
}

function Map({length}) : any{
  return new Array(length || 6).fill(0).map((img, index) => (
    <Block key={index} factor={1 / state.sections / 2} offset={index}>
      <Dot />
    </Block>
  ))
}

function Content({imageSources}: {imageSources: string[]}): any {
  const images = useTexture(imageSources)
  return images.map((img, index) => (
    <Block key={index} factor={1} offset={index}>
      <Image key={index} index={index} img={img} />
    </Block>
  ))
}

function Image({ img, index }) {
  const ref = useRef<any>()
  const { contentMaxWidth: w, viewportWidth, offsetFactor } = useBlock()
  useFrame(() => {
    const scrollOffset = (state.top.current as any) / (viewportWidth * state.pages - viewportWidth) + 1 / state.pages / 2
    const scale = 1 - (offsetFactor - scrollOffset) * (offsetFactor > scrollOffset ? 1 : -1)
    ref.current.scale.setScalar(scale)
  })
  return (
    <group ref={ref}>
      <Plane map={img} args={[1, 1, 32, 32]} shift={100} aspect={1.5} scale={[w*1.2, w / 1.3, 1]} frustumCulled={false} />
      <TextV anchorX="left" position={[-w / 2, -w / 1.5 / 2 - 0.25, 0]} scale={1.5} color="white">
        0{index}
      </TextV>
      <ShadowV scale={[w * 1.2, 1, 1]} rotation={[0.75, 0, 0]} position={[0, -w / 2, 0]} />
    </group>
  )
}

function Marker() {
  const { isMobileView } = useDetectIsMobileView();
  const ref = useRef<any>()
  const [active, setActive] = useState(false)
  const [hovered, set] = useState(false)
  const { sectionWidth } = useBlock();

  useEffect(() => void (document.body.style.cursor = hovered ? "grab" : "auto"), [hovered]);
  
  useFrame(({ camera }) => {
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, ((state.top.current as any) / state.zoom / sectionWidth / state.pages) * -Math.PI * 2, 0.1)
    const s = THREE.MathUtils.lerp(ref.current.scale.x, active || hovered ? 2 : 0.75, 0.1)
    ref.current.scale.set(s, s, s)
    camera.zoom = THREE.MathUtils.lerp(camera.zoom, active || hovered ? 40 : state.zoom, 0.1)
    camera.updateProjectionMatrix()
  })

  const bind: any = useDrag(({ movement: [x], first, last }) => {
    if(isMobileView) return;
    setActive(!last), (state.ref.scrollLeft = x * 2 * state.pages)
  }, {
    initial: () => [(state.ref.scrollLeft * 0.5) / state.pages]
  })

  return (
    <group ref={ref} position={[0, 0, 1]}>
      <Rect {...bind()} onPointerOver={(e) => (e.stopPropagation(), set(true))} onPointerOut={() => set(false)} />
    </group>
  )
}

export const MiniMapCarousel = ({imageSources}) => {
  const scrollArea = useRef<any>();
  const onScroll = (e) => (state.top.current = e.target.scrollLeft)
  useEffect(() => void onScroll({ target: (state.ref = scrollArea.current) }), [])
  state.sections = imageSources.length - 1 || 6
  state.pages = state.sections - 1;
  return (
    <>
    <Canvas 
      id="carousel-three"
      orthographic
      dpr={[1, 1.5]}
      mode="concurrent"
      camera={{ zoom: 1, position: [0, 0, 500] }}
      raycaster={{
        computeOffsets: ({ offsetX, offsetY }) => ({
          offsetX: offsetX - scrollArea.current.scrollLeft,
          offsetY
        })
      }}
      onCreated={(state) => state.events.connect(scrollArea.current)}
      >
      <Effects>
        <Suspense fallback={null}>
          <Content imageSources={imageSources}/>
          <HeadsUpDisplay>
            <Map length={imageSources?.length || 6}/>
            <Marker />
          </HeadsUpDisplay>
        </Suspense>
      </Effects>
    </Canvas>
      <div className="absolute top-0 left-0 w-screen h-screen overflow-x-auto overflow-y-hidden scrollbar-none" ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: "100vh", width: `${state.pages * 100}vw` }} />
      </div>
      <Loader />
    </>
  )
}