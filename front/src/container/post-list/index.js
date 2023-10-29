import { Fragment, useEffect, useReducer } from "react";

import Title from "../../component/title";
import Grid from "../../component/grid";
import Box from "../../component/box";
import PostCreate from "../post-create"
import PostItem from "../post-item"

import { Alert, Skeleton } from "../../component/load";
import {getDate} from "../../util/getDate"
// import { useWindowListener } from "../../util/useWindowListener";

import { REQUEST_ACTION_TYPE, requestInitialState, requestReducer } from "../../util/request";


export default function Container() {
	const [state, dispatch] = useReducer(requestReducer, requestInitialState)

	// const [status, setStatus] = useState(null);		
	// const [message, setMessage] = useState("");
	// const [data, setData] = useState(null);

	const getData = async () => {
		// setStatus(LOAD_STATUS.PROGRESS);
		dispatch({type: REQUEST_ACTION_TYPE.PROGRESS });

		try {
			const res = await fetch("http://localhost:4000/post-list", {
				method: "GET",
		});

		const data = await res.json();

		if (res.ok) {
			// setData(convertData(data));
			// setStatus(LOAD_STATUS.SUCCESS);
			dispatch({
				type: REQUEST_ACTION_TYPE.SUCCESS,
				payload: convertData(data),
			})
		} else {
			// setMessage(data.message)
			// setStatus(LOAD_STATUS.ERROR)
			dispatch({
				type: REQUEST_ACTION_TYPE.ERROR,
				payload: data.message,
			})
		}

		} catch (error) {
			// setMessage(error.message)
			// setStatus(LOAD_STATUS.ERROR)
			dispatch({
				type: REQUEST_ACTION_TYPE.ERROR,
				payload: error.message,
			})
		}
	};

	const convertData = (raw) => ({
		list: raw.list.reverse().map(({id, username, text, date}) => ({
			id, 
			username, 
			text, 
			date: getDate(date),
		})),

		isEmpty: raw.list.length === 0,
	});

	useEffect(() => {
		getData();

		// const intervalId = setInterval(() => getData(), 5000)

		// return (() => {
		// 	clearInterval(intervalId)		
		// })
	}, []);

	// const [position, setPosition] = useState({x: 0, y: 0});

	// useWindowListener("pointermove", (e) => {
	// 	setPosition({x: e.clientX, y: e.clientY});
	// });

	// if (status === null) getData(); - небезпечний код

	return (
		<Grid>
			<Box>
				<Grid>
					<Title>HOME</Title>
					<PostCreate 
						onCreate={getData}
						placeholder="What is happening?"
						button="Post"
					/>
				</Grid>
			</Box>

			{state.status === REQUEST_ACTION_TYPE.PROGRESS && (
				<Fragment>
					<Box>
						<Skeleton />
					</Box>
					<Box>
						<Skeleton />
					</Box>
				</Fragment>
			)}

			{state.status === REQUEST_ACTION_TYPE.ERROR && (
				<Alert status={state.status} message={state.message} />
			)}

			{state.status === REQUEST_ACTION_TYPE.SUCCESS && (
				<Fragment>
					{state.data.isEmpty ? (
						<Alert message="Список постів пустий" />
					) : (
						state.data.list.map((item) => (
							<Fragment key={item.id}>
								<PostItem {...item} />
							</Fragment> 
						))
					)}
				</Fragment>
			)}
		</Grid>
	);
}