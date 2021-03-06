const Helper = {
    MarkerIcon: [
        L.icon({
            iconUrl: 'resources/images/marker.svg',
            iconSize:     [60, 60], // size of the icon
            iconAnchor:   [17, 55], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -60] // point from which the popup should open relative to the iconAnchor
        }),
        L.icon({
            iconUrl: 'resources/images/marker2.svg',
            iconSize:     [60, 60], // size of the icon
            iconAnchor:   [17, 55], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -60] // point from which the popup should open relative to the iconAnchor
        })
    ],
    Methods: {
        getWeekDaysArr: function(){
            return [
                {
                    Val: 1,
                    Name: LANGUAGE.COM_MSG003,
                    DisplayAs: LANGUAGE.COM_MSG010,
                },
                {
                    Val: 2,
                    Name: LANGUAGE.COM_MSG004,
                    DisplayAs: LANGUAGE.COM_MSG011,
                },
                {
                    Val: 3,
                    Name: LANGUAGE.COM_MSG005,
                    DisplayAs: LANGUAGE.COM_MSG012,
                },
                {
                    Val: 4,
                    Name: LANGUAGE.COM_MSG006,
                    DisplayAs: LANGUAGE.COM_MSG013,
                },
                {
                    Val: 5,
                    Name: LANGUAGE.COM_MSG007,
                    DisplayAs: LANGUAGE.COM_MSG014,
                },
                {
                    Val: 6,
                    Name: LANGUAGE.COM_MSG008,
                    DisplayAs: LANGUAGE.COM_MSG015,
                },
                {
                    Val: 7,
                    Name: LANGUAGE.COM_MSG009,
                    DisplayAs: LANGUAGE.COM_MSG016,
                },
            ]
        },
        getAddressByGeocoder: function(latlng,replyFunc, additionalData){
            let coords = LANGUAGE.COM_MSG037 + ': ' + latlng.lat + ', ' + LANGUAGE.COM_MSG038 + ': ' + latlng.lng;
            let data = {
                format: 'json',
                zoom: 18,
                addressdetails: 1,
                lat: latlng.lat,
                lon: latlng.lng,
            };
            app.request.get(API_DOMIAN7+'reverse.php', data, function (result) {
                if (result.display_name) {
                    replyFunc(result.display_name, additionalData);
                }else{
                    replyFunc(coords, additionalData);
                }
            }, function () {
                app.request.get(API_DOMIAN8+'reverse', data, function (result) {
                    if (result.display_name) {
                        replyFunc(result.display_name, additionalData);
                    }else{
                        replyFunc(coords, additionalData);
                    }
                }, function () {
                    replyFunc(coords, additionalData);
                }, 'json');
            }, 'json');
        },
        createMap: function(option){
            var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { name: 'osm', attribution: '' });
            var googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'+'&hl='+lang,{
                maxZoom: 22,
                subdomains:['mt0','mt1','mt2','mt3']
            });
            var googleSatelitte = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'+'&hl='+lang,{
                maxZoom: 20,
                subdomains:['mt0','mt1','mt2','mt3']
            });

            var map = L.map(option.target, { zoomControl: false, center: option.latLng, zoom: option.zoom, layers: [googleStreets] });

            var layers = {
                "<span class='mapSwitcherWrapper googleSwitcherWrapper'><img class='layer-icon' src='resources/images/googleRoad.png' alt='' /> <p>Map</p></span>": googleStreets,
                "<span class='mapSwitcherWrapper satelliteSwitcherWrapper'><img class='layer-icon' src='resources/images/googleSatellite.png' alt='' />  <p>Satellite</p></span>": googleSatelitte,
                "<span class='mapSwitcherWrapper openstreetSwitcherWrapper'><img class='layer-icon' src='resources/images/openStreet.png' alt='' /> <p>OpenStreet</p></span>": osm,
            };

            L.control.layers(layers).addTo(map);

            return map;
        },
        getDirectionCardinal: function(direction){
            let ret = "";
            direction = parseFloat(direction);
            switch (true){
                case (direction >= 338 || direction <= 22 ):
                    ret = LANGUAGE.COM_MSG019+'('+direction+'°)';
                    break;
                case (direction >= 23 && direction <= 75 ):
                    ret = LANGUAGE.COM_MSG020+'('+direction+'°)';
                    break;
                case (direction >= 76 && direction <= 112 ):
                    ret = LANGUAGE.COM_MSG021+'('+direction+'°)';
                    break;
                case (direction >= 113 && direction <= 157 ):
                    ret = LANGUAGE.COM_MSG022+'('+direction+'°)';
                    break;
                case (direction >= 158 && direction <= 202 ):
                    ret = LANGUAGE.COM_MSG023+'('+direction+'°)';
                    break;
                case (direction >= 203 && direction <= 247 ):
                    ret = LANGUAGE.COM_MSG024+'('+direction+'°)';
                    break;
                case (direction >= 248 && direction <= 292 ):
                    ret = LANGUAGE.COM_MSG025+'('+direction+'°)';
                    break;
                case (direction >= 293 && direction <= 337 ):
                    ret = LANGUAGE.COM_MSG026+'('+direction+'°)';
                    break;
                default: ret = LANGUAGE.COM_MSG027+'('+direction+'°)';
            }
            return ret;
        },
        getIntervalList: function(){
            return [
                { Val: 20, Name: 20 + LANGUAGE.TIMING_MSG06 },
                { Val: 60, Name: 1 + LANGUAGE.TIMING_MSG07 },
                { Val: 300, Name: 5 + LANGUAGE.TIMING_MSG07 },
                { Val: 600, Name: 10 + LANGUAGE.TIMING_MSG07 },
                { Val: 900, Name: 15 + LANGUAGE.TIMING_MSG07 },
                { Val: 1200, Name: 20 + LANGUAGE.TIMING_MSG07 },
                { Val: 1800, Name: 30 + LANGUAGE.TIMING_MSG07 },
                { Val: 3600, Name: 60 + LANGUAGE.TIMING_MSG07 },
            ]
        },
        getCountrys: function () {
            return [
                {	CountryCode: 'ABW',	CountryPhoneCode: '+297',	Country: 'Aruba',	},
                {	CountryCode: 'AFG',	CountryPhoneCode: '+93',	Country: 'Afghanistan',	},
                {	CountryCode: 'AGO',	CountryPhoneCode: '+244',	Country: 'Angola',	},
                {	CountryCode: 'AIA',	CountryPhoneCode: '+1',	Country: 'Anguilla',	},
                {	CountryCode: 'ALB',	CountryPhoneCode: '+355',	Country: 'Albania',	},
                {	CountryCode: 'AND',	CountryPhoneCode: '+376',	Country: 'Andorra',	},
                {	CountryCode: 'ANT',	CountryPhoneCode: '+376',	Country: 'Netherlands Antilles',	},
                {	CountryCode: 'ARE',	CountryPhoneCode: '+971',	Country: 'United Arab Emirates',	},
                {	CountryCode: 'ARG',	CountryPhoneCode: '+54',	Country: 'Argentina',	},
                {	CountryCode: 'ARM',	CountryPhoneCode: '+374',	Country: 'Armenia',	},
                {	CountryCode: 'ASM',	CountryPhoneCode: '+1',	Country: 'American Samoa',	},
                {	CountryCode: 'ATA',	CountryPhoneCode: '+1',	Country: 'Antarctica',	},
                {	CountryCode: 'ATF',	CountryPhoneCode: '+1',	Country: 'French Southern territories',	},
                {	CountryCode: 'ATG',	CountryPhoneCode: '+1',	Country: 'Antigua and Barbuda',	},
                {	CountryCode: 'AUS',	CountryPhoneCode: '+61',	Country: 'Australia',	},
                {	CountryCode: 'AUT',	CountryPhoneCode: '+43',	Country: 'Austria',	},
                {	CountryCode: 'AZE',	CountryPhoneCode: '+994',	Country: 'Azerbaijan',	},
                {	CountryCode: 'BDI',	CountryPhoneCode: '+257',	Country: 'Burundi',	},
                {	CountryCode: 'BEL',	CountryPhoneCode: '+32',	Country: 'Belgium',	},
                {	CountryCode: 'BEN',	CountryPhoneCode: '+229',	Country: 'Benin',	},
                {	CountryCode: 'BFA',	CountryPhoneCode: '+226',	Country: 'Burkina Faso',	},
                {	CountryCode: 'BGD',	CountryPhoneCode: '+880',	Country: 'Bangladesh',	},
                {	CountryCode: 'BGR',	CountryPhoneCode: '+359',	Country: 'Bulgaria',	},
                {	CountryCode: 'BHR',	CountryPhoneCode: '+973',	Country: 'Bahrain',	},
                {	CountryCode: 'BHS',	CountryPhoneCode: '+1',	Country: 'Bahamas',	},
                {	CountryCode: 'BIH',	CountryPhoneCode: '+387',	Country: 'Bosnia and Herzegovina',	},
                {	CountryCode: 'BLR',	CountryPhoneCode: '+375',	Country: 'Belarus',	},
                {	CountryCode: 'BLZ',	CountryPhoneCode: '+501',	Country: 'Belize',	},
                {	CountryCode: 'BMU',	CountryPhoneCode: '+1',	Country: 'Bermuda',	},
                {	CountryCode: 'BOL',	CountryPhoneCode: '+591',	Country: 'Bolivia',	},
                {	CountryCode: 'BRA',	CountryPhoneCode: '+55',	Country: 'Brazil',	},
                {	CountryCode: 'BRB',	CountryPhoneCode: '+1',	Country: 'Barbados',	},
                {	CountryCode: 'BRN',	CountryPhoneCode: '+673',	Country: 'Brunei',	},
                {	CountryCode: 'BTN',	CountryPhoneCode: '+975',	Country: 'Bhutan',	},
                {	CountryCode: 'BVT',	CountryPhoneCode: '+975',	Country: 'Bouvet Island',	},
                {	CountryCode: 'BWA',	CountryPhoneCode: '+267',	Country: 'Botswana',	},
                {	CountryCode: 'CAF',	CountryPhoneCode: '+236',	Country: 'Central African Republic',	},
                {	CountryCode: 'CAN',	CountryPhoneCode: '+1',	Country: 'Canada',	},
                {	CountryCode: 'CCK',	CountryPhoneCode: '+1',	Country: 'Cocos (Keeling) Islands',	},
                {	CountryCode: 'CHE',	CountryPhoneCode: '+41',	Country: 'Switzerland',	},
                {	CountryCode: 'CHL',	CountryPhoneCode: '+56',	Country: 'Chile',	},
                {	CountryCode: 'CHN',	CountryPhoneCode: '+86',	Country: 'China',	},
                {	CountryCode: 'CIV',	CountryPhoneCode: '+225',	Country: 'Cote d\'Ivoire',	},
                {	CountryCode: 'CMR',	CountryPhoneCode: '+237',	Country: 'Cameroon',	},
                {	CountryCode: 'COD',	CountryPhoneCode: '+242',	Country: 'Congo(COD)',	},
                {	CountryCode: 'COG',	CountryPhoneCode: '+243',	Country: 'Congo(COG)',	},
                {	CountryCode: 'COK',	CountryPhoneCode: '+682',	Country: 'Cook Islands',	},
                {	CountryCode: 'COL',	CountryPhoneCode: '+57',	Country: 'Colombia',	},
                {	CountryCode: 'COM',	CountryPhoneCode: '+269',	Country: 'Comoros',	},
                {	CountryCode: 'CPV',	CountryPhoneCode: '+238',	Country: 'Cape Verde',	},
                {	CountryCode: 'CRI',	CountryPhoneCode: '+506',	Country: 'Costa Rica',	},
                {	CountryCode: 'CUB',	CountryPhoneCode: '+53',	Country: 'Cuba',	},
                {	CountryCode: 'CXR',	CountryPhoneCode: '+1',	Country: 'Christmas Island',	},
                {	CountryCode: 'CYM',	CountryPhoneCode: '+1',	Country: 'Cayman Islands',	},
                {	CountryCode: 'CYP',	CountryPhoneCode: '+357',	Country: 'Cyprus',	},
                {	CountryCode: 'CZE',	CountryPhoneCode: '+420',	Country: 'Czech Republic',	},
                {	CountryCode: 'DEU',	CountryPhoneCode: '+49',	Country: 'Germany',	},
                {	CountryCode: 'DJI',	CountryPhoneCode: '+253',	Country: 'Djibouti',	},
                {	CountryCode: 'DMA',	CountryPhoneCode: '+1',	Country: 'Dominica',	},
                {	CountryCode: 'DNK',	CountryPhoneCode: '+45',	Country: 'Denmark',	},
                {	CountryCode: 'DOM',	CountryPhoneCode: '+1',	Country: 'Dominican Republic',	},
                {	CountryCode: 'DZA',	CountryPhoneCode: '+213',	Country: 'Algeria',	},
                {	CountryCode: 'ECU',	CountryPhoneCode: '+593',	Country: 'Ecuador',	},
                {	CountryCode: 'EGY',	CountryPhoneCode: '+20',	Country: 'Egypt',	},
                {	CountryCode: 'ERI',	CountryPhoneCode: '+291',	Country: 'Eritrea',	},
                {	CountryCode: 'ESH',	CountryPhoneCode: '+212',	Country: 'Western Sahara',	},
                {	CountryCode: 'ESP',	CountryPhoneCode: '+34',	Country: 'Spain',	},
                {	CountryCode: 'EST',	CountryPhoneCode: '+372',	Country: 'Estonia',	},
                {	CountryCode: 'ETH',	CountryPhoneCode: '+251',	Country: 'Ethiopia',	},
                {	CountryCode: 'FIN',	CountryPhoneCode: '+358',	Country: 'Finland',	},
                {	CountryCode: 'FJI',	CountryPhoneCode: '+679',	Country: 'Fiji Islands',	},
                {	CountryCode: 'FLK',	CountryPhoneCode: '+500',	Country: 'Falkland Islands',	},
                {	CountryCode: 'FRA',	CountryPhoneCode: '+33',	Country: 'France',	},
                {	CountryCode: 'FRO',	CountryPhoneCode: '+298',	Country: 'Faroe Islands',	},
                {	CountryCode: 'FSM',	CountryPhoneCode: '+691',	Country: 'Federated States of Micronesia',	},
                {	CountryCode: 'GAB',	CountryPhoneCode: '+241',	Country: 'Gabon',	},
                {	CountryCode: 'GBR',	CountryPhoneCode: '+44',	Country: 'United Kingdom',	},
                {	CountryCode: 'GEO',	CountryPhoneCode: '+995',	Country: 'Georgia',	},
                {	CountryCode: 'GHA',	CountryPhoneCode: '+233',	Country: 'Ghana',	},
                {	CountryCode: 'GIB',	CountryPhoneCode: '+350',	Country: 'Gibraltar',	},
                {	CountryCode: 'GIN',	CountryPhoneCode: '+224',	Country: 'Guinea',	},
                {	CountryCode: 'GLP',	CountryPhoneCode: '+590',	Country: 'Guadeloupe',	},
                {	CountryCode: 'GMB',	CountryPhoneCode: '+220',	Country: 'Gambia',	},
                {	CountryCode: 'GNB',	CountryPhoneCode: '+245',	Country: 'Guinea-Bissau',	},
                {	CountryCode: 'GNQ',	CountryPhoneCode: '+240',	Country: 'Equatorial Guinea',	},
                {	CountryCode: 'GRC',	CountryPhoneCode: '+30',	Country: 'Greece',	},
                {	CountryCode: 'GRD',	CountryPhoneCode: '+1',	Country: 'Grenada',	},
                {	CountryCode: 'GRL',	CountryPhoneCode: '+299',	Country: 'Greenland',	},
                {	CountryCode: 'GTM',	CountryPhoneCode: '+502',	Country: 'Guatemala',	},
                {	CountryCode: 'GUF',	CountryPhoneCode: '+594',	Country: 'French Guiana',	},
                {	CountryCode: 'GUM',	CountryPhoneCode: '+1',	Country: 'Guam',	},
                {	CountryCode: 'GUY',	CountryPhoneCode: '+592',	Country: 'Guyana',	},
                {	CountryCode: 'HKG',	CountryPhoneCode: '+852',	Country: 'Hong Kong',	},
                {	CountryCode: 'HMD',	CountryPhoneCode: '+592',	Country: 'Heard Island and McDonald Islands',	},
                {	CountryCode: 'HND',	CountryPhoneCode: '+504',	Country: 'Honduras',	},
                {	CountryCode: 'HRV',	CountryPhoneCode: '+385',	Country: 'Croatia',	},
                {	CountryCode: 'HTI',	CountryPhoneCode: '+509',	Country: 'Haiti',	},
                {	CountryCode: 'HUN',	CountryPhoneCode: '+36',	Country: 'Hungary',	},
                {	CountryCode: 'IDN',	CountryPhoneCode: '+62',	Country: 'Indonesia',	},
                {	CountryCode: 'IND',	CountryPhoneCode: '+91',	Country: 'India',	},
                {	CountryCode: 'IOT',	CountryPhoneCode: '+246',	Country: 'British Indian Ocean Territory',	},
                {	CountryCode: 'IRL',	CountryPhoneCode: '+353',	Country: 'Ireland',	},
                {	CountryCode: 'IRN',	CountryPhoneCode: '+98',	Country: 'Iran',	},
                {	CountryCode: 'IRQ',	CountryPhoneCode: '+964',	Country: 'Iraq',	},
                {	CountryCode: 'ISL',	CountryPhoneCode: '+354',	Country: 'Iceland',	},
                {	CountryCode: 'ISR',	CountryPhoneCode: '+972',	Country: 'Israel',	},
                {	CountryCode: 'ITA',	CountryPhoneCode: '+39',	Country: 'Italy',	},
                {	CountryCode: 'JAM',	CountryPhoneCode: '+1',	Country: 'Jamaica',	},
                {	CountryCode: 'JOR',	CountryPhoneCode: '+962',	Country: 'Jordan',	},
                {	CountryCode: 'JPN',	CountryPhoneCode: '+81',	Country: 'Japan',	},
                {	CountryCode: 'KAZ',	CountryPhoneCode: '+7',	Country: 'Kazakstan',	},
                {	CountryCode: 'KEN',	CountryPhoneCode: '+254',	Country: 'Kenya',	},
                {	CountryCode: 'KGZ',	CountryPhoneCode: '+996',	Country: 'Kyrgyzstan',	},
                {	CountryCode: 'KHM',	CountryPhoneCode: '+855',	Country: 'Cambodia',	},
                {	CountryCode: 'KIR',	CountryPhoneCode: '+686',	Country: 'Kiribati',	},
                {	CountryCode: 'KNA',	CountryPhoneCode: '+1',	Country: 'Saint Kitts and Nevis',	},
                {	CountryCode: 'KOR',	CountryPhoneCode: '+850',	Country: 'South Korea',	},
                {	CountryCode: 'KWT',	CountryPhoneCode: '+965',	Country: 'Kuwait',	},
                {	CountryCode: 'LAO',	CountryPhoneCode: '+965',	Country: 'Laos',	},
                {	CountryCode: 'LBN',	CountryPhoneCode: '+961',	Country: 'Lebanon',	},
                {	CountryCode: 'LBR',	CountryPhoneCode: '+231',	Country: 'Liberia',	},
                {	CountryCode: 'LBY',	CountryPhoneCode: '+218',	Country: 'Libyan Arab Jamahiriya',	},
                {	CountryCode: 'LCA',	CountryPhoneCode: '+1',	Country: 'Saint Lucia',	},
                {	CountryCode: 'LIE',	CountryPhoneCode: '+423',	Country: 'Liechtenstein',	},
                {	CountryCode: 'LKA',	CountryPhoneCode: '+94',	Country: 'Sri Lanka',	},
                {	CountryCode: 'LSO',	CountryPhoneCode: '+266',	Country: 'Lesotho',	},
                {	CountryCode: 'LTU',	CountryPhoneCode: '+370',	Country: 'Lithuania',	},
                {	CountryCode: 'LUX',	CountryPhoneCode: '+352',	Country: 'Luxembourg',	},
                {	CountryCode: 'LVA',	CountryPhoneCode: '+371',	Country: 'Latvia',	},
                {	CountryCode: 'MAC',	CountryPhoneCode: '+853',	Country: 'Macao',	},
                {	CountryCode: 'MAR',	CountryPhoneCode: '+212',	Country: 'Morocco',	},
                {	CountryCode: 'MCO',	CountryPhoneCode: '+377',	Country: 'Monaco',	},
                {	CountryCode: 'MDA',	CountryPhoneCode: '+373',	Country: 'Moldova',	},
                {	CountryCode: 'MDG',	CountryPhoneCode: '+261',	Country: 'Madagascar',	},
                {	CountryCode: 'MDV',	CountryPhoneCode: '+960',	Country: 'Maldives',	},
                {	CountryCode: 'MEX',	CountryPhoneCode: '+52',	Country: 'Mexico',	},
                {	CountryCode: 'MHL',	CountryPhoneCode: '+692',	Country: 'Marshall Islands',	},
                {	CountryCode: 'MKD',	CountryPhoneCode: '+389',	Country: 'Macedonia',	},
                {	CountryCode: 'MLI',	CountryPhoneCode: '+223',	Country: 'Mali',	},
                {	CountryCode: 'MLT',	CountryPhoneCode: '+356',	Country: 'Malta',	},
                {	CountryCode: 'MMR',	CountryPhoneCode: '+95',	Country: 'Myanmar',	},
                {	CountryCode: 'MNG',	CountryPhoneCode: '+976',	Country: 'Mongolia',	},
                {	CountryCode: 'MNP',	CountryPhoneCode: '+1',	Country: 'Northern Mariana Islands',	},
                {	CountryCode: 'MOZ',	CountryPhoneCode: '+258',	Country: 'Mozambique',	},
                {	CountryCode: 'MRT',	CountryPhoneCode: '+222',	Country: 'Mauritania',	},
                {	CountryCode: 'MSR',	CountryPhoneCode: '+1',	Country: 'Montserrat',	},
                {	CountryCode: 'MTQ',	CountryPhoneCode: '+596',	Country: 'Martinique',	},
                {	CountryCode: 'MUS',	CountryPhoneCode: '+230',	Country: 'Mauritius',	},
                {	CountryCode: 'MWI',	CountryPhoneCode: '+265',	Country: 'Malawi',	},
                {	CountryCode: 'MYS',	CountryPhoneCode: '+60',	Country: 'Malaysia',	},
                {	CountryCode: 'MYT',	CountryPhoneCode: '+262',	Country: 'Mayotte',	},
                {	CountryCode: 'NAM',	CountryPhoneCode: '+264',	Country: 'Namibia',	},
                {	CountryCode: 'NCL',	CountryPhoneCode: '+687',	Country: 'New Caledonia',	},
                {	CountryCode: 'NER',	CountryPhoneCode: '+227',	Country: 'Niger',	},
                {	CountryCode: 'NFK',	CountryPhoneCode: '+672',	Country: 'Norfolk Island',	},
                {	CountryCode: 'NGA',	CountryPhoneCode: '+234',	Country: 'Nigeria',	},
                {	CountryCode: 'NIC',	CountryPhoneCode: '+505',	Country: 'Nicaragua',	},
                {	CountryCode: 'NIU',	CountryPhoneCode: '+683',	Country: 'Niue',	},
                {	CountryCode: 'NLD',	CountryPhoneCode: '+31',	Country: 'Netherlands',	},
                {	CountryCode: 'NOR',	CountryPhoneCode: '+47',	Country: 'Norway',	},
                {	CountryCode: 'NPL',	CountryPhoneCode: '+977',	Country: 'Nepal',	},
                {	CountryCode: 'NRU',	CountryPhoneCode: '+674',	Country: 'Nauru',	},
                {	CountryCode: 'NZL',	CountryPhoneCode: '+64',	Country: 'New Zealand',	},
                {	CountryCode: 'OMN',	CountryPhoneCode: '+968',	Country: 'Oman',	},
                {	CountryCode: 'PAK',	CountryPhoneCode: '+92',	Country: 'Pakistan',	},
                {	CountryCode: 'PAN',	CountryPhoneCode: '+507',	Country: 'Panama',	},
                {	CountryCode: 'PCN',	CountryPhoneCode: '+507',	Country: 'Pitcairn',	},
                {	CountryCode: 'PER',	CountryPhoneCode: '+51',	Country: 'Peru',	},
                {	CountryCode: 'PHL',	CountryPhoneCode: '+63',	Country: 'Philippines',	},
                {	CountryCode: 'PLW',	CountryPhoneCode: '+680',	Country: 'Palau',	},
                {	CountryCode: 'PNG',	CountryPhoneCode: '+675',	Country: 'Papua New Guinea',	},
                {	CountryCode: 'POL',	CountryPhoneCode: '+48',	Country: 'Poland',	},
                {	CountryCode: 'PRI',	CountryPhoneCode: '+1',	Country: 'Puerto Rico',	},
                {	CountryCode: 'PRK',	CountryPhoneCode: '+82',	Country: 'North Korea',	},
                {	CountryCode: 'PRT',	CountryPhoneCode: '+351',	Country: 'Portugal',	},
                {	CountryCode: 'PRY',	CountryPhoneCode: '+595',	Country: 'Paraguay',	},
                {	CountryCode: 'PSE',	CountryPhoneCode: '+970',	Country: 'Palestine',	},
                {	CountryCode: 'PYF',	CountryPhoneCode: '+689',	Country: 'French Polynesia',	},
                {	CountryCode: 'QAT',	CountryPhoneCode: '+974',	Country: 'Qatar',	},
                {	CountryCode: 'REU',	CountryPhoneCode: '+262',	Country: 'Reunion',	},
                {	CountryCode: 'ROM',	CountryPhoneCode: '+40',	Country: 'Romania',	},
                {	CountryCode: 'RUS',	CountryPhoneCode: '+7',	Country: 'Russian',	},
                {	CountryCode: 'RWA',	CountryPhoneCode: '+250',	Country: 'Rwanda',	},
                {	CountryCode: 'SAU',	CountryPhoneCode: '+966',	Country: 'Saudi Arabia',	},
                {	CountryCode: 'SDN',	CountryPhoneCode: '+249',	Country: 'Sudan',	},
                {	CountryCode: 'SEN',	CountryPhoneCode: '+221',	Country: 'Senegal',	},
                {	CountryCode: 'SGP',	CountryPhoneCode: '+65',	Country: 'Singapore',	},
                {	CountryCode: 'SGS',	CountryPhoneCode: '+65',	Country: 'South Georgia and the South Sandwich Islands',	},
                {	CountryCode: 'SHN',	CountryPhoneCode: '+290',	Country: 'Saint Helena',	},
                {	CountryCode: 'SJM',	CountryPhoneCode: '+290',	Country: 'Svalbard and Jan Mayen',	},
                {	CountryCode: 'SLB',	CountryPhoneCode: '+677',	Country: 'Solomon Islands',	},
                {	CountryCode: 'SLE',	CountryPhoneCode: '+232',	Country: 'Sierra Leone',	},
                {	CountryCode: 'SLV',	CountryPhoneCode: '+503',	Country: 'El Salvador',	},
                {	CountryCode: 'SMR',	CountryPhoneCode: '+378',	Country: 'San Marino',	},
                {	CountryCode: 'SOM',	CountryPhoneCode: '+252',	Country: 'Somalia',	},
                {	CountryCode: 'SPM',	CountryPhoneCode: '+508',	Country: 'Saint Pierre and Miquelon',	},
                {	CountryCode: 'STP',	CountryPhoneCode: '+239',	Country: 'Sao Tome and Principe',	},
                {	CountryCode: 'SUR',	CountryPhoneCode: '+597',	Country: 'Suriname',	},
                {	CountryCode: 'SVK',	CountryPhoneCode: '+421',	Country: 'Slovakia',	},
                {	CountryCode: 'SVN',	CountryPhoneCode: '+386',	Country: 'Slovenia',	},
                {	CountryCode: 'SWE',	CountryPhoneCode: '+46',	Country: 'Sweden',	},
                {	CountryCode: 'SWZ',	CountryPhoneCode: '+268',	Country: 'Swaziland',	},
                {	CountryCode: 'SYC',	CountryPhoneCode: '+248',	Country: 'Seychelles',	},
                {	CountryCode: 'SYR',	CountryPhoneCode: '+963',	Country: 'Syria',	},
                {	CountryCode: 'TCA',	CountryPhoneCode: '+1',	Country: 'Turks and Caicos Islands',	},
                {	CountryCode: 'TCD',	CountryPhoneCode: '+235',	Country: 'Chad',	},
                {	CountryCode: 'TGO',	CountryPhoneCode: '+228',	Country: 'Togo',	},
                {	CountryCode: 'THA',	CountryPhoneCode: '+66',	Country: 'Thailand',	},
                {	CountryCode: 'TJK',	CountryPhoneCode: '+992',	Country: 'Tajikistan',	},
                {	CountryCode: 'TKL',	CountryPhoneCode: '+690',	Country: 'Tokelau',	},
                {	CountryCode: 'TKM',	CountryPhoneCode: '+993',	Country: 'Turkmenistan',	},
                {	CountryCode: 'TMP',	CountryPhoneCode: '+670',	Country: 'East Timor',	},
                {	CountryCode: 'TON',	CountryPhoneCode: '+676',	Country: 'Tonga',	},
                {	CountryCode: 'TTO',	CountryPhoneCode: '+1',	Country: 'Trinidad and Tobago',	},
                {	CountryCode: 'TUN',	CountryPhoneCode: '+216',	Country: 'Tunisia',	},
                {	CountryCode: 'TUR',	CountryPhoneCode: '+90',	Country: 'Turkey',	},
                {	CountryCode: 'TUV',	CountryPhoneCode: '+688',	Country: 'Tuvalu',	},
                {	CountryCode: 'TWN',	CountryPhoneCode: '+886',	Country: 'Taiwan',	},
                {	CountryCode: 'TZA',	CountryPhoneCode: '+255',	Country: 'Tanzania',	},
                {	CountryCode: 'UGA',	CountryPhoneCode: '+256',	Country: 'Uganda',	},
                {	CountryCode: 'UKR',	CountryPhoneCode: '+380',	Country: 'Ukraine',	},
                {	CountryCode: 'UMI',	CountryPhoneCode: '+380',	Country: 'United States Minor Outlying Islands',	},
                {	CountryCode: 'UNK',	CountryPhoneCode: '+1',	Country: 'Unknown',	},
                {	CountryCode: 'URY',	CountryPhoneCode: '+598',	Country: 'Uruguay',	},
                {	CountryCode: 'USA',	CountryPhoneCode: '+1',	Country: 'United States',	},
                {	CountryCode: 'UZB',	CountryPhoneCode: '+998',	Country: 'Uzbekistan',	},
                {	CountryCode: 'VAT',	CountryPhoneCode: '+39',	Country: 'Holy See (Vatican City State)',	},
                {	CountryCode: 'VCT',	CountryPhoneCode: '+1',	Country: 'Saint Vincent and the Grenadines',	},
                {	CountryCode: 'VEN',	CountryPhoneCode: '+58',	Country: 'Venezuela',	},
                {	CountryCode: 'VGB',	CountryPhoneCode: '+1',	Country: 'Virgin Islands, British',	},
                {	CountryCode: 'VIR',	CountryPhoneCode: '+1',	Country: 'Virgin Islands, U.S.',	},
                {	CountryCode: 'VNM',	CountryPhoneCode: '+84',	Country: 'Vietnam',	},
                {	CountryCode: 'VUT',	CountryPhoneCode: '+678',	Country: 'Vanuatu',	},
                {	CountryCode: 'WLF',	CountryPhoneCode: '+681',	Country: 'Wallis and Futuna',	},
                {	CountryCode: 'WSM',	CountryPhoneCode: '+685',	Country: 'Samoa',	},
                {	CountryCode: 'YEM',	CountryPhoneCode: '+967',	Country: 'Yemen',	},
                {	CountryCode: 'YUG',	CountryPhoneCode: '+967',	Country: 'Yugoslavia',	},
                {	CountryCode: 'ZAF',	CountryPhoneCode: '+27',	Country: 'South Africa',	},
                {	CountryCode: 'ZMB',	CountryPhoneCode: '+260',	Country: 'Zambia',	},
                {	CountryCode: 'ZWE',	CountryPhoneCode: '+263',	Country: 'Zimbabwe',	},
            ]
        }
    }
};