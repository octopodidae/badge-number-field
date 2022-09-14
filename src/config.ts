import { ImmutableObject } from 'jimu-core'

export interface Config {
    numberField: string
    fieldsSelected: []
    validate: boolean
}

export type IMConfig = ImmutableObject<Config>
