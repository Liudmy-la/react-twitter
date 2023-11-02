import { useContext } from "react";
import "./index.css";
import { THEME_TYPE, ThemeContext } from "../../App";

export default function Component({children, className = "", style = {}}) {
	const theme = useContext(ThemeContext);

	return (
		<div 
			style={{...style, background: theme.value === THEME_TYPE.DARK && "black",}} 
			className={`box ${className}`}>
			
			{children}
		</div>
	);
}