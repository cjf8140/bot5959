const Discord = require('discord.js');
const client = new Discord.Client();

const axios = require("axios");
const cheerio = require("cheerio");

var keyword;
var reply;

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
  else if(msg.content.includes(keyword)) {
    msg.channel.send(reply);
  }

  if (msg.content == '안녕') {
    msg.reply('안녕하세요.');
  }
  if (msg.content.includes('진호') || msg.content.includes('jinho')) {
    msg.channel.send('육변기');
  }
  if (msg.content.includes('호현')) {
    msg.channel.send('게이바');
  }
  if (msg.content.includes('동준')) {
    msg.channel.send('옥자년');
  }
  if (msg.content.includes('승주')) {
    msg.channel.send('ㄴ착정 당하기를 원함');
  }
  if (msg.content.includes('방과') || msg.content.includes('체육') || msg.content.includes('학교') || msg.content.includes('교실')) {
    msg.channel.send('떡각');
  }
  if (msg.content.includes('철종')) {
    msg.channel.send('지켜보고 있음', {files: ["img/watch.png"] });
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

var generateRandom = function(max) {
  var ranNum = Math.floor(Math.random()*(max));
  return ranNum;
}

client.login(process.env.TOKEN);

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
