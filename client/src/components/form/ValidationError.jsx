import React from 'react'

import WarningIcon from '../svgs/WarningSvg'

import styles from '../../css/components/form/Error.module.css'

const InputErrors = (props) => {

    const {
        error,
        name
    } = props

    return (
        <>
            {(error.validationErrors && error.validationErrors[name]) && (
                <div className={styles.error_container}>
                    <WarningIcon className={styles.icon_warning}/>
                    <span className={styles.secondary_text_accent}>{error.validationErrors[name]}</span>
                </div>
            )}
        </>
	)
}

export default InputErrors