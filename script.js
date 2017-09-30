var moment = require('moment');
var $ = require('jquery')

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
        var currentDate = moment(this.currentDateString,"YYYY/MM/DD HH:mm:ss")
        var pastDate = moment(this.pastDateString,"YYYY/MM/DD HH:mm:ss")
        var ms = currentDate.diff(pastDate);
        ms = (ms);
        this.second = (ms/1000);
        this.minute = (parseInt(ms/1000/60));
        this.hour = (parseInt(ms/1000/60/60));
        this.day = (parseInt(ms/1000/60/60/24));
        this.month = (currentDate.year()-pastDate.year())*12
        this.month -= pastDate.month()
        this.month += currentDate.month()
        this.year = (parseInt(this.month/12));
    }
}

function buttonTimeClick(num){
    var event = document.getElementById('event' + num.toString()).value
    var date = document.getElementById('date' + num.toString()).value
    var time = document.getElementById('time' + num.toString()).value
    if((date == "")|(time == "")){
        alert("Please input date and time!!!")
    } else{
        if(event != ""){
            $('#buttonEvent' + num.toString()).val(event)
        }else{
            $('#buttonEvent' + num.toString()).val("Untitle event No." + num.toString())
        }
        var gap = new timeGap(date + " " + time + ":00")
        setInterval( () => {
            gap.getTimeGap()
            document.getElementById("gap_year" + num.toString()).innerHTML = gap.year + " Year(s)"
            document.getElementById("gap_month" + num.toString()).innerHTML = gap.month + " Month(s)"
            document.getElementById("gap_day" + num.toString()).innerHTML = gap.day + " Day(s)"
            document.getElementById("gap_hour" + num.toString()).innerHTML = gap.hour + " Hour(s)"
            document.getElementById("gap_minute" + num.toString()).innerHTML = gap.minute + " Minute(s)"
            document.getElementById("gap_second" + num.toString()).innerHTML = gap.second + " Second(s)"
        }, 100)
    }
}

let count = 0;
let timeBlock = "<div class=\"box\" id=\"blockDefault\">\n<h4>\nEvent: <input type=\"text\" id=\"event\"><br><br>\nDate: <input type=\"date\" id=\"date\" required>\nTime: <input type=\"time\" id=\"time\" required><br><br>\n</h4>\n<button type=\"button\" id = \"buttonTime\" onclick=\"buttonTimeClick()\">Set time</button>\n<center>\n<h3 id = \"gap_year\"></h3>\n<h3 id = \"gap_month\"></h3>\n<h3 id = \"gap_day\"></h3>\n<h3 id = \"gap_hour\"></h3>\n<h3 id = \"gap_minute\"></h3>\n<h3 id = \"gap_second\"></h3>\n</center>\n</div><br>\n"
function buttonAddClick() {
    $('#timeAll').append("<input type=\"button\" id=\"buttonEvent\" value=\"New event\">")
    $('#timeAll').append(timeBlock);
    /* Just hide it */
    $('#blockDefault').hide(0)
    /* Create new id */
    var newBlock = '#block' + count.toString()
    var newButtonEvent = '#buttonEvent' + count.toString()
    var newEvent = '#event' + count.toString()
    var newDate = '#date' + count.toString()
    var newTime = '#time' + count.toString()
    var newButtonTime = '#buttonTime' + count.toString()
    var newGapYear = '#gap_year' + count.toString()
    var newGapMonth = '#gap_month' + count.toString()
    var newGapDay = '#gap_day' + count.toString()
    var newGapHour = '#gap_hour' + count.toString()
    var newGapMinute = '#gap_minute' + count.toString()
    var newGapSecond = '#gap_second' + count.toString()
    /* Change all id */
    $('#blockDefault').attr('id', 'block' + count.toString())
    $('#buttonEvent').attr('id', 'buttonEvent' + count.toString())
    $('#event').attr('id', 'event' + count.toString())
    $('#date').attr('id', 'date' + count.toString())
    $('#time').attr('id', 'time' + count.toString())
    $('#buttonTime').attr('onclick', 'buttonTimeClick(' + count.toString() + ')')
    $('#buttonTime').attr('id', 'buttonTime' + count.toString())
    $('#gap_year').attr('id', 'gap_year' + count.toString())
    $('#gap_month').attr('id', 'gap_month' + count.toString())
    $('#gap_day').attr('id', 'gap_day' + count.toString())
    $('#gap_hour').attr('id', 'gap_hour' + count.toString())
    $('#gap_minute').attr('id', 'gap_minute' + count.toString())
    $('#gap_second').attr('id', 'gap_second' + count.toString())
    /* Event button setup */
    $(newButtonEvent).on('click', () => {
        $(newBlock).toggle(200)
    })
    count++;
}