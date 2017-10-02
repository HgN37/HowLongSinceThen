
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
var intervalJSON = JSON
var intervalID
function buttonTimeClick(num){
    if(intervalJSON[num.toString()] != null){
        clearInterval(intervalJSON[num.toString()])
    }
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
            document.getElementById("gap_year" + num.toString()).innerHTML = gap.year
            document.getElementById("gap_month" + num.toString()).innerHTML = gap.month
            document.getElementById("gap_day" + num.toString()).innerHTML = gap.day
            document.getElementById("gap_hour" + num.toString()).innerHTML = gap.hour
            document.getElementById("gap_minute" + num.toString()).innerHTML = gap.minute
            document.getElementById("gap_second" + num.toString()).innerHTML = gap.second
        }, 100)
        intervalJSON[num.toString()] = intervalID
    }
}

var count = 0;
function buttonAddClick() {
    /* Just append a block */
    $.ajax({
        async: false,
        type: 'GET',
        url: 'timeblock.html',
        success: function(data) {
            $('#timeAll').append(data)
        }
    });
    /* Just hide it */
    $('#section').hide(0)
    $('#section').show(500)
    /* Create new id */
    var newSection = '#section' + count.toString()
    var newblockButton = '#blockButton' + count.toString()
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
    $('#section').attr('id', 'section' + count.toString())
    $('#nameEvent').attr('id', 'nameEvent' + count.toString())
    $('#blockButton').attr('id', 'blockButton' + count.toString())
    $('#blockTime').attr('id', 'block' + count.toString())
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
        $(newSection).remove()
        // TODO: Clear interval here
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