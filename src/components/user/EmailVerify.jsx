import { useEffect, useState,Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../template/footer";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:5173/auth/${param.id}/verify/${param.token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        
		verifyEmailUrl();
	}, [param]);

	return (
		<div>
  <Fragment>
    {validUrl ? (
      <div className="container" style={{ display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'}}>
        <div className="card" style={{marginTop:'150px',marginBottom:'100px',borderRadius: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",              
			  width: "500px",
              padding: "20px",
			  justifyContent:'center'
}}>
          <img
            src="../../../public/images/success.png"
            alt="success_img"
            className="success_img" style={{width:'240px',marginLeft:'110px',marginBottom:'20px',marginTop:'20px'}}
          />
          <h3 style={{marginBottom:'20px'}}>Email verified successfully</h3>
          <Link to="/login">
            <button   className="btn"
    style={{ backgroundColor: '#2b8c7b', width:'170px', height:'38px',color:'white',marginBottom:'20px'}}>Login</button>
          </Link>
        </div>
      </div>
    ) : (
      <div className="container">
        <div className="card not-found-card">
          <h1>404 Not Found</h1>
        </div>
      </div>
    )}
  </Fragment>
  <Footer/>
  </div>
);
};

export default EmailVerify;