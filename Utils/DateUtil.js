const DateUtil={
          getWeekDateRange: (n)=>{
                    const today = new Date();
                    const currentDayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
                    
                    // Calculate the start date of the week
                    const startDate = new Date(today);
                    console.log("day",currentDayOfWeek);
                    console.log("startDate",today.getDate());
                    startDate.setDate(today.getDate()+currentDayOfWeek+1+n*7);
                    // Calculate the end date of the week
                    const endDate = new Date(startDate);
                    endDate.setDate(startDate.getDate() + 7);
                    
                    return { startDate: startDate, endDate: endDate };
          },
          printDate(date){
                    if(!date) return "";
                    return date.getHours()+":"+date.getMinutes()+","+date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear();
          }

}
export default DateUtil;