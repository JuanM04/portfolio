/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "styles/*" {
  const content: { [className: string]: string }
  export default content
}

type Doc = {
  slug: string
  data: DocData
}

type Category = {
  slug: string
  name: string
  docs: Doc[]
}

type DocData = {
  title: string
  category?: string
  macros?: {
    cmd: string
    def: string
  }[]
}

type Redirects = {
  [slug: string]: {
    name: string
    url: string
  }
}
