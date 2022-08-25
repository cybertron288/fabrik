import Dashboard from "./pages/Dashboard"
import ViewModel from "./pages/ViewModel"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./Theme/Theme"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AppContextProvider } from "./context/appContextProvider"

function App() {
  return (
    <>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <Toaster />
          <Router>
            <Routes>
              <Route path="/viewModel" element={<ViewModel />} />
              <Route path="/" exact element={<Dashboard />}></Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </AppContextProvider>
    </>
  )
}

export default App
