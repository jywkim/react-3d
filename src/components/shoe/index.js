import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useProgress } from '@react-three/drei';
import Shoe from './models/Shoe'; 
import "./index.css";
import { proxy, useSnapshot } from 'valtio';

const Loader = () => {
  const { progress } = useProgress();
  return (
     <Html 
        center
        style={{
           color: '#FFFFFF',
        }}
     >
        {Math.round(progress * 100) / 100}% Loaded
     </Html>
  );
};

const Picker = (props) => {
   const snap = useSnapshot(props.state)
   return (
     <div className="picker">{snap.current}</div>
   );
};

export default function App() {
   const state = proxy({
      current: null,
      items: {
        laces: "#ff0000",
        mesh: "#ffffff",
        caps: "#ffffff",
        inner: "#ffffff",
        sole: "#ffffff",
        stripes: "#ffffff",
        band: "#ffffff",
        patch: "#ffffff",
      },
   });

   const [hovered, setHovered] = useState(null);

   const attributes = {
      state: state, 
      onPointerOver: (e) => {e.stopPropagation(); setHovered(e.object.material.name)},
      onPointerOut: (e) => e.intersections.length === 0 && setHovered(null),
      onPointerDown: (e) => {e.stopPropagation(); (state.current = e.object.material.name)},
      onPointerMissed: (e) => (state.current = null),
    };

   return (
      <>
         <Picker state={state} />
         <Canvas
            camera={{ position: [2, 0, 12.25], fov: 15 }}
            style={{
               backgroundColor: '#111a21',
               width: '70vw',
               height: '60vh',
            }}
         >
            <ambientLight intensity={0.5} />
            <Suspense fallback={<Loader />}>
              <Shoe {...attributes}/>
            </Suspense>
            <OrbitControls />
         </Canvas>
      </>
   );
};