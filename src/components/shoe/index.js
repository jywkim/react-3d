import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useProgress } from '@react-three/drei';
import Shoe from './models/Shoe'; 
import "./index.css";

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

export default function App() {

   return (
      <div>
         <Canvas
            camera={{ position: [2, 0, 12.25], fov: 15 }}
            style={{
               backgroundColor: '#111a21',
               width: '70vw',
               height: '60vh',
            }}
         >
            <Suspense fallback={<Loader />}>
              <Shoe/>
            </Suspense>
            <OrbitControls />
         </Canvas>
      </div>
   );
}