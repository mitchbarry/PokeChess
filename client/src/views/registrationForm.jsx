import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"
import AuthService from "../services/AuthService"
import errorUtilities from '../utilities/error.utilities'

import registerImg from "../assets/text/register.png"

const RegistrationForm = () => {

	const navigate = useNavigate()

	const { authToken, loggedUser, handleLoginResponse, handleLogout, updateLoggedUser, updateAuthToken, pathParamValidator } = useAuth();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [showNotification, setShowNotification] = useState(false)
	const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState({
        username: "",
        email: "",
        password: ""
    })
	const [focus, setFocus] = useState({
		username: false,
		email: false,
		password: false
	});

    const handleInput = (e) => {
        switch(e.target.id) {
            case "username":
                return handleUsername(e);
            case "email":
                return handleEmail(e);
            case "password":
                return handlePassword(e);
            default:
                return;
        }
    };

	const handleUsername = (e) => {
        const value = e.target.value;
        setFormErrors((prevErrors) => {
            switch (prevErrors.username) {
                case "Username is required!":
                    if (value) {
                        return {...prevErrors, username: ""};
                    }
					else {
						return prevErrors;
					}
                case "Username must be at least 4 characters long!":
                    if (value.length > 4) {
                        return {...prevErrors, username: ""};
                    }
					else {
						return prevErrors;
					}
                case "Username must be less than 25 characters long!":
                    if (value.length < 25) {
                        return {...prevErrors, username: ""};
                    }
					else {
						return prevErrors;
					}
                default:
                    return prevErrors;
            }
        })
        setUsername(value)
    }

	const handleEmail = (e) => {
        const value = e.target.value;
        setFormErrors((prevErrors) => {
            switch (prevErrors.email) {
                case "Email is required!":
                    if (value) {
                        return{...prevErrors, email: ""};
                    }
					else {
						return prevErrors;
					}
                case "Please enter a valid email!":
                    if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
                        return{...prevErrors, email: ""};
                    }
					else {
						return prevErrors;
					}
                default:
                    return prevErrors;
            }
        })
        setEmail(value);
    }

	const handlePassword = (e) => {
        const value = e.target.value;
        setFormErrors((prevErrors) => {
            switch (prevErrors.password) {
                case "Password is required!":
                    if (value) {
                        return {...prevErrors, password: ""};
                    }
					else {
						return prevErrors;
					}
                case "Password must be at least 6 characters long!":
                    if (value.length > 6) {
                        return {...prevErrors, password: ""};
                    }
					else {
						return prevErrors;
					}
                case "Password must be less than 255 characters long!":
                    if (value.length > 255) {
                        return {...prevErrors, password: ""};
                    }
					else {
						return prevErrors;
					}
                // Optional regex Case here to verify the user password has certain characters or a certain uppercase characters
                default:
                    return prevErrors;
            }
        })
        setPassword(value);
    }

	const handleSubmit = (e) => {
        e.preventDefault();
        checkForm();
	}

	const checkForm = () => {
        const newFormErrors = {...formErrors}
        if (!username.trim()) { // checks username on submit
            newFormErrors.username = "Username is required!"
        }
        else if (username.trim().length < 4) {
            newFormErrors.username = "Username must be at least 4 characters long!"
        }
        else if (username.trim().length > 25) {
            newFormErrors.username = "Username must be less than 25 characters long!"
        }
        if (!email.trim()) { // checks email on submit
            newFormErrors.email = "Email is required!"
        }
        else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            newFormErrors.email = "Please enter a valid email!"
        }
        if (!password.trim()) { // checks password on submit
            newFormErrors.password = "Password is required!"
        }
        else if (password.trim().length < 6) {
            newFormErrors.password = "Password must be at least 6 characters long!"
        }
        else if (password.trim().length > 255) {
            newFormErrors.password = "Password must be less than 255 characters long!"
        }
        if (Object.keys(newFormErrors).every(key => newFormErrors[key] === "")) {
            sendRequest();
        }
        else {
            setFormErrors(prevErrors => ({...prevErrors, ...newFormErrors}));
        }
    }

	const sendRequest = async () => {
        try {
            const response = await AuthService.register({
                username: username.trim(),
                email: email.trim(),
                password: password.trim()
            });
            handleLoginResponse(response);
        }
        catch (error) {
            setErrors(errorUtilities.catchError(error));
            setShowNotification(true);
        }
		finally {
			navigate("/lobbies/home");
		}
    }

	const closeNotification = () => {
        setShowNotification(false);
    }

	const handleShowPassword = () => {
        setShowPassword(showPassword ? false : true);
    }

	const handleFocus = (e) => {
		switch(e.target.id) {
			case "username":
				return setFocus(prevFocus => ({...prevFocus, username: true}));
			case "email":
				return setFocus(prevFocus => ({...prevFocus, email: true}));
			case "password":
				return setFocus(prevFocus => ({...prevFocus, password: true}));
			default:
				return;
		}
	};

	const handleBlur = (e) => {
		switch(e.target.id) {
			case "username":
				if (!username.trim()) {
					return setFocus(prevFocus => ({...prevFocus, username: false}));
				}
				break;
			case "email":
				if (!email.trim()) {
					return setFocus(prevFocus => ({...prevFocus, email: false}));
				}
				break;
			case "password":
				if (!password.trim()) {
					return setFocus(prevFocus => ({...prevFocus, password: false}));
				}
				break;
			default:
				return;
		}
	};

	// NEEDS CLIENT SIDE ERROR DISPLAY -> ITS SET UP WITH formErrors JUST NOT VISUALLY/ IN THE RETURN

	return (
		<div className="mt-custom d-flex flex-column justify-content-center align-items-center">
			<img src={registerImg} className="image-form-header"/>
			<div className="border-shadow color-bg-blue form-m mt-3 p-4 rounded">
				{Object.keys(errors).length !== 0 && showNotification && (
                    <ul className="alert alert-danger">
                        <button type="button" className="btn-close close-button-red" aria-label="Close" onClick={closeNotification}></button>
                        {errors.statusCode && errors.name && (
                            <li className="text-120 color-burgundy">
                                <b>Error {errors.statusCode}: {errors.name}</b>
                            </li>
                        )}
                        {errors.message && (
                            <li className="text-120 color-burgundy">
                                {errors.message}
                            </li>
                        )}
                        {errors.validationErrors && errors.validationErrors.length !== 0 && (
                            errors.validationErrors.map((error, index) => (
                            <li key={index} className="text-120 color-burgundy">
                                {error}
                            </li>
                            ))
                        )}
                    </ul>
                )}
				<form onSubmit={handleSubmit}>
					<div className="form-group">
                        <div className="position-relative">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className={"form-control form-input-m form-p-input text-50 border-shadow-inset w-100 mb-4 rounded" + (formErrors.username ? " border-error-s border-shadow-error" : "")}
                                value={username}
                                onChange={(e) => handleInput(e)}
                                onFocus={(e) => handleFocus(e)}
                                onBlur={(e) => handleBlur(e)}
                            />
                            <label htmlFor="username" className={"text-lighter transition-ease position-absolute" + /* these styles always apply */
                                (focus.username || username ? " form-input-label--shrink text-90" : " form-input-label text-150") + /* positioning styles based on focus */
                                (formErrors.username ? " color-red text-shadow-error" : " text-shadow" + /* error coloring based on existence of formError */
                                (focus.username || username ? " color-dark-gray" : " color-light-gray"))}> {/* default label coloring depending on focus */}
                                Username
                            </label>
                        </div>
                    </div>
					<div className="form-group">
                        <div className="position-relative">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className={"form-control form-input-m form-p-input text-50 border-shadow-inset w-100 mb-4 rounded" + (formErrors.email ? " border-error-s border-shadow-error" : "")}
                                value={email}
                                onChange={(e) => handleInput(e)}
                                onFocus={(e) => handleFocus(e)}
                                onBlur={(e) => handleBlur(e)}
                            />
                            <label htmlFor="email" className={"text-lighter transition-ease position-absolute" + /* these styles always apply */
                                (focus.email || email ? " form-input-label--shrink text-90" : " form-input-label text-150") + /* positioning styles based on focus */
                                (formErrors.email ? " color-red text-shadow-error" : " text-shadow" + /* error coloring based on existence of formError */
                                (focus.email || email ? " color-dark-gray" : " color-light-gray"))}> {/* default label coloring depending on focus */}
                                Email
                            </label>
                        </div>
                    </div>
					<div className="form-group">
                        <div className="position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className={"form-control form-input-m form-p-input-password text-50 border-shadow-inset w-100 mb-4 rounded" + (formErrors.password ? " border-error-s border-shadow-error" : "")}
                                value={password}
                                onChange={(e) => handleInput(e)}
                                onFocus={(e) => handleFocus(e)}
                                onBlur={(e) => handleBlur(e)}
                            />
                            <svg className={"form-input-icon cursor-pointer transition-ease position-absolute" + (showPassword ? " image-icon-dark-gray" : " image-icon-light-gray image-icon-light-gray-h")} onClick={handleShowPassword} version="1.1" xmlns="http://www.w3.org/2000/svg" width="27" height="20" viewBox="0 0 512 373" preserveAspectRatio="xMidYMid meet"> {/* width and height are 'somewhat' hardcoded to keep their size, numbers are an approximation of native resolution using same ratio -> These share an <svg> tag because one was made using the other (same dimensions) */}
                                {showPassword ? (
                                    <path d="M0 0 C1.00646072 -0.00974854 2.01292145 -0.01949707 3.04988098 -0.02954102 C44.11579661 -0.34597579 44.11579661 -0.34597579 63.18359375 4.23828125 C64.00698242 4.4202002 64.83037109 4.60211914 65.67871094 4.78955078 C97.93802025 11.93770269 127.93441758 27.42474447 154.18359375 47.23828125 C155.01213867 47.86065674 155.01213867 47.86065674 155.85742188 48.49560547 C176.452218 64.01329513 176.452218 64.01329513 179.9921875 68.5625 C181.88579752 70.87466197 183.6881257 72.61470355 185.9453125 74.54296875 C190.25235737 78.23130558 194.13527278 82.2153272 197.99609375 86.36328125 C198.69186523 87.10827881 199.38763672 87.85327637 200.10449219 88.62084961 C214.69259025 104.33590351 227.62502374 121.17672698 239.18359375 139.23828125 C239.70099121 140.04458984 240.21838867 140.85089844 240.75146484 141.68164062 C247.54610489 152.32158797 253.8798046 162.98573443 259.27636719 174.40039062 C260.19763148 176.26671937 261.1934029 178.07015201 262.22265625 179.87890625 C266.57818296 187.64518297 268.94887507 194.28659662 267.18359375 203.23828125 C265.67419946 207.2594475 263.52885899 210.65250646 261.18359375 214.23828125 C260.43355529 215.46243555 259.68770364 216.68916167 258.9453125 217.91796875 C247.25710015 237.13937651 234.18384796 255.55072085 219.4609375 272.56640625 C217.2101007 275.12964052 217.2101007 275.12964052 215.5 277.59765625 C215.06558594 278.1390625 214.63117188 278.68046875 214.18359375 279.23828125 C213.52359375 279.23828125 212.86359375 279.23828125 212.18359375 279.23828125 C211.83832642 280.07033081 211.83832642 280.07033081 211.48608398 280.91918945 C209.82359531 283.87926066 207.74191444 285.93945942 205.34375 288.34375 C204.86215927 288.82725418 204.38056854 289.31075836 203.88438416 289.80891418 C202.86214863 290.83250853 201.8373917 291.85359019 200.81030273 292.87231445 C199.27554954 294.39652774 197.75155096 295.93088593 196.22851562 297.46679688 C189.87348493 303.83130576 183.2723139 309.68560106 176.18359375 315.23828125 C175.50562744 315.77557861 174.82766113 316.31287598 174.12915039 316.86645508 C160.17812658 327.81943422 145.35883853 337.20312259 129.68359375 345.48828125 C128.32971558 346.20576538 128.32971558 346.20576538 126.94848633 346.93774414 C126.10825928 347.37207764 125.26803223 347.80641113 124.40234375 348.25390625 C123.65919922 348.63836914 122.91605469 349.02283203 122.15039062 349.41894531 C120.18359375 350.23828125 120.18359375 350.23828125 117.18359375 350.23828125 C116.85359375 350.89828125 116.52359375 351.55828125 116.18359375 352.23828125 C112.57701234 354.05222945 108.76186186 355.41511829 104.99609375 356.86328125 C103.84802246 357.30478516 102.69995117 357.74628906 101.51708984 358.20117188 C92.57120736 361.54250646 83.53825645 364.29680868 74.30859375 366.73828125 C73.08116455 367.06393066 71.85373535 367.38958008 70.58911133 367.72509766 C51.41544158 372.64222672 32.65065252 373.42514635 12.96020508 373.42358398 C9.8867404 373.42577012 6.81363599 373.44399626 3.74023438 373.46289062 C-12.69257681 373.51128582 -28.43495398 372.29002556 -44.50390625 368.73828125 C-45.50873047 368.52558594 -46.51355469 368.31289063 -47.54882812 368.09375 C-81.33510447 360.84271242 -113.49210237 345.81303635 -141.13671875 325.1640625 C-143.33992442 323.58070915 -145.39736256 322.42116164 -147.81640625 321.23828125 C-149.50637948 319.59525172 -151.16857019 317.92356813 -152.81640625 316.23828125 C-154.0360058 315.14418859 -155.26608929 314.0617201 -156.50390625 312.98828125 C-174.16792649 297.65285125 -174.16792649 297.65285125 -178.81640625 292.23828125 C-178.81640625 291.57828125 -178.81640625 290.91828125 -178.81640625 290.23828125 C-179.47640625 290.23828125 -180.13640625 290.23828125 -180.81640625 290.23828125 C-180.81640625 289.57828125 -180.81640625 288.91828125 -180.81640625 288.23828125 C-181.47640625 288.23828125 -182.13640625 288.23828125 -182.81640625 288.23828125 C-182.81640625 287.57828125 -182.81640625 286.91828125 -182.81640625 286.23828125 C-183.47640625 286.23828125 -184.13640625 286.23828125 -184.81640625 286.23828125 C-186.21240021 284.70990856 -187.53228274 283.11178026 -188.81640625 281.48828125 C-189.62851563 280.47121094 -190.440625 279.45414062 -191.27734375 278.40625 C-191.69983398 277.87563965 -192.12232422 277.3450293 -192.55761719 276.79833984 C-194.4718714 274.42594177 -196.46308759 272.1198471 -198.44140625 269.80078125 C-204.31430744 262.77525459 -209.73892693 255.42304313 -215.203125 248.078125 C-218.1351831 244.13838695 -221.11422088 240.23991358 -224.12890625 236.36328125 C-228.80444791 230.29519058 -233.39334769 224.18164045 -237.71191406 217.85351562 C-238.71792592 216.38230111 -239.74646978 214.92655819 -240.77734375 213.47265625 C-245.61395063 205.88849336 -246.54988275 197.94952278 -244.81640625 189.23828125 C-242.85792282 183.45521226 -239.97052008 178.44630811 -236.81640625 173.23828125 C-236.22102051 172.24376953 -235.62563477 171.24925781 -235.01220703 170.22460938 C-228.18527672 158.86497577 -221.1725907 147.61480225 -213.94140625 136.5078125 C-212.36166536 134.07721852 -210.80131031 131.6385102 -209.25390625 129.1875 C-199.83328406 114.32858649 -189.38890107 100.48412007 -177.81640625 87.23828125 C-177.10355469 86.41328125 -176.39070313 85.58828125 -175.65625 84.73828125 C-165.6111187 73.32250587 -154.85819585 62.53856832 -142.81640625 53.23828125 C-141.38167969 52.078125 -141.38167969 52.078125 -139.91796875 50.89453125 C-130.70895247 43.56443265 -120.90710204 37.28396219 -110.81640625 31.23828125 C-110.18541016 30.85929687 -109.55441406 30.4803125 -108.90429688 30.08984375 C-77.06485443 11.29008417 -36.92030042 0.29716277 0 0 Z M-127.44921875 108.0234375 C-129.47987778 109.92341056 -131.55481743 111.71074574 -133.69140625 113.48828125 C-144.34928863 122.79485748 -153.37334625 133.93722629 -161.81640625 145.23828125 C-162.22955078 145.78919434 -162.64269531 146.34010742 -163.06835938 146.90771484 C-170.5651689 156.97375584 -177.26673455 167.53851728 -183.81640625 178.23828125 C-184.50734375 179.35203125 -185.19828125 180.46578125 -185.91015625 181.61328125 C-189.68090525 187.98106069 -189.68090525 187.98106069 -190.375 195.1796875 C-187.28497892 206.56738756 -177.99132597 216.16235386 -170.81640625 225.23828125 C-170.05585938 226.21539062 -169.2953125 227.1925 -168.51171875 228.19921875 C-154.72796314 245.74721284 -138.80233653 262.01463546 -120.81640625 275.23828125 C-119.8728125 275.97691406 -118.92921875 276.71554687 -117.95703125 277.4765625 C-87.1970516 301.39627043 -49.84621849 319.12204946 -10.81640625 323.23828125 C-10.02782227 323.32223145 -9.23923828 323.40618164 -8.42675781 323.49267578 C32.59243448 327.57997141 73.87957829 319.69367307 110.18359375 300.23828125 C110.83924316 299.89571289 111.49489258 299.55314453 112.17041016 299.20019531 C122.98780335 293.5368321 132.63685729 286.83291244 142.18359375 279.23828125 C143.72853516 278.03171875 143.72853516 278.03171875 145.3046875 276.80078125 C152.78051114 270.73457325 159.6092905 264.01873859 166.43359375 257.23828125 C167.35672363 256.32449707 168.27985352 255.41071289 169.23095703 254.46923828 C179.98339705 244.95716836 179.98339705 244.95716836 186.18359375 233.23828125 C186.84359375 233.23828125 187.50359375 233.23828125 188.18359375 233.23828125 C189.89199716 231.23932805 189.89199716 231.23932805 191.68359375 228.61328125 C192.39257812 227.61296875 193.1015625 226.61265625 193.83203125 225.58203125 C194.40195801 224.76992188 194.40195801 224.76992188 194.98339844 223.94140625 C196.21873155 222.18841931 197.46852029 220.44660844 198.72265625 218.70703125 C200.84757198 215.75894635 202.9538038 212.79823021 205.05126953 209.83056641 C206.06154701 208.40990455 207.0882729 207.0009726 208.1171875 205.59375 C208.92349609 204.45873047 208.92349609 204.45873047 209.74609375 203.30078125 C210.20113281 202.67300781 210.65617187 202.04523438 211.125 201.3984375 C212.64222725 198.30239812 212.95220211 195.67956445 213.18359375 192.23828125 C212.13070199 188.89168977 212.13070199 188.89168977 210.3046875 185.66015625 C209.82943886 184.7599173 209.82943886 184.7599173 209.34458923 183.8414917 C206.05091982 177.73554107 202.29899347 171.93179051 198.40454102 166.19580078 C197.24094793 164.48069645 196.09137587 162.75680972 194.94335938 161.03125 C190.85156307 154.92137422 186.57615922 149.03486631 181.90795898 143.35058594 C180.18359375 141.23828125 180.18359375 141.23828125 178.58227539 138.96191406 C178.12071045 138.39311523 177.65914551 137.82431641 177.18359375 137.23828125 C176.52359375 137.23828125 175.86359375 137.23828125 175.18359375 137.23828125 C174.9211084 136.4920752 174.65862305 135.74586914 174.38818359 134.97705078 C173.17394761 132.21634968 171.96948846 130.59218224 169.91015625 128.41796875 C169.25644043 127.7233252 168.60272461 127.02868164 167.92919922 126.31298828 C167.22939941 125.58708496 166.52959961 124.86118164 165.80859375 124.11328125 C165.08687988 123.35772949 164.36516602 122.60217773 163.62158203 121.82373047 C150.16535065 107.84869026 135.56739193 95.63899083 119.18359375 85.23828125 C118.1575 84.58214844 117.13140625 83.92601563 116.07421875 83.25 C100.25090336 72.53866872 100.25090336 72.53866872 82.18359375 68.23828125 C83.50171425 72.19264274 86.06154845 73.63597732 89.30859375 75.98828125 C110.139896 91.12955187 124.6308989 115.57538252 131.18359375 140.23828125 C131.3753418 140.88216797 131.56708984 141.52605469 131.76464844 142.18945312 C140.07362105 170.41013987 136.72218303 203.87582589 124.18359375 230.23828125 C123.7043042 231.25414307 123.7043042 231.25414307 123.21533203 232.29052734 C118.07307993 243.03184919 111.84788827 252.1542273 104.18359375 261.23828125 C103.64089844 261.93308594 103.09820312 262.62789062 102.5390625 263.34375 C85.74353068 284.49547162 53.91845343 299.80729802 27.42578125 302.97265625 C20.68109859 303.52523266 13.94631352 303.97791484 7.18359375 304.23828125 C5.59417969 304.30208984 5.59417969 304.30208984 3.97265625 304.3671875 C-1.07532817 304.47323759 -5.56165268 304.05790183 -10.44921875 302.796875 C-13.16268138 302.15656946 -15.86687112 301.8024224 -18.62890625 301.42578125 C-25.20288059 300.33979053 -30.81441819 298.07793152 -36.81640625 295.23828125 C-37.44627441 294.94115234 -38.07614258 294.64402344 -38.72509766 294.33789062 C-70.87896687 279.05098694 -96.41449253 254.70281752 -108.70800781 220.77783203 C-120.31464644 186.80191636 -118.87820909 149.28703825 -103.00390625 116.92578125 C-97.60492245 106.37027522 -90.90704477 97.05500558 -82.8046875 88.37890625 C-81.19781409 86.64891287 -79.711955 84.90381979 -78.25390625 83.05078125 C-74.511019 78.7320652 -70.24466798 74.94862212 -65.5703125 71.65625 C-64.99152344 71.18832031 -64.41273438 70.72039062 -63.81640625 70.23828125 C-63.81640625 69.57828125 -63.81640625 68.91828125 -63.81640625 68.23828125 C-84.74208269 68.23828125 -112.94672855 94.40314626 -127.44921875 108.0234375 Z M-1.81640625 115.23828125 C-0.35829853 118.29804098 1.32329746 121.19558952 3.05273438 124.10888672 C10.2660294 136.37610372 13.69411389 147.61506176 10.33984375 161.80859375 C6.57129542 172.57951229 -0.83531621 183.01699043 -11.11328125 188.453125 C-17.44806059 191.361741 -22.57216764 192.40853048 -29.56640625 192.36328125 C-30.63568359 192.36038086 -30.63568359 192.36038086 -31.7265625 192.35742188 C-36.51019612 192.3180684 -41.10246656 192.02393786 -45.81640625 191.23828125 C-43.63558289 203.23280973 -33.72551853 214.79337084 -24.12890625 221.92578125 C-10.67339633 230.930464 4.14845901 233.52123464 19.97265625 230.51953125 C23.13558473 229.58348559 26.13946873 228.50597167 29.18359375 227.23828125 C30.06273437 226.88765625 30.941875 226.53703125 31.84765625 226.17578125 C43.37280618 221.03763391 55.04303628 209.89316585 60.18359375 198.23828125 C66.63193987 180.96592557 67.64277474 163.93436257 59.87402344 146.87817383 C56.66370197 140.19595577 52.8192119 134.13543909 47.18359375 129.23828125 C46.52359375 129.23828125 45.86359375 129.23828125 45.18359375 129.23828125 C45.18359375 128.57828125 45.18359375 127.91828125 45.18359375 127.23828125 C34.3804428 118.1538134 20.94823888 114.8343784 7.12109375 115.11328125 C6.25548828 115.12230469 5.38988281 115.13132812 4.49804688 115.140625 C2.39310596 115.16388402 0.28831033 115.19974117 -1.81640625 115.23828125 Z " transform="translate(244.81640625,-0.23828125)"/>
                                    ) : (
                                    <path d="M0 0 C1.08821045 0.00087616 2.1764209 0.00175232 3.29760742 0.00265503 C19.24479531 0.04504904 34.51225033 0.53118047 50.0625 4.375 C51.05362793 4.60574219 52.04475586 4.83648438 53.06591797 5.07421875 C95.21231199 15.05469608 133.17955373 37.4131488 164.55615234 66.97021484 C166.0904912 68.40110395 167.64500923 69.8064486 169.20703125 71.20703125 C205.01190519 103.43957381 230.4971883 143.70643351 252.0625 186.375 C252.43971191 187.09671387 252.81692383 187.81842773 253.20556641 188.56201172 C255.44339093 193.29650885 254.93425394 198.3483954 254.0625 203.375 C239.38144194 243.58528719 196.84488129 289.63821966 163.0625 315.375 C161.83982417 316.32679777 160.61716938 317.27862256 159.39453125 318.23046875 C150.31093554 325.2352539 140.94723786 331.55894479 131.0625 337.375 C130.00724121 337.99737549 130.00724121 337.99737549 128.93066406 338.63232422 C107.00004562 351.4506475 84.03490659 360.51193836 59.5625 367.1875 C58.5007959 367.4777002 57.4390918 367.76790039 56.34521484 368.06689453 C37.73647299 372.9929944 19.25113523 373.57842585 0.11376953 373.61523438 C-2.90490764 373.62489569 -5.9228889 373.65601098 -8.94140625 373.6875 C-59.01140749 373.95901603 -111.03963352 358.03570353 -150.9375 327.375 C-152.2130144 326.43631122 -153.49051403 325.5003166 -154.76953125 324.56640625 C-161.95049588 319.29929049 -168.825643 313.93765471 -175.3125 307.82421875 C-177.42605362 305.85219774 -179.5720409 303.9660383 -181.765625 302.0859375 C-186.00167081 298.3932926 -189.86188065 294.42432884 -193.6875 290.3125 C-194.38069336 289.57008057 -195.07388672 288.82766113 -195.78808594 288.06274414 C-206.1047109 276.95061179 -215.58788764 265.44443359 -224.57080078 253.23095703 C-226.55335844 250.53867348 -228.55696605 247.86272015 -230.5625 245.1875 C-231.2740625 244.23746094 -231.985625 243.28742188 -232.71875 242.30859375 C-234.71717943 239.66630414 -236.73644863 237.04231675 -238.76611328 234.42407227 C-243.33413064 228.52522197 -247.83179291 222.6084823 -251.9375 216.375 C-252.51886719 215.55 -253.10023438 214.725 -253.69921875 213.875 C-258.61869519 206.16896697 -259.74048469 198.24475901 -257.9375 189.375 C-256.15007676 183.61117615 -253.04882644 178.50682927 -249.9375 173.375 C-249.45522949 172.56901367 -248.97295898 171.76302734 -248.47607422 170.93261719 C-245.25248571 165.57119458 -241.94264816 160.26816646 -238.59130859 154.98583984 C-237.02551428 152.51394667 -235.47324375 150.03418013 -233.92578125 147.55078125 C-220.78890444 126.51690725 -207.2214749 106.11507971 -190.9375 87.375 C-190.22078125 86.54484375 -189.5040625 85.7146875 -188.765625 84.859375 C-178.71690339 73.45067603 -167.97222363 62.67930223 -155.9375 53.375 C-155.00421875 52.61316406 -154.0709375 51.85132813 -153.109375 51.06640625 C-138.71351948 39.53126561 -122.67331832 30.08763224 -105.9375 22.375 C-104.32681641 21.61509766 -104.32681641 21.61509766 -102.68359375 20.83984375 C-70.13656472 6.15255628 -35.4997875 -0.06970911 0 0 Z M-159.1875 125.875 C-173.53472954 142.09877115 -185.64962575 159.93474897 -196.9375 178.375 C-197.6284375 179.48875 -198.319375 180.6025 -199.03125 181.75 C-202.79037801 188.10912782 -202.79037801 188.10912782 -203.51171875 195.296875 C-201.06400297 204.15527496 -194.76815282 211.66015521 -189.19677734 218.76416016 C-187.88552793 220.44148153 -186.59244279 222.13177821 -185.30078125 223.82421875 C-179.23863438 231.71984329 -172.85134226 239.20398194 -165.9375 246.375 C-164.94073242 247.41261475 -164.94073242 247.41261475 -163.92382812 248.47119141 C-154.46501153 258.26541207 -144.89106515 267.28990807 -133.9375 275.375 C-132.99261719 276.11492187 -132.04773438 276.85484375 -131.07421875 277.6171875 C-86.45790762 312.29819283 -32.10158372 329.50894189 24.3269043 323.49536133 C49.09603318 320.38844085 73.18717469 313.30107269 95.15917969 301.40478516 C97.10996877 300.34931718 99.07396519 299.321507 101.0390625 298.29296875 C111.12547327 292.91608036 120.12901421 286.48177728 129.0625 279.375 C130.60744141 278.1684375 130.60744141 278.1684375 132.18359375 276.9375 C139.65941739 270.871292 146.48819675 264.15545734 153.3125 257.375 C154.23562988 256.46121582 155.15875977 255.54743164 156.10986328 254.60595703 C162.18582269 248.50162059 167.72654371 242.13193777 173.0625 235.375 C173.67367676 234.61251953 174.28485352 233.85003906 174.91455078 233.06445312 C181.13727435 225.28036622 187.21496565 217.41657554 192.75 209.125 C193.34639282 208.23216309 193.34639282 208.23216309 193.95483398 207.32128906 C198.54785011 200.68806793 198.54785011 200.68806793 200.03125 193.00390625 C198.84920549 188.57600565 196.968007 185.18149103 194.5625 181.3125 C193.88429199 180.19560791 193.88429199 180.19560791 193.19238281 179.05615234 C191.82832821 176.82106917 190.4469274 174.59750404 189.0625 172.375 C188.33849546 171.19143452 187.6145335 170.00784298 186.890625 168.82421875 C178.04652254 154.67697966 168.24479767 141.15049966 156.6796875 129.10546875 C154.45979134 126.78948753 152.33694905 124.43477389 150.25 122 C144.66524779 115.58490094 138.6536521 110.09679382 132.01953125 104.76953125 C128.98743744 102.31421619 126.02820601 99.78489009 123.0625 97.25 C117.66712646 92.75038345 112.07043902 88.99633704 106.0625 85.375 C105.05574219 84.73949219 104.04898437 84.10398437 103.01171875 83.44921875 C99.72066914 81.37975532 96.39810643 79.3717471 93.0625 77.375 C92.03769531 76.73691406 91.01289063 76.09882812 89.95703125 75.44140625 C6.8584437 27.02405806 -97.40841634 59.41863556 -159.1875 125.875 Z " transform="translate(257.9375,-0.37499999999999994)"/>
                                )}
                            </svg>
                            <label htmlFor="password" className={"text-lighter transition-ease position-absolute" + /* these styles always apply */
                                (focus.password || password ? " form-input-label--shrink text-90" : " form-input-label text-150") + /* positioning styles based on focus */
                                (formErrors.password ? " color-red text-shadow-error" : " text-shadow" + /* error coloring based on existence of formError */
                                (focus.password || password ? " color-dark-gray" : " color-light-gray"))}> {/* default label coloring depending on focus */}
                                Password
                            </label>
                        </div>
                    </div>
					<button type="submit" className={"transition-ease text-140 border-shadow-light border-none w-100 rounded" + (Object.keys(formErrors).every(key => formErrors[key] === "") ? " button-50-gray-red" : " button-50-gray-red--disabled")}>
						Register
					</button>
				</form>
			</div>
		</div>
	)
}

export default RegistrationForm;