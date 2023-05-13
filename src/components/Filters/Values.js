const Values = (props) => {

    return (
        <option value={props.value.value} selected="false">{props.value.value}</option>
   )
}

export default Values;