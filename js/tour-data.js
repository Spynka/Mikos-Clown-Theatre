// js/tour-data.js
// =============================================
// ЕДИНЫЙ ИСТОЧНИК ДАННЫХ О ГАСТРОЛЯХ
// =============================================

const TOUR_SCHEDULE = [
    // === МАЙ 2026 ===
    {
        id: 'may-06-lishbi',
        performanceId: 1,
        title: 'Лишь бы не было детей',
        date: '2026-05-06',
        time: '19:30',
        venue: 'ТСД',
        address: 'Москва, улица Палиха, 14/33, стр 2',
        ticketUrl: 'https://tsd.msk.ru/lish-by-ne...',
        price: null,
        image: 'images/content/performances/15.jpg',
        age: '18+',
        duration: '90 минут',
        description: 'История сосуществования очень разных людей. Клоунада о выживании.',
        tags: ['мая', 'москва', 'премьера']
    },
    {
        id: 'may-15-lishbi',
        performanceId: 1,
        title: 'Лишь бы не было детей',
        date: '2026-05-15',
        time: '19:00',
        venue: 'ТСД',
        address: 'Москва, улица Палиха, 14/33, стр 2',
        ticketUrl: 'https://tsd.msk.ru/lish-by-ne...',
        price: null,
        image: 'images/content/performances/15.jpg',
        age: '18+',
        duration: '90 минут',
        description: 'История сосуществования очень разных людей. Клоунада о выживании.',
        tags: ['мая', 'москва']
    },
    {
        id: 'may-20-bogatiri-tv',
        performanceId: 2,
        title: 'Богатыри',
        date: '2026-05-20',
        time: '19:00',
        venue: 'Театр Вкуса',
        address: 'Москва, Троицкая улица, 7с4А',
        ticketUrl: 'https://bogatyri.ticketscloud.org',
        price: null,
        image: 'images/content/performances/3.jpg',
        age: '12+',
        duration: '100 минут',
        description: 'Былины в современном прочтении. Эпическая комедия для всей семьи.',
        tags: ['мая', 'москва', 'семейный']
    },
    {
        id: 'may-21-aviatory-tv',
        performanceId: 5,
        title: 'Авиаторы',
        date: '2026-05-21',
        time: '19:00',
        venue: 'Театр Вкуса',
        address: 'Москва, Троицкая улица, 7с4А',
        ticketUrl: 'https://avia.ticketscloud.org',
        price: null,
        image: 'images/content/performances/6.jpg',
        age: '16+',
        duration: '95 минут',
        description: 'О мечтах, полетах и свободе. Вдохновляющая драма.',
        tags: ['мая', 'москва']
    },
    {
        id: 'may-27-bogatiri-tv',
        performanceId: 2,
        title: 'Богатыри',
        date: '2026-05-27',
        time: '19:00',
        venue: 'Театр Вкуса',
        address: 'Москва, Троицкая улица, 7с4А',
        ticketUrl: 'https://bogatyri.ticketscloud.org',
        price: null,
        image: 'images/content/performances/3.jpg',
        age: '12+',
        duration: '100 минут',
        description: 'Былины в современном прочтении. Эпическая комедия для всей семьи.',
        tags: ['мая', 'москва', 'семейный']
    },
    {
        id: 'may-30-bogatiri-voronezh',
        performanceId: 2,
        title: 'Богатыри',
        date: '2026-05-30',
        time: '18:00',
        venue: 'Платоновский фестиваль',
        address: 'Воронеж, фестиваль уличных театров',
        ticketUrl: null,
        price: { min: 2000, max: 4000 },
        image: 'images/content/performances/3.jpg',
        age: '12+',
        duration: '100 минут',
        description: 'Былины в современном прочтении. Эпическая комедия для всей семьи.',
        tags: ['мая', 'воронеж', 'фестиваль', 'семейный']
    },
    {
        id: 'may-31-bogatiri-voronezh',
        performanceId: 2,
        title: 'Богатыри',
        date: '2026-05-31',
        time: '18:00',
        venue: 'Платоновский фестиваль',
        address: 'Воронеж, фестиваль уличных театров',
        ticketUrl: null,
        price: { min: 2000, max: 4000 },
        image: 'images/content/performances/3.jpg',
        age: '12+',
        duration: '100 минут',
        description: 'Былины в современном прочтении. Эпическая комедия для всей семьи.',
        tags: ['мая', 'воронеж', 'фестиваль', 'семейный']
    },
    
    // === ИЮНЬ 2026 ===
    {
        id: 'jun-10-lishbi-spb',
        performanceId: 1,
        title: 'Лишь бы не было детей',
        date: '2026-06-10',
        time: '19:00',
        venue: 'БДТ им. Товстоногова',
        address: 'Санкт-Петербург, наб. реки Фонтанки, 65',
        ticketUrl: 'https://bdt.spb.ru/tickets',
        price: { min: 1500, max: 3500 },
        image: 'images/content/performances/15.jpg',
        age: '18+',
        duration: '90 минут',
        description: 'История сосуществования очень разных людей. Клоунада о выживании.',
        tags: ['июня', 'санкт-петербург', 'гастроли']
    },
    {
        id: 'jun-18-kabare-sochi',
        performanceId: 4,
        title: 'Кабаре-Шапито',
        date: '2026-06-18',
        time: '20:00',
        venue: 'Зимний театр',
        address: 'Сочи, ул. Театральная, 2',
        ticketUrl: 'https://sochi-theatre.ru',
        price: { min: 1800, max: 4000 },
        image: 'images/content/performances/10.jpg',
        age: '18+',
        duration: '110 минут',
        description: 'Феерия клоунады и музыки. Кабаре с цирковыми номерами.',
        tags: ['июня', 'сочи', 'гастроли', 'кабаре']
    },
    
    // === ИЮЛЬ 2026 ===
    {
        id: 'jul-05-ozhidanie-kazan',
        performanceId: 3,
        title: 'Ожидание',
        date: '2026-07-05',
        time: '19:30',
        venue: 'Театр им. Камала',
        address: 'Казань, ул. Татарстан, 1',
        ticketUrl: 'https://kamal-teatr.ru',
        price: { min: 1200, max: 2800 },
        image: 'images/content/performances/9.jpg',
        age: '16+',
        duration: '80 минут',
        description: 'Трогательная история о времени, надежде и встречах.',
        tags: ['июля', 'казань', 'гастроли']
    },
    {
        id: 'jul-25-lishbi-premiere',
        performanceId: 1,
        title: 'Лишь бы не было детей',
        date: '2026-07-25',
        time: '19:00',
        venue: 'Основная сцена',
        address: 'Москва, театр «Микос»',
        ticketUrl: '/checkout.html?id=1',
        price: { min: 1500, max: 3000 },
        image: 'images/content/performances/15.jpg',
        age: '18+',
        duration: '90 минут',
        description: 'Премьерный показ! История сосуществования очень разных людей.',
        tags: ['июля', 'москва', 'премьера', 'главная-сцена'],
        isPremiere: true
    },
    
    // === АВГУСТ 2026 ===
    {
        id: 'aug-08-bogatiri-ekb',
        performanceId: 2,
        title: 'Богатыри',
        date: '2026-08-08',
        time: '18:00',
        venue: 'Театр драмы',
        address: 'Екатеринбург, пр. Ленина, 5',
        ticketUrl: 'https://drama-ekb.ru',
        price: { min: 1400, max: 3200 },
        image: 'images/content/performances/3.jpg',
        age: '12+',
        duration: '100 минут',
        description: 'Былины в современном прочтении. Эпическая комедия для всей семьи.',
        tags: ['августа', 'екатеринбург', 'гастроли', 'семейный']
    },
    {
        id: 'aug-20-aviatory-msk',
        performanceId: 5,
        title: 'Авиаторы',
        date: '2026-08-20',
        time: '19:00',
        venue: 'Основная сцена',
        address: 'Москва, театр «Микос»',
        ticketUrl: '/checkout.html?id=5',
        price: { min: 1600, max: 3200 },
        image: 'images/content/performances/6.jpg',
        age: '16+',
        duration: '95 минут',
        description: 'О мечтах, полетах и свободе. Вдохновляющая драма.',
        tags: ['августа', 'москва', 'главная-сцена']
    }
];

// =============================================
// УТИЛИТЫ ДЛЯ РАБОТЫ С ДАТАМИ И ФИЛЬТРАЦИИ
// =============================================

/**
 * Проверяет, прошла ли дата спектакля
 * @param {string} dateStr - дата в формате 'YYYY-MM-DD'
 * @param {string} timeStr - время в формате 'HH:MM'
 * @returns {boolean} true если дата уже прошла
 */
function isEventPassed(dateStr, timeStr = '00:00') {
    const eventDateTime = new Date(`${dateStr}T${timeStr}`);
    const now = new Date();
    return eventDateTime < now;
}

/**
 * Фильтрует будущие события из расписания
 * @param {Array} schedule - массив событий
 * @returns {Array} отфильтрованный массив
 */
function getUpcomingEvents(schedule = TOUR_SCHEDULE) {
    return schedule.filter(event => !isEventPassed(event.date, event.time));
}

/**
 * Сортирует события по дате (ближайшие первыми)
 * @param {Array} events - массив событий
 * @returns {Array} отсортированный массив
 */
function sortEventsByDate(events) {
    return [...events].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
    });
}

/**
 * Форматирует дату для отображения (в родительном падеже)
 * @param {string} dateStr - дата в формате 'YYYY-MM-DD'
 * @param {string} timeStr - время в формате 'HH:MM'
 * @returns {string} отформатированная строка: "18 июня 19:30"
 */
function formatEventDate(dateStr, timeStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    
    // 🎯 Месяцы в родительном падеже: 18 июня, 5 мая, 30 июля
    const monthsGenitive = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    
    const month = monthsGenitive[date.getMonth()];
    return `${day} ${month} ${timeStr}`;
}

/**
 * Получает уникальные месяцы из расписания
 * @param {Array} events - массив событий
 * @returns {Array} массив объектов {key, name, year}
 */
function getEventMonths(events = TOUR_SCHEDULE) {
    const months = {};
    const monthNames = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 
                       'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    
    events.forEach(event => {
        const date = new Date(event.date);
        const monthIdx = date.getMonth();
        const year = date.getFullYear();
        const key = `${monthNames[monthIdx]}-${year}`;
        
        if (!months[key]) {
            months[key] = {
                key: key,
                name: monthNames[monthIdx],
                year: year,
                count: 0
            };
        }
        months[key].count++;
    });
    
    return Object.values(months).sort((a, b) => {
        const dateA = new Date(`${a.year}-${monthNames.indexOf(a.name) + 1}-01`);
        const dateB = new Date(`${b.year}-${monthNames.indexOf(b.name) + 1}-01`);
        return dateA - dateB;
    });
}

/**
 * Фильтрует события по месяцу
 * @param {Array} events - массив событий
 * @param {string} monthKey - ключ месяца в формате 'месяц-год'
 * @returns {Array} отфильтрованный массив
 */
function filterEventsByMonth(events, monthKey) {
    if (monthKey === 'all' || !monthKey) return events;
    
    const [monthName, year] = monthKey.split('-');
    const monthNames = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 
                       'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    const monthIdx = monthNames.indexOf(monthName);
    
    return events.filter(event => {
        const date = new Date(event.date);
        return date.getMonth() === monthIdx && date.getFullYear() === parseInt(year);
    });
}

/**
 * Фильтрует события по performanceId
 * @param {number} perfId - ID спектакля
 * @param {Array} events - массив событий
 * @returns {Array} отфильтрованный массив
 */
function filterEventsByPerformance(perfId, events = TOUR_SCHEDULE) {
    return events.filter(event => event.performanceId === perfId);
}

/**
 * Получает ближайшие N событий
 * @param {number} limit - количество событий
 * @param {Array} events - массив событий
 * @returns {Array} массив ближайших событий
 */
function getNearestEvents(limit = 5, events = null) {
    const source = events || getUpcomingEvents(TOUR_SCHEDULE);
    return sortEventsByDate(source).slice(0, limit);
}

/**
 * Генерирует данные для Яндекс.Карты
 * @param {Array} events - массив событий
 * @returns {Array} массив меток для карты
 */
function getMapMarkers(events = TOUR_SCHEDULE) {
    // 🗺️ Координаты городов России (широта, долгота)
    const cityCoords = {
        'москва': [55.7558, 37.6173],
        'санкт-петербург': [59.9343, 30.3351],
        'казань': [55.7887, 49.1221],
        'екатеринбург': [56.8389, 60.6057],
        'сочи': [43.6028, 39.7342],
        'воронеж': [51.6720, 39.1843],
        'новосибирск': [55.0084, 82.9357],
        'нижний новгород': [56.2965, 43.9361],
        'самара': [53.1959, 50.1002],
        'тверь': [56.8584, 35.9006],
        'краснодар': [45.0355, 38.9753],
        'пермь': [58.0105, 56.2502],
        'челябинск': [55.1644, 61.4368],
        'омск': [54.9885, 73.3242]
    };
    
    return events.map(event => {
        // 🎯 Извлекаем город из адреса (первая часть до запятой)
        const addressParts = event.address.split(',').map(p => p.trim());
        const cityRaw = addressParts[0].toLowerCase();
        
        // 🏙️ Определяем город для координат и отображения
        let cityKey = '';
        let cityName = '';
        
        for (const [key, name] of Object.entries({
            'москва': 'Москва',
            'санкт-петербург': 'Санкт-Петербург', 
            'казань': 'Казань',
            'екатеринбург': 'Екатеринбург',
            'сочи': 'Сочи',
            'воронеж': 'Воронеж',
            'новосибирск': 'Новосибирск',
            'нижний новгород': 'Нижний Новгород',
            'самара': 'Самара',
            'тверь': 'Тверь',
            'краснодар': 'Краснодар',
            'пермь': 'Пермь',
            'челябинск': 'Челябинск',
            'омск': 'Омск'
        })) {
            if (cityRaw.includes(key)) {
                cityKey = key;
                cityName = name;
                break;
            }
        }
        
        // 📍 Если город не распознан — берём как есть (с заглавной буквы)
        if (!cityName) {
            cityName = addressParts[0].charAt(0).toUpperCase() + addressParts[0].slice(1);
        }
        
        // 🎭 Формируем отображаемое название: "Театр, Город"
        const displayVenue = event.venue && cityName 
            ? `${event.venue}, ${cityName}` 
            : event.venue || cityName;
        
        const coords = cityCoords[cityKey] || [55.7558, 37.6173]; // Москва по умолчанию
        
        return {
            coords: coords,
            title: event.title,
            date: formatEventDate(event.date, event.time),
            venue: event.venue,           // Только театр (для балуна)
            venueWithCity: displayVenue,  // 🎯 "Театр, Город" (для списка)
            city: cityName,               // 🎯 Только город (для фильтрации)
            address: event.address,
            ticketUrl: event.ticketUrl,
            hasTickets: !!event.ticketUrl,
            price: event.price,
            performanceId: event.performanceId,
            eventId: event.id
        };
    });
}

// Экспорт для использования в модулях (если нужно)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TOUR_SCHEDULE,
        isEventPassed,
        getUpcomingEvents,
        sortEventsByDate,
        formatEventDate,
        getEventMonths,
        filterEventsByMonth,
        filterEventsByPerformance,
        getNearestEvents,
        getMapMarkers
    };
}