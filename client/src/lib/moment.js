import moment from 'moment'
export const howMushTime = (time)=>{
    const inTime = moment(time)
    var now = moment();
    const base =  moment.duration(now.diff(inTime))//
    const asSeconds =base.asSeconds();
    const asMinutes = base.asMinutes();
    const asHours = base.asHours();
    const asDays = base.asDays();
    if(asSeconds<60) return '방금전'
    else if(asMinutes<60) return Math.floor(asMinutes)  +'분전'
    else if(asHours<24) return Math.floor(asHours)+'시간전'
    else if(asDays<7) return Math.floor(asDays)+'일전'
    else if(asDays<30) return Math.floor(asDays/7)+'주전'
    else if(asDays<365) return Math.floor(asDays*30)+'달전'
    else return Math.floor(asDays*365)+'년전'
}