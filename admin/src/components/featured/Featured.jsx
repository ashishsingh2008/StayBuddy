import "./featured.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Vsp-booking</h1>
      </div>
      <div className="bottom">
      <img
          src="https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg?w=1060&t=st=1686598303~exp=1686598903~hmac=56a843391256ee3a2a3d8f8a4a366cdf4a640cb961852e227c3bb812899e44e5"
          alt=""
          className="fpImg"
        />
      </div>
    </div>
  );
};

export default Featured;
