import * as cheerio from 'cheerio';
import config from '../config.json' with { type: "json" };

let _isAddon = false;

const mine = (markup, dataList, isAddon) => {
    _isAddon = isAddon;
    const $ = cheerio.load(markup);
    return reform($, dataList);
};

const reform = ($, iden) => {
    const result = {};
    iden.forEach(element => {
        const val = getElementVal($, element);
        switch (element) {
            case "poster": result[element] = `http:${val}` || '';
                break;
            case "year": result[element] = parseInt(val.split('-')[0]);
                break;
            case "rating": result[element] = `${val.split('/')[0].substr(-3)}\/10`;
                break;
            case "time": result[element] = parseInt(val.split(' minutes')[0]);
                break;
            case "tv_year": result["year"] = parseInt(val.split(' (')[0].split(', ')[1]);
                break;
            case "tv_rating":
                let rate = parseFloat(val.split('%')[0].substr(-2))/10;
                result["rating"] = `${rate}\/10`;
                break;
            case "tv_director": result["director"] = val;
                break;
            case "tv_producer": result["producer"] = val;
                break;
            case "tv_production": result["production"] = val;
                break;
            case "episodes": result[element] = val.split(' (')[0];
                break;
            default:
                result[element] = val;
                break;
        }
    });
    return result;
};

const getElementVal = ($, sel) => {
    const _selector = _isAddon ? config.addon[sel] : config.elems[sel];
    let val = '';

    switch (sel) {
        case 'plot': 
            let tempSel = 'grouped-'
            let temp = $(_selector[0]).nextUntil(_selector[1]).add(_selector[0]);

            if(temp.length === 0) {
                const _sel = config.addon.plot_bkp;
                temp = $(_sel[0]).nextUntil(_sel[1]).add(_sel[0]);
            }

            temp.wrapAll(`<div class="${tempSel}"></div>`)
            val = $(`.${tempSel}`)
            break;
        case 'tv_rating': 
            const selector = config.elems["rating"]
            val = $(selector)
            break;
        default: val = $(_selector);
            break;
    };

    if (_isAddon) {
        const item = val;
        switch(sel) {
            case 'plot':
                return item.html();
            default:
                return item.parent().html();

        }
    }

    return sel === 'poster' ? val.attr('src') : val.text();
};

export default mine;