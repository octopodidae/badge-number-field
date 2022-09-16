import {
  React,
  DataSourceManager,
  FeatureLayerDataSource,
  AllWidgetProps
} from 'jimu-core'
import {
  Table, Button
} from 'jimu-ui'
import { MinusOutlined } from 'jimu-icons/outlined/editor/minus'
import { PlusOutlined } from 'jimu-icons/outlined/editor/plus'

export default class Widget extends React.PureComponent<
  AllWidgetProps<{}>,
  State
> {
  constructor(props) {
    super(props)
    this.state = {
      records: [],
      displayBadges: false
    }
  }

  isDsConfigured = () => {    
    if (      
      this.props.config.validate === true      
    ) {      
      return true;
    }
    return false;
  }

  componentDidMount() {
    // console.log('this.props', this.props)
    if (this.isDsConfigured()) {
      this.queryRecords()
    }
  } 

  getOriginDataSource = () => {
    return DataSourceManager.getInstance().getDataSource(
      this.props.useDataSources?.[0]?.dataSourceId
    )
  }

  queryRecords = () => {
    // console.log(
    //   'this.props.config.fieldsSelected into queryRecords()',
    //   this.props.config.fieldsSelected
    // )
    const outputFields = this.props.config.fieldsSelected.map((f, index) => {
      // console.log('params.jimuName: ', params.jimuName) 
      return f.jimuName    
    })
    
    const featureLayerDs = this.getOriginDataSource() as FeatureLayerDataSource
    featureLayerDs
      .query({
        where: '1=1',
        outFields: [...outputFields, this.props.config.stringField],
      })
      .then(
        (result) => {          
          this.setState({ records: result.records })
        },
        (err) => {
            console.error(`${this.props.id} loading data error, `, err);
        }
      )
  }

  render() {

    if (!this.isDsConfigured()) {
      return <h3 style={{"color": "white"}}>Configure the widget</h3>
    }
   
    const bagdeStyle = {
      color: 'white',
      height: 30,
      width: 30,
      borderRadius: 15,
      padding: '0.3rem',
      fontSize: '1rem',
    }  

    const displayBadges =  this.state.displayBadges ? "inline-block" : "none"

    const iconBtn = this.state.displayBadges ?
    <MinusOutlined size='m'></MinusOutlined> :
    <PlusOutlined size='m'></PlusOutlined>

    return (
    <>
      <div>
        <Button
          onClick={(e)=>{this.setState({ displayBadges: !this.state.displayBadges })}}
          size="sm"
          className='mb-2'>
        {iconBtn}    
          Display Badges
        </Button> 
          
      </div>
      
      <div
        className="widget-badge-number-field"
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '800px',
          overflow: 'auto'          
        }}
      >
        {/* {console.log('this.state.records', this.state.records)} */}
        
        <Table size="sm" style={{"display": displayBadges}}>
              <thead>
                <tr>
                  <th>{this.props.config.stringField}</th>
                  {this.props.config.fieldsSelected.map((f)=>{
                    return(
                      <th>{f.alias}</th>
                    )
                  })}                 
                </tr>
              </thead>
              <tbody>
        {this.state.records.map((item) => {
          // console.log(
          //   item
          // )
          return (
              <tr scope="row">
                <td style={{ color: 'black' }}>
                  {item.feature.attributes[this.props.config.stringField]}
                </td>
                {
                 this.props.config.fieldsSelected.map((params, index) => {                  
                  return(
                    <td>
                      <span
                        style={{
                          ...bagdeStyle,
                          background: this.props.config.fieldsSelected[index].color,
                        }}
                        className="ml-5"
                      >
                        {
                          item.feature.attributes[
                            this.props.config.fieldsSelected[index].jimuName
                          ]
                        }
                      </span>
                  </td>
                  )
                 })
                }
                
              </tr>
              )
            </tbody>          
        </Table>
      </div>
      </>     
    )
  }
}