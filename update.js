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
        var momentCurrent = moment(this.currentDateString,"YYYY/MM/DD HH:mm:ss")
        var momentPast = moment(this.pastDateString,"YYYY/MM/DD HH:mm:ss")
        var ms = momentCurrent.diff(momentPast);
        this.second = (ms/1000);
        this.minute = (parseInt(ms/1000/60));
        this.hour = (parseInt(ms/1000/60/60));
        this.day = (parseInt(ms/1000/60/60/24));
        this.month = (momentCurrent.year() - momentPast.year())*12;
        this.month -= momentPast.month();
        this.month += momentCurrent.month();
        this.year = (parseInt(this.month/12));
    }
}

function updateGap(){
    var name = document.getElementById('name').value
    var date = document.getElementById('date').value
    var time = document.getElementById('time').value
    var gap = new timeGap(date + " " + time + ":00")
    gap.getTimeGap()
    document.getElementById("nm").innerHTML = "Hello " + name
    document.getElementById("gap_year").innerHTML = gap.year + " Year(s)"
    document.getElementById("gap_month").innerHTML = gap.month + " Month(s)"
    document.getElementById("gap_day").innerHTML = gap.day + " Day(s)"
    document.getElementById("gap_hour").innerHTML = gap.hour + " Hour(s)"
    document.getElementById("gap_minute").innerHTML = gap.minute + " Minute(s)"
    document.getElementById("gap_second").innerHTML = gap.second + " Second(s)"
}

function buttonClick(){
    updateGap();
    let intervalID = setInterval(updateGap, 1000);
}

