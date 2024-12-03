import { Link } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="not-found-button">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;