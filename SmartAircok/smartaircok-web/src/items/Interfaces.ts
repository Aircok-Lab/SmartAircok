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

// Gauge Info
export interface GauGeInfoProps {
  dvcDatas : DeviceDataProps
}


// Gauge
export interface GaugeChartProps {
  iaq : number
}


// Line Chart
export interface LineChartProps{
  datas : DeviceDataProps[]
  sensor : string
}


// Bar
export interface BarProps {
  val : number
  color : string
}


// Radar
export interface RadarChartProps {
  datas : DeviceDataProps[]
  sensor : string
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

// Calendar
export interface DatePickerProps{
  startDate : Date
  setStartDate : Function
  endDate : Date
  setEndDate : Function
}

export interface CalendarProps{
  sdate : Date
  edate : Date
  type : string
  setDate : Function
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
  pm1 : number | null
  pm25 : number | null
  pm10 : number | null
  tem : number | null
  hum : number | null
  hcho : number | null
  co2 : number | null
  co : number | null
  vocs : number | null
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
  sensorvalue : number
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
