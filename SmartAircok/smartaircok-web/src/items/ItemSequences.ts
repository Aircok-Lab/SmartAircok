export const dataseq = ['serial number', 'date', 'pm1','pm25','pm10','tem','hum','hcho','co2','co','vocs','reserve1','reserve2','reserve3','reserve4','reserve5']

export const colorseq = new Map<number, any>([[0, {text : '매우 나쁨', color : 'red'}],
                                            [1, {text : '나쁨', color : 'orange'}],
                                            [2, {text : '보통', color : 'green'}],
                                            [3, {text : '좋음', color : 'blue'}]])

export const dashseq = ['pm10', 'pm25', 'tem', 'hum']

export const categoriseq = new Map<string, any>([['pm10', {text : '미세먼지', range : [25, 50, 75]}], // 0~25  25~50  50~75  75~ 나눠지는 기준값 표기
                                            ['pm25', {text : '초미세먼지', range : [25, 50, 75]}],
                                            ['tem', {text : '온도', range : [25, 50, 75]}],
                                            ['hum', {text : '습도', range : [25, 50, 75]}]])

export const componentseq = ['info', 'gauge', 'gaugeinfo', 'radar', '11', '22']

export const dvcstateseq = [{val : 'all', label : '전체', color:'blue'},
                            {val : 'cg', label : '수신 중', color:'green'}, // condition good
                            {val : 'cb', label : '수신 실패', color:'red'}, // conditiaon bad
                            {val : 'cbc', label : '통신 불량', color:'yellow'}, // communicate
                            {val : 'cbs', label : '센서 불량', color:'yellow'}, // sensor
                            {val : 'cbp', label : '전원 불량', color:'yellow'}, // power
                            {val : 'cbo', label : '전원 꺼짐', color:'yellow'}] // power on off

export const asideseq = [
  {
    val : 'dashboard', 
    label : '대시보드',
    detail : [
    ]
  },
  {
    val : 'monitoring', 
    label : '모니터링',
    detail : [
      {dval : 'device', dlabel : '장비 모니터링'},
      {dval : 'data', dlabel : '데이터 모니터링'},
      {dval : 'statistics', dlabel : '통계'},
    ]
  },
  {
    val : 'manage', 
    label : '관리',
    detail : [
      {dval : 'user', dlabel : '사용자 관리'},
      {dval : 'device', dlabel : '장비 관리'},
      {dval : 'position', dlabel : '위치 관리'},
      {dval : 'common', dlabel : '공통 코드 관리'},
      {dval : 'api', dlabel : 'API 관리'},
    ]
  },
  {
    val : 'board', 
    label : '게시판',
    detail : [
      {dval : 'free', dlabel : '자유 게시판'},
      {dval : 'qna', dlabel : 'Q&A'},
      {dval : 'faq', dlabel : '1:1 문의'},
    ]
  }
]