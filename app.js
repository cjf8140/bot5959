const Discord = require('discord.js');
const client = new Discord.Client();

const axios = require("axios");
const cheerio = require("cheerio");
const School = require('school-kr');
const school = new School();

var meal1;
var meal2;
const gup = async function (){
  school.init(School.Type.HIGH, School.Region.SEOUL, "B100005288")  //효문
  const meal = await school.getMeal();
  const calendar = await school.getCalendar();
  var tom = await meal.day +1
  meal1 = await meal.today;
  meal2 = await meal[tom];
};


var keyword=[];
var reply=[];

var adr = 0;

var rewr = 0;

var we = 0

var sen = '';

var on = 1;

var url=[];

client.on('message', msg => {
  if (msg.author.bot) return;
  if(on) {
    msg.channel.send("봇이 리셋(패치)됨");
    on = 0;
  }
  var string = msg.content.split(' ');
  var initial = msg.content.charAt(0);

  if(initial == '$') {
    msg.delete();
    msg.channel.send( msg.content.substring(1,) );
    return;
  }

  for(var i = keyword.length; i >= 0; i--) {
    if(msg.content.includes(keyword[i]) ) {
      msg.channel.send(reply[i]);
    }
  }
  if(msg.content.includes("급식")) {
    gup();
    var tday = new Date();
    if(tday.getHours() < 13) {
      if(meal1 == "") {
        msg.channel.send("오늘 급식 없음");
      }
      else {
        msg.channel.send(meal1);
      }
    }
    else {
      if(meal2 == "") {
        msg.channel.send("내일 급식 없음");
      }
      else {
        msg.channel.send(meal2);
      }
    }
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
  if ((msg.content.includes('진') && msg.content.includes('호') )  || msg.content.includes('jinho')) {
    sen += '육변기.\n'
    we = 1;
  }
  if (msg.content.includes('호') && (msg.content.includes('연') || msg.content.includes('현')) ) {
    sen += '게이바\n'
    we = 1;
  }
  if (msg.content.includes('동') && msg.content.includes('준')) {
    sen += '脫毛\n'
    we = 1;
  }
  if (msg.content.includes('연') && (msg.content.includes('주') || msg.content.includes('죽'))  ) {
    msg.channel.send('https://cdn.discordapp.com/attachments/829731525520130078/829731539713523792/unknown.png');
    we = 1;
  }
  if (msg.content.includes('승') && msg.content.includes('주')) {
    msg.channel.send('https://cdn.discordapp.com/attachments/818606409293234236/823452252030107648/ko1.png');
  }
  if (msg.content.includes('종') && msg.content.includes('철')) {
    msg.channel.send('https://cdn.discordapp.com/attachments/818606409293234236/823452255398920232/watch.png');
  }

  if (msg.content.includes('지') && msg.content.includes('능')) {
    sen += '처참.\n'
    we = 1;
  }

  if (msg.content.includes('방과') || msg.content.includes('체육') || msg.content.includes('학교') || msg.content.includes('교실') || msg.content.includes('음악실')) {
    sen += '떡각.\n'
    we = 1;
  }
  if (msg.content.includes('sm')) {
    msg.channel.send("https://arca.live/b/smpeople");
  }

  if(we == 1) {
    msg.channel.send(sen);
    sen = ''
    we = 0;
  }

  if(msg.content == '!사관') {
    msg.channel.send('\'즐거움\'까지 '+ date(5, 20)+ '일 .')
  }

  if(msg.content == '!수능') {
    msg.channel.send('지구멸망까지 '+ date(11, 18)+ '일 남음.')
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
    }
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

  if(string[0] == '!해석') {
    msg.channel.send( Buffer.from(string[1], 'base64').toString() );
  }

  if(msg.content.includes("온") &&  msg.content.includes("클")) {
    msg.channel.send("https://www.ebsoc.co.kr/");
  }
  if(msg.content == '.') {
    msg.channel.send(".\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.");
  }
  if(initial == '#') {
    if(msg.content == '#') {
      msg.channel.send("https://www.hiyobi.me/");
    }
    else {
      msg.channel.send("https://hiyobi.me/reader/"+string[0].substring(1,100));
    }
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

var generateRandom = function(max) {
  var ranNum = Math.floor(Math.random()*(max));
  return ranNum;
}

// client.login(process.env.TOKEN);
client.login('ODE2Mjg4NTc3MDI1MDgxMzQ0.YD4x-g.nuFX8V0I7JeQKWVsOe8SjVOi8u8');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

async function getHTML() {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
}
