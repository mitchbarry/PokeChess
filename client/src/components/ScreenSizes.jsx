import styles from './css/components/screenSizes.module.css'

const ScreenSizes = (props) => {

	return (
		<div>
            <p>
                | 16:9
            </p>
            <button id='' className={}>lg</button>
            <button id='' className={}>md</button>
            <button id='' className={}>sm</button>
            <p>
                {" "}|
            </p>
            <p>
                {" "}4:3
            </p>
            <button id='' className={}>sm</button>
            <p>
                {" "}|
            </p>
            <p>
                {" "}19.5:9
            </p>
            <button id='' className={}>lg</button>
            <button id='' className={}>md</button>
            <button id='' className={}>sm</button>
            <p>
                {" "}|
            </p>
		</div>
	);
}

export default ScreenSizes;