import {LAUNCHALERT} from './types_alerts'

export const launchAlert = (msg, sts) => {
    const status = getStatus(sts)
    return {
        type: LAUNCHALERT,
        payload: {msg, status},
      };
}

const getStatus = (status) => {
    let res = ''
    switch(status){
        case 400:
            res = 'error'
            break
        case 404:
            res = 'error'
            break
        case 200:
            res = 'success'
            break
        case 201:
            res = 'success'
            break
        case 1:
            res = 'warning'
            break
        default:
            res = ''
            break
   }
   return res    
}