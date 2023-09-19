const dicts = (name: string, lang: string, num: number) => {
  switch (name) {
    case `daysago`:
      return lang === "en" ? `${num - 1} days ago` : `${num - 1} วันที่ผ่านมา`;
    case `nextxdays`:
      return lang === "en"
        ? `coming in ${Math.abs(num) + 1} days`
        : `จะถึงในอีก ${Math.abs(num) + 1} วัน`;
    case `title`:
      return lang === "en" ? `Holiday in Thailand` : `วันหยุดไทย`;
    case `listStyleType`:
      return lang === "en" ? `` : `thai`;
    default:
      return ``;
  }
};

export default dicts;
