import React from 'react'

import CheckIcon from '../svgs/CheckSvg'

import styles from '../../css/components/form/StayLogged.module.css'

const StayLogged = (props) => {

    const {
        stayLogged,
        handleStayLogged,
        placeholder
    } = props

    return (
        <div className={`${styles.checkbox_container}`}>
            <div className={`${styles.checkbox_input} flex-center clickable transition-default`}>
                <input type='checkbox' className={`${styles.checkbox} clickable transition-default`} checked={stayLogged} onChange={handleStayLogged}/>
                {stayLogged && (
                    <CheckIcon className={styles.icon_check}/>
                )}
            </div>
            <span className={`${styles.accent_text} flex-center`}>{placeholder}</span>
        </div>
	)
}

export default StayLogged