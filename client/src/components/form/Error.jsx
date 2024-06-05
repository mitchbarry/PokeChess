import React, { useEffect } from 'react'

import WarningIcon from '../svgs/WarningSvg'

import errorStyles from '../../css/components/form/Error.module.css'

const Error = (props) => {

    const {
        error
    } = props

    return (
        <>
            {((error.validationErrors) && (Object.keys(error.validationErrors).length === 0)) && (
                <div className={errorStyles.error_container}>
                    <WarningIcon className={errorStyles.icon_warning}/>
                    <span className={errorStyles.secondary_text_accent}>{error.message}</span>
                </div>
            )}
        </>
	)
}

export default Error