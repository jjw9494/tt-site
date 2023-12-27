import { useState, useEffect } from "react";
import "../styles/Feed.css";
import Masonry from "react-masonry-css";
import { feedProps, TFeedObject } from "../utils/types";
import { request } from "graphql-request";
import { useSearchParams } from "next/navigation";

// searchValue and filterValue are the values returned from the search and filter functions
const Feed: React.FC<feedProps> = ({ filterValue }) => {
	const [db, setDb] = useState<TFeedObject[]>([]);

	// Fetch data from GraphQL server
	useEffect(() => {
		const fetchFeed = async () => {
			try {
				const response: { tFeedObjects: TFeedObject[] } = await request(
					"https://api-eu-west-2.hygraph.com/v2/clolirkf98got01t7dvsr8g2j/master",
					`
			  query TFeedObjects {
				tFeedObjects {
				  contentType
				  createdAt
				  dateAdded
				  eyebrowHeader
				  id
				  contentImage {
					id
					fileName
					url
				  }
				  imageDescription
				  linkTitle
				  linkUrl
				  mainTitle
				  publishedAt
				  subheading
				  updatedAt
				}
			  }
			`
				);
				const TFeedObjects = response.tFeedObjects;
				setDb(TFeedObjects);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchFeed();
	}, []);

	// Get the Correct Event SVG widget in relation to the Content Type
	function getEventImageUrl(eventType: string) {
		switch (eventType) {
			case "radio":
				return (
					<svg
						width="68"
						height="24"
						viewBox="0 0 68 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clipPath="url(#clip0_331_1251)">
							<rect x="24" width="44" height="24" fill="#111111" />
							<path
								d="M25.4091 18V6.36364H29.3409C30.25 6.36364 30.9962 6.51894 31.5795 6.82955C32.1629 7.13636 32.5947 7.55871 32.875 8.09659C33.1553 8.63447 33.2955 9.24621 33.2955 9.93182C33.2955 10.6174 33.1553 11.2254 32.875 11.7557C32.5947 12.286 32.1648 12.7027 31.5852 13.0057C31.0057 13.3049 30.2652 13.4545 29.3636 13.4545H26.1818V12.1818H29.3182C29.9394 12.1818 30.4394 12.0909 30.8182 11.9091C31.2008 11.7273 31.4773 11.4697 31.6477 11.1364C31.822 10.7992 31.9091 10.3977 31.9091 9.93182C31.9091 9.46591 31.822 9.05871 31.6477 8.71023C31.4735 8.36174 31.1951 8.0928 30.8125 7.90341C30.4299 7.71023 29.9242 7.61364 29.2955 7.61364H26.8182V18H25.4091ZM30.8864 12.7727L33.75 18H32.1136L29.2955 12.7727H30.8864ZM37.5498 18.2045C36.9968 18.2045 36.4949 18.1004 36.0441 17.892C35.5934 17.6799 35.2354 17.375 34.9703 16.9773C34.7051 16.5758 34.5726 16.0909 34.5726 15.5227C34.5726 15.0227 34.671 14.6174 34.868 14.3068C35.065 13.9924 35.3282 13.7462 35.6578 13.5682C35.9873 13.3902 36.351 13.2576 36.7487 13.1705C37.1502 13.0795 37.5536 13.0076 37.9589 12.9545C38.4892 12.8864 38.9191 12.8352 39.2487 12.8011C39.582 12.7633 39.8245 12.7008 39.976 12.6136C40.1313 12.5265 40.2089 12.375 40.2089 12.1591V12.1136C40.2089 11.553 40.0555 11.1174 39.7487 10.8068C39.4457 10.4962 38.9854 10.3409 38.368 10.3409C37.7279 10.3409 37.226 10.4811 36.8623 10.7614C36.4987 11.0417 36.243 11.3409 36.0953 11.6591L34.8226 11.2045C35.0498 10.6742 35.3529 10.2614 35.7316 9.96591C36.1142 9.66667 36.5309 9.45833 36.9816 9.34091C37.4362 9.2197 37.8832 9.15909 38.3226 9.15909C38.6029 9.15909 38.9248 9.19318 39.2885 9.26136C39.6559 9.32576 40.0101 9.46023 40.351 9.66477C40.6957 9.86932 40.9816 10.178 41.2089 10.5909C41.4362 11.0038 41.5498 11.5568 41.5498 12.25V18H40.2089V16.8182H40.1407C40.0498 17.0076 39.8983 17.2102 39.6862 17.4261C39.4741 17.642 39.1919 17.8258 38.8396 17.9773C38.4873 18.1288 38.0574 18.2045 37.5498 18.2045ZM37.7544 17C38.2847 17 38.7316 16.8958 39.0953 16.6875C39.4627 16.4792 39.7392 16.2102 39.9248 15.8807C40.1142 15.5511 40.2089 15.2045 40.2089 14.8409V13.6136C40.1521 13.6818 40.0271 13.7443 39.8339 13.8011C39.6445 13.8542 39.4248 13.9015 39.1748 13.9432C38.9286 13.9811 38.6881 14.0152 38.4532 14.0455C38.2222 14.072 38.0347 14.0947 37.8907 14.1136C37.5423 14.1591 37.2165 14.233 36.9135 14.3352C36.6142 14.4337 36.3718 14.5833 36.1862 14.7841C36.0044 14.9811 35.9135 15.25 35.9135 15.5909C35.9135 16.0568 36.0858 16.4091 36.4305 16.6477C36.779 16.8826 37.2203 17 37.7544 17ZM46.8127 18.1818C46.0855 18.1818 45.4434 17.9981 44.8866 17.6307C44.3298 17.2595 43.8942 16.7367 43.5798 16.0625C43.2654 15.3845 43.1082 14.5833 43.1082 13.6591C43.1082 12.7424 43.2654 11.947 43.5798 11.2727C43.8942 10.5985 44.3317 10.0777 44.8923 9.71023C45.4529 9.3428 46.1006 9.15909 46.8355 9.15909C47.4036 9.15909 47.8525 9.25379 48.182 9.44318C48.5154 9.62879 48.7692 9.84091 48.9434 10.0795C49.1214 10.3144 49.2597 10.5076 49.3582 10.6591H49.4718V6.36364H50.8127V18H49.5173V16.6591H49.3582C49.2597 16.8182 49.1195 17.0189 48.9377 17.2614C48.7559 17.5 48.4964 17.714 48.1593 17.9034C47.8222 18.089 47.3733 18.1818 46.8127 18.1818ZM46.9945 16.9773C47.5324 16.9773 47.987 16.8371 48.3582 16.5568C48.7294 16.2727 49.0116 15.8807 49.2048 15.3807C49.398 14.8769 49.4945 14.2955 49.4945 13.6364C49.4945 12.9848 49.3998 12.4148 49.2105 11.9261C49.0211 11.4337 48.7408 11.0511 48.3695 10.7784C47.9983 10.5019 47.54 10.3636 46.9945 10.3636C46.4264 10.3636 45.9529 10.5095 45.5741 10.8011C45.1991 11.089 44.9169 11.4811 44.7275 11.9773C44.5419 12.4697 44.4491 13.0227 44.4491 13.6364C44.4491 14.2576 44.5438 14.822 44.7332 15.3295C44.9264 15.8333 45.2105 16.2348 45.5855 16.5341C45.9642 16.8295 46.4339 16.9773 46.9945 16.9773ZM52.9748 18V9.27273H54.3157V18H52.9748ZM53.6566 7.81818C53.3952 7.81818 53.1698 7.72917 52.9805 7.55114C52.7948 7.37311 52.702 7.15909 52.702 6.90909C52.702 6.65909 52.7948 6.44508 52.9805 6.26705C53.1698 6.08902 53.3952 6 53.6566 6C53.918 6 54.1414 6.08902 54.327 6.26705C54.5164 6.44508 54.6111 6.65909 54.6111 6.90909C54.6111 7.15909 54.5164 7.37311 54.327 7.55114C54.1414 7.72917 53.918 7.81818 53.6566 7.81818ZM59.8371 18.1818C59.0492 18.1818 58.3579 17.9943 57.7632 17.6193C57.1723 17.2443 56.7102 16.7197 56.3769 16.0455C56.0473 15.3712 55.8826 14.5833 55.8826 13.6818C55.8826 12.7727 56.0473 11.9792 56.3769 11.3011C56.7102 10.6231 57.1723 10.0966 57.7632 9.72159C58.3579 9.34659 59.0492 9.15909 59.8371 9.15909C60.625 9.15909 61.3144 9.34659 61.9053 9.72159C62.5 10.0966 62.9621 10.6231 63.2916 11.3011C63.625 11.9792 63.7916 12.7727 63.7916 13.6818C63.7916 14.5833 63.625 15.3712 63.2916 16.0455C62.9621 16.7197 62.5 17.2443 61.9053 17.6193C61.3144 17.9943 60.625 18.1818 59.8371 18.1818ZM59.8371 16.9773C60.4356 16.9773 60.928 16.8239 61.3144 16.517C61.7007 16.2102 61.9867 15.8068 62.1723 15.3068C62.3579 14.8068 62.4507 14.2652 62.4507 13.6818C62.4507 13.0985 62.3579 12.5549 62.1723 12.0511C61.9867 11.5473 61.7007 11.1402 61.3144 10.8295C60.928 10.5189 60.4356 10.3636 59.8371 10.3636C59.2386 10.3636 58.7462 10.5189 58.3598 10.8295C57.9735 11.1402 57.6875 11.5473 57.5019 12.0511C57.3163 12.5549 57.2235 13.0985 57.2235 13.6818C57.2235 14.2652 57.3163 14.8068 57.5019 15.3068C57.6875 15.8068 57.9735 16.2102 58.3598 16.517C58.7462 16.8239 59.2386 16.9773 59.8371 16.9773Z"
								fill="white"
							/>
							<rect width="24" height="24" fill="#111111" />
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M6.02567 10.6569C7.19798 9.76702 8.17775 9.32205 8.96499 9.32205C9.52975 9.32205 10.2186 9.48891 11.0315 9.82264C11.9043 10.1735 12.514 10.3938 12.8606 10.4837C13.2071 10.5735 13.6114 10.6184 14.0735 10.6184C14.6554 10.6184 15.141 10.5414 15.5303 10.3874C15.9197 10.2334 16.4096 9.9296 17 9.47608L16.9872 8C15.909 8.88993 14.9463 9.33489 14.0992 9.33489C13.5515 9.33489 13.0595 9.24932 12.6231 9.07818L11.0828 8.46208C10.2956 8.15403 9.51692 8 8.74679 8C7.94243 8 7.03539 8.37223 6.02567 9.11669V10.6569ZM6.02567 13.7118C6.65033 13.1813 7.17445 12.8154 7.59802 12.6144C8.02159 12.4133 8.4858 12.3127 8.99067 12.3127C9.641 12.3127 10.2828 12.4454 10.916 12.7106L12.3407 13.3011C12.8969 13.5321 13.5088 13.6476 14.1762 13.6476C14.9977 13.6476 15.9347 13.2839 16.9872 12.5566V11.0292C16.3967 11.534 15.8983 11.8763 15.4918 12.056C15.0854 12.2357 14.5998 12.3256 14.035 12.3256C13.4788 12.3256 12.9611 12.2229 12.4819 12.0175L10.9288 11.3629C10.3213 11.1062 9.65383 10.9778 8.92649 10.9778C8.11357 10.9778 7.14236 11.3586 6.01284 12.1202L6.02567 13.7118ZM16.9743 15.7141C15.8191 16.4158 14.8351 16.7666 14.0222 16.7666C13.3291 16.7666 12.7386 16.6426 12.2509 16.3944L10.8775 15.7013C10.3127 15.4103 9.72657 15.2649 9.11902 15.2649C8.23765 15.2649 7.20226 15.7526 6.01284 16.7281L6 15.1494C7.13808 14.3364 8.11785 13.93 8.93932 13.93C9.68378 13.93 10.3427 14.0626 10.916 14.3279L12.3279 14.9953C12.9953 15.3034 13.5729 15.4574 14.0607 15.4574C14.865 15.4574 15.8363 14.9953 16.9743 14.0712V15.7141Z"
								fill="white"
							/>
						</g>
						<defs>
							<clipPath id="clip0_331_1251">
								<rect width="68" height="24" fill="white" />
							</clipPath>
						</defs>
					</svg>
				);
			case "events":
				return (
					<svg
						width="78"
						height="24"
						viewBox="0 0 78 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clipPath="url(#clip0_331_1263)">
							<rect x="24" width="54" height="24" fill="#111111" />
							<path
								d="M25.4091 18V6.36364H32.4318V7.61364H26.8182V11.5455H32.0682V12.7955H26.8182V16.75H32.5227V18H25.4091ZM41.4461 9.27273L38.2189 18H36.8552L33.628 9.27273H35.0825L37.4916 16.2273H37.5825L39.9916 9.27273H41.4461ZM46.0826 18.1818C45.2417 18.1818 44.5163 17.9962 43.9065 17.625C43.3004 17.25 42.8326 16.7273 42.5031 16.0568C42.1773 15.3826 42.0144 14.5985 42.0144 13.7045C42.0144 12.8106 42.1773 12.0227 42.5031 11.3409C42.8326 10.6553 43.2909 10.1212 43.8781 9.73864C44.469 9.35227 45.1584 9.15909 45.9463 9.15909C46.4008 9.15909 46.8497 9.23485 47.2928 9.38636C47.736 9.53788 48.1394 9.78409 48.5031 10.125C48.8667 10.4621 49.1565 10.9091 49.3724 11.4659C49.5883 12.0227 49.6963 12.7083 49.6963 13.5227V14.0909H42.969V12.9318H48.3326C48.3326 12.4394 48.2341 12 48.0372 11.6136C47.844 11.2273 47.5675 10.9223 47.2076 10.6989C46.8516 10.4754 46.4311 10.3636 45.9463 10.3636C45.4122 10.3636 44.95 10.4962 44.5599 10.7614C44.1735 11.0227 43.8762 11.3636 43.6678 11.7841C43.4595 12.2045 43.3553 12.6553 43.3553 13.1364V13.9091C43.3553 14.5682 43.469 15.1269 43.6963 15.5852C43.9273 16.0398 44.2474 16.3864 44.6565 16.625C45.0656 16.8598 45.5409 16.9773 46.0826 16.9773C46.4349 16.9773 46.7531 16.928 47.0372 16.8295C47.325 16.7273 47.5731 16.5758 47.7815 16.375C47.9898 16.1705 48.1508 15.9167 48.2644 15.6136L49.5599 15.9773C49.4235 16.4167 49.1944 16.803 48.8724 17.1364C48.5504 17.4659 48.1527 17.7235 47.6792 17.9091C47.2057 18.0909 46.6735 18.1818 46.0826 18.1818ZM52.5969 12.75V18H51.256V9.27273H52.5515V10.6364H52.6651C52.8697 10.1932 53.1803 9.83712 53.5969 9.56818C54.0136 9.29545 54.5515 9.15909 55.2106 9.15909C55.8015 9.15909 56.3185 9.2803 56.7617 9.52273C57.2049 9.76136 57.5496 10.125 57.7958 10.6136C58.042 11.0985 58.1651 11.7121 58.1651 12.4545V18H56.8242V12.5455C56.8242 11.8598 56.6462 11.3258 56.2901 10.9432C55.9341 10.5568 55.4454 10.3636 54.8242 10.3636C54.3962 10.3636 54.0136 10.4564 53.6765 10.642C53.3431 10.8277 53.0799 11.0985 52.8867 11.4545C52.6935 11.8106 52.5969 12.2424 52.5969 12.75ZM63.9309 9.27273V10.4091H59.4081V9.27273H63.9309ZM60.7263 7.18182H62.0672V15.5C62.0672 15.8788 62.1221 16.1629 62.232 16.3523C62.3456 16.5379 62.4896 16.6629 62.6638 16.7273C62.8418 16.7879 63.0293 16.8182 63.2263 16.8182C63.374 16.8182 63.4952 16.8106 63.5899 16.7955C63.6846 16.7765 63.7604 16.7614 63.8172 16.75L64.0899 17.9545C63.999 17.9886 63.8721 18.0227 63.7093 18.0568C63.5464 18.0947 63.3399 18.1136 63.0899 18.1136C62.7112 18.1136 62.3399 18.0322 61.9763 17.8693C61.6165 17.7064 61.3172 17.4583 61.0786 17.125C60.8437 16.7917 60.7263 16.3712 60.7263 15.8636V7.18182ZM71.4935 11.2273L70.2889 11.5682C70.2132 11.3674 70.1014 11.1723 69.9537 10.983C69.8098 10.7898 69.6128 10.6307 69.3628 10.5057C69.1128 10.3807 68.7927 10.3182 68.4026 10.3182C67.8685 10.3182 67.4234 10.4413 67.0673 10.6875C66.7151 10.9299 66.5389 11.2386 66.5389 11.6136C66.5389 11.947 66.6601 12.2102 66.9026 12.4034C67.145 12.5966 67.5238 12.7576 68.0389 12.8864L69.3344 13.2045C70.1147 13.3939 70.6961 13.6837 71.0787 14.0739C71.4613 14.4602 71.6526 14.9583 71.6526 15.5682C71.6526 16.0682 71.5086 16.5152 71.2207 16.9091C70.9366 17.303 70.5389 17.6136 70.0276 17.8409C69.5162 18.0682 68.9215 18.1818 68.2435 18.1818C67.3533 18.1818 66.6166 17.9886 66.0332 17.6023C65.4499 17.2159 65.0806 16.6515 64.9253 15.9091L66.198 15.5909C66.3192 16.0606 66.5484 16.4129 66.8855 16.6477C67.2264 16.8826 67.6715 17 68.2207 17C68.8457 17 69.3419 16.8674 69.7094 16.6023C70.0806 16.3333 70.2662 16.0114 70.2662 15.6364C70.2662 15.3333 70.1601 15.0795 69.948 14.875C69.7359 14.6667 69.4101 14.5114 68.9707 14.4091L67.5162 14.0682C66.7169 13.8788 66.1298 13.5852 65.7548 13.1875C65.3836 12.786 65.198 12.2841 65.198 11.6818C65.198 11.1894 65.3363 10.7538 65.6128 10.375C65.8931 9.99621 66.2738 9.69886 66.7548 9.48295C67.2397 9.26705 67.7889 9.15909 68.4026 9.15909C69.2662 9.15909 69.9442 9.34848 70.4366 9.72727C70.9329 10.1061 71.2851 10.6061 71.4935 11.2273Z"
								fill="white"
							/>
							<rect width="24" height="24" fill="#111111" />
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M17 12.5C17 15.5439 14.5439 18 11.5 18C8.45606 18 6 15.5439 6 12.5C6 9.45606 8.45606 7 11.5 7C14.557 7 17 9.44299 17 12.5ZM8.83492 16.8895C9.67102 17.386 10.285 17.5689 11.5 17.6342V7.3658C10.7292 7.40499 10.3634 7.45724 9.9323 7.60095C7.78979 8.30641 6.3658 10.266 6.3658 12.5C6.3658 14.2898 7.29335 15.9489 8.83492 16.8895Z"
								fill="white"
							/>
						</g>
						<defs>
							<clipPath id="clip0_331_1263">
								<rect width="78" height="24" fill="white" />
							</clipPath>
						</defs>
					</svg>
				);
			case "editorial":
				return (
					<svg
						width="87"
						height="24"
						viewBox="0 0 87 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clipPath="url(#clip0_331_1271)">
							<rect x="24" width="63" height="24" fill="#111111" />
							<path
								d="M25.4091 18V6.36364H32.4318V7.61364H26.8182V11.5455H32.0682V12.7955H26.8182V16.75H32.5227V18H25.4091ZM37.6052 18.1818C36.878 18.1818 36.2359 17.9981 35.6791 17.6307C35.1223 17.2595 34.6867 16.7367 34.3723 16.0625C34.0579 15.3845 33.9007 14.5833 33.9007 13.6591C33.9007 12.7424 34.0579 11.947 34.3723 11.2727C34.6867 10.5985 35.1242 10.0777 35.6848 9.71023C36.2454 9.3428 36.8931 9.15909 37.628 9.15909C38.1961 9.15909 38.645 9.25379 38.9745 9.44318C39.3079 9.62879 39.5617 9.84091 39.7359 10.0795C39.9139 10.3144 40.0522 10.5076 40.1507 10.6591H40.2643V6.36364H41.6052V18H40.3098V16.6591H40.1507C40.0522 16.8182 39.912 17.0189 39.7302 17.2614C39.5484 17.5 39.2889 17.714 38.9518 17.9034C38.6147 18.089 38.1658 18.1818 37.6052 18.1818ZM37.787 16.9773C38.3249 16.9773 38.7795 16.8371 39.1507 16.5568C39.5219 16.2727 39.8041 15.8807 39.9973 15.3807C40.1905 14.8769 40.287 14.2955 40.287 13.6364C40.287 12.9848 40.1923 12.4148 40.003 11.9261C39.8136 11.4337 39.5333 11.0511 39.162 10.7784C38.7908 10.5019 38.3325 10.3636 37.787 10.3636C37.2189 10.3636 36.7454 10.5095 36.3666 10.8011C35.9916 11.089 35.7094 11.4811 35.52 11.9773C35.3344 12.4697 35.2416 13.0227 35.2416 13.6364C35.2416 14.2576 35.3363 14.822 35.5257 15.3295C35.7189 15.8333 36.003 16.2348 36.378 16.5341C36.7567 16.8295 37.2264 16.9773 37.787 16.9773ZM43.7673 18V9.27273H45.1082V18H43.7673ZM44.4491 7.81818C44.1877 7.81818 43.9623 7.72917 43.773 7.55114C43.5873 7.37311 43.4945 7.15909 43.4945 6.90909C43.4945 6.65909 43.5873 6.44508 43.773 6.26705C43.9623 6.08902 44.1877 6 44.4491 6C44.7105 6 44.9339 6.08902 45.1195 6.26705C45.3089 6.44508 45.4036 6.65909 45.4036 6.90909C45.4036 7.15909 45.3089 7.37311 45.1195 7.55114C44.9339 7.72917 44.7105 7.81818 44.4491 7.81818ZM50.8796 9.27273V10.4091H46.3569V9.27273H50.8796ZM47.6751 7.18182H49.016V15.5C49.016 15.8788 49.0709 16.1629 49.1807 16.3523C49.2944 16.5379 49.4383 16.6629 49.6126 16.7273C49.7906 16.7879 49.9781 16.8182 50.1751 16.8182C50.3228 16.8182 50.444 16.8106 50.5387 16.7955C50.6334 16.7765 50.7091 16.7614 50.766 16.75L51.0387 17.9545C50.9478 17.9886 50.8209 18.0227 50.658 18.0568C50.4951 18.0947 50.2887 18.1136 50.0387 18.1136C49.6599 18.1136 49.2887 18.0322 48.9251 17.8693C48.5652 17.7064 48.266 17.4583 48.0273 17.125C47.7925 16.7917 47.6751 16.3712 47.6751 15.8636V7.18182ZM55.8684 18.1818C55.0805 18.1818 54.3892 17.9943 53.7945 17.6193C53.2036 17.2443 52.7415 16.7197 52.4081 16.0455C52.0786 15.3712 51.9138 14.5833 51.9138 13.6818C51.9138 12.7727 52.0786 11.9792 52.4081 11.3011C52.7415 10.6231 53.2036 10.0966 53.7945 9.72159C54.3892 9.34659 55.0805 9.15909 55.8684 9.15909C56.6562 9.15909 57.3456 9.34659 57.9365 9.72159C58.5312 10.0966 58.9934 10.6231 59.3229 11.3011C59.6562 11.9792 59.8229 12.7727 59.8229 13.6818C59.8229 14.5833 59.6562 15.3712 59.3229 16.0455C58.9934 16.7197 58.5312 17.2443 57.9365 17.6193C57.3456 17.9943 56.6562 18.1818 55.8684 18.1818ZM55.8684 16.9773C56.4668 16.9773 56.9593 16.8239 57.3456 16.517C57.732 16.2102 58.018 15.8068 58.2036 15.3068C58.3892 14.8068 58.482 14.2652 58.482 13.6818C58.482 13.0985 58.3892 12.5549 58.2036 12.0511C58.018 11.5473 57.732 11.1402 57.3456 10.8295C56.9593 10.5189 56.4668 10.3636 55.8684 10.3636C55.2699 10.3636 54.7774 10.5189 54.3911 10.8295C54.0047 11.1402 53.7187 11.5473 53.5331 12.0511C53.3475 12.5549 53.2547 13.0985 53.2547 13.6818C53.2547 14.2652 53.3475 14.8068 53.5331 15.3068C53.7187 15.8068 54.0047 16.2102 54.3911 16.517C54.7774 16.8239 55.2699 16.9773 55.8684 16.9773ZM61.3898 18V9.27273H62.6852V10.5909H62.7761C62.9352 10.1591 63.2231 9.80871 63.6398 9.53977C64.0564 9.27083 64.5261 9.13636 65.0489 9.13636C65.1473 9.13636 65.2705 9.13826 65.4182 9.14205C65.5659 9.14583 65.6777 9.15152 65.7534 9.15909V10.5227C65.708 10.5114 65.6038 10.4943 65.4409 10.4716C65.2818 10.4451 65.1133 10.4318 64.9352 10.4318C64.511 10.4318 64.1322 10.5208 63.7989 10.6989C63.4693 10.8731 63.208 11.1155 63.0148 11.4261C62.8254 11.733 62.7307 12.0833 62.7307 12.4773V18H61.3898ZM66.8629 18V9.27273H68.2038V18H66.8629ZM67.5447 7.81818C67.2834 7.81818 67.058 7.72917 66.8686 7.55114C66.683 7.37311 66.5902 7.15909 66.5902 6.90909C66.5902 6.65909 66.683 6.44508 66.8686 6.26705C67.058 6.08902 67.2834 6 67.5447 6C67.8061 6 68.0296 6.08902 68.2152 6.26705C68.4046 6.44508 68.4993 6.65909 68.4993 6.90909C68.4993 7.15909 68.4046 7.37311 68.2152 7.55114C68.0296 7.72917 67.8061 7.81818 67.5447 7.81818ZM72.748 18.2045C72.1949 18.2045 71.693 18.1004 71.2423 17.892C70.7915 17.6799 70.4336 17.375 70.1684 16.9773C69.9033 16.5758 69.7707 16.0909 69.7707 15.5227C69.7707 15.0227 69.8692 14.6174 70.0661 14.3068C70.2631 13.9924 70.5264 13.7462 70.8559 13.5682C71.1855 13.3902 71.5491 13.2576 71.9468 13.1705C72.3483 13.0795 72.7517 13.0076 73.157 12.9545C73.6873 12.8864 74.1173 12.8352 74.4468 12.8011C74.7802 12.7633 75.0226 12.7008 75.1741 12.6136C75.3294 12.5265 75.407 12.375 75.407 12.1591V12.1136C75.407 11.553 75.2536 11.1174 74.9468 10.8068C74.6438 10.4962 74.1836 10.3409 73.5661 10.3409C72.926 10.3409 72.4241 10.4811 72.0605 10.7614C71.6968 11.0417 71.4411 11.3409 71.2934 11.6591L70.0207 11.2045C70.248 10.6742 70.551 10.2614 70.9298 9.96591C71.3123 9.66667 71.729 9.45833 72.1798 9.34091C72.6343 9.2197 73.0813 9.15909 73.5207 9.15909C73.801 9.15909 74.123 9.19318 74.4866 9.26136C74.854 9.32576 75.2082 9.46023 75.5491 9.66477C75.8938 9.86932 76.1798 10.178 76.407 10.5909C76.6343 11.0038 76.748 11.5568 76.748 12.25V18H75.407V16.8182H75.3389C75.248 17.0076 75.0964 17.2102 74.8843 17.4261C74.6722 17.642 74.39 17.8258 74.0377 17.9773C73.6855 18.1288 73.2555 18.2045 72.748 18.2045ZM72.9525 17C73.4828 17 73.9298 16.8958 74.2934 16.6875C74.6608 16.4792 74.9373 16.2102 75.123 15.8807C75.3123 15.5511 75.407 15.2045 75.407 14.8409V13.6136C75.3502 13.6818 75.2252 13.7443 75.032 13.8011C74.8427 13.8542 74.623 13.9015 74.373 13.9432C74.1267 13.9811 73.8862 14.0152 73.6514 14.0455C73.4203 14.072 73.2328 14.0947 73.0889 14.1136C72.7404 14.1591 72.4146 14.233 72.1116 14.3352C71.8123 14.4337 71.5699 14.5833 71.3843 14.7841C71.2025 14.9811 71.1116 15.25 71.1116 15.5909C71.1116 16.0568 71.2839 16.4091 71.6286 16.6477C71.9771 16.8826 72.4184 17 72.9525 17ZM80.0563 6.36364V18H78.7154V6.36364H80.0563Z"
								fill="white"
							/>
							<rect width="24" height="24" fill="#111111" />
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M12.5599 10.205L11.461 10.2155L11.4715 6.51047L12.5704 6.5L12.5599 10.205ZM17.5 12.539L13.7636 12.5495L13.774 11.4296L17.5 11.4191V12.539ZM6.51047 12.5599L10.205 12.5495V11.4401L6.5 11.4505L6.51047 12.5599ZM12.5599 13.8787L12.5704 17.6047H11.4505L11.461 13.8787H12.5599Z"
								fill="white"
							/>
						</g>
						<defs>
							<clipPath id="clip0_331_1271">
								<rect width="87" height="24" fill="white" />
							</clipPath>
						</defs>
					</svg>
				);
			case "video":
				return (
					<svg
						width="72"
						height="24"
						viewBox="0 0 72 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clipPath="url(#clip0_331_1259)">
							<rect x="24" width="48" height="24" fill="#111111" />
							<path
								d="M25.8864 6.36364L29.3409 16.1591H29.4773L32.9318 6.36364H34.4091L30.1364 18H28.6818L24.4091 6.36364H25.8864ZM35.5598 18V9.27273H36.9007V18H35.5598ZM36.2416 7.81818C35.9802 7.81818 35.7548 7.72917 35.5655 7.55114C35.3798 7.37311 35.287 7.15909 35.287 6.90909C35.287 6.65909 35.3798 6.44508 35.5655 6.26705C35.7548 6.08902 35.9802 6 36.2416 6C36.503 6 36.7264 6.08902 36.912 6.26705C37.1014 6.44508 37.1961 6.65909 37.1961 6.90909C37.1961 7.15909 37.1014 7.37311 36.912 7.55114C36.7264 7.72917 36.503 7.81818 36.2416 7.81818ZM42.1721 18.1818C41.4448 18.1818 40.8028 17.9981 40.246 17.6307C39.6891 17.2595 39.2535 16.7367 38.9391 16.0625C38.6248 15.3845 38.4676 14.5833 38.4676 13.6591C38.4676 12.7424 38.6248 11.947 38.9391 11.2727C39.2535 10.5985 39.691 10.0777 40.2516 9.71023C40.8123 9.3428 41.46 9.15909 42.1948 9.15909C42.763 9.15909 43.2119 9.25379 43.5414 9.44318C43.8748 9.62879 44.1285 9.84091 44.3028 10.0795C44.4808 10.3144 44.6191 10.5076 44.7176 10.6591H44.8312V6.36364H46.1721V18H44.8766V16.6591H44.7176C44.6191 16.8182 44.4789 17.0189 44.2971 17.2614C44.1153 17.5 43.8558 17.714 43.5187 17.9034C43.1816 18.089 42.7327 18.1818 42.1721 18.1818ZM42.3539 16.9773C42.8918 16.9773 43.3463 16.8371 43.7176 16.5568C44.0888 16.2727 44.371 15.8807 44.5641 15.3807C44.7573 14.8769 44.8539 14.2955 44.8539 13.6364C44.8539 12.9848 44.7592 12.4148 44.5698 11.9261C44.3804 11.4337 44.1001 11.0511 43.7289 10.7784C43.3577 10.5019 42.8994 10.3636 42.3539 10.3636C41.7857 10.3636 41.3123 10.5095 40.9335 10.8011C40.5585 11.089 40.2763 11.4811 40.0869 11.9773C39.9013 12.4697 39.8085 13.0227 39.8085 13.6364C39.8085 14.2576 39.9032 14.822 40.0926 15.3295C40.2857 15.8333 40.5698 16.2348 40.9448 16.5341C41.3236 16.8295 41.7933 16.9773 42.3539 16.9773ZM51.9932 18.1818C51.1523 18.1818 50.427 17.9962 49.8171 17.625C49.211 17.25 48.7432 16.7273 48.4137 16.0568C48.0879 15.3826 47.9251 14.5985 47.9251 13.7045C47.9251 12.8106 48.0879 12.0227 48.4137 11.3409C48.7432 10.6553 49.2016 10.1212 49.7887 9.73864C50.3796 9.35227 51.069 9.15909 51.8569 9.15909C52.3114 9.15909 52.7603 9.23485 53.2035 9.38636C53.6466 9.53788 54.0501 9.78409 54.4137 10.125C54.7773 10.4621 55.0671 10.9091 55.283 11.4659C55.4989 12.0227 55.6069 12.7083 55.6069 13.5227V14.0909H48.8796V12.9318H54.2432C54.2432 12.4394 54.1448 12 53.9478 11.6136C53.7546 11.2273 53.4781 10.9223 53.1182 10.6989C52.7622 10.4754 52.3417 10.3636 51.8569 10.3636C51.3228 10.3636 50.8607 10.4962 50.4705 10.7614C50.0841 11.0227 49.7868 11.3636 49.5785 11.7841C49.3701 12.2045 49.266 12.6553 49.266 13.1364V13.9091C49.266 14.5682 49.3796 15.1269 49.6069 15.5852C49.8379 16.0398 50.158 16.3864 50.5671 16.625C50.9762 16.8598 51.4516 16.9773 51.9932 16.9773C52.3455 16.9773 52.6637 16.928 52.9478 16.8295C53.2357 16.7273 53.4838 16.5758 53.6921 16.375C53.9004 16.1705 54.0614 15.9167 54.1751 15.6136L55.4705 15.9773C55.3341 16.4167 55.105 16.803 54.783 17.1364C54.461 17.4659 54.0633 17.7235 53.5898 17.9091C53.1163 18.0909 52.5841 18.1818 51.9932 18.1818ZM60.7121 18.1818C59.9242 18.1818 59.2329 17.9943 58.6382 17.6193C58.0473 17.2443 57.5852 16.7197 57.2519 16.0455C56.9223 15.3712 56.7576 14.5833 56.7576 13.6818C56.7576 12.7727 56.9223 11.9792 57.2519 11.3011C57.5852 10.6231 58.0473 10.0966 58.6382 9.72159C59.2329 9.34659 59.9242 9.15909 60.7121 9.15909C61.5 9.15909 62.1894 9.34659 62.7803 9.72159C63.375 10.0966 63.8371 10.6231 64.1666 11.3011C64.5 11.9792 64.6666 12.7727 64.6666 13.6818C64.6666 14.5833 64.5 15.3712 64.1666 16.0455C63.8371 16.7197 63.375 17.2443 62.7803 17.6193C62.1894 17.9943 61.5 18.1818 60.7121 18.1818ZM60.7121 16.9773C61.3106 16.9773 61.803 16.8239 62.1894 16.517C62.5757 16.2102 62.8617 15.8068 63.0473 15.3068C63.2329 14.8068 63.3257 14.2652 63.3257 13.6818C63.3257 13.0985 63.2329 12.5549 63.0473 12.0511C62.8617 11.5473 62.5757 11.1402 62.1894 10.8295C61.803 10.5189 61.3106 10.3636 60.7121 10.3636C60.1136 10.3636 59.6212 10.5189 59.2348 10.8295C58.8485 11.1402 58.5625 11.5473 58.3769 12.0511C58.1913 12.5549 58.0985 13.0985 58.0985 13.6818C58.0985 14.2652 58.1913 14.8068 58.3769 15.3068C58.5625 15.8068 58.8485 16.2102 59.2348 16.517C59.6212 16.8239 60.1136 16.9773 60.7121 16.9773Z"
								fill="white"
							/>
							<rect width="24" height="24" fill="#111111" />
							<path d="M10 17L18 12L10 7V17Z" fill="white" />
						</g>
						<defs>
							<clipPath id="clip0_331_1259">
								<rect width="72" height="24" fill="white" />
							</clipPath>
						</defs>
					</svg>
				);
			case "releases":
				return (
					<svg
						width="92"
						height="24"
						viewBox="0 0 92 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clipPath="url(#clip0_331_1255)">
							<rect x="24" width="68" height="24" fill="#111111" />
							<path
								d="M25.4091 18V6.36364H29.3409C30.25 6.36364 30.9962 6.51894 31.5795 6.82955C32.1629 7.13636 32.5947 7.55871 32.875 8.09659C33.1553 8.63447 33.2955 9.24621 33.2955 9.93182C33.2955 10.6174 33.1553 11.2254 32.875 11.7557C32.5947 12.286 32.1648 12.7027 31.5852 13.0057C31.0057 13.3049 30.2652 13.4545 29.3636 13.4545H26.1818V12.1818H29.3182C29.9394 12.1818 30.4394 12.0909 30.8182 11.9091C31.2008 11.7273 31.4773 11.4697 31.6477 11.1364C31.822 10.7992 31.9091 10.3977 31.9091 9.93182C31.9091 9.46591 31.822 9.05871 31.6477 8.71023C31.4735 8.36174 31.1951 8.0928 30.8125 7.90341C30.4299 7.71023 29.9242 7.61364 29.2955 7.61364H26.8182V18H25.4091ZM30.8864 12.7727L33.75 18H32.1136L29.2955 12.7727H30.8864ZM38.547 18.1818C37.7061 18.1818 36.9807 17.9962 36.3709 17.625C35.7648 17.25 35.297 16.7273 34.9674 16.0568C34.6417 15.3826 34.4788 14.5985 34.4788 13.7045C34.4788 12.8106 34.6417 12.0227 34.9674 11.3409C35.297 10.6553 35.7553 10.1212 36.3424 9.73864C36.9334 9.35227 37.6227 9.15909 38.4106 9.15909C38.8652 9.15909 39.314 9.23485 39.7572 9.38636C40.2004 9.53788 40.6038 9.78409 40.9674 10.125C41.3311 10.4621 41.6209 10.9091 41.8368 11.4659C42.0527 12.0227 42.1606 12.7083 42.1606 13.5227V14.0909H35.4334V12.9318H40.797C40.797 12.4394 40.6985 12 40.5015 11.6136C40.3084 11.2273 40.0318 10.9223 39.672 10.6989C39.3159 10.4754 38.8955 10.3636 38.4106 10.3636C37.8765 10.3636 37.4144 10.4962 37.0243 10.7614C36.6379 11.0227 36.3405 11.3636 36.1322 11.7841C35.9239 12.2045 35.8197 12.6553 35.8197 13.1364V13.9091C35.8197 14.5682 35.9334 15.1269 36.1606 15.5852C36.3917 16.0398 36.7118 16.3864 37.1209 16.625C37.5299 16.8598 38.0053 16.9773 38.547 16.9773C38.8993 16.9773 39.2174 16.928 39.5015 16.8295C39.7894 16.7273 40.0375 16.5758 40.2459 16.375C40.4542 16.1705 40.6152 15.9167 40.7288 15.6136L42.0243 15.9773C41.8879 16.4167 41.6587 16.803 41.3368 17.1364C41.0148 17.4659 40.6171 17.7235 40.1436 17.9091C39.6701 18.0909 39.1379 18.1818 38.547 18.1818ZM45.0613 6.36364V18H43.7204V6.36364H45.0613ZM50.6964 18.1818C49.8555 18.1818 49.1301 17.9962 48.5202 17.625C47.9142 17.25 47.4464 16.7273 47.1168 16.0568C46.7911 15.3826 46.6282 14.5985 46.6282 13.7045C46.6282 12.8106 46.7911 12.0227 47.1168 11.3409C47.4464 10.6553 47.9047 10.1212 48.4918 9.73864C49.0827 9.35227 49.7721 9.15909 50.56 9.15909C51.0145 9.15909 51.4634 9.23485 51.9066 9.38636C52.3498 9.53788 52.7532 9.78409 53.1168 10.125C53.4805 10.4621 53.7702 10.9091 53.9861 11.4659C54.202 12.0227 54.31 12.7083 54.31 13.5227V14.0909H47.5827V12.9318H52.9464C52.9464 12.4394 52.8479 12 52.6509 11.6136C52.4577 11.2273 52.1812 10.9223 51.8214 10.6989C51.4653 10.4754 51.0448 10.3636 50.56 10.3636C50.0259 10.3636 49.5638 10.4962 49.1736 10.7614C48.7873 11.0227 48.4899 11.3636 48.2816 11.7841C48.0733 12.2045 47.9691 12.6553 47.9691 13.1364V13.9091C47.9691 14.5682 48.0827 15.1269 48.31 15.5852C48.5411 16.0398 48.8611 16.3864 49.2702 16.625C49.6793 16.8598 50.1547 16.9773 50.6964 16.9773C51.0486 16.9773 51.3668 16.928 51.6509 16.8295C51.9388 16.7273 52.1869 16.5758 52.3952 16.375C52.6036 16.1705 52.7645 15.9167 52.8782 15.6136L54.1736 15.9773C54.0373 16.4167 53.8081 16.803 53.4861 17.1364C53.1642 17.4659 52.7664 17.7235 52.293 17.9091C51.8195 18.0909 51.2873 18.1818 50.6964 18.1818ZM58.438 18.2045C57.8849 18.2045 57.383 18.1004 56.9323 17.892C56.4815 17.6799 56.1236 17.375 55.8584 16.9773C55.5933 16.5758 55.4607 16.0909 55.4607 15.5227C55.4607 15.0227 55.5592 14.6174 55.7561 14.3068C55.9531 13.9924 56.2164 13.7462 56.5459 13.5682C56.8755 13.3902 57.2391 13.2576 57.6368 13.1705C58.0383 13.0795 58.4417 13.0076 58.847 12.9545C59.3773 12.8864 59.8073 12.8352 60.1368 12.8011C60.4702 12.7633 60.7126 12.7008 60.8641 12.6136C61.0194 12.5265 61.097 12.375 61.097 12.1591V12.1136C61.097 11.553 60.9436 11.1174 60.6368 10.8068C60.3338 10.4962 59.8736 10.3409 59.2561 10.3409C58.616 10.3409 58.1141 10.4811 57.7505 10.7614C57.3868 11.0417 57.1311 11.3409 56.9834 11.6591L55.7107 11.2045C55.938 10.6742 56.241 10.2614 56.6198 9.96591C57.0023 9.66667 57.419 9.45833 57.8698 9.34091C58.3243 9.2197 58.7713 9.15909 59.2107 9.15909C59.491 9.15909 59.813 9.19318 60.1766 9.26136C60.544 9.32576 60.8982 9.46023 61.2391 9.66477C61.5838 9.86932 61.8698 10.178 62.097 10.5909C62.3243 11.0038 62.438 11.5568 62.438 12.25V18H61.097V16.8182H61.0289C60.938 17.0076 60.7864 17.2102 60.5743 17.4261C60.3622 17.642 60.08 17.8258 59.7277 17.9773C59.3755 18.1288 58.9455 18.2045 58.438 18.2045ZM58.6425 17C59.1728 17 59.6198 16.8958 59.9834 16.6875C60.3508 16.4792 60.6273 16.2102 60.813 15.8807C61.0023 15.5511 61.097 15.2045 61.097 14.8409V13.6136C61.0402 13.6818 60.9152 13.7443 60.722 13.8011C60.5327 13.8542 60.313 13.9015 60.063 13.9432C59.8167 13.9811 59.5762 14.0152 59.3414 14.0455C59.1103 14.072 58.9228 14.0947 58.7789 14.1136C58.4304 14.1591 58.1046 14.233 57.8016 14.3352C57.5023 14.4337 57.2599 14.5833 57.0743 14.7841C56.8925 14.9811 56.8016 15.25 56.8016 15.5909C56.8016 16.0568 56.9739 16.4091 57.3186 16.6477C57.6671 16.8826 58.1084 17 58.6425 17ZM70.5872 11.2273L69.3827 11.5682C69.3069 11.3674 69.1952 11.1723 69.0474 10.983C68.9035 10.7898 68.7065 10.6307 68.4565 10.5057C68.2065 10.3807 67.8865 10.3182 67.4963 10.3182C66.9622 10.3182 66.5171 10.4413 66.1611 10.6875C65.8088 10.9299 65.6327 11.2386 65.6327 11.6136C65.6327 11.947 65.7539 12.2102 65.9963 12.4034C66.2387 12.5966 66.6175 12.7576 67.1327 12.8864L68.4281 13.2045C69.2084 13.3939 69.7899 13.6837 70.1724 14.0739C70.555 14.4602 70.7463 14.9583 70.7463 15.5682C70.7463 16.0682 70.6024 16.5152 70.3145 16.9091C70.0304 17.303 69.6327 17.6136 69.1213 17.8409C68.6099 18.0682 68.0152 18.1818 67.3372 18.1818C66.4471 18.1818 65.7103 17.9886 65.127 17.6023C64.5437 17.2159 64.1743 16.6515 64.019 15.9091L65.2918 15.5909C65.413 16.0606 65.6421 16.4129 65.9793 16.6477C66.3202 16.8826 66.7652 17 67.3145 17C67.9395 17 68.4357 16.8674 68.8031 16.6023C69.1743 16.3333 69.3599 16.0114 69.3599 15.6364C69.3599 15.3333 69.2539 15.0795 69.0418 14.875C68.8296 14.6667 68.5039 14.5114 68.0645 14.4091L66.6099 14.0682C65.8107 13.8788 65.2236 13.5852 64.8486 13.1875C64.4774 12.786 64.2918 12.2841 64.2918 11.6818C64.2918 11.1894 64.43 10.7538 64.7065 10.375C64.9868 9.99621 65.3675 9.69886 65.8486 9.48295C66.3334 9.26705 66.8827 9.15909 67.4963 9.15909C68.3599 9.15909 69.038 9.34848 69.5304 9.72727C70.0266 10.1061 70.3789 10.6061 70.5872 11.2273ZM75.9439 18.1818C75.103 18.1818 74.3776 17.9962 73.7677 17.625C73.1617 17.25 72.6939 16.7273 72.3643 16.0568C72.0386 15.3826 71.8757 14.5985 71.8757 13.7045C71.8757 12.8106 72.0386 12.0227 72.3643 11.3409C72.6939 10.6553 73.1522 10.1212 73.7393 9.73864C74.3302 9.35227 75.0196 9.15909 75.8075 9.15909C76.262 9.15909 76.7109 9.23485 77.1541 9.38636C77.5973 9.53788 78.0007 9.78409 78.3643 10.125C78.728 10.4621 79.0177 10.9091 79.2336 11.4659C79.4495 12.0227 79.5575 12.7083 79.5575 13.5227V14.0909H72.8302V12.9318H78.1939C78.1939 12.4394 78.0954 12 77.8984 11.6136C77.7052 11.2273 77.4287 10.9223 77.0689 10.6989C76.7128 10.4754 76.2923 10.3636 75.8075 10.3636C75.2734 10.3636 74.8113 10.4962 74.4211 10.7614C74.0348 11.0227 73.7374 11.3636 73.5291 11.7841C73.3208 12.2045 73.2166 12.6553 73.2166 13.1364V13.9091C73.2166 14.5682 73.3302 15.1269 73.5575 15.5852C73.7886 16.0398 74.1086 16.3864 74.5177 16.625C74.9268 16.8598 75.4022 16.9773 75.9439 16.9773C76.2961 16.9773 76.6143 16.928 76.8984 16.8295C77.1863 16.7273 77.4344 16.5758 77.6427 16.375C77.8511 16.1705 78.012 15.9167 78.1257 15.6136L79.4211 15.9773C79.2848 16.4167 79.0556 16.803 78.7336 17.1364C78.4117 17.4659 78.0139 17.7235 77.5405 17.9091C77.067 18.0909 76.5348 18.1818 75.9439 18.1818ZM87.2991 11.2273L86.0945 11.5682C86.0188 11.3674 85.907 11.1723 85.7593 10.983C85.6154 10.7898 85.4184 10.6307 85.1684 10.5057C84.9184 10.3807 84.5983 10.3182 84.2082 10.3182C83.6741 10.3182 83.229 10.4413 82.873 10.6875C82.5207 10.9299 82.3445 11.2386 82.3445 11.6136C82.3445 11.947 82.4658 12.2102 82.7082 12.4034C82.9506 12.5966 83.3294 12.7576 83.8445 12.8864L85.14 13.2045C85.9203 13.3939 86.5017 13.6837 86.8843 14.0739C87.2669 14.4602 87.4582 14.9583 87.4582 15.5682C87.4582 16.0682 87.3142 16.5152 87.0264 16.9091C86.7423 17.303 86.3445 17.6136 85.8332 17.8409C85.3218 18.0682 84.7271 18.1818 84.0491 18.1818C83.1589 18.1818 82.4222 17.9886 81.8389 17.6023C81.2555 17.2159 80.8862 16.6515 80.7309 15.9091L82.0036 15.5909C82.1248 16.0606 82.354 16.4129 82.6911 16.6477C83.032 16.8826 83.4771 17 84.0264 17C84.6514 17 85.1476 16.8674 85.515 16.6023C85.8862 16.3333 86.0718 16.0114 86.0718 15.6364C86.0718 15.3333 85.9658 15.0795 85.7536 14.875C85.5415 14.6667 85.2158 14.5114 84.7764 14.4091L83.3218 14.0682C82.5226 13.8788 81.9355 13.5852 81.5605 13.1875C81.1892 12.786 81.0036 12.2841 81.0036 11.6818C81.0036 11.1894 81.1419 10.7538 81.4184 10.375C81.6987 9.99621 82.0794 9.69886 82.5605 9.48295C83.0453 9.26705 83.5945 9.15909 84.2082 9.15909C85.0718 9.15909 85.7498 9.34848 86.2423 9.72727C86.7385 10.1061 87.0908 10.6061 87.2991 11.2273Z"
								fill="white"
							/>
							<rect width="24" height="24" fill="#111111" />
							<path
								d="M10.0923 17.7018C11.5013 17.7018 12.4987 16.6095 12.4987 15.0897V10.277C13.4169 10.4037 14.1768 11.6544 14.1768 13.0158C14.1768 13.839 14.0343 14.4881 13.6544 15.3747H14.0976C14.6834 14.6464 15 13.7599 15 12.81C15 11.5594 14.5409 10.4037 13.5594 9.24802L12.7361 8.25066C12.7045 8.23483 12.6253 8.12401 12.4987 7.9657V7H11.7704V15.0897C11.5172 14.9789 11.1847 14.9156 10.9156 14.9156C9.90237 14.9156 9 15.7863 9 16.7361C9 17.3377 9.41161 17.7018 10.0923 17.7018Z"
								fill="white"
							/>
						</g>
						<defs>
							<clipPath id="clip0_331_1255">
								<rect width="92" height="24" fill="white" />
							</clipPath>
						</defs>
					</svg>
				);
		}
	}

	//Set Breakpoints for displaying full-menu items on tablet/desktop
	const breakpoints = {
		default: 2,
		720: 1,
	};

	// Removes any non-alphanumeric characters from filter  array
	function isAlphabetic(str: string) {
		return /^[a-zA-Z]+$/.test(str);
	}

	// Takes in search string from search page input
	const searchParams = useSearchParams();
	const updatedSearchParams = searchParams ? searchParams.get("q") || "" : "";
	const searchWords = updatedSearchParams.toLowerCase().split(" ");

	// Takes in filter parameters from filter checkboxes
	let filterWords: string[] = [];

	// Produces array of [""] if filterValue is empty to display all
	filterValue.length > 1
		? (filterWords = filterValue
				.split(",")
				.filter((char) => isAlphabetic(char)))
		: (filterWords = [""]);

	// Produces filtered and mapped array to return
	const renderFeed = db
		// Filter to include if any Filter input words match
		.filter((e) => {
			return filterWords.some((word) =>
				e.contentType.toLowerCase().includes(word)
			);
		})
		// Filter to include all Search input words
		.filter((e) => {
			return searchWords.every(
				(word: string) =>
					e.mainTitle.toLowerCase().includes(word) ||
					e.subheading.toLowerCase().includes(word) ||
					e.contentType.toLowerCase().includes(word)
			);
		})
		// Map out Array into HTML format
		.map((e) => (
			<div key={e.id} className="card">
				{e.contentImage ? (
					<a href={e.linkUrl}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={e.contentImage.url} alt={e.imageDescription} />
					</a>
				) : (
					""
				)}
				{e.linkTitle ? (
					<span className="card-link">
						<svg
							width="22"
							height="22"
							viewBox="0 0 22 22"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M22 0H11H0V11V22H11H22V11V0ZM7.92 14.96L15.84 11L7.92 7.04V14.96Z"
								fill="#111111"
							/>
						</svg>
						<a href={e.linkUrl}>{e.linkTitle}</a>
					</span>
				) : (
					""
				)}
				{e.eyebrowHeader ? <h3>{e.eyebrowHeader}</h3> : ""}
				<h2>{e.mainTitle}</h2>
				{e.subheading ? <h3>{e.subheading}</h3> : ""}
				<span className="type-date-span">
					{getEventImageUrl(e.contentType)}
					<p>· {"Added " + e.dateAdded}</p>
				</span>
			</div>
		));

	//Renders filtered feed to the DOM, using Masonry layout plugin
	return (
		<>
			<div className="home__title-div">
				<h1 className="home__title">
					Multidisciplinary collective and occasional function.
				</h1>
			</div>
			{updatedSearchParams && (
				<h2 className="search-info">
					{/* eslint-disable-next-line react/no-unescaped-entities */}
					Searching - "{updatedSearchParams}"
				</h2>
			)}
			{renderFeed.length === 0 ? (
				<>
					<br></br>
					<br></br>
					<br></br>
					<h2 data-testid="feed-container">Nothing to Display</h2>
				</>
			) : (
				<div className="feed-container" data-testid="feed-container">
					<Masonry
						breakpointCols={breakpoints}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
					>
						{renderFeed}
					</Masonry>
				</div>
			)}
		</>
	);
};

export default Feed;
