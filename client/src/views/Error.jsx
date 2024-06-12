import { Link } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

import styles from '../css/views/Error.module.css'

const Error = (props) => {

    const { authToken } = useAuth()

    const { error } = props

    return (
        <div className={styles.mainItem}>
            {/*
            {Object.keys(error).length !== 0 && showNotification && (
                <ul className="alert alert-danger">
                    <button type="button" className="btn-close close-button-red" aria-label="Close" onClick={closeNotification}></button>
                    {error.statusCode && error.name && (
                        <li className="flash-box-li">
                            <b>Error {error.statusCode}: {error.name}</b>
                        </li>
                    )}
                    {error.message && (
                        <li className="flash-box-li">
                            {error.message}
                        </li>
                    )}
                    {error.validationErrors && error.validationErrors.length !== 0 && (
                        error.validationErrors.map((error, index) => (
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
            */}
        </div>
    )
}

export default Error