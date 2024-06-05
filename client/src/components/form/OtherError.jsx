import React, { useEffect } from 'react'

import WarningIcon from '../svgs/WarningSvg'

import styles from '../../css/components/form/Error.module.css'

const OtherError = (props) => {

    const {
        error
    } = props

    return (
        <>
            {((error.validationErrors) && (Object.keys(error.validationErrors).length === 0)) && (
                <div className={styles.error_container}>
                    <WarningIcon className={styles.icon_warning}/>
                    <span className={styles.secondary_text_accent}>{error.message}</span>
                </div>
            )}
        </>
	)
}

export default OtherError