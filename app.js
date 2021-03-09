const Discord = require('discord.js');
const client = new Discord.Client();

const axios = require("axios");
const cheerio = require("cheerio");

var keyword;
var reply;

var we = 0

var sen = '';

var url=[];

client.on('message', msg => {
  if (msg.author.bot) return;

  var string = msg.content.split(' ');
  var initial = msg.content.charAt(0);

  if(initial == '~') {
    keyword = string[0].substring(1,100);
    reply = string[1];
    for(var i = 2; i <string.length; i++) {
      reply += ' '+string[i];
    }
  }
  if(msg.content.includes(keyword) && initial != '~') {
    we = 1;
    sen += reply+'\n';
  }

  if ((msg.content.includes('진') && msg.content.includes('호') )  || msg.content.includes('jinho')) {
    sen += '육변기\n'
    we = 1;
  }
  if (msg.content.includes('호') && (msg.content.includes('연') || msg.content.includes('현')) ) {
    sen += '게이바\n'
    we = 1;
  }
  if (msg.content.includes('동') && msg.content.includes('준')) {
    sen += '옥자년\n'
    we = 1;
  }
  if (msg.content.includes('승') && msg.content.includes('주')) {
    sen += 'https://tenor.com/view/kermit-freaking-out-crazy-gif-8832122\n'
    we = 1;
  }
  if (msg.content.includes('방과') || msg.content.includes('체육') || msg.content.includes('학교') || msg.content.includes('교실')) {
    sen += '떡각\n'
    we = 1;
  }
  if (msg.content.includes('철') && msg.content.includes('종')) {
    sen += 'https://cdn.discordapp.com/attachments/814514374072074303/817590241077493780/watch.png\n'
    we = 1;
  }

  if (msg.content.includes('지') && msg.content.includes('능')) {
    sen += '처참\n'
    we = 1;
  }

  if(we == 1) {
    msg.channel.send(sen);
    sen = ''
    we = 0;
  }

  if(msg.content == '!사관') {
    msg.channel.send('철종이 해방까지 '+ date(4, 7)+ '일 남음.')
  }

  if(msg.content == '!수능') {
    msg.channel.send('지구멸망까지 '+ date(11, 18)+ '일 남음.')
  }

  if(string[0] == '!생일') {
    if(string[1] == undefined) {
      msg.channel.send('철종: **3월 6일**: __' +date(3, 6)+ '__일 남음.\n'+
                       '승주: **10월 11일**: __' +date(10, 11)+ '__일 남음.\n'+
                       '호현: **3월 31일**: __' +date(3, 31)+ '__일 남음.\n'+
                       '진호: **9월 14일**: __' +date(9, 14)+ '__일 남음.\n'+
                       '동준: **1월 14일**: __' +date(1, 14)+ '__일 남음.\n'+
                       '수민: **5월 15일**: __' +date(5, 15)+ '__일 남음.\n'+
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
    if(string[1] && string[1].includes('연')) {
      msg.channel.send('연수: **9월 10일**: __' +date(9, 10)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('승')) {
      msg.channel.send('승주: **10월 11일**: __' +date(10, 11)+ '__일 남음.');
    }
    if(string[1] && string[1].includes('연')) {
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

  if(initial == '#') {
    if(!isNaN(string[0].substring(1,10))) {
      msg.channel.send("https://hiyobi.me/reader/"+string[0].substring(1,10));
    }
    else {
      var url = "https://hiyobi.me/search/"+string[0].substring(1,100);
      for(var i = 1; i < 5; i++) {
        if(!string[i]=='') {
          url += "%20"+string[i];
        }
      }
      msg.channel.send(url);
    }
  }

  if(string[0] == 'ㅍ') {
    url = encodeURI("http://pixiv.navirank.com/search/?words="+string[1]+"&mode=0&type=0&comp=0");
    getHTML()
      .then(html => {
        let titleList = [];
        const $ = cheerio.load(html.data);
        const bodyList = $("div.rank ol li.rank ul.irank").children("li.img");

        bodyList.each(function(i, elem) {
          titleList[i] = {
            title: $(this).find('a').attr('href')
          };
        });
        return titleList;
      })
      .then(res => {
        msg.channel.send("1. https://www.pixiv.net/artworks/"+res[0].title.substring(4,12));
        for(var i = 1; i < Number(string[2]); i++) {
          msg.channel.send((i+1)+". https://www.pixiv.net/artworks/"+res[i].title.substring(4,12));
        }
      });
    }

});

function date(month, day) {
  var tday = new Date();
  var nowYear = tday.getFullYear();
  var dday = new Date(nowYear, month-1, day);
  if(dday -tday < -1) {
    dday = new Date(nowYear+1, month-1, day);
  }
  return Math.ceil( (dday-tday-9*60*60*1000) / (1000*60*60*24) );
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
