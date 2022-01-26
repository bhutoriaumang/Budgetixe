import { Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import errorPageAnim from "./error-page-anim.json";

const Error404 = () => {
  return (
    <div className="error-page">
      <Paper className="paper">
        <div className="container">
          <Lottie
            className="animation"
            animationData={errorPageAnim}
            loop={true}
          />
        </div>
        <h2>Oops! Page not found :(</h2>
        <p>
          Sorry, the page you're looking for doesn't exist. Please go back to
          homepage
        </p>
        <Link style={{ textDecoration: "none" }} to="/">
          <Button variant="outlined">Go Home</Button>
        </Link>
      </Paper>
    </div>
  );
};

export default Error404;
