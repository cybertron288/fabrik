import toast from "react-hot-toast"
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded"
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded"
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined"

const showToast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-right",
        duration: 4000,
        icon: (
          <CheckCircleOutlineRoundedIcon color="primary" fontSize="large" />
        ),
        style: {
          font: "20px",
          padding: "10px",
          borderBottom: "4px solid #B3FF36",
          background: "#333",
          color: "#fff",
        },
      })
      break
    case "error":
      toast.error(message, {
        position: "top-right",
        duration: 4000,
        icon: <HighlightOffRoundedIcon color="error" fontSize="large" />,
        style: {
          font: "20px",
          padding: "10px",
          borderBottom: "4px solid #DC3545",
          background: "#333",
          color: "#fff",
        },
      })
      break
    case "warning":
      toast.warning(message, {
        position: "top-right",
        duration: 4000,
        icon: <ReportProblemOutlinedIcon color="warning" fontSize="large" />,
        style: {
          font: "20px",
          padding: "10px",
          borderBottom: "4px solid #f5d34c",
          background: "#333",
          color: "#fff",
        },
      })
      break
    default:
      toast(message, {
        position: "top-right",
        duration: 4000,
        icon: "✅",
        style: {
          font: "20px",
          padding: "10px",
          background: "#333",
          color: "#fff",
        },
      })
  }

  console.log("message")
}

export default showToast
