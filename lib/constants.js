"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var VIEWMODE = exports.VIEWMODE = {
	DAY: 4, //天视图,     显示时间（小时,分）的选择
	MONTH: 16, //月视图,     显示日期选择
	YEAR: 64, //年视图,     显示月份选择
	YEARS: 256 };

//SELECTMODE >> 2  == 对应的VIEWMODE >> 2
var SELECTMODE = exports.SELECTMODE = {
	TIME: 4, //时间选择模式,     对应天视图界面
	DATE: 16, //日期选择模式,     对应月视图界面
	DATES: 17, //日期范围选择模式, 对应月视图界面
	WEEK: 18, //周选择模式,       对应月视图界面
	MONTH: 64, //月选择模式,       对应年视图界面
	YEAR: 256 };