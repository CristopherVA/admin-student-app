import moment from 'moment';

export const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
}

export const formatYear = (date) => {
    date = parseInt(date)
    return moment(date).format('DD/MM/YYYY');
}

export  const confirmLocationUpdate = (location) => {
    return (location === "/update") ? true : false
}