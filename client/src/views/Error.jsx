import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext"

import "../styles/error.css";

const Error = (props) => {

    const { authToken } = useAuth();

    const { errors } = props

    return (
        <div className={flexBox}>
            <div className={mainItem}>
                {Object.keys(errors).length !== 0 && showNotification && (
                    <ul className="alert alert-danger">
                        <button type="button" className="btn-close close-button-red" aria-label="Close" onClick={closeNotification}></button>
                        {errors.statusCode && errors.name && (
                            <li className="flash-box-li">
                                <b>Error {errors.statusCode}: {errors.name}</b>
                            </li>
                        )}
                        {errors.message && (
                            <li className="flash-box-li">
                                {errors.message}
                            </li>
                        )}
                        {errors.validationErrors && errors.validationErrors.length !== 0 && (
                            errors.validationErrors.map((error, index) => (
                            <li key={index} className="flash-box-li">
                                {error}
                            </li>
                            ))
                        )}
                    </ul>
                )}
                {authToken ? (
                    <Link to="/lobbies/home" className={blueButtonMarginTop}>Home</Link>
                ) : (
                    <Link to="/login" className={blueButton}>Home</Link>
                )}
            </div>
        </div>
    );
}

export default Error;