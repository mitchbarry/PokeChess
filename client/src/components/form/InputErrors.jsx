import React from 'react'

import WarningIcon from '../svgs/WarningSvg'

import inputErrorsStyles from '../../css/components/form/InputErrors.module.css'

const InputErrors = (props) => {

    const {
        formErrors,
        error,
        name
    } = props

    return (
        <>
            {formErrors[name] !== '' && (
                <div className={inputErrorsStyles.error_container}>
                    <WarningIcon className={inputErrorsStyles.icon_warning}/>
                    <span className={inputErrorsStyles.secondary_text_accent}>{formErrors[name]}</span>
                </div>
            )}

            {Object.keys(error).length !== 0 && (
                error.validationErrors[name] && (
                    <div className={inputErrorsStyles.error_container}>
                        <WarningIcon className={inputErrorsStyles.icon_warning}/>
                        <span className={inputErrorsStyles.secondary_text_accent}>{error.validationErrors[name]}</span>
                    </div>
                )
            )}
        </>
	)
}

export default InputErrors