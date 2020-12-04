/*
 * dateUtils.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

const formatIsoDate = (isoDate) => {
   const dateVal = new Date(isoDate);
   return `${dateVal.getMonth()}/${dateVal.getDate()}/${dateVal.getFullYear()} GMT ${getTimezoneOffset()}`;
};

const timezoneGeo = Intl.DateTimeFormat().resolvedOptions().timeZone;

const getTimezoneOffset = ()=> {
   function z(n){return (n<10? '0' : '') + n;}
   var offset = new Date().getTimezoneOffset();
   var sign = offset < 0? '+' : '-';
   offset = Math.abs(offset);
   return sign + z(offset/60 | 0) + z(offset%60);
};

function padNumber (num) {
   return String(num).length == 1 ? `0${num}` : `${num}`;
}

function timeConverter(UNIX_timestamp)  {
   var a = new Date(UNIX_timestamp * 1000);
   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   var year = a.getFullYear();
   var month = months[a.getMonth()];
   var date = a.getDate();
   var hour = a.getHours();
   var min = a.getMinutes();
   var sec = a.getSeconds();
   var time = date + ' ' + month + ' ' + year + ' ' + padNumber(hour) + ':' + padNumber(min) + ':' + padNumber(sec) ;
   return time;
}
export {
   formatIsoDate,timezoneGeo,timeConverter
};
