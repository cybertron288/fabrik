import React, { Suspense, useContext, useEffect, useState } from "react"
import { Canvas, useLoader } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import {
  OrbitControls,
  Environment,
  Stage,
  useProgress,
  Html,
} from "@react-three/drei"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import ModelContext from "../context/Model/ModelContext"
import { Effects } from "../utils/Effects"

const Model = () => {
  const { modelUrl } = useContext(ModelContext)

  const [url, setUrl] = useState(modelUrl)
  const [modelType, setmodelType] = useState(localStorage.getItem("modelType"))

  useEffect(() => {
    if (modelUrl) {
      setUrl(modelUrl)
      localStorage.setItem("modelUrl", url)
      let ext = url.split(".")
      setmodelType(ext[ext.length - 1])
      localStorage.setItem("modelType", ext[ext.length - 1])
    } else {
      let localUrl = localStorage.getItem("modelUrl")
      setUrl(localUrl)
      let modelType = localStorage.getItem("modelType")
      setmodelType(modelType)
    }
  }, [modelUrl, url])

  function Loader() {
    const { progress } = useProgress()
    return (
      <Html center>
        {" "}
        <div style={{ fontSize: "40px", color: "#333", textAlign: "center" }}>
          <span>{progress}</span>
          <span>%</span>{" "}
        </div>{" "}
      </Html>
    )
  }

  const GltfScene = () => {
    const gltf = useLoader(GLTFLoader, url)
    return <primitive object={gltf.scene} scale={0.5} />
  }

  const FbxScene = () => {
    const fbx = useLoader(FBXLoader, url)
    return <primitive object={fbx} scale={1} />
  }

  return (
    <div style={{ height: "100vh" }}>
      <Canvas
        // gl={{ logarithmicDepthBuffer: true, antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 450] }}
      >
        <Suspense fallback={<Loader />}>
          <Stage intensity={0.1} environment={"city"} preset={"soft"}>
            {url && modelType === "fbx" ? (
              <FbxScene scale={[0.1, 0.1, 0.1]} />
            ) : (
              <GltfScene scale={[0.1, 0.1, 0.1]} />
            )}
            {/* <ambientLight args={["#ffffff", 1]} /> */}
            {/* <directionalLight /> */}
          </Stage>
          <Effects />
          {/* <hemisphereLight intensity={0.5} /> */}
          {/* <ContactShadows resolution={1024} frames={1} position={[0, -1.16, 0]} scale={15} blur={0.5} opacity={1} far={20} /> */}
          <color attach="background" args={["#395B64"]} />

          <Environment preset="sunset" />

          <OrbitControls
            makeDefault
            autoRotate
            enablePan={false}
            minPolarAngle={Math.PI / 2.2}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Model
