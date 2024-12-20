const now = new Date()
//Mon Dec 02 2024 11:20:58 GMT+0100 (Central European Standard Time)

now.getFullYear()
//2024 ==> returns current year

now.getMonth()
//11 ==> returns index of current month, being 0 January and 11 December

now.getDate()
//2 ==> returns number of day of the month

now.getHours()
//11 ==> returns current hour (not minutes)

---------

const daysInMonth = new Date(year, month + 1, 0).getDate()
//31 ==> returns num of days of the month

const firstDayOfWeek = new Date(year, month, 1)
const dayOfWeek = firstDayOfWeek.getDay()
//0 for Sunday, 1 for Monday

añadir TEXT al final d cada util