export interface LoginProps{
  id : string
  pw : string
}

export interface LoginAccessProps{
  authority : string
  access_token : string
  refresh_token : string
}


// Aside
export interface AsideProps{
  val : string
  label : string
  detail : {
    dval : string
    dlabel : string
  }[]
}

export interface AsideListProps{
  asidelistchk : string
  setasidelistchk : Function
}


// Article
export interface ArticleProps{
  asidelistchk : string
  setasidelistchk : Function
}



/**
 * Components
 */

// Data Info
export interface DataInfoProps{
  dvcDatetimes : number[]
  datetimeidx : number
  setdatetimeidx : Function
}


// Gauge
export interface GaugeProps {
  iaq : number
}


// Gauge Info
export interface GauGeInfoProps {
  dvcDatas : DeviceDataProps
}

export interface GaugeBarProps {
  val : number
  color : string
}


// Radar
export interface RadarProps {
  dvcDatas : DeviceDataProps
}


// DeviceTable
export interface DeviceProps {
  mydevices : Map<string, any>
}


// Search
export interface SearchProps{
  cname : string
  lists : any[]
  listopt : number
  setFunc : Function
}


/**
 * Dashboard
 */
export interface LastDatasProps {
  hum : number,
  power_badn : boolean,
  pm25 : number,
  data_reg_dt : number,
  comm_badn : boolean,
  sensor_badn : boolean,
  power_st : boolean,
  pm10 : number,
  iaq : number,
  dvc_mng_nm : string,
  sn : string,
  tem : number
}

export interface LatestListsProps {
  latestdatas : LastDatasProps[]
  picker : number
  setpicker : Function
}

export interface LatestDetailsProps {
  latestdata : LastDatasProps
}

export interface GeojsonProps{
  type: string
  geometry: {
      type: string
      coordinates: number[][][][]
  }
}

export interface PickerProps{
  sn: string
  x: number
  y: number
}

export interface BlpProps{
  picker : number
}



/**
 * monitoring/data
 */
export interface DeviceAPIProps{
  sn : string
  st : string | null
  et : string | null
}

export interface DeviceDataProps{
  data_reg_dt : number
  pm1 : string | null
  pm25 : string | null
  pm10 : string | null
  tem : string | null
  hum : string | null
  hcho : string | null
  co2 : string | null
  co : string | null
  vocs : string | null
  reserve1 : string | null
  reserve2 : string | null
  reserve3 : string | null
  reserve4 : string | null
  reserve5 : string | null
  iaq : number
}

export interface MonitoringProps{
  cn : number
  setasidelistchk : Function
}

export interface MonitoringDeviceProps{
  dvclists : string[][]
  searchlists : string[][]
  setsearchlists : Function
  monitoringDvcClick : Function
}

export interface MonitoringDataProps{
  popuplists : string[][]
  setpopuplists : Function
  dvctab : React.MutableRefObject<number>
}


export interface DevicePopupProps{
  popuplists : string[][]
  dvctab : React.MutableRefObject<number>
  dvclistpopup : boolean
  setdvclistpopup : Function
  rerenderDvclists : Function
}

export interface DndProps {
  id : string
  index : number
  comps : string[]
  setComps : Function
  clickedsensor : string
  setclickedsensor : Function

  // dvcDatas : DeviceDataProps[]
  // dvcDatetimes : number[]
  // datetimeidx : number
  // setdatetimeidx : Function
}

export interface CompProps {
  id : string
  index : number
}



// Chatbot
export interface ChatActionProps{
  createChatBotMessage : Function
  setState : Function
  children : any
}

export interface ChatMessageProps{
  children : any
  actions : any
}

export interface ChatAnswerProps{
  text : string
  handler : any
  id : number
}

export interface ChatAnswersProps{
  chatbot_options : ChatAnswerProps[]
}

export interface ChatOptionProps{
  event : any
  type : string
}