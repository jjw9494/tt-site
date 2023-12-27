"use client";
import { useState, useEffect } from "react";
import "../styles/filter.css";
import { FilterProps } from "../utils/types";
import Image from "next/image";

const Filter: React.FC<FilterProps> = ({ close, filterFunc }) => {
	//String  values which will be checked against the below checkedState values and return an array to filter
	const filterValues = [
		"releases,",
		"video,",
		"editorial,",
		"events,",
		"radio,",
		"",
	];

	const [checkedState, setCheckedState] = useState([
		false,
		false,
		false,
		false,
		false,
		true,
	]);

	// Filters which will be returned
	const [filters, setFilters] = useState("");

	// Toggles all other checkboxes to false if See All is clicked
	const handleAll = () => {
		setCheckedState([false, false, false, false, false, true]);
		setFilters("");
	};

	const handleOnChange = (position: number) => {
		//Maps through the state and toggles clicked checkboxes true/false
		const updatedCheckedState = checkedState.map((item, index) =>
			index === position ? !item : item
		);

		// Once any other checkboxes are checked set the See All state to false
		updatedCheckedState[5] = false;

		// Updates checkedState to reflect the changes above
		setCheckedState(updatedCheckedState);

		// Returns a string with the values from filterValue if they are true against the values in checkedState
		const filteredArray = updatedCheckedState.reduce(
			(sum, currentState, index) => {
				if (currentState === true) {
					return sum + filterValues[index];
				}
				return sum;
			},
			"$,"
		);

		// Sets filters as a string with the above filteredArray values
		setFilters(filteredArray);
	};

	// Filters sent up to the Feed component to be filtered and mapped
	useEffect(() => {
		// Call filterFunc after the component has been rendered
		filterFunc(filters);
	}, [filterFunc, filters]);

	// console.log(checkedState);

	return (
		<div className="filter-container" data-testid="filter-container">
			{/* Container for the dropdown Logo/CLOSE button */}
			<div className="filter-head-container">
				{/* <svg fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M42.6 40.8312C42.5813 39.3326 42.5432 36.852 42.5322 36.5568C42.5221 36.2909 42.3444 31.9014 42.2052 31.9217C40.1306 32.2188 37.8441 32.0712 35.7152 32.4716C35.9087 35.3482 36.0426 38.1764 36.1473 40.9804C36.1473 40.9804 42.6 40.8391 42.6 40.8312ZM22.437 6.47067C21.0203 6.56476 19.4693 6.50571 18.0727 6.82617C18.2321 7.05491 18.4667 7.2801 18.6515 7.49978C20.0488 9.16115 21.3624 10.8887 22.8061 12.5099L22.437 6.47067ZM34.0597 30.9611C33.7562 30.5985 33.4591 30.2306 33.1596 29.8648C32.5872 29.1655 32.0172 28.4642 31.4405 27.7681C30.6219 26.7808 29.7945 25.8015 28.9573 24.8298C28.1037 23.8394 27.3881 22.6217 26.1355 22.138C24.9124 21.6656 23.8715 21.2378 22.5608 21.0689C22.0835 21.0074 21.5919 20.9263 21.1548 20.7142C20.6289 20.4594 20.4241 20.0389 20.0307 19.6371C19.6655 19.2641 19.4141 18.8611 19.0836 18.4685C18.763 18.0879 18.4313 17.7169 18.1123 17.3351C17.4647 16.5591 16.8283 15.7603 16.1732 14.982C14.3041 12.7602 12.3921 10.5704 10.6781 8.22327L10.3273 7.76479C10.3798 10.1658 10.6355 13.0713 10.7843 15.8698C11.8244 17.0947 12.8618 18.3224 13.8841 19.5624C14.3697 20.1519 14.8435 20.7518 15.3299 21.3405C15.7197 21.8125 15.8605 22.186 16.4735 22.414C16.9039 22.5741 17.1974 22.6708 17.6533 22.7255C19.1504 22.906 20.6953 23.0997 22.1595 24.2116C22.6058 24.5499 22.8981 24.9101 23.2625 25.3259C23.6388 25.7556 23.9753 26.2069 24.3651 26.6326C25.7998 28.3192 27.2155 30.0222 28.6124 31.7403C29.1299 32.3765 29.6446 33.0151 30.1593 33.6537C30.8586 34.5208 31.5578 35.3882 32.2571 36.2557C32.7992 36.9282 33.3414 37.6004 33.8835 38.2729C34.306 38.7969 34.7884 39.3696 35.2848 40.1177L35.2845 39.1567C35.2471 38.5241 35.2236 37.8899 35.185 37.2585C35.0748 35.4725 35.0478 33.6537 34.8481 31.8793L34.0597 30.9611ZM6.55546 15.9608C7.99306 15.8495 8.05377 15.9119 9.87586 15.7253C9.98561 15.7142 9.63263 12.3016 9.6124 11.9937C9.55791 11.1694 9.51316 10.3443 9.47696 9.51919C9.447 8.82975 9.45089 8.14986 9.39446 7.33351C8.30089 7.32993 7.16257 7.4262 6.02424 7.52606C6.11842 10.1959 6.2737 13.2648 6.55546 15.9608ZM4.29339 6.71368C3.97276 6.39835 3.6635 6.07161 3.35266 5.74644C3.01636 5.3949 2.67887 5.04415 2.32414 4.7111C2.12306 4.52254 1.75461 4.17808 1.29091 3.88244C1.29052 4.58868 1.36382 5.35947 1.42536 6.07082C1.58959 7.96829 1.66054 9.85591 1.72129 11.7601L2.81841 12.8104C3.31151 13.2147 3.77285 13.6583 4.19657 14.1358C4.36512 14.326 4.52857 14.522 4.71632 14.6937C4.86684 14.8314 4.98639 14.9834 5.14082 15.1113C5.26429 15.2141 5.36425 15.3609 5.59394 15.5294C5.52574 15.5479 5.26155 11.8738 5.25097 11.5644C5.22 10.6421 5.15572 9.72128 5.09261 8.80089C5.06517 8.3962 5.05851 8.04899 5.05851 7.43487L4.29339 6.71368ZM43.2846 33.3444C43.2989 34.4036 43.2989 34.4036 43.3686 35.8702C43.471 38.0271 43.4858 39.5878 43.4236 41.5866C43.4236 41.5866 35.5809 41.8455 35.5785 41.8431C34.9658 41.2117 34.3263 40.3929 34.147 40.1576C33.4748 39.2753 32.7756 38.4129 32.1042 37.5293C31.8389 37.2568 31.603 36.9571 31.3671 36.6582C29.6133 34.438 27.8307 32.2411 26.0198 30.0678C25.1142 28.9814 24.2014 27.9005 23.2818 26.8261C22.4579 25.8629 21.7208 24.7276 20.5605 24.1674C19.6553 23.7308 18.6537 23.5811 17.6703 23.4399C17.2675 23.3818 16.8667 23.3094 16.4663 23.237C16.0914 23.1693 15.669 23.1465 15.361 22.9068C15.2001 22.7812 15.0873 22.6051 14.9742 22.4342C14.3606 21.5066 13.6167 20.7199 12.9011 19.8796C12.1043 18.9436 11.3405 17.9784 10.5699 17.0204C10.4811 16.9103 10.3074 16.7871 10.2428 16.6694C8.71166 16.8479 7.26416 16.8467 5.75172 16.9904C3.92891 15.232 2.43679 13.6478 0.636292 11.9767C0.447436 8.51203 0.240651 5.0746 0 1.99651C0.42353 1.94609 0.813194 1.9741 1.24669 1.94889C1.72719 1.92088 2.2073 1.89327 2.6878 1.86526L5.57004 1.69799C7.49166 1.58674 9.41329 1.47509 11.3345 1.36345C11.8608 1.33063 18.1751 0.862839 18.1751 0.862839C18.1751 0.862839 18.4712 1.22099 18.7584 1.51031C19.0457 1.79963 19.3617 2.04933 19.6561 2.32465C20.6609 3.26424 21.5291 4.18342 22.5057 5.15023C22.5204 5.16503 22.5348 5.18104 22.5475 5.19785L23.1499 5.98458L23.2005 7.52362C23.2288 8.2083 23.2631 8.89259 23.3045 9.57687C23.3444 10.2323 23.391 10.8878 23.446 11.5425C23.4838 11.9955 23.4089 12.7114 23.6647 13.1063C23.7994 13.3144 24.0321 13.5101 24.1906 13.7314C24.3492 13.9535 24.5094 14.1744 24.6843 14.3837L27.1924 17.3857C27.396 17.629 27.6048 17.8775 27.8769 18.0404C28.3638 18.3321 28.9666 18.3053 29.5304 18.3645C30.4751 18.4634 31.3703 18.8223 32.2517 19.1781C33.2417 19.5774 33.9083 20.048 34.5996 20.8572C35.1781 21.5343 35.7726 22.1973 36.3443 22.8808C36.8762 23.5175 37.399 24.1614 37.9217 24.8052C39.3883 26.612 40.8486 28.4215 42.3303 30.2155L43.1124 31.4056L43.2846 33.3444ZM64.5455 36.9909L65.0673 38.1111L66.8687 41.4118L67.0121 37.5747L69.3775 31.9241C69.3775 31.9241 69.7091 31.3186 69.7091 30.8868C69.7091 30.4555 69.2471 29.9807 69.2471 29.9807C68.7647 29.4486 68.2822 28.9161 67.7998 28.3836C67.4768 28.0274 67.1275 27.6193 66.6702 27.1765L66.7584 30.4555C66.7734 30.6526 66.777 30.8517 66.7722 31.0496C66.7636 31.4043 66.7864 31.6772 66.6734 32.0146L64.5455 36.9909ZM66.2667 31.4971C66.265 31.2484 66.2671 30.5644 66.2654 30.3153C66.2617 29.6976 66.258 29.0796 66.2543 28.4619L66.2025 26.3138L65.4812 26.3263L62.7117 26.4968C62.6304 26.5147 62.8005 28.7369 62.8079 28.9237C62.8457 29.8434 62.8831 30.7632 62.9209 31.683C62.9456 32.2909 62.9949 32.9511 62.7232 33.5282C62.4458 34.1171 62.5457 33.8364 61.9398 35.1527C61.8379 35.3747 61.6476 35.6695 61.5333 35.9263C61.5333 35.9263 64.2559 36.2357 64.2564 36.2353L66.2667 31.4971ZM49.7295 35.3726C51.3642 35.2903 52.526 35.295 54.2182 35.1091C52.8778 33.1434 50.9709 31.1065 49.4848 29.3334L49.7295 35.3726ZM61.304 34.4277C61.4046 34.218 61.5697 33.933 61.653 33.7165C61.8141 33.2984 61.9824 33.0386 61.9619 32.5768C61.8778 30.6489 61.8153 28.7083 61.7828 26.778C60.965 25.5822 60.6753 24.9139 60.0086 24.0732C59.2088 23.0646 58.3958 22.0676 57.5768 21.0746C57.2519 20.6806 56.9265 20.2861 56.6012 19.892C56.4746 19.7381 56.3475 19.5841 56.2209 19.4306C56.0066 19.1708 55.7926 18.9111 55.5774 18.6521C54.9103 17.8491 54.2487 17.0369 53.5652 16.25C53.0595 15.6675 52.5546 15.0838 52.0586 14.4933C51.6335 13.9874 51.1603 13.5364 50.6053 13.1544C50.3409 12.972 50.0163 12.7419 49.7078 12.63C49.2502 12.4645 48.8263 12.3927 48.3531 12.2612C47.8205 12.1137 47.2688 12.058 46.7235 11.977C46.2623 11.9088 45.7847 11.8443 45.3583 11.6434C45.1436 11.542 44.9444 11.4073 44.7834 11.2313C43.6366 9.97697 42.5884 8.61637 41.5045 7.30428C40.6799 6.30608 39.8309 5.28022 39.0095 4.26037C38.3227 3.40729 37.6451 2.58548 37.008 1.72558C37.0016 1.79694 37.0121 2.12927 37.0205 2.20464L37.1503 4.3173C37.2641 5.80818 37.355 7.30508 37.3639 8.80078L37.4496 10.1273C37.8367 10.6709 38.743 11.4647 39.1649 11.9766C39.4158 12.2804 39.6442 12.6024 39.9094 12.8942C40.0456 13.0437 40.1955 13.2125 40.3666 13.3231C40.5249 13.4258 40.702 13.5059 41.077 13.5685C42.0779 13.631 42.4678 13.7473 43.2503 13.9237C44.0108 14.0948 44.704 14.4556 45.4313 14.7218C46.9234 15.2682 47.6967 16.6385 48.6684 17.785C49.9077 19.2478 51.1402 20.7162 52.3651 22.1911C53.582 23.6563 54.7889 25.1296 55.9913 26.6064C57.1361 28.0127 58.3834 29.3817 59.428 30.8638C59.8816 31.5076 60.2759 32.1931 60.604 32.9091C60.8757 33.502 60.9362 34.2906 60.9787 34.9412L61.304 34.4277ZM36.4906 7.47034L36.1085 0.862839C33.9921 1.03329 31.7489 1.03935 29.6951 1.34712C29.6808 1.83827 29.703 2.37062 29.7655 3.32222L30.2316 9.92164C32.3152 9.90872 34.3849 9.75806 36.5758 9.50804L36.4906 7.47034ZM29.2352 0.537179C29.4704 0.508261 29.706 0.482155 29.942 0.458458C30.3976 0.413074 30.8548 0.376525 31.3116 0.345198C32.2216 0.282944 33.1328 0.241978 34.0432 0.190569C34.8668 0.144381 35.6905 0.0909633 36.5105 0.000194071C36.6185 -0.0114533 37.3417 1.02034 37.4505 1.14927C40.1697 4.37198 42.3537 7.35853 45.1245 10.5351C45.2357 10.6628 45.3481 10.7917 45.4841 10.8921C45.6985 11.0499 45.9593 11.1295 46.2177 11.1913C47.5493 11.5106 48.795 11.5166 50.0726 12.044C50.521 12.2291 51.0122 12.544 51.8106 13.1549C52.3118 13.5389 52.7378 14.1534 53.1478 14.6289C53.6454 15.2057 54.1394 15.7856 54.631 16.3672C55.6146 17.5315 56.589 18.7035 57.5638 19.8746C58.3862 20.8627 59.2306 21.8338 59.9994 22.8648C60.3778 23.3721 60.717 23.7817 61.0655 24.3107C61.3063 24.6762 61.5559 25.1148 62.0527 25.9048L66.6887 25.6694C67.1747 26.2434 67.1723 26.31 67.4399 26.5799C67.7755 26.9185 68.0827 27.29 68.4083 27.6386C68.8663 28.1298 69.3287 28.617 69.8063 29.0893C70.8583 30.13 70.9835 30.6943 70.9835 30.6943C71.0459 31.0702 70.9191 31.3778 70.8031 31.6654C70.4811 32.4618 70.1683 33.1908 69.8031 33.9712L68.1191 38.1209L68.0491 39.9093C67.9943 41.8195 68.0075 43.1457 68.0075 43.1457L59.9322 43.6469C58.3146 43.7546 56.6958 43.8502 55.0766 43.9341C53.5338 44.0136 51.7614 44.0136 50.3622 43.9739C50.073 43.9659 50.1162 43.3461 50.1014 43.1501C50.067 42.6919 50.0398 42.2328 50.0206 41.7733C49.9838 40.8938 49.9682 40.0102 49.9946 39.1298C50.0142 38.4771 50.1582 37.7128 49.7278 37.1545C49.4018 36.7308 48.827 36.491 48.8302 36.2256C48.8302 36.2256 48.8222 36.0247 48.8246 35.2861C48.8282 34.1644 48.7862 33.0438 48.7194 31.9245C48.6862 31.3642 48.6454 30.8043 48.6182 30.2436C48.5958 29.7846 48.6566 29.2918 48.4714 28.8584C48.3838 28.6524 47.9657 28.1997 47.8281 28.0278C45.4965 25.1132 43.4757 22.4644 41.0025 19.6686C40.3361 18.9155 39.6413 17.9127 38.6889 17.511C37.8597 17.1616 37.0085 16.8656 36.1417 16.6258C35.3317 16.4017 34.4728 16.4013 33.6764 16.1178C33.5628 16.0772 33.4524 16.0262 33.3472 15.9659C33.0624 15.8021 32.9656 15.5571 32.7768 15.3073C32.4464 14.8695 32.1088 14.4373 31.7644 14.0108C31.2972 13.4328 30.8176 12.8653 30.3256 12.3087L29.098 10.6632L28.9336 8.58552C28.8952 7.7943 28.8296 6.81552 28.7856 6.0243C28.732 5.05717 28.5932 3.91974 28.536 2.9526L28.4 0.625538L29.2352 0.537179Z"
						fill="white"
					/>
				</svg> */}
				<Image
					className="yti-logo-menu"
					width="70"
					height="70"
					alt="Ur Tru Image Logo"
					src="/images/Ur Tru Image Logo See through v2.png"
				/>
				<div className="close-button-container">
					<label htmlFor="close-filter-button">
						<button
							type="button"
							data-testid="close-filter-button"
							id="close-filter-button"
							onClick={close}
						>
							CLOSE
						</button>
					</label>

					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="white"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect
							x="0.5"
							y="0.5"
							width="11"
							height="11"
							rx="5.5"
							stroke="white"
						/>
					</svg>
				</div>
			</div>

			{/* Filter list and checkboxes below, issues with the SVG's has meant we haven't been able to map the array so we have hard-coded below */}
			{/* classNames and SVG fills are toggled in line with checkedState[x] value */}
			<div className="filter-links">
				<ul>
					<li
						value="releases"
						key={0}
						className={checkedState[0] ? "checked-box" : "unchecked-box"}
					>
						<label htmlFor="releases" onClick={() => handleOnChange(0)}>
							<span>
								<svg
									className={
										checkedState[0]
											? "checked-svg releases-svg"
											: "releases-svg"
									}
									width="6"
									height="11"
									viewBox="0 0 6 11"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1.09235 10.7018C2.50132 10.7018 3.49868 9.6095 3.49868 8.08971V3.27704C4.41689 3.40369 5.17678 4.65435 5.17678 6.01583C5.17678 6.83905 5.0343 7.48813 4.65435 8.37467H5.09763C5.68338 7.64644 6 6.75989 6 5.81003C6 4.55937 5.5409 3.40369 4.55937 2.24802L3.73615 1.25066C3.70449 1.23483 3.62533 1.12401 3.49868 0.965699V0H2.77045V8.08971C2.51715 7.97889 2.1847 7.91557 1.91557 7.91557C0.902375 7.91557 0 8.78628 0 9.73615C0 10.3377 0.41161 10.7018 1.09235 10.7018Z"
										fill="white"
									/>
								</svg>

								<span>Releases</span>

								<svg
									className="checkbox"
									width="22"
									height="22"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect x="1" y="1" width="20" height="20" stroke="white" />
									<rect
										className="checked-box"
										x="6"
										y="6"
										width="10"
										height="10"
										fill={checkedState[0] ? "white" : "none"}
									/>
								</svg>
								<input
									className="checkboxes"
									type="checkbox"
									name="releases"
									id={"0"}
									// checked={checkedState[0]}
								></input>
							</span>
						</label>
					</li>
					<li
						value="video"
						key={1}
						className={checkedState[1] ? "checked-box" : "x"}
					>
						<label htmlFor="video" onClick={() => handleOnChange(1)}>
							<span>
								<svg
									className={
										checkedState[1] ? "checked-svg video-svg" : "video-svg"
									}
									width="11"
									height="13"
									viewBox="0 0 11 13"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M0 12.698L11 6.34899L0 0V12.698Z" fill="white" />
								</svg>
								<span>Video</span>

								<svg
									className="checkbox"
									width="22"
									height="22"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect x="1" y="1" width="20" height="20" stroke="white" />
									<rect
										className="checked-box"
										x="6"
										y="6"
										width="10"
										height="10"
										fill={checkedState[1] ? "white" : "none"}
									/>
								</svg>
								<input
									className="checkboxes"
									type="checkbox"
									name="video"
									id={"1"}
									// checked={checkedState[1]}
								></input>
							</span>
						</label>
					</li>
					<li
						value="editorial"
						key={2}
						className={checkedState[2] ? "checked-box" : "x"}
					>
						<label htmlFor="editorial" onClick={() => handleOnChange(2)}>
							<span>
								<svg
									className={
										checkedState[2]
											? "checked-svg editorial-svg"
											: "editorial-svg"
									}
									width="11"
									height="12"
									viewBox="0 0 11 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M6.05994 3.70504L4.96099 3.71551L4.97146 0.0104662L6.07041 0L6.05994 3.70504ZM11 6.03901L7.26356 6.04948L7.27402 4.92959L11 4.91912V6.03901ZM0.0104662 6.05994L3.70504 6.04948V4.94006L0 4.95052L0.0104662 6.05994ZM6.05994 7.37869L6.07041 11.1047H4.95052L4.96099 7.37869H6.05994Z"
										fill="white"
									/>
								</svg>
								<span>Editorial</span>

								<svg
									className="checkbox"
									width="22"
									height="22"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect x="1" y="1" width="20" height="20" stroke="white" />
									<rect
										className="checked-box"
										x="6"
										y="6"
										width="10"
										height="10"
										fill={checkedState[2] ? "white" : "none"}
									/>
								</svg>
								<input
									className="checkboxes"
									type="checkbox"
									name="editorial"
									id={"2"}
									// checked={checkedState[2]}
								></input>
							</span>
						</label>
					</li>
					<li
						value="events"
						key={3}
						className={checkedState[3] ? "checked-box" : "x"}
					>
						<label htmlFor="events" onClick={() => handleOnChange(3)}>
							<span>
								<svg
									className={
										checkedState[3] ? "checked-svg events-svg" : "events-svg"
									}
									width="11"
									height="11"
									viewBox="0 0 11 11"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M11 5.5C11 8.54394 8.54394 11 5.5 11C2.45606 11 0 8.54394 0 5.5C0 2.45606 2.45606 0 5.5 0C8.55701 0 11 2.44299 11 5.5ZM2.83492 9.88955C3.67102 10.386 4.28504 10.5689 5.5 10.6342V0.365796C4.72922 0.404988 4.36342 0.457245 3.9323 0.60095C1.78979 1.30641 0.365796 3.26603 0.365796 5.5C0.365796 7.28979 1.29335 8.94893 2.83492 9.88955Z"
										fill="white"
									/>
								</svg>
								<span>Events</span>

								<svg
									className="checkbox"
									width="22"
									height="22"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect x="1" y="1" width="20" height="20" stroke="white" />
									<rect
										className="checked-box"
										x="6"
										y="6"
										width="10"
										height="10"
										fill={checkedState[3] ? "white" : "none"}
									/>
								</svg>
								<input
									className="checkboxes"
									// onChange={() => handleOnChange(3)}
									type="checkbox"
									name="events"
									id={"3"}
									// checked={checkedState[3]}
								></input>
							</span>
						</label>
					</li>
					<li
						value="radio"
						key={4}
						className={checkedState[4] ? "checked-box" : "x"}
					>
						<label htmlFor="radio" onClick={() => handleOnChange(4)}>
							<span>
								<svg
									className={
										checkedState[4] ? "checked-svg radio-svg" : "radio-svg"
									}
									width="11"
									height="9"
									viewBox="0 0 11 9"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M0.0256709 2.65694C1.19798 1.76702 2.17775 1.32205 2.96499 1.32205C3.52975 1.32205 4.21859 1.48891 5.03151 1.82264C5.90432 2.17347 6.514 2.39382 6.86056 2.48366C7.20712 2.57351 7.61143 2.61844 8.07351 2.61844C8.65539 2.61844 9.141 2.54142 9.53034 2.3874C9.91968 2.23337 10.4096 1.9296 11 1.47608L10.9872 0C9.90899 0.889926 8.94632 1.33489 8.09918 1.33489C7.55154 1.33489 7.05951 1.24932 6.6231 1.07818L5.08285 0.462077C4.2956 0.154026 3.51692 0 2.74679 0C1.94243 0 1.03539 0.372229 0.0256709 1.11669V2.65694ZM0.0256709 5.71179C0.650331 5.18125 1.17445 4.81544 1.59802 4.61435C2.02159 4.41326 2.4858 4.31272 2.99067 4.31272C3.641 4.31272 4.28277 4.44535 4.91599 4.71062L6.34072 5.30105C6.89693 5.53209 7.50875 5.64761 8.1762 5.64761C8.99767 5.64761 9.93466 5.28394 10.9872 4.55659V3.02917C10.3967 3.53403 9.89829 3.87631 9.49183 4.05601C9.08537 4.23571 8.59977 4.32555 8.03501 4.32555C7.4788 4.32555 6.9611 4.22287 6.48191 4.0175L4.92882 3.36289C4.32128 3.10618 3.65383 2.97783 2.92649 2.97783C2.11357 2.97783 1.14236 3.35862 0.0128355 4.12019L0.0256709 5.71179ZM10.9743 7.71412C9.81914 8.41579 8.83508 8.76663 8.02217 8.76663C7.32905 8.76663 6.73862 8.64255 6.25087 8.3944L4.87748 7.70128C4.31272 7.41035 3.72657 7.26488 3.11902 7.26488C2.23765 7.26488 1.20226 7.75263 0.0128355 8.72812L0 7.14936C1.13808 6.33644 2.11785 5.92999 2.93932 5.92999C3.68378 5.92999 4.34267 6.06262 4.91599 6.32789L6.32789 6.99533C6.99533 7.30338 7.57293 7.45741 8.06068 7.45741C8.86503 7.45741 9.83625 6.99533 10.9743 6.07118V7.71412Z"
										fill="white"
									/>
								</svg>
								<span>Radio</span>
								<svg
									className="checkbox"
									width="22"
									height="22"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect x="1" y="1" width="20" height="20" stroke="white" />
									<rect
										className="checked-box"
										x="6"
										y="6"
										width="10"
										height="10"
										fill={checkedState[4] ? "white" : "none"}
									/>
								</svg>
								<input
									className="checkboxes"
									type="checkbox"
									name="radio"
									id={"4"}
									// checked={checkedState[4]}
								></input>
							</span>
						</label>
					</li>
					<li
						value=""
						key={5}
						className={checkedState[5] ? "checked-box" : "x"}
					>
						<label htmlFor="all" onClick={() => handleAll()}>
							<span>
								<svg
									className={
										checkedState[5] ? "checked-svg see-all-svg" : "see-all-svg"
									}
									width="11"
									height="11"
									viewBox="0 0 11 11"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M5.79198 2.09136L6.00247 0H4.99753L5.20802 2.09136C5.28951 2.04156 5.38683 2.01667 5.5 2.01667C5.61317 2.01667 5.71049 2.04156 5.79198 2.09136ZM6.05 2.70247L8.10741 2.25432L7.79506 1.29691L5.86667 2.14568C5.99794 2.26337 6.06358 2.41502 6.06358 2.60062C6.06358 2.61872 6.05905 2.65267 6.05 2.70247ZM4.93642 2.60062C4.93642 2.61872 4.94095 2.65267 4.95 2.70247L2.89259 2.25432L3.20494 1.29691L5.13333 2.14568C5.00206 2.25885 4.93642 2.41049 4.93642 2.60062ZM6.60679 4.95L7.4216 4.35926L6.02284 2.79074C5.9323 2.99444 5.77387 3.10988 5.54753 3.13704L6.60679 4.95ZM5.45247 3.13704L4.39321 4.95L3.5784 4.35926L4.98395 2.79074C5.06996 2.99444 5.22613 3.10988 5.45247 3.13704ZM2.89938 7.3537L3.10988 5.26235H2.10494L2.31543 7.3537C2.39691 7.30844 2.49424 7.2858 2.60741 7.2858C2.72058 7.2858 2.8179 7.30844 2.89938 7.3537ZM8.89506 5.26235L8.68457 7.3537C8.60309 7.30844 8.50576 7.2858 8.39259 7.2858C8.27942 7.2858 8.1821 7.30844 8.10062 7.3537L7.89012 5.26235H8.89506ZM3.15741 7.96482L5.21482 7.52346L4.90247 6.56605L2.97407 7.40802C3.10535 7.52572 3.17099 7.67963 3.17099 7.86975C3.17099 7.88333 3.16646 7.91502 3.15741 7.96482ZM2.04383 7.86296C2.04383 7.88107 2.04835 7.91502 2.05741 7.96482L0 7.52346L0.312346 6.56605L2.24074 7.40802C2.10947 7.52572 2.04383 7.67737 2.04383 7.86296ZM8.94259 7.96482L11 7.52346L10.6877 6.56605L8.75926 7.40802C8.89054 7.52572 8.95617 7.67963 8.95617 7.86975C8.95617 7.88333 8.95165 7.91502 8.94259 7.96482ZM7.82901 7.86296C7.82901 7.88107 7.83354 7.91502 7.84259 7.96482L5.79198 7.52346L6.09753 6.56605L8.02593 7.40802C7.89465 7.52572 7.82901 7.67737 7.82901 7.86296ZM3.7142 10.2191L4.52901 9.6284L3.13025 8.05309C3.03971 8.26132 2.88128 8.37675 2.65494 8.39938L3.7142 10.2191ZM2.55988 8.39938L1.50062 10.2191L0.685802 9.6284L2.08457 8.05309C2.1751 8.25679 2.33354 8.37222 2.55988 8.39938ZM9.49938 10.2191L10.3142 9.6284L8.91543 8.05309C8.8249 8.26132 8.66646 8.37675 8.44012 8.39938L9.49938 10.2191ZM8.34506 8.39938L7.2858 10.2191L6.47099 9.6284L7.87654 8.05309C7.96255 8.25679 8.11872 8.37222 8.34506 8.39938Z"
										fill="white"
									/>
								</svg>
								<span>See All</span>
								<svg
									className="checkbox"
									width="22"
									height="22"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect x="1" y="1" width="20" height="20" stroke="white" />
									<rect
										className="checked-box"
										x="6"
										y="6"
										width="10"
										height="10"
										fill={checkedState[5] ? "white" : "none"}
									/>
								</svg>
								<input
									className="checkboxes"
									type="checkbox"
									name="all"
									id={"5"}
									// checked={checkedState[5]}
								></input>
							</span>
						</label>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Filter;
