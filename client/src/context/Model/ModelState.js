import ModelContext from "./ModelContext"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../constants"

const ModelState = ({ children }) => {
  const [isModelLoading, setIsModelLoading] = useState(true)
  const [allModels, setAllModels] = useState([])
  const [modelUrl, setModelUrl] = useState()

  useEffect(() => {
    GetAllModel()
  }, [])

  const GetAllModel = () => {
    setIsModelLoading(true)
    axios.get(`${BASE_URL}/api/files`).then((data) => {
      setAllModels(data.data)
      setIsModelLoading(false)
      return data.data
    })
  }

  const GetModel = (model) => {
    setModelUrl(`${BASE_URL}/api/file/${model}`)
  }

  return (
    <ModelContext.Provider
      value={{ allModels, modelUrl, GetModel, GetAllModel, isModelLoading }}
    >
      {children}
    </ModelContext.Provider>
  )
}

export default ModelState
