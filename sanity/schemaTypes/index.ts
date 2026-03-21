import { type SchemaTypeDefinition } from 'sanity'
import { manager } from './manager'
import { events } from './events'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [manager, events],
}
