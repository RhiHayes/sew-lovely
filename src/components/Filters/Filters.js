import Filter from "./Filter"
import classes from "./Filters.module.css"

const Filters = (props) => {

return (
    <div className={classes.filters_container}>
    <h4 className={classes.filter_title}></h4>
    <span>
    {props.filters.map((filter) => (
      <span>
      &nbsp;
      {filter.type != 'slider' && filter.values.length != 0 && 
          (
          <span>
          <span onChange={props.onChange(filter.field, filter.label)}>
          &nbsp;
          <Filter
            active={filter.facet_active}
            label={filter.label}
            field={filter.field}
            values={filter.values}
          />
          </span>
          </span>)}
        </span>
        ))}        
        </span>
    </div>
)

}

export default Filters;