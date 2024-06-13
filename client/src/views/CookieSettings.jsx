import React from 'react'
import Cookies from 'js-cookie'

import styles from '../css/views/CookieSettings.module.css'

const CookieSettings = () => {

    const handleChangeConsent = (newConsent) => {
        // if (consent === 'agree') {
        // Cookies.set('cookieConsent', 'true', { expires: 365 })
        // }
        // else {
        // Cookies.set('cookieConsent', 'false')
        // }
    }
    
    return (
        <div>
            <h2>Cookie Preferences</h2>
            <button>Agree</button>
            <button>Decline</button>
        </div>
    )
}

export default CookieSettings