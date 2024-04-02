"use client";
import Link from "next/link";
import "../styles/menu.css";
import { MenuProps } from "../utils/types";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Menu: React.FC<MenuProps> = (props: MenuProps) => {
	const pathname = usePathname();
	// Render nav/dropdown menu
	return (
		<div className="menu-container" data-testid="menu-container">
			<div className="menu-head-container">
				<Link href="/">
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
						src="/images/ur-tru-image-logo.png"
					/>
				</Link>
				<div className="close-button-container">
					<label htmlFor="close-menu-button">
						<button
							type="button"
							data-testid="close-menu-button"
							id="close-menu-button"
							onClick={props.close}
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

			<div className="menu-links">
				<ul>
					<Link href="/">
						<li>Feed</li>
					</Link>
					<Link href="/artists">
						<li>Artists</li>
					</Link>

					<Link href="/about">
						<li>About</li>
					</Link>
					{pathname === "/" && (
						<a>
							<li onClick={props.search}>Search</li>
						</a>
					)}
				</ul>
			</div>
		</div>
	);
};
export default Menu;
