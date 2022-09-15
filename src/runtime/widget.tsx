import {
  React,
  IMDataSourceInfo,
  DataSource,
  DataSourceManager,
  FeatureLayerDataSource,
  FeatureDataRecord,
  AllWidgetProps,
  DataSourceComponent,
  // DataSourceStatus
} from 'jimu-core'
import {
  Table, Button
} from 'jimu-ui'
import { MinusOutlined } from 'jimu-icons/outlined/editor/minus'
import { PlusOutlined } from 'jimu-icons/outlined/editor/plus'

// interface State {
//   query: FeatureLayerQueryParams
// }

/**
 * This widget will show features from a configured feature layer
 */
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
    // console.log("this.props", this.props)
    // console.log("this.props.useDataSources", this.props.useDataSources)
    if (
      // this.props.useDataSources &&
      // this.props.useDataSources.length === 1 &&
      // this.props.useDataSources[0].fields &&
      this.props.config.validate === true
      //this.props.useDataSources[0].fields.length === 1
      // this.props.useDataSources[1].fields &&
      // this.props.useDataSources[2].fields &&
      // this.props.useDataSources[3].fields //&&
      // this.props.useDataSources[0].fields.length === 1
      ) {      
      return true;
    }
    return false;
  }

  componentDidMount() {
    console.log('this.props.config', this.props.config)
    console.log('this.props', this.props)
    console.log('this', this)
    // this.queryRecords()
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
    console.log(
      'this.props.config.fieldsSelected into queryRecords()',
      this.props.config.fieldsSelected
    )
    const featureLayerDs = this.getOriginDataSource() as FeatureLayerDataSource
    featureLayerDs
      .query({
        where: '1=1',
        outFields: [
          this.props.config.fieldsSelected[0].jimuName,
          this.props.config.fieldsSelected[1].jimuName,
          this.props.config.fieldsSelected[2].jimuName,
          this.props.config.fieldsSelected[3].jimuName,
          this.props.config.stringField         
        ],
      })
      .then(
        (result) => {
          // this.setState({ records: result })
          // console.log('result: ', result)
          // const records = result.records.map((r, i) => {
          //   const featureDataRecord = r as FeatureDataRecord
          //   const data = featureDataRecord.getData()
          //   data.objectid = i
          //   featureDataRecord.feature.attributes = data
          //   // console.log('r: ', r)
          //   // console.log(
          //   //   'r.feature.attributes.pays_csv_name: ',
          //   //   r.feature.attributes.pays_csv_name
          //   // )
          //   return r
          // })
          console.log('result in then: ', result.records);
          this.setState({ records: result.records })
        },
        (err) => {
            console.error(`${this.props.id} loading data error, `, err);
        }
      )
  }

  // dataRender = (ds: DataSource, info: IMDataSourceInfo) => {
  //   const fName = this.props.useDataSources[0].fields[0]
  //   return (
  //     <>
  //       <div>
  //         <input placeholder="Query value" ref={this.cityNameRef} />
  //         <button onClick={this.query}>Query</button>
  //       </div>
  //       <div>Query state: {info.status}</div>
  //       <div>Count: {ds.count}</div>

  //       <div
  //         className="record-list"
  //         color={{
  //           width: '100%',
  //           marginTop: '20px',
  //           height: 'calc(100% - 80px)',
  //           overflow: 'auto',
  //         }}
  //       >
  //         {ds && ds.getStatus() === DataSourceStatus.Loaded
  //           ? ds.getRecords().map((r, i) => {
  //               return <div key={i}>{r.getData()[fName]}</div>
  //             })
  //           : null}
  //       </div>
  //     </>
  //   )
  // }

  render() {
    if (!this.isDsConfigured()) {
      return <h3 style={{"color": "white"}}>Configure the widget</h3>
    }
    // const styleColor1 = {
    //   background: this.props.config.fieldsSelected[0].color;
    // }
    // console.log('styleColor1: ', styleColor1);
    // const styleColor2 = {
    //   background: this.props.config.fieldsSelected[1].color,
    // }
    // const styleColor3 = {
    //   background: this.props.config.fieldsSelected[2].color,
    // }
    // const styleColor4 = {
    //   background: this.props.config.fieldsSelected[3].color,
    // }
    // const bagdeStyle = {
    //   color: 'white',
    //   width: 'auto',
    //   height: 'auto',
    //   padding: '0.1rem',
    //   borderRadius: 5,
    // }
    const bagdeStyle = {
      color: 'white',
      height: 30,
      width: 30,
      borderRadius: 15,
      padding: '0.3rem',
      fontSize: '1rem',
    }   
    const displayBadges =  this.state.displayBadges ? "inline-block" : "none"
    const iconBtn = this.state.displayBadges ? <MinusOutlined size='m'></MinusOutlined> : <PlusOutlined size='m'></PlusOutlined>
    return (
    <>
      <div>
        <Button onClick={(e)=>{this.setState({ displayBadges: !this.state.displayBadges }); console.log(this.state.displayBadges);}} size="sm" className='mb-2'>
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
        
        <Table size="sm" hover style={{"display": displayBadges}}>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>{this.props.config.fieldsSelected[0].alias}</th>
                  <th>{this.props.config.fieldsSelected[1].alias}</th>
                  <th>{this.props.config.fieldsSelected[2].alias}</th>
                  <th>{this.props.config.fieldsSelected[3].alias}</th>
                </tr>
              </thead>
              <tbody>
        {this.state.records.map((item) => {
          // console.log(
          //   'item.feature.attributes.pays_csv_name: ',
          //   item.feature.attributes.pays_csv_name
          // )
          return (
              <tr scope="row">
                <td style={{ color: 'black' }}>
                  {item.feature.attributes[this.props.config.stringField]}
                </td>
                <td>
                  <span
                    style={{
                      ...bagdeStyle,
                      background: this.props.config.fieldsSelected[0].color,
                    }}
                    className="ml-5"
                  >
                    {
                      item.feature.attributes[
                        this.props.config.fieldsSelected[0].jimuName
                      ]
                    }
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      ...bagdeStyle,
                      background: this.props.config.fieldsSelected[1].color,
                    }}                    
                    className="ml-5"
                  >
                    {
                      item.feature.attributes[
                        this.props.config.fieldsSelected[1].jimuName
                      ]
                    }
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      ...bagdeStyle,
                      background: this.props.config.fieldsSelected[2].color,
                    }}
                    className="ml-5"
                  >
                    {
                      item.feature.attributes[
                        this.props.config.fieldsSelected[2].jimuName
                      ]
                    }
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      ...bagdeStyle,
                      background: this.props.config.fieldsSelected[3].color,
                    }}
                    className="ml-5"
                  >
                    {
                      item.feature.attributes[
                        this.props.config.fieldsSelected[3].jimuName
                      ]
                    }
                  </span>
                </td>
              </tr>
              )
            </tbody>          
        </Table>
      </div>
      </>     
    )
  }
}