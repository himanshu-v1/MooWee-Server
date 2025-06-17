import * as cheerio from 'cheerio';
import { dataList } from '../interfaces/types.js';
import config from '../config.json' with { type: "json" };

const mine = (markup, iden) => {
    const $ = cheerio.load(markup);
    if(!iden || !iden.length){
        return reform($, dataList);
    } else {
        return reform($, iden);
    }
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
            default:
                result[element] = val;
                break;
        }
    });
    return result;
};

const getElementVal = ($, sel) => {
    const _$ = $('body');
    const selector = config.elems[sel];
    let val = '';
    switch (sel) {
        case 'plot': val = $(selector[0]).nextUntil(selector[1]).add(selector[1]);
            break;
        default: val = $(selector);
            break;
    };
    return sel === 'poster' ? val.attr('src') : val.text();
};

export default mine;