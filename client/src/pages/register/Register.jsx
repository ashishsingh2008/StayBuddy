
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useContext, useState } from 'react';
import './register.css';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../hooks/api';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export const Register = () => {
  const [file, setFile] = useState("");
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    country: undefined,
    img: undefined,
    city: undefined,
    phone: undefined,
    password: undefined,
  });
  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  

  const handleClick = async (e) => {
    e.preventDefault();


    if (!file) {
      alert("Please upload user's photo");
      return;
    }
    if (!credentials.username) {
      alert("Please fill Username");
      return;
    }
    if (!credentials.email || !validateEmail(credentials.email)) {
      alert("Please fill valid email address");
      return;
    }
    if (!credentials.phone || credentials.phone.length!=10) {
      alert("Please fill your valid contact number");
      return;
    }
    if (!credentials.password) {
      alert("Please fill a strong password");
      return;
    }


    const checkEmailUniqueness = async (email) => {
      try {
        const response = await axiosInstance.get(`/users/findemail?email=${email}`);
        return response.data.length;
      } catch (error) {
        console.error(error);
        return false;
      }
    };
    
    const checkUsernameUniqueness = async (username) => {
      try {
        const response = await axiosInstance.get(`/users/findusername?username=${username}`);
        return response.data.length;
      } catch (error) {
        console.error(error);
        return false;
      }
    }

    const FindemailLen = await checkEmailUniqueness(credentials.email);
    const FindusernameLen = await checkUsernameUniqueness(credentials.username);

    if (FindusernameLen!=0) {
      alert("Username is already taken. Please choose a different one.");
      return;
    }
    if (FindemailLen!=0) {
      alert("Email address is already taken. Please choose a different one.");
      return;
    }

    

    const data=new FormData()
    data.append("file",file)
    data.append("upload_preset","upload")
    dispatch({ type: 'REGISTER_START' });
    try {
   
     const uploadRes = await axiosInstance.post(
        "https://api.cloudinary.com/v1_1/dm6pqxeop/image/upload",
        data
      );
      const {url}=uploadRes.data
      const newUser={
        ...credentials,
        img:url,
      }
  
      await axiosInstance.post("/auth/register",newUser);

      dispatch({ type: 'REGISTER_SUCCESS', payload: newUser });
      alert("User created successfully")
      navigate('/');
    } catch (err) {
      dispatch({ type: 'REGISTER_FAILURE', payload: err.response?.data });
    }
  };

  return (
   
    <div className="rmain">
    <div className="rnewContainer">

      <div className="rbottom">
          <div className="rleft">
              <img src={ file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt=""/>
          </div>

          <div className="rright">
                <div className="rtitle">
                    Register
                </div>

              <form>
                <div className="rformInput">
                  <label htmlFor="file"> Image: <DriveFolderUploadOutlinedIcon className="icon" /> </label>
                  <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" } }
                  />
                </div>
                <label> Username: <br /> <input type="text" name="username" onChange={handleChange}/> </label>
                <label> Email: <br /> <input type="email" name="email" onChange={handleChange} /> </label>
                <label> Country: <br /> <input type="text" name="country" onChange={handleChange} /></label>
                <label> City: <br /> <input type="text" name="city" onChange={handleChange} /></label>
                <label>Phone Number: <br /> <input type="tel" name="phone" onChange={handleChange} /></label>
                <label>Password: <br /> <input type="password" name="password" onChange={handleChange} /> </label>
            <button onClick={(e)=>handleClick(e)}>Send</button>
              </form>

              {loading && (
              <div className="spinner">
                <div className="loader"></div>
              </div>
            )}

              <br />
              <Link to="/login" style={{color:"red",textDecoration:"none"}}>
                <span className="logo1">If already user then click here to login</span>
              </Link>
          </div>
      </div>
<br />
      
    </div>
  </div>
  );
};

