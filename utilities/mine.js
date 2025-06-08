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
        if(element === 'img'){
            const val = `http:${getElementVal($, element)}`;
            result.poster = val || '';
        } else {
            const val = getElementVal($, element);
            switch (element) {
                case "year":
                    result[element] = parseInt(val.split('-')[0]);
                    break;
                default:
                    result[element] = val;
                    break;
            }
        }
    });
    return result;
};

const getElementVal = ($, sel) => {
    const _$ = $('body');
    const selector = config.elems[sel];
    const val = $(selector);
    return sel === 'img' ? val.attr('src') : val.text();
};

export default mine;