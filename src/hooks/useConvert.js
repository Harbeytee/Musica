export default function convert(val) {
    let min = 0
    let sec = val
    
    while (sec >= 60 ) {
        min = min + 1
      sec = sec - 60
       
    }
    return `${min}:${sec >= 10 ? sec : '0' + sec}`
    
}