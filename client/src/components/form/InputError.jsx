import React from 'react'

import WarningIcon from '../svgs/WarningSvg'

import inputErrorStyles from '../../css/components/form/InputError.module.css'

const InputErrors = (props) => {

    const {
        formErrors,
        error,
        name
    } = props

    return (
        <>
            {formErrors[name] && (
                <div className={inputErrorStyles.error_container}>
                    <WarningIcon className={inputErrorStyles.icon_warning}/>
                    <span className={inputErrorStyles.secondary_text_accent}>{formErrors[name]}</span>
                </div>
            )}

            {(error.validationErrors && error.validationErrors[name]) && (
                <div className={inputErrorStyles.error_container}>
                    <WarningIcon className={inputErrorStyles.icon_warning}/>
                    <span className={inputErrorStyles.secondary_text_accent}>{error.validationErrors[name]}</span>
                </div>
            )}
        </>
	)
}

export default InputErrors