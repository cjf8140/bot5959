const Discord = require('discord.js');
const client = new Discord.Client();

const axios = require("axios");
const request = require("request");
const cheerio = require("cheerio");

const School = require('school-kr');
const school = new School();

var dayadder;
school.init(School.Type.HIGH, School.Region.SEOUL, "B100005288")  //효문

logword = "!log5959";

var keyword=[];
var reply=[];


var adr = 0;

var url=[];

var log_c = [];
var log_t = [];
var log_n = 0;

var cheat = 0;
const { MessageAttachment } = require('discord.js')

var t3h;
var wet;

var dbK=[];
var dbE=[];
var dbT=[];
var meal;
var calendar;

function updater() {
  dbUpdater();
  realTimeWeather();
  (async function() {
    try{
      meal = await school.getMeal();
      calendar = await school.getCalendar();
    } catch(err) {
      console.log(err);
    }
  }());
}

function dbUpdater() {
  request({
    url: "https://docs.google.com/spreadsheets/d/10htzKQieunSbSvAIsjFdVg3TS_BNecAIG72JpVbNFd4/gviz/tq?tqx=out:json",
    json: true
  }, function (err, res, html) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(html);
    html = JSON.parse(html.substr(47).slice(0, -2));
    var i = 0;
    while(1) {
      try {
        if(html.table.rows[i] == undefined) {
          break;
        }
        dbK[i] = html.table.rows[i].c[0].v;
        dbE[i] = html.table.rows[i].c[1].v;
        dbT[i] = html.table.rows[i].c[3].v;
        i+=1;
      } catch(err) {
        console.log(err);
        dbUpdater;
        break;
      }
    }
  })    
}

function realTimeWeather() {
    
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth()+1;
  var day = today.getDate();
  var hours = today.getHours();

  if(hours%3 !=2) {
    hours = hours - hours%3 -1;
  }
  if(hours == -1) {
    hours = 23;
    day=day-1;
  }
  /* example
    * 9시 -> 09시 변경 필요
    */
  
  if(hours < 10) {
      hours = '0'+hours;
  }
  if(month < 10) {
      month = '0' + month;
  }
  if(day < 10) {
      day = '0' + day;
  }
  today = year+""+month+""+day;
  
  /* 좌표 */
  var _nx = 37,
  _ny = 128,
  apikey = "HpE4VOym0e8V23olABUZKlCd211wjgOJD80u0F9SL7%2BHhXkLkO9AnZnpOoXR2y6wqTCwEZ2p%2F6oxIFmPnkJPGA%3D%3D",    
  ForecastGribURL = "http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst";
  ForecastGribURL += "?ServiceKey=" + apikey;
  ForecastGribURL += "&pageNo=1&numOfRows=8";
  ForecastGribURL += "&dataType=JSON";
  ForecastGribURL += "&base_date="+today;
  ForecastGribURL += "&base_time="+hours+"00";
  ForecastGribURL += "&nx=" + _nx + "&ny=" + _ny;
  // console.log(ForecastGribURL);
  request({
    url: ForecastGribURL,
    json: true
  }, function (err, res, html) {
    if (err) {
      wet =100;
      t3h = 0;
      console.log(err);
      return;
    }
    try {
      if(html.response.body.items.item[0].fcstValue) {
        wet = html.response.body.items.item[0].fcstValue;
      }
      if(hours%2 == 0) {
        if(t3h = html.response.body.items.item[6].fcstValue) {
          t3h = html.response.body.items.item[6].fcstValue;
        }
      }
      else {
        if(t3h = html.response.body.items.item[4].fcstValue) {
          t3h = html.response.body.items.item[4].fcstValue;
        }
      }
      // console.log("날씨 업뎃 O");
    } catch {
      wet = t3h = "<오류>";
      console.log("날씨 업뎃 X");
    }
  })    
}

client.on('message', msg => {
  log_c[log_n] = msg.content;
  log_t[log_n] = msg.author.tag;
  log_n++;
  if(msg.content==logword) {
    var message = [];
    for(i = 0; i<log_n-1; i++) {
      message+=log_t[i]+': '+log_c[i]+'\n';
    }
    for(i = 0; i < message.length; i+=2000) {
      if(message.substring(i,i+2000) == "") {
        break;
      }
      msg.channel.send(message.substring(i, i+2000));
    }
  }
  if(msg.content == "!업뎉") {
    updater();
    msg.channel.send("업데이트 완료!");
  }
  if (msg.author.bot) return;
  var string = msg.content.split(' ');
  var initial = msg.content.charAt(0);
  //msg.channel.send("🎉준희야 생일 축하해🦅");
  if(string[0] == "슈!슉" && msg.channel.id != 829402170930626591 && msg.channel.id != 818359643713175555) {
    if(Number(string[1] > 90)) {
      return;
    }
    (async function() {
      msg.delete();
      const fetched = await msg.channel.fetchMessages({limit: Number(string[1])+1} );
      msg.channel.bulkDelete(fetched);
    }());
  }
  if(msg.content == "." && msg.channel.id == 818779173824364545) {
    if(Number(string[1] > 90)) {
      return;
    }
    (async function() {
      msg.delete();
      const fetched = await msg.channel.fetchMessages({limit: 100} );
      msg.channel.bulkDelete(fetched);
    }());
  }
  if(msg.content.includes("날씨")) {
      msg.channel.send("기온: "+Number(t3h) + "˚c\n강수 확률: " + Number(wet)+ "%");
  }
  if(msg.content=="!시험") {
    msg.channel.send("https://cdn.discordapp.com/attachments/818359643713175555/854365802421682206/20210614_100528.jpg");
  }

  for(var i = keyword.length; i >= 0; i--) {
    if(msg.content.includes(keyword[i]) ) {
      msg.channel.send(reply[i]);
    }
  }
  if(msg.content.includes("급식")) {
      var day = new Date();
      var tday = new Date();
      dayadder = 0;
      if(msg.content.includes("월")) {
        while(tday.getDay() != 1) {
          dayadder +=1;
          tday = new Date(day.getFullYear(), day.getMonth(), day.getDate()+dayadder);
        }
      }
      else if(msg.content.includes("화")) {
        while(tday.getDay() != 2) {
          dayadder +=1;
          tday = new Date(day.getFullYear(), day.getMonth(), day.getDate()+dayadder);
        }
      }
      else if(msg.content.includes("수")) {
        while(tday.getDay() != 3) {
          dayadder +=1;
          tday = new Date(day.getFullYear(), day.getMonth(), day.getDate()+dayadder);
        }
      }
      else if(msg.content.includes("목")) {
        while(tday.getDay() != 4) {
          dayadder +=1;
          tday = new Date(day.getFullYear(), day.getMonth(), day.getDate()+dayadder);
        }
      }
      else if(msg.content.includes("금")) {
        while(tday.getDay() != 5) {
          dayadder +=1;
          tday = new Date(day.getFullYear(), day.getMonth(), day.getDate()+dayadder);
        }
      }
      else {
        if(day.getHours() <= 11 || (day.getHours()==12&&day.getMinutes()<=30)) {
          dayadder = 0;
        }
        else {
          dayadder = 1;
        }
        if(meal[meal.day+1] == "") {
          while(meal[meal.day+dayadder] == "") {
            dayadder++;
          }
        }
      }
      msg.channel.send(meal.month+"월 "+ (meal.day+dayadder)+"일 "+meal[meal.day+dayadder]);
  }
  if(initial == '=' && string[0]!= '==') {
    if(keyword.includes(string[0].substring(1,100))) {
      reply[keyword.indexOf(string[0].substring(1,100))] = string[1];
    }
    else {
      keyword[adr] = string[0].substring(1,100);
      reply[adr] = string[1];
      for(var i = 2; i <string.length; i++) {
        reply[adr] += ' '+string[i];
      }
      adr++;
    }
  }
  if(msg.content == '==') {
    var list = '';
    for(var i = keyword.length-1; i >= 0; i--) {
        list += keyword[i] + ' = ' + reply[i] + '\n';
    }
    msg.channel.send(list);
  }

  if(msg.content.includes('~')) {
    if(msg.content == '~도움') {
      var str="";
      for(var i = 0; i < dbK.length; i++) {
        str+=dbK[i] + ', ';
      }
      msg.channel.send(str.slice(0 ,-2) );
    }
    else if(string[0] == "~도움") {
      var str="";
      for(var i = 0; i < dbK.length; i++) {
        if(dbT[i].includes(string[1]) || dbK[i].includes(string[1])) {
          str+=dbK[i] + ', ';
        }
      }
      msg.channel.send(str.slice(0 ,-2) );
    }
    for(var i = 0; i < dbK.length; i++) {
      if(msg.content.includes( '~'+dbK[i]) ) {
        msg.channel.send(dbE[i]);
        break;
      }
    }
  }

  if(initial == "&") {
    msg.delete();
    msg.channel.send("https://hitomi.la/galleries/"+msg.content.slice(1)+".html");
  }

  if (msg.content.includes("처갓집")) {
    msg.channel.send('02-992-8881');
  }

  if(msg.content == '!사관') {
    msg.channel.send('\'즐거움\'까지 '+ date(8, 12)+ '일 .')
  }

  if(msg.content == '!수능') {
    msg.channel.send('까지 '+ date(11, 18)+ '일 남음.')
  }

  if(string[0] == '!생일') {
    if(string[1] == undefined) {
      msg.channel.send('동준: **1월 14일**: __' +date(1, 14)+ '__일 남음.\n'+
                       '철종: **3월 6일**: __' +date(3, 6)+ '__일 남음.\n'+
                       '호현: **3월 31일**: __' +date(3, 31)+ '__일 남음.\n'+
                       '수민: **5월 15일**: __' +date(5, 15)+ '__일 남음.\n'+
                       '준희: **8월 26일**: __' +date(8, 26)+ '__일 남음.\n'+
                       '연수: **9월 10일**: __' +date(9, 10)+ '__일 남음.\n'+
                       '진호: **9월 14일**: __' +date(9, 14)+ '__일 남음.\n'+
                       '승주: **10월 11일**: __' +date(10, 11)+ '__일 남음.\n'+
                       '연주: **10월 21일**: __' +date(10, 21)+ '__일 남음.\n'+
                       '민혁: **11월 22일**: __' +date(11, 22)+ '__일 남음.\n'+
                       '건화: **12월 1일**: __' +date(12, 1)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('철')) {
      msg.channel.send('철종: **3월 6일**: __' +date(3, 6)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('승')) {
      msg.channel.send('승주: **10월 11일**: __' +date(10, 11)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('진')) {
      msg.channel.send('진호: **9월 14일**: __' +date(9, 14)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('호')) {
      msg.channel.send('호현: **3월 31일**: __' +date(3, 31)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('동')) {
      msg.channel.send('동준: **1월 14일**: __' +date(1, 14)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('수')) {
      msg.channel.send('수민: **5월 15일**: __' +date(5, 15)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('건')) {
      msg.channel.send('건화: **12월 1일**: __' +date(12, 1)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('준')) {
      msg.channel.send('준희: **8월 26일**: __' +date(8, 26)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('민')) {
      msg.channel.send('민혁: **11월 22일**: __' +date(11, 22)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('수')) {
      msg.channel.send('연수: **9월 10일**: __' +date(9, 10)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('주')) {
      msg.channel.send('연주: **10월 21일**: __' +date(10, 21)+ '__일 남음.');
    }
  }

  if(string[0] == '/생일') {
    if(string[1] == undefined) {
      msg.channel.send('동준: **1월 14일**: __' +date(1, 14)+ '__일 남음.\n'+
                       '철종: **3월 6일**: __' +date(3, 6)+ '__일 남음.\n'+
                       '연수: **9월 10일**: __' +date(9,10)+ '__일 남음.\n'+
                       '승주: **10월 11일**: __' +date(10, 11)+ '__일 남음.\n'+
                       '연주: **10월 21일**: __' +date(10, 21)+ '__일 남음.\n'+
                       '성수: **12월 19일**: __' +date(12, 19)+ '__일 남음.');
    }s
    if(string[1] && string[1].includes('철')) {
      msg.channel.send('철종: **3월 6일**: __' +date(3, 6)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('수')) {
      msg.channel.send('연수: **9월 10일**: __' +date(9, 10)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('승')) {
      msg.channel.send('승주: **10월 11일**: __' +date(10, 11)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('주')) {
      msg.channel.send('연주: **10월 21일**: __' +date(10, 21)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('성')) {
      msg.channel.send('성수: **12월 19일**: __' +date(12, 19)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('동')) {
      msg.channel.send('동준: **1월 14일**: __' +date(1, 14)+ '__일 남음.');
    }
  }

  if(string[0] == '!date') {
    msg.channel.send(date(Number(string[1]), Number(string[2])) + '일 남음');
  }
  if(msg.content == "!해석" || msg.content == "!석해") {
    return;
  }
  if(string[0] == '!해석') {
    msg.delete();
    msg.channel.send(Buffer.from(string[1], 'base64').toString() );
  }
  if(string[0] == '!석해') {
    msg.delete();
    msg.channel.send(Buffer.from(msg.author.tag+": "+msg.content.substring(4,), 'utf-8').toString('base64') );
  }
  if(string[0] == '!!석해') {
    msg.delete();
    var ms = msg.content.substring(5,);
    for(var i = 0; i <10; i++) {
      ms = Buffer.from(ms, 'utf-8').toString('base64');
    }
    msg.channel.send(ms);
  }

  if(msg.content == "주사위" ) {
    if(cheat == 0) {
      msg.channel.send( gr(6)+1 );
    }
    else {
      msg.channel.send( cheat );
      cheat = 0;
    }
  }
  if(string[0] == ("!!사기")) {
    cheat = Number( string[1] );
    msg.reply("👍");
  }

  if(msg.content.includes("온") &&  msg.content.includes("클")) {
    msg.channel.send("https://www.ebsoc.co.kr/");
  }
  if(msg.content == '.') {
    msg.channel.send(".\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.");
  }
});

function date(month, day) {
  var tday = new Date();
  var nowYear = tday.getFullYear();
  var dday = new Date(nowYear, month-1, day);
  if(dday -tday < -1) {
    dday = new Date(nowYear+1, month-1, day);
  }
  return Math.ceil( (dday-tday) / (1000*60*60*24) ); //-9*60*60*1000
}

var gr = function(max) {
  var ranNum = Math.floor(Math.random()*(max));
  return ranNum;
}

// client.login(process.env.TOKEN);
client.login('ODE2Mjg4NTc3MDI1MDgxMzQ0.YD4x-g.nuFX8V0I7JeQKWVsOe8SjVOi8u8');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  updater();
  client.setInterval(updater, 10*60*1000);
})

async function getHTML() {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
}
