import React, { useState } from 'react';
import DropdownArrowIcon from '../svgs/DropdownArrowSvg'

import styles from '../css/components/header/Dropdown.module.css'

const DropdownMenu = ({ text, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${styles.dropdown} flex-center`} onClick={toggleDropdown}>
            <span className={`${styles.primary_text}`}>{text}</span>
            <DropdownArrowIcon className={styles.icon_dropdownArrow} />
            <div className={styles.dropdown_bridge} />
            {isOpen && (
                <div className={`${styles.dropdown_menu} flex-col`}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
