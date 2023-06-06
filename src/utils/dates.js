export const calculateDiff = (date) => {
    let now = new Date()
    let before = new Date(date)

    let sec_diff =  Math.round((now.getTime() - before.getTime())/1000)
    
    if(sec_diff < 60){
        return "Il y a "+sec_diff+" secondes"
    }
    sec_diff = Math.round(sec_diff / 60)

    if(sec_diff < 60){
        return "Il y a "+sec_diff+" minutes"
    }
    sec_diff = Math.round(sec_diff / 60)

    if(sec_diff < 24){
        return "Il y a "+sec_diff+" heures"
    }

    sec_diff = Math.round(sec_diff / 24)
    return "Il y a "+sec_diff+" jours"

}

export const containsObject = (obj, list) => {
    var x;
    for (x in list) {
        if (list.hasOwnProperty(x) && list[x] === obj) {
            return true;
        }
    }

    return false;
}
