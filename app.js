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
    msg.channel.send(reply);
  }

  if (msg.content.includes('진호') || msg.content.includes('jinho')) {
    sen += '육변기\n'
    we = 1;
  }
  if (msg.content.includes('호') && (msg.content.includes('연') || msg.content.includes('현')) ) {
    sen += '게이바\n'
    we = 1;
  }
  if (msg.content.includes('동준')) {
    sen += '옥자년\n'
    we = 1;
  }
  if (msg.content.includes('승주')) {
    sen += 'https://tenor.com/view/kermit-freaking-out-crazy-gif-8832122\n'
    we = 1;
  }
  if (msg.content.includes('방과') || msg.content.includes('체육') || msg.content.includes('학교') || msg.content.includes('교실')) {
    sen += '떡각+n'
    we = 1;
  }
  if (msg.content.includes('철종')) {
    sen += '지켜보고 있음 \nhttps://cdn.discordapp.com/attachments/814514374072074303/817590241077493780/watch.png\n'
    we = 1;
  }

  if(we == 1) {
    msg.channel.send(sen);
    we = 0;
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
