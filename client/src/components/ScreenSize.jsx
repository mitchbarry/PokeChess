import styles from '../css/components/screenSize.module.css'

const ScreenSizes = (props) => {

    const {updateSize} = props;

    const handleUpdateSize = (e) => {
        let newSize
        switch(e.target.id) {
            case 'lg16_9':
                newSize = {
                    width: 2560,
                    height: 1440
                }
                break
            case 'md16_9':
                newSize = {
                    width: 1920,
                    height: 1080
                }
                break
            case 'sm16_9':
                newSize = {
                    width: 1366,
                    height: 768
                }
                break
            case 'sm4_3':
                newSize = {
                    width: 1024,
                    height: 768
                }
                break
            case 'lg19_5_9':
                newSize = {
                    width: 414,
                    height: 896
                }
                break
            case 'md19_5_9':
                newSize = {
                    width: 375,
                    height: 812
                }
                break
            case 'sm19_5_9':
                newSize = {
                    width: 320,
                    height: 568
                }
                break
            default:
                return
        }
        updateSize(newSize);
    }

	return (
		<div className={styles.screenSize_container}>
            <div className={styles.button_group}>
                <button id='lg16_9' className={`${styles.button} ${styles.lg16_9}`} onClick={(e) => handleUpdateSize(e)}>16:9 lg</button> {/* 2560 x 1440 */}
                <button id='md16_9' className={`${styles.button} ${styles.md16_9}`} onClick={(e) => handleUpdateSize(e)}>16:9 md</button> {/* 1920 x 1080 */}
                <button id='sm16_9' className={`${styles.button} ${styles.sm16_9}`} onClick={(e) => handleUpdateSize(e)}>16:9 sm</button> {/* 1366 x 768 */}
            </div>
            <div className={styles.button_group}>
                <button id='sm4_3' className={`${styles.button} ${styles.sm4_3}`} onClick={(e) => handleUpdateSize(e)}>4:3 sm</button> {/* 1024 x 768 */}
            </div>
            <div className={styles.button_group}>
                <button id='lg19_5_9' className={`${styles.button} ${styles.lg19_5_9}`} onClick={(e) => handleUpdateSize(e)}>19.5:9 lg</button> {/* 414 x 896 */}
                <button id='md19_5_9' className={`${styles.button} ${styles.md19_5_9}`} onClick={(e) => handleUpdateSize(e)}>19.5:9 md</button> {/* 375 x 812 */}
                <button id='sm19_5_9' className={`${styles.button} ${styles.sm19_5_9}`} onClick={(e) => handleUpdateSize(e)}>19.5:9 sm</button> {/* 320 x 568 */}
            </div>
		</div>
	);
}

export default ScreenSizes;