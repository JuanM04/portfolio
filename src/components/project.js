import React from 'react'

export default props => {
  const imagePNG = require(`../images/projects/${props.image}.png`)
  const imageWEBP = require(`../images/projects/${props.image}.webp`)

  return(
    <a
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      className="Project"
    >
      <picture>
        <source type="image/webp" srcset={imageWEBP} />
        <source type="image/png" srcset={imagePNG} />
        <img src={imagePNG} alt={props.name}/>
      </picture>

      <h2>{props.name}</h2>
      <h3>{props.category}</h3>
      <p>{props.description}</p>
    </a>
  )
}