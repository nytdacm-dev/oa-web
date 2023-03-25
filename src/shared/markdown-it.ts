import MarkdownIt from 'markdown-it'
import { imgLazyload } from '@mdit/plugin-img-lazyload'

export class MdIt {
  instance: MarkdownIt

  constructor() {
    this.instance = MarkdownIt()
      .use(imgLazyload)
  }

  render(data: string) {
    return this.instance.render(data)
  }
}

export const mdit = new MdIt()
