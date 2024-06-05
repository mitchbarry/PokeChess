import React from 'react'

import WarningIcon from '../svgs/WarningSvg'

import errorStyles from '../../css/components/form/Error.module.css'

const InputErrors = (props) => {

    const {
        formErrors,
        error,
        name
    } = props

    return (
        <>
            {formErrors[name] && (
                <div className={errorStyles.error_container}>
                    <WarningIcon className={errorStyles.icon_warning}/>
                    <span className={errorStyles.secondary_text_accent}>{formErrors[name]}</span>
                </div>
            )}

            {(error.validationErrors && error.validationErrors[name]) && (
                <div className={errorStyles.error_container}>
                    <WarningIcon className={errorStyles.icon_warning}/>
                    <span className={errorStyles.secondary_text_accent}>{error.validationErrors[name]}</span>
                </div>
            )}
        </>
	)
}

export default InputErrors