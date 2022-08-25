import { EffectComposer, Bloom } from "@react-three/postprocessing"

export function Effects() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom
        luminanceThreshold={0.4}
        mipmapBlur
        luminanceSmoothing={0.6}
        intensity={1.75}
      />
    </EffectComposer>
  )
}
