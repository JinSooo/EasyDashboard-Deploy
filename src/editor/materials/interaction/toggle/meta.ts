import type { ComponentMetadata } from '@easy-editor/core'
import { MaterialGroup } from '../../type'
import configure from './configure'
import snippets from './snippets'

const meta: ComponentMetadata = {
  componentName: 'Toggle',
  title: 'Toggle',
  group: MaterialGroup.INTERACTION,
  snippets,
  configure,
}

export default meta
