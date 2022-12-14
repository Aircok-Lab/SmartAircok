// import { Dispatch, SetStateAction } from 'react'

export interface LoginProps{
  id : string
  pw : string
}

export interface LoginAccessProps{
  authority : string
  access_token : string
  refresh_token : string
}

export interface AsideProps{
  val : string
  label : string
}

export interface AsideListProps{
  asidelist : AsideProps[]
  asidelistchk : string
  // setasidelistchk : Dispatch<SetStateAction<string>>
  setasidelistchk : Function
}

export interface ArticleProps{
  asidelist : AsideProps[]
  asidelistchk : string
}

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

export interface GaugeProps {
  param1 : number
  param2 : number
  param3 : number
  param4 : number
  param5 : number
}

export interface GauGeInfoProps {
  gaugeparam : GaugeProps
}

export interface GaugeInfoBarProps {
  val : number
}

export interface DndProps {
  id : string
  index : number
  // moveComp : ({ id, index }: CompProps) => void
  moveComp : Function
  gaugeparam : GaugeProps
}

export interface CompProps {
  id : string
  index : number
}