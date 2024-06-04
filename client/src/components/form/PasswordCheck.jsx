import React from 'react'

import WarningIcon from '../svgs/WarningSvg'
import CheckIcon from '../svgs/CheckSvg'
import XIcon from '../svgs/XSvg'

import passwordCheckStyles from '../../css/components/form/PasswordCheck.module.css'

const PasswordCheck = (props) => {

    const {
        formErrors,
        error,
        initialRender
    } = props

    return (
        <>
            {Object.keys(error).length !== 0 && (
                error.validationErrors.password && (
                    <div className={passwordCheckStyles.error_container}>
                        <WarningIcon className={passwordCheckStyles.icon_warning}/>
                        <span className={passwordCheckStyles.secondary_text_accent}>FFFFFFFFFFFFFFFFF{error.validationErrors.password}</span>
                    </div>
                )
            )}

            <div className={passwordCheckStyles.form_password_check}>
                <div className={`${passwordCheckStyles.password_check}`}>
                    <div className={`${passwordCheckStyles.password_check_box} flex-center`}>
                    <div className={`${passwordCheckStyles.check_box} ${!formErrors.password.passwordLength ? passwordCheckStyles.check_box__checked : !initialRender ? passwordCheckStyles.check_box__error : ''}`}/>
                        {!formErrors.password.passwordLength ? (
                            <CheckIcon className={passwordCheckStyles.icon_check}/>
                        ) : (
                            <XIcon className={`${passwordCheckStyles.icon_check}`}/>
                        )}
                    </div>
                    <span className={`${passwordCheckStyles.primary_text_accent__shrink} flex-center`}>Password is at least 8 characters.</span>
                </div>
                <div className={`${passwordCheckStyles.password_check}`}>
                    <div className={`${passwordCheckStyles.password_check_box} flex-center`}>
                        <div className={`${passwordCheckStyles.check_box} ${!formErrors.password.passwordCharacters ? passwordCheckStyles.check_box__checked : !initialRender ? passwordCheckStyles.check_box__error : ''}`}/>
                        {!formErrors.password.passwordCharacters ? (
                            <CheckIcon className={passwordCheckStyles.icon_check}/>
                        ) : (
                            <XIcon className={`${passwordCheckStyles.icon_check}`}/>
                        )}
                    </div>
                    <span className={`${passwordCheckStyles.primary_text_accent__shrink} flex-center`}>Password includes two of the following letter, number, or symbol.</span>
                </div>
            </div>
        </>
	)
}

export default PasswordCheck