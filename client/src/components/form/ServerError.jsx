import React from 'react';
import PropTypes from 'prop-types';  // Ensure PropTypes is imported
import WarningIcon from '../svgs/WarningSvg';
import styles from '../../css/components/form/Error.module.css';

const ServerError = ({ error, name = null }) => {
    return (
        <>
            {error && (
                <div className={`${styles.error_container} w-100`}>
                    <WarningIcon className={styles.icon_warning} />
                    <span className={styles.secondary_text_accent}>
                        {name ? error.validationErrors?.[name] : error.message}
                    </span>
                </div>
            )}
        </>
    );
}

// Defining propTypes for the component
ServerError.propTypes = {
    name: PropTypes.string // The 'name' prop is optional
};

export default ServerError;