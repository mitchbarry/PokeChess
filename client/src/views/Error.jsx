import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext"

import styles from "../styles/Error.module.css";

const Error = (props) => {

    const { authToken } = useAuth();

    const { errors } = props

    return (
        <div className={styles.flexBox}>
            <div className={styles.mainItem}>
                {Object.keys(errors).length !== 0 && (
                    <span className={styles.whiteText}>
                        {errors.statusCode && errors.name && (
                            <h2 className={styles.heading2}>
                                Error {errors.statusCode}: {errors.name} 
                            </h2>
                        )}
                        {errors.message && (
                            <p className={styles.paragraphTag}>
                                {errors.message}
                            </p>
                        )}
                        {errors.validationErrors && errors.validationErrors.length !== 0 && (
                            Object.keys(errors.validationErrors).map((key, index) => (
                                <p key={index} className={styles.paragraphTag}>
                                    {errors.validationErrors[key]}
                                </p>
                            ))
                        )}
                    </span>
                )}
                {authToken ? (
                    <Link to="/lobbies/home" className={styles.blueButtonMarginTop}>Home</Link>
                ) : (
                    <Link to="/login" className={styles.blueButton}>Home</Link>
                )}
            </div>
        </div>
    );
}

export default Error;