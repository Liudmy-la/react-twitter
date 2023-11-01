import { useState} from "react";
import Page from "./component/page";
import PostList from "./container/post-list";

import { useWindowListener } from "./util/useWindowListener";

function App() {
	// const [position, setPosition] = useState({x: 0, y: 0});

	// useWindowListener("pointermove", (e) => {
	// 	setPosition({x: e.clientX, y: e.clientY});
	// });

	// const [location, setLocation] = useState(null);

	// useEffect(() => {
	// 	if ("geolocation" in navigator) {
	// 		navigator.geolocation.getCurrentPosition(
	// 			(position) => {
	// 				const {latitude, longitude} = position.coords;
	// 				setLocation({latitude, longitude});
	// 			},
	// 			(error) => {
	// 				console.error("Помилка отримання геолокації:", error.message);
	// 			}
	// 		);
	// 	} else {
	// 		console.error("Геолокація не підтримується в цьому браузері");
	// 	}
	// }, []);

  return (
	<Page>
		<PostList />
		
		{/* <div
			style={{
				position: "absolute",
				backgroundColor: "purple",
				borderRadius: "50%",
				opacity: 0.4,
				transform: `translate(${position.x}px, ${position.y}px)`,
				pointerEvents: "none",
				left: -15,
				top: -15,
				width: 30,
				height: 30,
			}}
		/> */}

		{/* <br></br>
			<Box>				
				{location ? (
					<div>
						<h2>Де ви:</h2>
						<p>Широта: {location.latitude}</p>
						<p>Довгота: {location.longitude}</p>
					</div>
				) : (
					<p>Отримання геолокації ...</p>
				)}
			</Box> */}
	</Page>
  );
}

// export function useWindowListener(eventType, listener) {
// 	useEffect(() => {
// 		window.addEventListener(eventType, listener);
// 		return () => {
// 			window.removeEventListener(eventType, listener);
// 		}
// 	}, [eventType, listener]);
// }

export default App;
