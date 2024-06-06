import React from 'react'

import styles from '../../css/components/form/StayLogged.module.css'

const StayLogged = (props) => {

    const {
        stayLogged,
        handleStayLogged,
        placeholder
    } = props

    return (
        <div className={`${styles.form_checkbox}`}>
            <div className={`${styles.checkbox} flex-center`}>
                <input type='checkbox' className={`${styles.box}`} checked={stayLogged} onChange={handleStayLogged}/>
                {stayLogged && (
                    <CheckIcon className={styles.icon_check}/>
                )}
            </div>
            <span className={`${styles.primary_text_accent__shrink} flex-center`}>{placeholder}</span>
        </div>
	)
}

export default StayLogged