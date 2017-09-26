let $ = require('jquery')  // jQuery now loaded and assigned to $
var moment = require('moment');

class timeGap{
    constructor(pastString){
        this.pastDateString=pastString
    }
    updateCurrentTime() {
        var currentdate = new Date();
        this.currentDateString = currentdate.getFullYear() + "/"
                                 + (currentdate.getMonth()+1)  + "/" 
                                 + currentdate.getDate() + " "
                                 + currentdate.getHours() + ":"  
                                 + currentdate.getMinutes() + ":" 
                                 + currentdate.getSeconds();
    }
    getTimeGap(){
        this.updateCurrentTime();
        var ms = moment(this.currentDateString,"YYYY/MM/DD HH:mm:ss").diff(moment(this.pastDateString,"YYYY/MM/DD HH:mm:ss"));
        ms = (ms);
        this.second = (ms/1000);
        this.minute = (parseInt(ms/1000/60));
        this.hour = (parseInt(ms/1000/60/60));
        this.day = (parseInt(ms/1000/60/60/24));
        this.month = (parseInt(ms/1000/60/60/24/30));
        this.year = (parseInt(ms/1000/60/60/24/30/12));
    }
}

let name = document.getElementById('name').value
let date = document.getElementById('date').value
let time = document.getElementById('time').value
let gap = new timeGap(date + " " + time + ":00") 

function getTimeGap(){ 
    gap.getTimeGap()
    $('#nm').text(name)
    $('#gap_year').text(gap.year + " year(s)")
    $('#gap_month').text(gap.month + " month(s)")
    $('#gap_day').text(gap.day + " day(s)")
    $('#gap_hour').text(gap.hour + " hour(s)")
    $('#gap_minute').text(gap.minute + " minute(s)")
    $('#gap_second').text(gap.second + " second(s)")  
}

$('#countbtn').on('click', () => {
    name = document.getElementById('name').value
    date = document.getElementById('date').value
    time = document.getElementById('time').value
    gap = new timeGap(date + " " + time + ":00")
    getTimeGap();
    let intervalID = setInterval(getTimeGap, 1000);
})

