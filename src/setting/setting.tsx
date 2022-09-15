import {
    React,
    Immutable,
    ImmutableObject,
    IMFieldSchema,
    DataSource,
    UseDataSource,
    JimuFieldType,
} from 'jimu-core'
import { AllWidgetSettingProps } from 'jimu-for-builder'
import {
    DataSourceSelector,
    AllDataSourceTypes,
    FieldSelector,
} from 'jimu-ui/advanced/data-source-selector'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { Select, Option, Button } from 'jimu-ui'
import { string } from 'prop-types'

export default class Setting extends React.PureComponent<
    AllWidgetSettingProps<{}>,
    {}
> {
   
    state = {
        colorsState: [],
        myCounter: null,
    }

    supportedTypes = Immutable([AllDataSourceTypes.FeatureLayer])
    numberFieldTypes = Immutable([JimuFieldType.Number])
    stringFieldTypes = Immutable([JimuFieldType.String])

    onFieldChange = (allSelectedFields: IMFieldSchema[], ds: DataSource) => {
        console.log('allSelectedFields', allSelectedFields)

        const useDsWithFields = {
            ...this.props.useDataSources[0],
            ...{
                fields: allSelectedFields.map((f) => {
                    if (f.type !== 'STRING') {
                        console.log("f.type !== 'STRING'")
                        return f.jimuName
                    }
                }),
            },
        }

        this.props.config.fieldsSelected = allSelectedFields
        console.log('allSelectedFields', allSelectedFields)

        this.props.onSettingChange(
            {
                id: this.props.id,
                useDataSources: [useDsWithFields],
                config: {
                    ...this.props.config,
                    numberField: allSelectedFields[0]?.jimuName,
                },
            },
            []
        )
        console.log('this.props.useDataSources[0] into onFieldChange: ', this.props.useDataSources[0]);     
        console.log('this.props.useDataSources[0].fields into onFieldChange: ', this.props.useDataSources[0].fields);
    }

    onStrFieldChange = (allSelectedFields: IMFieldSchema[]) => {
        // console.log('allSelectedFields: ', allSelectedFields)
        // this.props.onSettingChange({
        //     id: this.props.id,
        //     useDataSources: [
        //         {
        //             ...this.props.useDataSources[0],
        //             ...{ fields: allSelectedFields.map((f) => f.jimuName) },
        //         },
        //     ],
        // })
        this.props.config.stringField = allSelectedFields[0].jimuName
        // allSelectedFields.shift()  
        console.log('this.props.useDataSources[0] into onStrFieldChange: ', this.props.useDataSources[0]);     
        console.log('this.props.useDataSources[0].fields into onStrFieldChange: ', this.props.useDataSources[0].fields);
    }
    
    onToggleUseDataEnabled = (useDataSourcesEnabled: boolean) => {
        // console.log('useDataSourcesEnabled: ', useDataSourcesEnabled)
        this.props.onSettingChange({
            id: this.props.id,
            useDataSourcesEnabled,
        })
    }

    onDataSourceChange = (useDataSources: UseDataSource[]) => {
        console.log('useDataSources: ', useDataSources)
        this.props.onSettingChange({
            id: this.props.id,
            useDataSources: useDataSources,
        })
    }

    onColorChange = (e, index) => {
        // console.log('e.currentTarget.value: ', e.currentTarget.value)
        this.props.config.fieldsSelected[index].color = e.currentTarget.value
        console.log(
            'this.props.config.fieldsSelected.length: ',
            this.props.config.fieldsSelected.length
        )
        console.log(
            'this.state.colorsState before setState(): ',
            this.state.colorsState
        )
        // console.log('e.currentTarget.value: ', e.currentTarget.value)
        this.setState((prevState) => ({
            colorsState: [...prevState.colorsState, e.currentTarget.value],
        }))
        this.setState(() => ({
            myCounter: this.state.myCounter + 1,
        }))
        console.log('myCounter: ', this.state.myCounter)
        console.log(
            'this.state.colorsState after setState(): ',
            this.state.colorsState
        )
    }
    // myCounter = -1
    colorStyle = {
        color: 'white',
        width: 'auto',
        height: 'auto',
        padding: '0.1rem',
        borderRadius: 5,
    }
    redStyle = {
        background: 'red',
    }
    greenStyle = {
        background: 'green',
    }
    blueStyle = {
        background: 'blue',
    }
    goldStyle = {
        background: 'gold',
    }
    silverStyle = {
        background: 'silver',
    }
    blackStyle = {
        background: 'black',
    }
    purpleStyle = {
        background: 'purple',
    }
    pinkStyle = {
        background: 'pink',
    }
    siennaStyle = {
        background: 'sienna',
    }
    render() {
        
        return (
            <div className="widget-settings p-2">
                <SettingSection>
                    <SettingRow>
                        <DataSourceSelector
                            types={this.supportedTypes}
                            useDataSources={this.props.useDataSources}
                            useDataSourcesEnabled={
                                this.props.useDataSourcesEnabled
                            }
                            onToggleUseDataEnabled={this.onToggleUseDataEnabled}
                            onChange={this.onDataSourceChange}
                            widgetId={this.props.id}
                            hideAddDataButton={true}
                            hideDataView={true}
                            hideCreateViewButton={true}
                        />
                    </SettingRow>
                </SettingSection>
                {this.props.useDataSources &&
                    this.props.useDataSources.length > 0 && (
                        <SettingSection>
                            <SettingRow
                                label="Select a string field"
                                className="mb-3"
                            ></SettingRow>
                            <FieldSelector
                                useDataSources={this.props.useDataSources}
                                onChange={this.onStrFieldChange}
                                // selectedFields={this.props.config.stringField}
                                selectedFields={
                                    this.props.useDataSources[0].fields ||
                                    Immutable([])
                                }
                                types={this.stringFieldTypes}
                                isSearchInputHidden={true}
                                isMultiple={false}
                                isDataSourceDropDownHidden
                                useDropdown
                                // isSelectedFromRepeatedDataSourceContext={true}
                                // isMultiple={true}
                            />
                            <SettingRow
                                label="Select number fields"
                                className="mt-3"
                            ></SettingRow>
                            <FieldSelector
                                useDataSources={this.props.useDataSources}
                                onChange={this.onFieldChange}
                                selectedFields={
                                    this.props.useDataSources[0].fields ||
                                    Immutable([])
                                }
                                isMultiple={true}
                                types={this.numberFieldTypes}
                                isSearchInputHidden={true}
                            />
                        </SettingSection>
                    )}
               
                {this.props.useDataSources &&                
                this.props.config.fieldsSelected.length > 0 && (
                    <>
                        <SettingSection>
                            <SettingRow label="Select a color for each field"></SettingRow>
                        </SettingSection>
                        <SettingSection>
                            {this.props.config.fieldsSelected.map(
                                (item, index) => {
                                    return (
                                        <SettingRow>
                                            {item.alias}
                                            <Select
                                                className="ml-2"
                                                onChange={(e) =>
                                                    this.onColorChange(e, index)
                                                }
                                                placeholder="Select a color..."
                                            >
                                                <Option value="Red">
                                                    <div
                                                        style={{
                                                            ...this.colorStyle,
                                                            ...this.redStyle,
                                                        }}
                                                    >
                                                        Red
                                                    </div>
                                                </Option>
                                                <Option value="Green">
                                                    <div
                                                        style={{
                                                            ...this.colorStyle,
                                                            ...this.greenStyle,
                                                        }}
                                                    >
                                                        Green
                                                    </div>
                                                </Option>
                                                <Option value="Blue">
                                                    <div
                                                        style={{
                                                            ...this.colorStyle,
                                                            ...this.blueStyle,
                                                        }}
                                                    >
                                                        Blue
                                                    </div>
                                                </Option>
                                                <Option value="Gold">
                                                    <div
                                                        style={{
                                                            ...this.colorStyle,
                                                            ...this.goldStyle,
                                                        }}
                                                    >
                                                        Gold
                                                    </div>
                                                </Option>
                                                <Option value="Pink">
                                                    <div
                                                        style={{
                                                            ...this.colorStyle,
                                                            ...this.pinkStyle,
                                                        }}
                                                    >
                                                        Pink
                                                    </div>
                                                </Option>
                                                <Option value="Purple">
                                                    <div
                                                        style={{
                                                            ...this.colorStyle,
                                                            ...this.purpleStyle,
                                                        }}
                                                    >
                                                        Purple
                                                    </div>
                                                </Option>
                                                <Option value="Sienna">
                                                    <div
                                                        style={{
                                                            ...this.colorStyle,
                                                            ...this.siennaStyle,
                                                        }}
                                                    >
                                                        Sienna
                                                    </div>
                                                </Option>
                                                <Option value="Silver">
                                                    <div
                                                        style={{
                                                            ...this.colorStyle,
                                                            ...this.silverStyle,
                                                        }}
                                                    >
                                                        Silver
                                                    </div>
                                                </Option>
                                                <Option value="Black">
                                                    <div
                                                        style={{
                                                            ...this.colorStyle,
                                                            ...this.blackStyle,
                                                        }}
                                                    >
                                                        Black
                                                    </div>
                                                </Option>
                                            </Select>
                                        </SettingRow>
                                    )
                                }
                            )}
                        </SettingSection>
                    </>
                )}
               {this.props.useDataSources &&
                this.props.useDataSources.length > 0 &&
                this.props.config.fieldsSelected &&
                this.props.config.fieldsSelected.length > 0 &&
                this.state.myCounter === this.props.config.fieldsSelected.length &&
                this.props.stringField !=="" &&
                (
                <>
                    <SettingSection>
                        <SettingRow>
                            <Button
                                className="text-center"
                                onClick={() => {
                                    console.log(
                                        'this.props.config.validate: ',
                                        this.props.config.validate
                                    )
                                    this.props.config.validate = true
                                    console.log(
                                        'this.props.config.validate: ',
                                        this.props.config.validate
                                    )
                                    alert('Validate !')
                                }}
                                size="default"
                                disabled={
                                    this.state.myCounter ===
                                    this.props.config.fieldsSelected.length
                                        ? false
                                        : true
                                }
                            >
                                Validate
                            </Button>
                        </SettingRow>
                    </SettingSection>
                </>
                )}
                {console.log(
                    'this.props.config.fieldsSelected: ',
                    this.props.config.fieldsSelected
                )
                }
                {console.log('this.props.config.stringField: ', this.props.config.stringField)}
            </div>
        )
    }
}
