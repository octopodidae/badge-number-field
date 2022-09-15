import { ImmutableObject } from 'jimu-core'

export interface Config {
    numberField: string
    stringField: string
    fieldsSelected: []
    validate: boolean
}

export type IMConfig = ImmutableObject<Config>
