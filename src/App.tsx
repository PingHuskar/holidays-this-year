import { useState } from 'react'
import Holidays from 'date-holidays'
import './App.css'
import moment from 'moment'
import months from './components/months'
import extendHoliday from './components/extendHoliday'
import dicts from './components/dicts'
import getNationFlag from './components/getNationFlag'
import ThaiHolidaysDict from './components/ThaiHolidaysDict'

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
      <h1>{dicts(`title`,lang,0)} {parseInt(thisYear)+ (lang === `th` ? 543 : 0)}</h1>
      <h2>Time Zone: {hd.getTimezones()}</h2>
      <h2>Language: {hd.getLanguages().map((l,i)=> {
        const ll: string = l.toLocaleLowerCase()
        return <span key={i} className='pointer' onClick={(e) => {
          e.preventDefault()
          setLang(ll)
        }}>
          {i > 0 ? ',' : ''}{l.toLocaleUpperCase()} {getNationFlag(ll)}
        </span>
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
