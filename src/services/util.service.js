
export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getAssetSrc,
    formatToMonthDay,
    timeStampToLongDate,
    getDemoFormattedDate,
    getDemoTimestamp,
    countGuests,
    getSearchParams,
    formatNumber,
    getRandomDateRange,
    formatDateRange,
    convertDates,
    getFirstSixReviewsFormatted,
    getTotalNights,
    checkIfPlural,
    capitalizeFirstLetter,
    getMonthYear
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

// util function
function getAssetSrc(name) {
    const path = `/src/assets/${name}`
    const modules = import.meta.glob('/src/assets/*', { eager: true })
    const mod = modules[path]
    return mod.default
}

function checkIfPlural(word, length) {
    if (length === 1) return `${length} ${word}`
    else return `${length} ${word}s`
}

function formatToMonthDay(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });

    return `${month} ${day}`;
}

function timeStampToLongDate(timestamp) {
    if (!timestamp) return
    const date = new Date(timestamp);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

function getDemoFormattedDate(daysToAdd) {
    const currentDate = new Date();
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + daysToAdd);
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    const year = targetDate.getFullYear();
    return `${month}/${day}/${year}`;
}

function getDemoTimestamp(daysToAdd) {
    const currentDate = new Date();
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + daysToAdd);
    return targetDate.getTime();
}

function countGuests(guests) {
    const { adults = 0, children = 0, infants, pets } = guests

    const totalGuests = adults + children
    const guestString = totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : ''
    const infantString = infants > 0 ? `${infants} infant${infants > 1 ? 's' : ''}` : ''
    const petString = pets > 0 ? `${pets} pet${pets > 1 ? 's' : ''}` : ''

    const resultArray = [guestString, infantString, petString].filter(Boolean)
    const result = resultArray.join(', ')

    return !result ? 'Add guests' : result
}

function getSearchParams(searchParams) {
    return {
        destination: searchParams.get('destination') || '',
        checkIn: +searchParams.get('checkIn') || '',
        checkOut: +searchParams.get('checkOut') || '',
        guests: +searchParams.get('guests') || '',
        adults: +searchParams.get('adults') || '',
        children: +searchParams.get('children') || '',
        infants: +searchParams.get('infants') || '',
        pets: +searchParams.get('pets') || ''
    }
}

function formatNumber(number) {
    if (Number.isInteger(number)) {
        // If the number is an integer (round number), display one digit after the decimal point
        return number.toFixed(1);
    } else {
        // If the number has a fractional part, display two digits after the decimal point
        return number.toFixed(2);
    }
}

function getRandomDateRange() {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const startMonthIndex = Math.floor(Math.random() * 12);
    const endMonthIndex = Math.floor(Math.random() * 12);

    const startDate = Math.floor(Math.random() * 31) + 1;
    const endDate = Math.floor(Math.random() * 31) + 1;

    const startMonth = months[startMonthIndex];
    const endMonth = months[endMonthIndex];

    return `${startMonth} ${startDate} – ${endMonth} ${endDate}`;
}

function formatDateRange(start, end) {

    const startDate = new Date(start);
    const endDate = new Date(end);

    // Convert the months to abbreviated names (e.g., Jan, Feb, Mar)
    const startMonth = startDate.toLocaleString('en-US', { month: 'short' });
    const endMonth = endDate.toLocaleString('en-US', { month: 'short' });

    // Extract the day parts
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();

    // Construct the formatted date range
    if (startMonth === endMonth) return `${startMonth} ${startDay} – ${endDay}`
    else return `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
}

function convertDates(obj) {
    if (!obj.from || !obj.to) return
    const { from, to } = obj;

    function formatDate(dateString) {
        const [month, day, year] = dateString.split('/');
        return new Date(`${month}/${day}/${year}`);
    }

    return {
        from: formatDate(from),
        to: formatDate(to)
    };
}

function getFirstSixReviewsFormatted(stay) {
    if (!stay) return
    const { reviews } = stay;
    const firstFour = reviews.slice(0, 6);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return firstFour.map(review => {
        const date = new Date(review.at);
        const year = date.getFullYear();
        const month = months[date.getMonth()]; // Get the month in text form

        return {
            at: `${month} ${year}`,
            fullname: review?.by?.fullname,
            imgUrl: review?.by?.imgUrl,
            txt: review?.txt
        };
    });
}

function getMonthYear(timeStamp) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const date = new Date(timeStamp);
    const year = date.getFullYear();
    const month = months[date.getMonth()]; // Get the month in text form

    return `${month} ${year}`
}


function getTotalNights(date1, date2) {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return numberOfDays;
}

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
