exports.parseDate = (date) => {
  // date must be of type Date
  date = date instanceof Date ? date : new Date(date); 
  // let parsedDate = date.toLocaleDateString("en-US", 
  //   { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
  // );
  // return parsedDate.replace(/,/g, '');
  return date.toDateString()
}