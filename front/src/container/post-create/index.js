import { useReducer, useState } from "react";

import "./index.css";

import FieldForm from "../../component/field-form";
import Grid from "../../component/grid";

import {Alert, Loader} from "../../component/load";
import { REQUEST_ACTION_TYPE, requestInitialState, requestReducer } from "../../util/request";

export default function Container({onCreate, placeholder, button, id = null}) {
	// const [status, setStatus] = useState(null);
	// const [message, setMessage] = useState("");
	const [state, dispatch] = useReducer(requestReducer, requestInitialState);

	const handleSubmit = (value) => {
		return sendData ({value});
	}

	const sendData = async (dataToSend) => {
		dispatch({type: REQUEST_ACTION_TYPE.PROGRESS});

		try {
			const res = await fetch("http://localhost:4000/post-create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: convertData(dataToSend),
			});

			const data = await res.json();

			if (res.ok) {
				// setStatus(null);
				dispatch({type: REQUEST_ACTION_TYPE.RESET});

				if (onCreate) onCreate();
			} else {				
				// setMessage(data.message)
				// setStatus(LOAD_STATUS.ERROR)
				dispatch({type: REQUEST_ACTION_TYPE.ERROR, message: data.message});
			}

		} catch (error) {
			// setMessage(error.message)
			// setStatus(LOAD_STATUS.ERROR)
				dispatch({type: REQUEST_ACTION_TYPE.ERROR, message: error.message});
		}
	};

	const convertData = ({value}) => JSON.stringify({
		text: value,
		username: "user",
		postId: id,
	});

	return (
		<Grid>
			<FieldForm 
				placeholder={placeholder}
				button={button}
				onSubmit={handleSubmit}
			/>
			{state.status === REQUEST_ACTION_TYPE.ERROR && (
				<Alert status={state.status} message={state.message} />
			)}
			{state.status === REQUEST_ACTION_TYPE.PROGRESS && <Loader />}
		</Grid>
	)
}