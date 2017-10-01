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
        var currentDate = moment(this.currentDateString,"YYYY/M/D H:m:s")
        var pastDate = moment(this.pastDateString,"D MMMM, YYYY HH:mm:ss")
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
var intervalID
function buttonTimeClick(num){
    clearInterval(intervalID)
    var event = document.getElementById('event' + num.toString()).value
    var date = document.getElementById('date' + num.toString()).value
    var time = document.getElementById('time' + num.toString()).value
    if((date == "")|(time == "")){
        alert("Please input date and time!!!")
    } else{
        if(event != ""){
            $('#buttonEvent' + num.toString()).val(event)
            $('#nameEvent' + num.toString()).text(event)
        }else{
            $('#buttonEvent' + num.toString()).val("Untitle event No." + num.toString())
            $('#nameEvent' + num.toString()).text("Untitle event No." + num.toString())
        }
        var gap = new timeGap(date + " " + time + ":00")
        intervalID = setInterval( () => {
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

var count = 0;
var block = "<div id=\"buttonBlock\">\n\
<br><input type=\"button\" class=\"waves-effect waves-light btn blue\" id=\"buttonEvent\" value=\"New event\"> \n\
<input type=\"button\" class=\"waves-effect waves-light btn blue\" id=\"buttonDel\" value=\"Del\">\n\
<br>\n\
</div>\n\
<div id=\"blockDefault\" class=\"row\">\n\
    <div class=\"col s6\">\n\
        <div class=\"row\">\n\
            <div class=\"input-field col s12\">\n\
                <input id=\"event\" type=\"text\" class=\"validate\">\n\
                <label for=\"event\">Event name</label>\n\
            </div>\n\
            <div class=\"col s12\">\n\
                <label for=\"date\">Date</label>\n\
                <input id=\"date\" type=\"text\" class=\"datepicker\">\n\
            </div>\n\
            <div class=\"col s12\">\n\
                <label for=\"time\">Time</label>\n\
                <input id=\"time\" type=\"text\" class=\"timepicker\">\n\
            </div>\n\
        </div>\n\
        <input type=\"button\" class=\"waves-effect waves-light btn blue\" id=\"buttonTime\" value=\"Set time\"> \n\
    </div>\n\
    <div class=\"col s6\">\n\
        <p id = \"gap_year\"></p>\n\
        <p id = \"gap_month\"></p>\n\
        <p id = \"gap_day\"></p>\n\
        <p id = \"gap_hour\"></p>\n\
        <p id = \"gap_minute\"></p>\n\
        <p id = \"gap_second\"></p>\n\
    </div>\n\
</div>\n\
"
function buttonAddClick() {
    $('#timeAll').append(block);
    
    /* Just hide it */
    $('#blockDefault').hide(0)
    $('#blockDefault').show(300)
    /* Create new id */
    var newButtonBlock = '#buttonBlock' + count.toString()
    var newBlock = '#block' + count.toString()
    var newButtonEvent = '#buttonEvent' + count.toString()
    var newEvent = '#event' + count.toString()
    var newDate = '#date' + count.toString()
    var newTime = '#time' + count.toString()
    var newButtonTime = '#buttonTime' + count.toString()
    var newButtonDel = '#buttonDel' + count.toString()
    var newGapYear = '#gap_year' + count.toString()
    var newGapMonth = '#gap_month' + count.toString()
    var newGapDay = '#gap_day' + count.toString()
    var newGapHour = '#gap_hour' + count.toString()
    var newGapMinute = '#gap_minute' + count.toString()
    var newGapSecond = '#gap_second' + count.toString()
    /* Change all id */
    $('#nameEvent').attr('id', 'nameEvent' + count.toString())
    $('#buttonBlock').attr('id', 'buttonBlock' + count.toString())
    $('#blockDefault').attr('id', 'block' + count.toString())
    $('#buttonEvent').attr('id', 'buttonEvent' + count.toString())
    $('#buttonDel').attr('id', 'buttonDel' + count.toString())
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
        $(newBlock).toggle(500)
    })
    $(newButtonDel).on('click', () => {
        $(newBlock).remove()
        $(newButtonBlock).remove()
        clearInterval(intervalID)
        intervalID = null
    })
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 500, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
    });
    
    $('.timepicker').pickatime({
        default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Clear', // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function(){} //Function for after opening timepicker
    });
    count++;
}