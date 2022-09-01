import {
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  OutlinedInput,
} from "@mui/material"
import { Box } from "@mui/system"
import React, { useState, useContext, useEffect } from "react"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import UploadFile from "./UploadFile"
import ModelContext from "../context/Model/ModelContext"
import { useNavigate } from "react-router-dom"


const ModelList = () => {
  const navigate = useNavigate()

  const { allModels, GetModel } = useContext(ModelContext)
  const [searchField, setSearchField] = useState("")
  const [modelList, setModelList] = useState(allModels)

  useEffect(() => {
    setModelList(allModels)
  }, [allModels])

  const handleChange = (e) => {
    setSearchField(e.target.value)
    const searchModel = allModels.filter((data) => {
      return data.modelName.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setModelList(searchModel)
  }

  const handleOpenModel = (modelId) => {
    GetModel(modelId)
    navigate(`/viewModel`)
  }
  return (
    <>
    <Box sx={{bgcolor: "#242424", px:2}}>
      <Grid container justifyContent="space-between" spacing={2} sx={{ pb: 2 }}>
        <Grid item xs={4}>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            value={searchField}
            sx={{ width: "100%" }}
            size="small"
            placeholder="Search here"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  <SearchRoundedIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item>
          <UploadFile />
        </Grid>
      </Grid>

      <List sx={{ maxHeight: "70vh", overflow: "auto" }}>
        {modelList.map((item) => {
          return (
            <ListItem
              disablePadding
              key={item.originalname}
              sx={{ my: 2, bgcolor: "#363636", borderRadius: "8px" }}
            >
              <ListItemButton
                sx={{ borderRadius: "8px" }}
                onClick={() => handleOpenModel(item.filename)}
              >
                <ListItemIcon sx={{ my: 1 }}>{item.originalname}</ListItemIcon>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
    </>
  )
}

export default ModelList
