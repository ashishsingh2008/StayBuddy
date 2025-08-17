import Sidebar from "../../components/sidebar/Sidebar";

import "./home.css";

import Featured from "../../components/featured/Featured";



const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="listContainer">
          <div className="listTitle">WELCOME ADMIN</div>
          <Featured/>
        </div>
      </div>
    </div>
  );
};

export default Home;
