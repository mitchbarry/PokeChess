import React from 'react';
import DropdownArrowIcon from '../svgs/DropdownArrowSvg'

import styles from '../css/components/header/Dropdown.module.css'

const DropdownMenu = ({ text, children }) => {

    return (
        <div className={`${styles.container} flex-center`}>
            <span className={`${styles.primary_text}`}>{text}</span>
            <DropdownArrowIcon className={styles.icon_dropdownArrow} />
            <div className={styles.dropdown_bridge} />
            <div className={`${styles.dropdown_menu} flex-col`}>
                    {children}
            </div>
        </div>
    );
};

export default DropdownMenu;