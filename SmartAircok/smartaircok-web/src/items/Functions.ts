import { categoriseq, colorseq } from './ItemSequences'

function getRange(chktxt : string, chkval : number){
  const rangelist = categoriseq.get(chktxt).range

  for(var i = 0; i < rangelist.length; i++){
  if(rangelist[i] > chkval)
    return i
  }
  return 0
}

export function getDataStyle(chktxt : string, chkval : number){
  return colorseq.get(getRange(chktxt, chkval))
}