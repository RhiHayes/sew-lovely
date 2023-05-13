import {useState} from "react";
import Values from "./Values";
import classes from "./Filters.module.css";

const Filter = (props) => {

    const [defaultValue, setDefaultValue] = useState({
        default: props.label
    });

    return (
        <span>
            <select className={classes.filter_boxes} value={defaultValue}>
            <span>{props.label}</span> 
            <option value={props.label}>{props.label}</option>
            {props.values.map((val) => (
            <Values value={val}/>
            ))}
            </select>
        </span>
    )
}

export default Filter;