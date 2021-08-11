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

function updater() {
  dbUpdater();
  realTimeWeather();
}

function dbUpdater() {
  request({
    url: "https://spreadsheets.google.com/feeds/cells/10htzKQieunSbSvAIsjFdVg3TS_BNecAIG72JpVbNFd4/od6/public/basic?alt=json",
    json: true
  }, function (err, res, html) {
    if (err) {
      console.log(err);
      return;
    }
    var i = 0;
    while(1) {
      if(html.feed.entry[i] == undefined) {
        break;
      }
      if(i%3 == 0) {  //key위치
        dbK[i/3] = html.feed.entry[i].content.$t
      }
      else if(i%3 == 1) { //이미지링크위치
        dbE[parseInt(i/3)] = html.feed.entry[i].content.$t
      }
      i+=1;
    }
    console.log(dbK);
    console.log(dbE);
  })    
}

function realTimeWeather() {
    
  var today = new Date();
  var week = new Array('일','월','화','수','목','금','토');
  var year = today.getFullYear();
  var month = today.getMonth()+1;
  var day = today.getDate();
  var hours = today.getHours()-1;
  var minutes = today.getMinutes();

  //   */
  // if(minutes < 30){
  //     hours = hours - 1;
  //     if(hours < 0){
  //         // 자정 이전은 전날로 계산
  //         today.setDate(today.getDate() - 1);
  //         day = today.getDate();
  //         month = today.getMonth()+1;
  //         year = today.getFullYear();
  //         hours = 23;
  //     }
  // }
    
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
  var _nx = 61, 
  _ny = 128,
  apikey = "HpE4VOym0e8V23olABUZKlCd211wjgOJD80u0F9SL7%2BHhXkLkO9AnZnpOoXR2y6wqTCwEZ2p%2F6oxIFmPnkJPGA%3D%3D",    
  ForecastGribURL = "http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst";
  ForecastGribURL += "?ServiceKey=" + apikey;
  ForecastGribURL += "&pageNo=1&numOfRows=8";
  ForecastGribURL += "&dataType=JSON";
  ForecastGribURL += "&base_date="+today;
  ForecastGribURL += "&base_time="+"0500";
  ForecastGribURL += "&nx=" + _nx + "&ny=" + _ny;
  console.log(ForecastGribURL);
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
    wet = html.response.body.items.item[0].fcstValue;
    t3h = html.response.body.items.item[4].fcstValue;
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

  if (msg.author.bot) return;
  var string = msg.content.split(' ');
  var initial = msg.content.charAt(0);

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

  // if(initial=='~') {
  //   if(msg.content == '~도움') {
  //     var str="";
  //     for(var i = 0; i < wave.length; i++) {
  //       str+=wave[i][0] + ', ';
  //     }
  //     msg.channel.send(str.substring(0 ,str.length-2) );
  //   }
  //   for(var i = 0; i < wave.length; i++) {
  //     if(msg.content == ('~'+wave[i][0]) ) {
  //       msg.channel.send(wave[i][1]);
  //     }
  //   }
  // }

  if(initial=='~') {
    if(msg.content == '~도움') {
      var str="";
      for(var i = 0; i < dbK.length; i++) {
        console.log(dbK[i]);
        str+=dbK[i] + ', ';
      }
      msg.channel.send(str.substring(0 ,str.length-2) );
    }
    for(var i = 0; i < dbK.length; i++) {
      console.log('a');
      if(msg.content == '~'+dbK[i]) {
        console.log(dbE[i]);
        msg.channel.send(dbE[i]);
        break;
      }
    }
  }

  if (msg.content.includes('방과') || msg.content.includes('체육') || msg.content.includes('학교') || msg.content.includes('교실') || msg.content.includes('음악실')) {
    msg.channel.send('각');
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
  client.setInterval(updater, 1800*1000);
})

async function getHTML() {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
}
var wave= [/*
             ["진호", 'https://cdn.discordapp.com/attachments/831420571803713547/839118758584254524/dccon.png'],
             ["찐호", 'https://cdn.discordapp.com/attachments/831420571803713547/839118758584254524/dccon.png'],
             ["호현", 'https://cdn.discordapp.com/attachments/831420571803713547/839120955133395004/unknown.png'],
             ["호연", 'https://cdn.discordapp.com/attachments/831420571803713547/839120955133395004/unknown.png'],
             ["동준", 'https://cdn.discordapp.com/attachments/831420571803713547/839119046808961075/59bbbab821aa5fe3104c3e81f53ec0430bc69e3ff287358d4c380c67545e79a0.png'],
             ["춘향", 'https://cdn.discordapp.com/attachments/831420571803713547/839119046808961075/59bbbab821aa5fe3104c3e81f53ec0430bc69e3ff287358d4c380c67545e79a0.png'],
             ["연주", 'https://cdn.discordapp.com/attachments/829731525520130078/829731539713523792/unknown.png'],
             ["연죽", 'https://cdn.discordapp.com/attachments/829731525520130078/829731539713523792/unknown.png'],
             ["승주", 'https://cdn.discordapp.com/attachments/818606409293234236/823452252030107648/ko1.png'],
             ["철종", 'https://cdn.discordapp.com/attachments/789780000827113533/840536978084855869/unknown.png'],
             ["민혁", 'https://cdn.discordapp.com/attachments/831420571803713547/839123211429871616/ezgif-3-0b85860b65b7.gif'],
             ["수민", "https://ac.namu.la/fd/fdf706f14d0d470f69e8f788a5f84a3c1665f4ad83bdf6652c44c68f757c21fe.gif"],
             ["준희", 'https://cdn.discordapp.com/attachments/831420571803713547/839122148563484722/unknown.png'],
             ["연수", 'https://cdn.discordapp.com/attachments/831420571803713547/839126426509770802/unknown.png'],
             ["건화", 'https://cdn.discordapp.com/attachments/831420571803713547/839124146738692126/unknown.png'],
             ["건희", 'https://cdn.discordapp.com/attachments/831420571803713547/839124146738692126/unknown.png'],*/

             ["엄마", 'https://cdn.discordapp.com/attachments/829731525520130078/848934345719676948/1c107dbe3ddee3ba1c75075598c701a5e6a3b1b061d1d85ac59e2fd9a8d21edd.png'],
             ["언니", 'https://cdn.discordapp.com/attachments/829731525520130078/848934426409959484/0b7a6f4000c666252fbad2445d562be915aee5b1f84a77722249aaa18e565685.png'],
             ["순애", 'https://cdn.discordapp.com/attachments/829731525520130078/848934541226016819/d17957728f0a90be7913fd8ae121df317d3d9dc29f3d7e0d83fb8c073e3fee63.png'],
             ["모녀", 'https://cdn.discordapp.com/attachments/829731525520130078/848934581674835988/e3f5f8f3346cedced4bef1c24df0746359797a77fd19b7663356769ac186aa57.png'],
             ["자매", 'https://cdn.discordapp.com/attachments/829731525520130078/848934611433160784/dee4a798727b4ad1706d2270df58d3e4d1565332fcd250de0046c31311c4b04b.png'],
             ["공포", 'https://cdn.discordapp.com/attachments/829731525520130078/848934638206451752/6bc73e6f223831976922e6d848972ef52a8c1dda35845e165c33ecbd351421bc.png'],
             ["야한거돼", 'https://cdn.discordapp.com/attachments/829731525520130078/848934682820083759/dccon.png'],
             ["야한거", 'https://cdn.discordapp.com/attachments/829731525520130078/848934659945660456/dccon.png'],
             ["ips", 'https://cdn.discordapp.com/attachments/829731525520130078/848934659945660456/dccon.png'],
             ["가학", 'https://cdn.discordapp.com/attachments/829731525520130078/848936617595109391/909e2941776192bbce51f4228e3ac161f15cf04e0f6fd7a696fa4ad18c46b4c2.png'],
             ["바보", 'https://cdn.discordapp.com/attachments/829731525520130078/848932776753233930/98a68a5c7da65743.png'],
             ["그만먹어", 'https://cdn.discordapp.com/attachments/831420571803713547/849668708431429662/dccon.png'],
             ["뉴비", 'https://cdn.discordapp.com/attachments/831420571803713547/849668838077104198/dccon.png'],
             ["백합", 'https://cdn.discordapp.com/attachments/831420571803713547/849668854468706364/dccon.png'],
             ["미워요", 'https://cdn.discordapp.com/attachments/831420571803713547/849669296116465754/dccon.png'],
             ["또야한말", 'https://cdn.discordapp.com/attachments/831420571803713547/849669311370493963/dccon.png'],
             ["야한말그만해", 'https://cdn.discordapp.com/attachments/831420571803713547/849669504668794880/dccon.png'],
             ["고마워요", 'https://cdn.discordapp.com/attachments/831420571803713547/849669555868663808/dccon.png'],
             ["왜괴롭혀", 'https://cdn.discordapp.com/attachments/831420571803713547/849669600420560906/dccon.png'],
             ["왜욕해", 'https://cdn.discordapp.com/attachments/831420571803713547/849669619936526396/dccon.png'],
             ["못댔어", 'https://cdn.discordapp.com/attachments/831420571803713547/849669196266340362/dccon.png'],
             ["팔딱", 'https://tenor.com/view/genshin-gif-19434226'],
             ["잘자", "https://cdn.discordapp.com/attachments/831420571803713547/853769991668498462/4b74eccb5992e990.png"],
            //  1차 업뎃

             //2차 업뎃
             ["주먹", "https://cdn.discordapp.com/attachments/831420571803713547/858627145043542076/dccon.png"],
             ["맞아", "https://cdn.discordapp.com/attachments/831420571803713547/858627193088638976/dccon.png"],
             ["아니", "https://cdn.discordapp.com/attachments/831420571803713547/858627206343557120/dccon.png"],
             ["비백합", "https://cdn.discordapp.com/attachments/831420571803713547/858627216015097866/dccon.png"],
             ["준비", "https://cdn.discordapp.com/attachments/831420571803713547/858627232901234698/a0aae90f2ba749d29f03d559ce8a3a191ce2a930ffb4efe8c1ae6367a3f4f224.png"],
             ["손가락", "https://cdn.discordapp.com/attachments/831420571803713547/858627276647563294/dccon.png"],
             ["젖줘", "https://cdn.discordapp.com/attachments/831420571803713547/858627257328467968/ad94ed73711ffb3b9c03ff2fe825eee7602bee269b9db339d2abbe73124fa35d.png"],
             ["현질", "https://cdn.discordapp.com/attachments/831420571803713547/858627317303214080/22cdf0426c379b22950de975a2f9e7c8c8b4c9d34e9b1619312fa35eef46eaa0.png"],
             ["ㄹㅇㅋㅋ", "https://cdn.discordapp.com/attachments/831420571803713547/858630240636239902/ce2a434a05e47698babd8f4c1376d040bdad3eb603c8e51ceeb68d2324b50186.png"],
             ["스고이", "https://cdn.discordapp.com/attachments/858398420951760916/858404543183847444/8ba046b81cb8c2212f5f66416cfb7319b5485a5c2465bb582fe6432dcd1f617a.gif"],
             ["회로", "https://cdn.discordapp.com/attachments/831420571803713547/858627419317338122/196393abd466a9d430d5b031445fd033fc00ce5ca2bad02b71c5dbe15753e728.png"],
             ["너만봐", "https://cdn.discordapp.com/attachments/831420571803713547/858627432122941460/f22103be8905ceea668feb66060e6b76660531f036217c1e8a503f553b798625.png"],
             ["꿀벌", "https://cdn.discordapp.com/attachments/831420571803713547/858627558325223444/unknown.png"],
             ["좋은건", "https://cdn.discordapp.com/attachments/831420571803713547/858627601870749746/01ebe4b38963e891867e7694ff623cb525cf5d04bdaf892ec63d674b10121927.png"],
             ["폭탄", "https://cdn.discordapp.com/attachments/831420571803713547/858627916941623345/unknown.png"],
             ["사약", "https://cdn.discordapp.com/attachments/831420571803713547/858627938999992330/5d2ade2fc6a32fccea154f1bd2cd90323ce9723e41fffef8753e78af9ee195e1.png"],
             ["아잉", "https://cdn.discordapp.com/attachments/831420571803713547/858628045534789642/unknown.png"],
             ["자살", "https://cdn.discordapp.com/attachments/831420571803713547/858630412707168257/8ee99845eaa34664561834cebd8c176f61e33ad5d4d94943c3322cb30684728f.png"],
            //  2차 업뎃

             //  3차 업뎃
             ["진짜네", "https://cdn.discordapp.com/attachments/831420571803713547/859746472860844042/dccon.png"],
             ["시러요", "https://cdn.discordapp.com/attachments/831420571803713547/859746614503407636/dccon.png"],
             ["진짜싫어", "https://cdn.discordapp.com/attachments/831420571803713547/859746672074424360/dccon.png"],
             ["ㅋ", "https://cdn.discordapp.com/attachments/831420571803713547/859746908091973683/icon_35.jpg"],
             ["딱대", "https://cdn.discordapp.com/attachments/831420571803713547/859747031186407434/icon_43.jpg"],
             ["왤케망겜", "https://cdn.discordapp.com/attachments/831420571803713547/859751333183488020/357afe74c90283e7a6cef37cac21c30dc16e831d9fda61d1907b340c8d5867ed.png"],
             ["왤케씨발", "https://cdn.discordapp.com/attachments/831420571803713547/859751379081625650/0da184aa5781cbf022b7987cbfb4e0fc436f7b7e40faf9d5707ba82af97fb225.png"],
             ["왤케고수", "https://cdn.discordapp.com/attachments/831420571803713547/859751407384133672/b626d70cc6841ae939540f9f71cfa45c2eadb55437a3688e74b01b9e905b5a65.png"],
             ["왤케왤케", "https://cdn.discordapp.com/attachments/831420571803713547/859751452016771132/7db881043f694060357d9ae4d07a3cf6b9ae8849ba230a40ec3560205a757f87.png"],
             ["왤케주작", "https://cdn.discordapp.com/attachments/831420571803713547/859751476762116126/9c5798ff8a00394b0a5ccda1c61a6a3bb886251207ba00fd2eb9a0ce06703219.png"],
             ["왤케흑우", "https://cdn.discordapp.com/attachments/831420571803713547/859751504289595392/73093ecf13a4a3e125f7ed725a74d308fbef4eb02af6900fef04f5f3bc3121ea.png"],
             ["왤케노잼", "https://cdn.discordapp.com/attachments/831420571803713547/859751528737669130/5aea5645c71d9b735f458e7ceb39b7f932a7cf09583f0d83a69bcf7ca1e2988e.png"],
             ["왤케병신", "https://cdn.discordapp.com/attachments/831420571803713547/859751555640066048/35b0b9025a779a7fae4088f39cac47e14a02ed11156805dc6c822d620663e050.png"],
             ["왤케개꼴림", "https://cdn.discordapp.com/attachments/831420571803713547/859751704559222794/ee56795996caaf81b6a8442b374886b9b22d24b8b75beced23cc3bcbb2bb3a6a.png"],
             ["비추", "https://cdn.discordapp.com/attachments/831420571803713547/859751809760886794/icon_2.gif"],
             ["개추", "https://cdn.discordapp.com/attachments/831420571803713547/859751858254774282/icon_1.gif"],
             ["전쟁", "https://cdn.discordapp.com/attachments/831420571803713547/859751895412375622/dccon.png"],
             ["각넘약", "https://cdn.discordapp.com/attachments/831420571803713547/859751920529178634/63513ac947e44e8392deaa838c17a831f7991a62765355c8127a2af481f03acf.png"],
             ["각청이미", "https://cdn.discordapp.com/attachments/831420571803713547/859751944460566568/c2c94e41b301e52ccae78a819a148c9d3f7d5067f3816867dc014fd73cf0b58f.png"],
             ["몰라응애", "https://cdn.discordapp.com/attachments/831420571803713547/859751974815399946/9ebfdc96c7213603f1b407b0f33783188e57d7e5295c2be292d8bc96dc86c1a1.png"],
             ["응애", "https://cdn.discordapp.com/attachments/831420571803713547/859751996571910154/22126fb906838c339643c437eab3fc1f16604ef80518b691aa7dc50dffcaacc1.png"],
             ["따봉", "https://cdn.discordapp.com/attachments/831420571803713547/859752018691227668/184e242c42c5485b21a6b91b426c13ecbfef85b7df751b8e7d2fcd59aedb9299.png"],
             ["까먹었어", "https://cdn.discordapp.com/attachments/831420571803713547/859752051499073556/6c563ad274c095431c49c9b6a6e197db690c9475f002ba558f6c4d2e2ed3b7fa.png"],
             ["꿀잠", "https://cdn.discordapp.com/attachments/831420571803713547/859752087860150292/6ceff9846abce80660113c8627ddc52950a921379f8e57631007b07f39956a98.png"],
             ["내", "https://cdn.discordapp.com/attachments/831420571803713547/861283103866748958/c8a1069ab5b9365f690d829375905f7e534abe134076533c1cb2a8b9887e41bc.png"],
             ["ㅗ", "https://cdn.discordapp.com/attachments/831420571803713547/861683054317928458/cfb5985dcc1f94724ef140c0401162150235bf4df1ddab475111054b6116195d.png"],
            //  3차 업뎃
           ];
