import {
  React,
  Immutable,
  IMFieldSchema,
  DataSource,
  UseDataSource,
  JimuFieldType,
  css
} from 'jimu-core'
import { AllWidgetSettingProps } from 'jimu-for-builder'
import {
  DataSourceSelector,
  AllDataSourceTypes,
  FieldSelector,
} from 'jimu-ui/advanced/data-source-selector'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { ColorPicker } from 'jimu-ui/basic/color-picker'
import { Select, Option, Button } from 'jimu-ui'

export default class Setting extends React.PureComponent<
  AllWidgetSettingProps<{}>,
  {}
> {
  supportedTypes = Immutable([AllDataSourceTypes.FeatureLayer])
  numberFieldTypes = Immutable([JimuFieldType.Number])

  onFieldSelected = (allSelectedFields: IMFieldSchema[], ds: DataSource) => {
    // console.log('allSelectedFields', allSelectedFields)
    this.props.config.fieldsSelected = allSelectedFields
    // console.log(
    //   'this.props.config.fieldsSelected: ',
    //   this.props.config.fieldsSelected
    // )
    const useDsWithFields = {
      ...this.props.useDataSources[0],
      ...{ fields: allSelectedFields.map((f) => f.jimuName) },
    }
    // console.log('fields', fields)

    /**
     * After selecting a field, update use data source, output data source and config.
     * Need to save used fields to use data source, it is allow framework to know these fields are used.
     */
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
  }

  onToggleUseDataEnabled = (useDataSourcesEnabled: boolean) => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSourcesEnabled,
    })
  }

  onDataSourceChange = (useDataSources: UseDataSource[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: useDataSources,
    })
  }
 
  render() {
    const colorStyle = {     
      color: 'white',
      width: "auto",
      height: "auto",
      padding: '0.1rem',
      borderRadius: 5
    };
    const redStyle = {
      background: 'red',
    };
    const greenStyle = {
      background: 'green',
    };
    const blueStyle = {
      background: 'blue',
    };
    const goldStyle = {
      background: 'gold',
    };
    const silverStyle = {
      background: 'silver',
    };
    const blackStyle = {
      background: 'black',
    };
    const purpleStyle = {
      background: 'purple',
    };
    const pinkStyle = {
      background: 'pink',
    }
    const siennaStyle = {
      background: 'sienna',
    };
    return (
      <div className="widget-settings p-2">
        <SettingSection>
          <SettingRow>
            <DataSourceSelector
              types={this.supportedTypes}
              useDataSources={this.props.useDataSources}
              useDataSourcesEnabled={this.props.useDataSourcesEnabled}
              onToggleUseDataEnabled={this.onToggleUseDataEnabled}
              onChange={this.onDataSourceChange}
              widgetId={this.props.id}
              hideAddDataButton={true} 
              hideDataView={true} 
              hideCreateViewButton={true} 
                
            />
          </SettingRow> 
        </SettingSection>
        {this.props.useDataSources && this.props.useDataSources.length > 0 && (
          <SettingSection>
            <SettingRow label="Select fields"></SettingRow>                
            <FieldSelector
              useDataSources={this.props.useDataSources}
              onChange={this.onFieldSelected}
              // onChange={()=>console.log("this", this)}
              selectedFields={
                this.props.useDataSources[0].fields || Immutable([])
              }
              isMultiple={true}
              types={this.numberFieldTypes}
              isSearchInputHidden={true}
            />
            <Button
            onClick={function noRefCheck(){}}
            size="default"
          >
            Validate
          </Button>
          </SettingSection>    
        )}
        {/* <SettingRow>
          <ColorPicker
            height={26}
            icon="none"
            onChange={function noRefCheck() {}}
            onClick={function noRefCheck() {}}
            placement="bottom"
            // presetColors="colors2"
            width={30}
          />
        </SettingRow> */}
        <SettingSection>
        {this.props.config.fieldsSelected.length > 0 &&  <SettingRow label="Select a color for each field"></SettingRow>}
          {this.props.config.fieldsSelected.length > 0 &&            
            this.props.config.fieldsSelected.map((item, index) => {
              return (
                <SettingRow >
                  {item.alias}
                  <Select
                    className='ml-2'
                    onChange={(e)=>
                      {                        
                        this.props.config.fieldsSelected[index].color = e.currentTarget.value                        
                      }
                    }
                    placeholder="Select a color..."
                  >                    
                    <Option value="Red">
                      <div style={{...colorStyle, ...redStyle}}>Red</div>                     
                    </Option>                    
                    <Option value="Green">
                      <div style={{...colorStyle, ...greenStyle}}>Green</div>                     
                    </Option>
                    <Option value="Blue">
                      <div style={{...colorStyle, ...blueStyle}}>Blue</div>                      
                    </Option>                   
                    <Option value="Gold">
                      <div style={{...colorStyle, ...goldStyle}}>Gold</div>
                      
                    </Option>                   
                    <Option value="Pink">
                      <div style={{...colorStyle, ...pinkStyle}}>Pink</div>                      
                    </Option>                    
                    <Option value="Purple">
                      <div style={{...colorStyle, ...purpleStyle}}>Purple</div>                     
                    </Option>                   
                    <Option value="Sienna">
                      <div style={{...colorStyle, ...siennaStyle}}>Sienna</div>                     
                    </Option>                    
                    <Option value="Silver">
                      <div style={{...colorStyle, ...silverStyle}}>Silver</div>                      
                    </Option>
                    <Option value="Black">
                      <div style={{...colorStyle, ...blackStyle}}>Black</div>                     
                    </Option>
                  </Select>
                  {/* <ColorPicker
                    height={26}
                    icon="none"
                    onChange={function noRefCheck(e) {
                      console.log(e)
                      console.log('this: ', this)
                    }}
                    onClick={function noRefCheck() {}}
                    placement="bottom"
                    // presetColors={[{ label: 'Red', value: '#FF0000' }]}
                    type="default"
                    width={30}
                  /> */}
                </SettingRow>
              // )
            })}
        </SettingSection>
      </div>
    )
  }
}
