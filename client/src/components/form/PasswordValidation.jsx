import React from 'react'

import CheckIcon from '../svgs/CheckSvg'
import XIcon from '../svgs/XSvg'

import styles from '../../css/components/form/PasswordCheck.module.css'

const PasswordValidation = (props) => {

    const {
        formErrors,
        initialRender
    } = props

    return (
        <div className={styles.form_password_check}>
            <div className={`${styles.password_check}`}>
                <div className={`${styles.password_check_box} flex-center`}>
                <div className={`${styles.check_box} ${!formErrors.password.passwordLength ? styles.check_box__checked : !initialRender ? styles.check_box__error : ''}`}/>
                    {!formErrors.password.passwordLength ? (
                        <CheckIcon className={styles.icon_check}/>
                    ) : (
                        <XIcon className={`${styles.icon_check}`}/>
                    )}
                </div>
                <span className={`${styles.primary_text_accent__shrink} flex-center`}>Password is at least 8 characters.</span>
            </div>
            <div className={`${styles.password_check}`}>
                <div className={`${styles.password_check_box} flex-center`}>
                    <div className={`${styles.check_box} ${!formErrors.password.passwordCharacters ? styles.check_box__checked : !initialRender ? styles.check_box__error : ''}`}/>
                    {!formErrors.password.passwordCharacters ? (
                        <CheckIcon className={styles.icon_check}/>
                    ) : (
                        <XIcon className={`${styles.icon_check}`}/>
                    )}
                </div>
                <span className={`${styles.primary_text_accent__shrink} flex-center`}>Password includes two of the following; letter, number, or symbol.</span>
            </div>
        </div>
	)
}

export default PasswordValidation