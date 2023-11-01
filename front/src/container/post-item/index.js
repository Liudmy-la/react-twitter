import { Fragment, useState, useEffect, useReducer, useCallback } from "react";

import "./index.css";
import PostContent from "../../component/post-content"
import Grid from "../../component/grid"
import Box from "../../component/box"
import PostCreate from "../post-create"
import { Alert, Skeleton } from "../../component/load";
import { getDate } from "../../util/getDate";

import { REQUEST_ACTION_TYPE, requestInitialState, requestReducer } from "../../util/request";

export default function Container({id, username, text, date}) {
	const [state, dispatch] = useReducer(
		requestReducer, 
		requestInitialState, 
		(state) => ({...state, data: {
			id,
			username,
			text,
			date,
			reply: null,
		}})
		)

	// const [data, setData] = useState({
	// 	id,
	// 	username,
	// 	text,
	// 	date,
	// 	reply: null,
	// });

	// const [status, setStatus] = useState(null);
	// const [message, setMessage] = useState("");	

	const getData = useCallback(async () => {
		dispatch({type: REQUEST_ACTION_TYPE.PROGRESS });

		try {
			const res = await fetch(`http://localhost:4000/post-item?id=${state.data.id}`, {
			method: "GET"
			});

			const resData = await res.json();

			if (res.ok) {
				// setData(convertData(resData));
				// setStatus(LOAD_STATUS.SUCCESS);
				dispatch({
					type: REQUEST_ACTION_TYPE.SUCCESS,				
					payload: convertData(resData),
				});
			} else {				
				// setMessage(resData.message);
				// setStatus(LOAD_STATUS.ERROR);
			dispatch({
				type: REQUEST_ACTION_TYPE.ERROR,
				payload: resData.message,
			})
			}
		} catch (error) {
			// setMessage(error.message);
			// setStatus(LOAD_STATUS.ERROR);
			dispatch({
				type: REQUEST_ACTION_TYPE.ERROR,
				payload: error.message,
			})
		}
	}, [state.data.id]);

	const convertData = ({post}) => ({
		id: post.id,
		text: post.text,
		username: post.username,
		date: getDate(post.date),

		reply: post.reply.reverse().map(({id, username, text, date}) => ({
			id,
			username,
			text,
			date: getDate(date),
		})),

		isEmpty: post.reply.length === 0,
	})

	const [isOpen, setOpen] = useState(false);

	const handleOpen = () => {
		// if(status === null) {
		// 	getData();
		// } - непотрібний код, коли застосували useEffect

		setOpen(!isOpen)
	};

	useEffect(() => {
		if (isOpen === true) {
			getData();
		}
	}, [isOpen]);
	
	return (
		<Box style={{padding: "0"}}>
			<div
				style={{
					padding: "20px",
					cursor: "pointer",
				}}
				onClick={handleOpen}
			>
				<PostContent 
					username={state.data.username}
					date={state.data.date}
					text={state.data.text}
				/>
			</div>

			{isOpen && (
				<div style={{padding: "0 20px 20px 20px"}}>
					<Grid>
						<Box>
							<PostCreate
								placeholder="Post your reply!"
								button="Reply"
								id={state.data.id}
								onCreate={getData}
							/>
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

						{state.status === REQUEST_ACTION_TYPE.SUCCESS &&
							state.data.isEmpty === false &&
							state.data.reply.map((item) => (
								<Fragment key={item.id}>
									<Box>
										<PostContent {...item} />
									</Box>
								</Fragment> 
							))}
					</Grid>
				</div>
			)}
		</Box>
	)
}