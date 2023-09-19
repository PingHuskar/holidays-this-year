const getNationFlag = (code: string) => {
    switch (code) {
        case `th`:
            return `🇹🇭`
        case `en`:
            return `🇺🇸`
        default:
            return ``
    }
}

export default getNationFlag