export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} color="#efe7d8" />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.6}
        color="#c89b3c"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 2, -2]} intensity={0.5} color="#4f6f52" />
    </>
  )
}
