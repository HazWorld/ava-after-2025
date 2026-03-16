export default function BuildingPlaceholder() {
    return (
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 1.2, 2]} />
        <meshStandardMaterial />
      </mesh>
    );
  }