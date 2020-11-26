import React from 'react'

const Action = (props) => 
<a href="#"  className={"btn btn-"+props.type} title={props.title}>
    <i className={"fas fa-"+props.icon} /></a>

export default Action
