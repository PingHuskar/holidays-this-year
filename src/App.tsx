import { useState } from 'react'
import Holidays from 'date-holidays'
import './App.css'
import moment from 'moment'
const months: any = {
  "en": ["January","February","March","April","May","June","July","August","September","October","November","December"],
  "th": [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
}
const dicts: any = {
  daysago: {
    "en": `days ago`,
    "th": `วันที่แล้ว`,
  },
  nextxdays: {
    "en": `coming in`,
    "th": `รออีก`,
  },
}

function App() {
  const [lang, setLang] = useState(localStorage.getItem(`lang`) || `th`)
  const hd = new Holidays(`TH`)
  const TODAYDATE = moment(new Date())
  return (
    <div className="App">
      <h1>Holiday In {`TH`} {moment().format('Y')}</h1>
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
      <ol>
        {hd.getHolidays().map((d,i)=> {
          const daysago = parseInt(moment.duration(TODAYDATE.diff(d.start)).asDays().toFixed(0))
          return <li key={i}>
            {/* {d.start.toDateString()} */}
            {d.start.getDate()} {months[lang][d.start.getMonth()]} &nbsp;
            ({daysago > 0 ? `${daysago-1} ${dicts.daysago[lang]}` : `${dicts.nextxdays[lang]} ${Math.abs(daysago)+1}`})
          </li>
        })}
      </ol>
    </div>
  )
}

export default App
