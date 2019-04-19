import React from 'react'

export default ({ name, description, category, image, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="Project"
  >
    <picture>
      <source type="image/webp" srcSet={`${webp(`${image}.small`)} 500w, ${webp(`${image}.medium`)} 1000w`} />
      <source type="image/png" srcSet={`${png(`${image}.small`)} 500w, ${png(`${image}.medium`)} 1000w`} />
      <img src={png(`${image}.big`)} sizes="33vw 80vw" alt={name} />
    </picture>

    <h2>{name}</h2>
    <h3>{category}</h3>
    <p>{description}</p>
  </a>
)



const png = name => require(`../images/projects/${name}.png`)
const webp = name => require(`../images/projects/${name}.webp`)