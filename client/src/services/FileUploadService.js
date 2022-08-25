import axios from "axios"
import { BASE_URL } from "../constants"

const FileUploadService = (data) => {
  return axios.post(`${BASE_URL}/api/upload`, data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  })
}

export default FileUploadService
