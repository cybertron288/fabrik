import React, { useState, forwardRef, useContext } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import { CircularProgress, Typography } from "@mui/material"
import FileUploadService from "../services/FileUploadService"
import showToast from "../services/ToasterService"
import ModelContext from "../context/Model/ModelContext"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const UploadFile = () => {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState()
  const [isUploading, setIsUploading] = useState(false)

  const { GetAllModel } = useContext(ModelContext)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setFile("")
  }

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const uploadFile = () => {
    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    FileUploadService(formData)
      .then((res) => {
        showToast("sucess", "file uploaded successfully.")
        GetAllModel()
        setIsUploading(false)
        handleClose()
      })
      .catch((err) => {
        showToast("error", "There is some error uploading file.", err)
        handleClose()
      })
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <FileUploadIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle>{"Upload 3D Model (GLTF, GLB or FBX)"}</DialogTitle>
        <DialogContent>
          <form encType="multipart/form-data" style={{ width: "100%" }}>
            <Button
              variant="outlined"
              htmlFor="file"
              component="label"
              sx={{ width: "100%", py: 2, px: 4 }}
              startIcon={<FileUploadIcon />}
            >
              Choose File
              <input
                type="file"
                name="file"
                id="file"
                hidden
                accept=".fbx, .glb, .gltf"
                onChange={(e) => handleFile(e)}
              />
            </Button>
          </form>
          <Typography variant="body1" textAlign={"center"} mt={2}>
            {file && file.name}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={uploadFile} disabled={isUploading}>
            {isUploading ? <CircularProgress /> : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UploadFile
