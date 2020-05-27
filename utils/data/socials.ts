import { IconDefinition, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons"

type Social = {
  icon: IconDefinition
  url: string
}

const SOCIALS: Social[] = [
  {
    icon: faGithub,
    url: "https://github.com/JuanM04",
  },
  {
    icon: faInstagram,
    url: "https://instagram.com/juanmartinseery",
  },
  {
    icon: faEnvelope,
    url: "mailto:me@juanm04.com",
  },
]

export default SOCIALS
