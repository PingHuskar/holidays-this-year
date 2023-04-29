import { useState } from 'react'
import Holidays from 'date-holidays'
import './App.css'
import moment from 'moment'

const months: any = {
  "en": ["January","February","March","April","May","June","July","August","September","October","November","December"],
  "th": [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
}

const dicts = (name: string, lang: string, num: number) => {
  switch (name) {
    case `daysago`:
      return lang === "en" ? `${num-1} days ago` : `${num-1} วันที่ผ่านมา`
    case `nextxdays`:
      return lang === "en" ? `coming in ${Math.abs(num)+1} days` : `จะถึงในอีก ${Math.abs(num)+1} วัน`
    case `title`:
      return lang === "en" ? `Holiday in Thailand` : `วันหยุดไทย`
    case `listStyleType`:
      return lang === "en" ? `` : `thai`
    default:
      return ``
  }
}

const ThaiHolidaysDict: any = {
  "New Year's Day": `วันปีใหม่`,
  "Makha Bucha": `วันมาฆบูชา`,
  "Chakri Memorial Day": `วันจักรี`,
  "Songkran Festival": `วันสงกรานต์`,
  "Coronation Day": `วันฉัตรมงคล`,
  "Vesak Day": `วันวิสาขบูชา`,
  "Queen Suthida's Birthday": `วันเฉลิมพระชนมพรรษาสมเด็จพระราชินิ`,
  "King's Birthday": `วันเฉลิมพระชนมพรรษา`,
  "Asalha Puja": `วันอาสาฬหบูชา`,
  "Buddhist Lent": `วันเข้าพรรษา`,
  "The Queen Mother's Birthday": `วันเฉลิมพระชนมพรรษา สมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง`,
  "King Bhumibol Adulyadej Memorial Day": `วันคล้ายวันสวรรคต พระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร`,
  "King Chulalongkorn Day": `วันปิยมหาราช`,
  "King Bhumibol Adulyadej's Birthday": `วันคล้ายวันพระราชสมภพของพระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร และวันพ่อแห่งชาติ`,
  "Constitution Day": `วันรัฐธรรมนูญ`,
  "New Year's Eve": `วันสิ้นปี`,
  "Labour Day": `วันแรงงานแห่งชาติ`,
}

const extendHoliday = [
  {"name": `Labour Day`, "rule": `05-01`, "prev": `04-30`},
]

const hd = new Holidays(`TH`)
const TODAYDATE = moment(new Date())
const thisYear = moment().format('Y')
const z = hd.getHolidays(parseInt(thisYear))
for (let exh of extendHoliday) {
  z.push({
    "date": `${thisYear}-${exh.rule} 00:00:00`,
    "start": new Date(`${thisYear}-${exh.prev}T17:00:00.000Z`),
    "end": new Date(`${thisYear}-${exh.rule}T17:00:00.000Z`),
    "name": `${exh.name}`,
    "type": "public",
    "rule": `${exh.rule}`
  })
}
// console.log(z.sort((a,b) => (a.rule > b.rule) ? 1 : ((b.rule > a.rule) ? -1 : 0)))
function App() {
  const [lang, setLang] = useState(localStorage.getItem(`lang`) || `th`)
  return (
    <div className="App">
      <h1>{dicts(`title`,lang,0)} {moment().format('Y')}</h1>
      <h2>Time Zone: {hd.getTimezones()}</h2>
      <h2>Language: {hd.getLanguages().map((l,i)=> {
        const ll: string = l.toLocaleLowerCase()
        if (i) {
          return <span key={i} onClick={(e) => {
            e.preventDefault()
            setLang(ll)
          }}>,{l.toLocaleUpperCase()}</span>
        }
        return <span key={i} onClick={(e) => {
          e.preventDefault()
          setLang(ll)
        }}>{l.toLocaleUpperCase()}</span>
      })}</h2>
      <hr />
      <ol>
        {z.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
        .map((d,i)=> {
          const daysago = parseInt(moment.duration(TODAYDATE.diff(d.start)).asDays().toFixed(0))
          return <li style={{listStyleType: dicts(`listStyleType`,lang,0)}} key={i}>
            <span>
              {lang === `th` ? ThaiHolidaysDict[d.name] : d.name}
            </span>
            <span>
              <span>
              {d.start.getDate()} {months[lang][d.start.getMonth()]}
              </span>
              <span>
              ({daysago > 0 ? `${dicts(`daysago`,lang,daysago)}` : `${dicts(`nextxdays`,lang,daysago)}`})
              </span>
            </span>
          </li>
        })}
      </ol>
    </div>
  )
}

export default App
