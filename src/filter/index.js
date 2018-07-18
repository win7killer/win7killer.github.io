/**
 * @file vue 过滤器配置
 * @author shangwenbin
 */

import Vue from 'vue';
import {
    time
} from './filters';

// getI18nMsg 过滤器
export default function () {
    Vue.filter('time', time);
};
