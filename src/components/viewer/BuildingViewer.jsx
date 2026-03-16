import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import Loader from "./loader";
import BuildingPlaceholder from "./BuildingPlaceholder";

export default function BuildingViewer() {
  return (
    <div className="viewer-wrapper">
      <Canvas
        className="viewer-canvas"
        shadows
        camera={{ position: [4, 2.5, 6], fov: 45 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} castShadow />

        <Suspense fallback={<Loader />}>
          <BuildingPlaceholder />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls enableDamping />
      </Canvas>

      <div className="viewer-ui">
        <a
          href="https://www.paypal.com/ncp/payment/685EX6N7WCHTU"
          target="_blank"
          rel="noopener noreferrer"
          className="viewer-cta"
        >
          Buy tickets
        </a>
      </div>
    </div>
  );
}