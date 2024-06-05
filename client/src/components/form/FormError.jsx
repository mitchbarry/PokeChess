import React from 'react'

import WarningIcon from '../svgs/WarningSvg'

import styles from '../../css/components/form/Error.module.css'

const FormError = (props) => {

    const {
        formErrors,
        name
    } = props

    return (
        <>
            {formErrors[name] && (
                <div className={styles.error_container}>
                    <WarningIcon className={styles.icon_warning}/>
                    <span className={styles.secondary_text_accent}>{formErrors[name]}</span>
                </div>
            )}
        </>
	)
}

export default FormError