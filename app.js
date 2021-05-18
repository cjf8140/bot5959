const Discord = require('discord.js');
const client = new Discord.Client();

const axios = require("axios");
const cheerio = require("cheerio");
const School = require('school-kr');
const school = new School();

var dayadder;
school.init(School.Type.HIGH, School.Region.SEOUL, "B100005288")  //효문



var keyword=[];
var reply=[];

var adr = 0;

var rewr = 0;

var on = 1;

var url=[];

var cheat = 0;

client.on('message', msg => {
  if (msg.author.bot) return;
  if(on && msg.content=="봇") {
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

  if(string[0] == "슈슈슉") {
    if(Number(string[1] > 90)) {
      return;
    }
    (async function() {
      msg.delete();
      const fetched = await msg.channel.fetchMessages({limit: Number(string[1])+1} );
      msg.channel.bulkDelete(fetched);
    }());
  }

  for(var i = keyword.length; i >= 0; i--) {
    if(msg.content.includes(keyword[i]) ) {
      msg.channel.send(reply[i]);
    }
  }
  if(msg.content.includes("급식")) {
    (async function() {
      lm = await msg.channel.send("불러오는 중...");
      const meal = await school.getMeal();
      const calendar = await school.getCalendar();

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
      await lm.delete();
    }());
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
  if (msg.content.includes('진호') || msg.content.includes('찐호')  || msg.content.includes('jinho') ) {
    msg.channel.send('https://cdn.discordapp.com/attachments/831420571803713547/839118758584254524/dccon.png');
  }
  if (msg.content.includes('호연') || msg.content.includes('호현') ) {
    msg.channel.send('https://cdn.discordapp.com/attachments/831420571803713547/839120955133395004/unknown.png');
  }
  if (msg.content.includes('동준') || msg.content.includes('춘향') || msg.content.includes('김던전')) {
    msg.channel.send('https://cdn.discordapp.com/attachments/831420571803713547/839119046808961075/59bbbab821aa5fe3104c3e81f53ec0430bc69e3ff287358d4c380c67545e79a0.png');
  }
  if (msg.content.includes('연주') || msg.content.includes('연죽')) {
    msg.channel.send('https://cdn.discordapp.com/attachments/829731525520130078/829731539713523792/unknown.png');
  }
  if (msg.content.includes('승주') ) {
    msg.channel.send('https://cdn.discordapp.com/attachments/818606409293234236/823452252030107648/ko1.png');
  }
  if (msg.content.includes('철종') ) {
    msg.channel.send('https://cdn.discordapp.com/attachments/789780000827113533/840536978084855869/unknown.png');
  }
  if (msg.content.includes('민혁')) {
    msg.channel.send('https://cdn.discordapp.com/attachments/831420571803713547/839123211429871616/ezgif-3-0b85860b65b7.gif');
  }
  if (msg.content.includes('수민')) {
    msg.channel.send("https://ac.namu.la/fd/fdf706f14d0d470f69e8f788a5f84a3c1665f4ad83bdf6652c44c68f757c21fe.gif");
  }
  if (msg.content.includes('준희')) {
    msg.channel.send('https://cdn.discordapp.com/attachments/831420571803713547/839122148563484722/unknown.png');
  }
  if (msg.content.includes('연수')) {
    msg.channel.send('https://cdn.discordapp.com/attachments/831420571803713547/839126426509770802/unknown.png');
  }
  if (msg.content.includes('건화') || msg.content.includes('건희')) {
    msg.channel.send('https://cdn.discordapp.com/attachments/831420571803713547/839124146738692126/unknown.png');
  }

  if (msg.content.includes('방과') || msg.content.includes('체육') || msg.content.includes('학교') || msg.content.includes('교실') || msg.content.includes('음악실')) {
    msg.channel.send('각');
  }

  if (msg.content.includes("처갓집")) {
    msg.channel.send('02-992-8881');
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
  if(string[0] == '!석해') {
    msg.channel.send( Buffer.from(string[1], 'utf-8').toString('base64') );
  }

  if(msg.content.includes("주사위")) {
    if(cheat == 0) {
      msg.channel.send( gr(6)+1 );
    }
    else {
      msg.channel.send( cheat );
      cheat = 0;
    }
  }
  if(string[0] == ("사기")) {
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
})

async function getHTML() {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
}
