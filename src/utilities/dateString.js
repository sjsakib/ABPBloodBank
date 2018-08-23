function dateString(d, size) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    if ( size === 'short' ) {
        return `${months[d.getMonth()].slice(0,3)} ${d.getDate()}, ${d.getFullYear()}`;
    }

    if ( size === 'key' ) {
        return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
    }
    
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}, ${days[d.getDay()]}`;

}

export default dateString;
