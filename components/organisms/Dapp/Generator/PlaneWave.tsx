import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const PlaneWave = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef?.current;
    if(!container) return;

    var vertexHeight = 15000,
		planeDefinition = 120,
		planeSize = 1245000,
    background = "#0d0d0d",
		meshColor = "#005e97"; 
    let animationFrameId: number;

    // let alphaColor = 1;
    // let r = Math.floor(Math.random() * 255);
    // let g = Math.floor(Math.random() * 255);
    // let b = Math.floor(Math.random() * 255);
    // let fadingNewColor = false;
    // const randomColor = () => {      
    //   if(alphaColor > 1) {
    //     alphaColor = 1;
    //     fadingNewColor = false;
    //   }
    //   else if(alphaColor > 0.03 && !fadingNewColor) {
    //     alphaColor -= 0.01;
    //     return `rgba(${r}, ${g}, ${b}, ${alphaColor})`;
    //   }
    //   else {
    //     alphaColor += 0.01;
    //     if(!fadingNewColor){
    //       r = Math.floor(Math.random() * 255);
    //       g = Math.floor(Math.random() * 255);
    //       b = Math.floor(Math.random() * 255);
    //       fadingNewColor = true;
    //     }
    //   }

    //   return `rgba(${r}, ${g}, ${b}, ${alphaColor})`;
    // }

    var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 400000);
    camera.position.z = 10000;
    camera.position.y = 10000;
    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(background, 1, 300000);
    var planeGeo = new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition);
    var plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
      color: meshColor,
      wireframe: true,
      transparent: true,
    }));
    plane.rotation.x -= Math.PI * .5;
  
    scene.add(plane);
  
    var renderer = new THREE.WebGLRenderer({alpha: false});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(background, 1);
  
    container.appendChild(renderer.domElement);
    
    function updatePlane() {
      const positionAttribute = planeGeo.getAttribute('position');
      for (var i = 0; i < positionAttribute.count; i++) {
        positionAttribute.setZ(i, planeGeo.attributes.position.getZ(i) + Math.random() * vertexHeight - vertexHeight);
        positionAttribute.setY(i, planeGeo.attributes.position.getY(i) + Math.random() * vertexHeight - vertexHeight);
        positionAttribute.needsUpdate = true;
      }
    };

    updatePlane();
    var count = 0
    let animC = 0;
    function render() {
      animationFrameId = requestAnimationFrame(render);
      var x = camera.position.x;
      var z = camera.position.z;
      camera.position.x = x * Math.cos(0.001) + z * Math.sin(0.001) - 10;
      camera.position.z = z * Math.cos(0.001) - x * Math.sin(0.001) - 10;
      camera.lookAt(new THREE.Vector3(0, 8000, 0))
      const positionAttribute = planeGeo.getAttribute('position');

      // if(animC % 2 === 0) {
      //   plane.material.color.set(randomColor());
      //   plane.material.opacity = alphaColor // 1 + Math.sin(new Date().getTime() * .0025)
      // }

      for (var i = 0; i < positionAttribute.count; i++) {
        positionAttribute.setZ(i, Math.sin(( i + count * 0.00002)) * ((positionAttribute.getZ(i)+x)*.2 - (z* 0.5)));
        positionAttribute.needsUpdate = true;
        count += 0.1
      }
      
      animC+=1;
      renderer.render(scene, camera);
    }  

    render();
    
    function onWindowResize() {
      //changes the size of the canavs and updates it
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize, false);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeChild(renderer.domElement);
      window.removeEventListener('resize', onWindowResize, false);
    }

  }, []);

  return (
    <div ref={containerRef} className="w-full h-full grayscale overflow-hidden absolute">

    </div>
  )
}