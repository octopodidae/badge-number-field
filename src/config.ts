import { ImmutableObject } from 'jimu-core'

export interface Config {
    numberField: string
    stringField: string
    fieldsSelected: []
    validate: boolean
    colors: []
}

export type IMConfig = ImmutableObject<Config>
