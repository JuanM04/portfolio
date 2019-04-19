import React from 'react'

export default props => (
  <a
    href={props.url}
    target="_blank"
    rel="noopener noreferrer"
    className="Project"
  >
    <img src={require(`../images/projects/${props.image}.png`)} alt={props.name}/>

    <h2>{props.name}</h2>
    <h3>{props.category}</h3>
    <p>{props.description}</p>
  </a>
)