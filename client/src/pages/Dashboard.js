import React, { useContext } from "react"
import { Container, Typography } from "@mui/material"
import { Box } from "@mui/system"
import ModelList from "../components/ModelList"
import ModelContext from "../context/Model/ModelContext"

const Dashboard = () => {
  const { allModels } = useContext(ModelContext)

  return (
    <Container >
      <Box sx={{ width: "100%", fontWeight: 800 }} py={4}>
        <Typography variant="h2" color={"primary"} textAlign={"center"}>
          {" "}
          Community
        </Typography>
      </Box>
      <ModelList models={allModels} />
    </Container>
  )
}

export default Dashboard
