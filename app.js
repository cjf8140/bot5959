const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const axios = require("axios");
const cheerio = require("cheerio");

const request = require("request");

const School = require("school-kr");
const { get } = require("request");
const school = new School();

require('dotenv').config()

var dayadder;
school.init(School.Type.HIGH, School.Region.SEOUL, "B100005288"); //효문

const logword = "!log5959";

const version = 'v 2.8.2.1 minor update';

var keyword = [];
var reply = [];

var adr = 0; //word

var url = [];

var log_c = []; //contents
var log_t = []; //tag (User name)
var log_n = 0; //Number Index

var cheat = 0;

var dbK = []; //KeyWord
var dbE = []; //Emoticon (Answer)
var dbT = []; //Tag

var wordA = [];
var wordB = [];

var meal;

let chuchu = [];

let gomsg = 0;

function updater() {
    console.log(1);
    dbUpdater();
    dbwordUpdater();
    getforecast();
    (async function() {
        try {
            meal = await school.getMeal();
            calendar = await school.getCalendar();
        } catch (err) {
            console.log(err);
        }
    })();
}

function dbUpdater() {
    request({
            url: "https://docs.google.com/spreadsheets/d/10htzKQieunSbSvAIsjFdVg3TS_BNecAIG72JpVbNFd4/gviz/tq?tqx=out:json",
            json: true,
        },
        function(err, res, html) {
            if (err) {
                console.log(err);
                return;
            }
            //     console.log(html);
            html = JSON.parse(html.substr(47).slice(0, -2));
            var i = 0;
            while (1) {
                try {
                    if (html.table.rows[i] == undefined) {
                        break;
                    }
                    dbK[i] = html.table.rows[i].c[0].v.toLocaleLowerCase();
                    dbE[i] = html.table.rows[i].c[1].v;
                    dbT[i] = html.table.rows[i].c[3].v;
                    i += 1;
                } catch (err) {
                    console.log(err);
                    dbUpdater;
                    break;
                }
            }
        }
    );
}

function dbwordUpdater() {
    request({
            url: "https://docs.google.com/spreadsheets/d/1ySBE6521thCJXAfT99i3_JVR_l2LEqgZdG3llA0mb5w/gviz/tq?tqx=out:json",
            json: true,
        },
        function(err, res, html) {
            if (err) {
                console.log(err);
                return;
            }
            //     console.log(html);
            html = JSON.parse(html.substr(47).slice(0, -2));
            var i = 0;
            while (1) {
                try {
                    if (
                        html.table.rows[i] == undefined ||
                        html.table.rows[i].c[0] == undefined
                    ) {
                        break;
                    }
                    wordA[i] = html.table.rows[i].c[0].v;
                    wordB[i] = html.table.rows[i].c[1].v;
                    i += 1;
                } catch (err) {
                    console.log(err);
                    dbwordUpdater;
                    break;
                }
            }
        }
    );
}

let ws;

function getforecast() {
    axios
        .get("https://www.weather.go.kr/w/weather/forecast/short-term.do?stnId=109")
        .then((response) => {
            const $ = cheerio.load(response.data);
            ws =
                $(
                    "#after-dfs-forecast > div:nth-child(2) > section > div.cmp-view-content > p > span:nth-child(1)"
                ).text() +
                "\n  " +
                $(
                    "#after-dfs-forecast > div:nth-child(2) > section > div.cmp-view-content > p > span:nth-child(2)"
                ).text() +
                "\n  " +
                $(
                    "#after-dfs-forecast > div:nth-child(2) > section > div.cmp-view-content > p > span:nth-child(3)"
                ).text();
        })
        .catch((err) => {
            console.error(err);
        });
}

client.on("messageCreate", async(msg) => {
    if (msg.author.bot) return;
    log_c[log_n] = msg.content;
    log_t[log_n] = msg.author.tag;
    log_n++;
    var string = msg.content.split(" ");
    var initial = msg.content.charAt(0);

    if (msg.content == "1") {
        updater();
    }

    if (msg.channel.id == 931173230545371136) {
        msg.delete();
        msg.channel.send(msg.content);
    }
    if (msg.content == "!날씨") {
        msg.channel.send(ws);
    }
    //Go명령어
    if (msg.content == "!go") {
        gomsg = !gomsg;
        // console.log(gomsg);
    }
    if (
        gomsg == 1 &&
        (msg.author.id == 801681579751112714 || msg.author.id == 510780448599703553)
    ) {
        msg.delete();
        return;
    }
    if (msg.content == "," && msg.channel.id == 890911625475919902) {
        msg.channel
            .fetchMessages({
                limit: 100, // Change `100` to however many messages you want to fetch
            })
            .then((messages) => {
                const botMessages = [];
                messages
                    .filter((m) => m.author.id == 510780448599703553)
                    .forEach((mg) => botMessages.push(mg));
                msg.channel.bulkDelete(botMessages).then(() => {
                    msg.channel.send("Cleared Go messages").then((mg) =>
                        mg.delete({
                            timeout: 1000,
                        })
                    );
                });
            });
        msg.delete();
    }
    if (
        (msg.content == "." &&
            (msg.channel.id == 890911625475919902 ||
                msg.channel.id == 927313891988475974 ||
                msg.channel.id == 981555925586415656)) ||
        msg.content == ".,.,...13471347"
    ) {
        allD(msg.channel, 100);
        return;
    }
    if (msg.content == logword) {
        var message = [];
        for (i = 0; i < log_n - 1; i++) {
            message += log_t[i] + ": " + log_c[i] + "\n";
        }
        for (i = 0; i < message.length; i += 2000) {
            if (message.substring(i, i + 2000) == "") {
                break;
            }
            msg.channel.send(message.substring(i, i + 2000));
        }
    }

    if (msg.content == "!v") {
        msg.channel.send(version);
    }

    if (string[0] == "!소재") {
        let sentence = "";
        if (string[1] == undefined) {
            for (let i = 0; i < 3; i++) {
                const num = gr(wordA.length);
                sentence += wordA[num] + "\n";
            }
        } else {
            let arr = [];
            for (let i = 0; i < wordA.length; i++) {
                if (wordB[i] == msg.content.substring(4)) {
                    arr.push(wordA[i]);
                }
            }
            if (arr[0] == undefined) {
                msg.channel.send("없는데쇼");
                return;
            }
            for (let i = 0; i < 3; i++) {
                const num = gr(arr.length);
                sentence += arr[num] + "\n";
            }
        }
        msg.channel.send(sentence);
    }

    if (string[0] == "!추천") {
        if (string[1] != undefined) {
            if (string[1] == "뽑기") {
                let sentence = [];
                for (let i = 0; i < 1; i++) {
                    const num = gr(chuchu.length);
                    sentence += chuchu[num] + "\n";
                }
                msg.channel.send(sentence);
            } else {
                chuchu.push(msg.content.substring(4));
                msg.channel.send('"' + msg.content.substring(4) + '"이/가 추가된 👍');
            }
        } else {
            msg.channel.send("뭘");
        }
    }
    for (var i = keyword.length; i >= 0; i--) {
        if (msg.content.includes(keyword[i]) && reply[i]) {
            msg.channel.send(reply[i]);
        }
    }
    if (msg.content.includes("급식")) {
        var day = new Date();
        var tday = new Date();
        dayadder = 0;
        if (msg.content.includes("월")) {
            while (tday.getDay() != 1) {
                dayadder += 1;
                tday = new Date(
                    day.getFullYear(),
                    day.getMonth(),
                    day.getDate() + dayadder
                );
            }
        } else if (msg.content.includes("화")) {
            while (tday.getDay() != 2) {
                dayadder += 1;
                tday = new Date(
                    day.getFullYear(),
                    day.getMonth(),
                    day.getDate() + dayadder
                );
            }
        } else if (msg.content.includes("수")) {
            while (tday.getDay() != 3) {
                dayadder += 1;
                tday = new Date(
                    day.getFullYear(),
                    day.getMonth(),
                    day.getDate() + dayadder
                );
            }
        } else if (msg.content.includes("목")) {
            while (tday.getDay() != 4) {
                dayadder += 1;
                tday = new Date(
                    day.getFullYear(),
                    day.getMonth(),
                    day.getDate() + dayadder
                );
            }
        } else if (msg.content.includes("금")) {
            while (tday.getDay() != 5) {
                dayadder += 1;
                tday = new Date(
                    day.getFullYear(),
                    day.getMonth(),
                    day.getDate() + dayadder
                );
            }
        } else {
            if (
                day.getHours() <= 11 ||
                (day.getHours() == 12 && day.getMinutes() <= 30)
            ) {
                dayadder = 0;
            } else {
                dayadder = 1;
            }
            if (meal[meal.day + 1] == "") {
                while (meal[meal.day + dayadder] == "") {
                    dayadder++;
                }
            }
        }
        msg.channel.send(
            meal.month +
            "월 " +
            (meal.day + dayadder) +
            "일 " +
            meal[meal.day + dayadder]
        );
    }
    if (initial == "=" && string[0] != "==") {
        if (keyword.includes(string[0].substring(1, 100))) {
            reply[keyword.indexOf(string[0].substring(1, 100))] = string[1];
        } else {
            keyword[adr] = string[0].substring(1, 100);
            reply[adr] = string[1];
            for (var i = 2; i < string.length; i++) {
                reply[adr] += " " + string[i];
            }
            adr++;
        }
    }
    if (msg.content == "==") {
        var list = "";
        for (var i = keyword.length - 1; i >= 0; i--) {
            if (reply[i]) {
                list += keyword[i] + " = " + reply[i] + "\n";
            }
        }
        msg.channel.send(list);
    }

    if (msg.content.includes("~")) {
        if (msg.content == "~도움") {
            var str = "";
            for (var i = 0; i < dbK.length; i++) {
                str += dbK[i] + ", ";
            }
            str = str.slice(0, -2);
            msg.channel.send(str.slice(0, 2000));
            if (str.length > 2000) msg.channel.send(str.slice(2000, 4000));
            if (str.length > 4000) msg.channel.send(str.slice(4000, 6000));
        } else if (string[0] == "~도움") {
            var str = "";
            // console.log(dbT);
            for (var i = 0; i < dbK.length; i++) {
                if (dbK[i] && dbT[i])
                    if (dbK[i].includes(string[1]) || dbT[i].includes(string[1])) {
                        str += dbK[i] + ", ";
                    }
            }
            if (str) {
                str = str.slice(0, -2);
                msg.channel.send(str.slice(0, 2000));
                if (str.length > 2000) {
                    msg.channel.send(str.slice(2000, 4000));
                }
            } else {
                msg.channel.send("! __검색결과 없음__ !");
            }
        } else {
            for (let i = 0; i < string.length; i++) {
                console.log(string[i])
                if (string[i][0] == "~") {
                    for (let j = 0; j < dbK.length; j++) {
                        if (dbK[j] == string[i].toLocaleLowerCase().slice(1)) {
                            msg.channel.send(dbE[j]);
                            break;
                        }
                    }
                }
            }
        }
    }

    if (initial == "&") {
        msg.delete();
        msg.channel.send({
            files: [{
                attachment: "https://www.gstatic.com/webp/gallery/1.sm.webp",
                name: "SPOILER_UNMIL.jpg",
            }, ],
        });
        if (isNaN(msg.content.slice(1))) {
            msg.channel.send("https://hitomi.la/search.html?" + msg.content.slice(1));
        } else {
            msg.channel.send(
                "https://hitomi.la/galleries/" + msg.content.slice(1) + ".html"
            );
        }
    }

    if (msg.content.includes("처갓집")) {
        msg.channel.send("02-992-8881");
    }

    if (msg.content == "!사관") {
        msg.channel.send("'즐거움'까지 " + date(1, 1) + "일 .");
    }

    if (string[0] == "!생일") {
        if (string[1] == undefined) {
            msg.channel.send(
                "동준: **1월 14일**: __" +
                date(1, 14) +
                "__일 남음.\n" +
                "철종: **3월 6일**: __" +
                date(3, 6) +
                "__일 남음.\n" +
                "호현: **3월 31일**: __" +
                date(3, 31) +
                "__일 남음.\n" +
                "수민: **5월 15일**: __" +
                date(5, 15) +
                "__일 남음.\n" +
                "준희: **8월 26일**: __" +
                date(8, 26) +
                "__일 남음.\n" +
                "연수: **9월 10일**: __" +
                date(9, 10) +
                "__일 남음.\n" +
                "진호: **9월 14일**: __" +
                date(9, 14) +
                "__일 남음.\n" +
                "승주: **10월 11일**: __" +
                date(10, 11) +
                "__일 남음.\n" +
                "연주: **10월 21일**: __" +
                date(10, 21) +
                "__일 남음.\n" +
                "민혁: **11월 22일**: __" +
                date(11, 22) +
                "__일 남음.\n" +
                "건화: **12월 1일**: __" +
                date(12, 1) +
                "__일 남음."
            );
        }
    }

    if (string[0] == "/생일") {
        if (string[1] == undefined) {
            msg.channel.send(
                "동준: **1월 14일**: __" +
                date(1, 14) +
                "__일 남음.\n" +
                "철종: **3월 6일**: __" +
                date(3, 6) +
                "__일 남음.\n" +
                "윤진: **8월 3일**: __" +
                date(8, 3) +
                "__일 남음.\n" +
                "연수: **9월 10일**: __" +
                date(9, 10) +
                "__일 남음.\n" +
                "승주: **10월 11일**: __" +
                date(10, 11) +
                "__일 남음.\n" +
                "연주: **10월 21일**: __" +
                date(10, 21) +
                "__일 남음.\n" +
                "성수: **12월 19일**: __" +
                date(12, 19) +
                "__일 남음."
            );
        }
    }

    if (string[0] == "!date") {
        msg.channel.send(date(Number(string[1]), Number(string[2])) + "일 남음");
    }
    if (msg.content == "!해석" || msg.content == "!석해") {
        return;
    }
    if (string[0] == "!해석") {
        msg.delete();
        msg.channel.send(Buffer.from(string[1], "base64").toString());
    }
    if (string[0] == "!석해") {
        msg.delete();
        msg.channel.send(
            Buffer.from(
                msg.author.tag + ": " + msg.content.substring(4),
                "utf-8"
            ).toString("base64")
        );
    }
    if (string[0] == "!!석해") {
        msg.delete();
        var ms = msg.content.substring(5);
        for (var i = 0; i < 10; i++) {
            ms = Buffer.from(ms, "utf-8").toString("base64");
        }
        msg.channel.send(ms);
    }

    if (msg.content.includes("주사위")) {
        msg.channel.send(gr(6) + 1);
    }
    if (msg.content == ".") {
        msg.channel.send(
            ".\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n."
        );
    }
});

/* Legacy
    var BTCid;
    var BTMid;

    if (msg.content == '!수능') {
        msg.channel.send('까지 ' + date(11, 18) + '일 남음.')
    }
    if (msg.content.includes("온") && msg.content.includes("클")) {
        msg.channel.send("https://www.ebsoc.co.kr/");
    }
    if (msg.content.includes("쉬는") && msg.content.includes("시간")) {
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (hour < 12 || (hour == 12 && minute < 10)) {
            if (minute > 20) {
                msg.channel.send((69 - minute) + "분 " + (60 - second) + "초 남음");
            } else if (minute < 10) {
                msg.channel.send((9 - minute) + "분 " + (60 - second) + "초 남음");
            } else {
                msg.channel.send((19 - minute) + "분 " + (60 - second) + "초 남음");
            }
        } else if (hour < 16) {
            if (minute > 10) {
                msg.channel.send((59 - minute) + "분 " + (60 - second) + "초 남음");
            } else {
                msg.channel.send((9 - minute) + "분 " + (60 - second) + "초 남음");
            }
        }
    }
    if (msg.content == "!쉬는") {
        BTCid = msg.channel.id;
        await msg.channel.send("Stuff").then(sent => { // 'sent' is that message you just sent
            BTMid = sent.id;
        });
        console.log(BTCid + ", " + BTMid);
        BTimer;
        client.setInterval(BTimer, 3000);
    }
function BTimer() {
    console.log("wow");
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var min, sec;
    sec = 60 - second;
    if (hour > 7 && (hour < 12 || (hour == 12 && minute < 10))) {
        if (minute > 20) {
            min = 69 - minute;
        } else if (minute < 10) {
            min = 9 - minute;
        } else {
            min = 19 - minute;
        }
        client.channels.get(BTCid).fetchMessage(BTMid).then(msg => msg.edit(min + "분 " + sec + "초 남음"));
    } else if (hour < 16) {
        if (minute > 10) {
            min = 59 - minute;
        } else {
            min = 9 - minute;
        }
        client.channels.get(BTCid).fetchMessage(BTMid).then(msg => msg.edit(min + "분 " + sec + "초 남음"));
    }
}
*/
function date(month, day) {
    var tday = new Date();
    var nowYear = tday.getFullYear();
    var dday = new Date(nowYear, month - 1, day);
    if (dday - tday < -1) {
        dday = new Date(nowYear + 1, month - 1, day);
    }
    return Math.ceil((dday - tday) / (1000 * 60 * 60 * 24)); //-9*60*60*1000
}

var gr = function(max) {
    var ranNum = Math.floor(Math.random() * max);
    return ranNum;
};

function allD(ch, ms) {
    // console.log(ms);
    if (ms == 100) {
        ch.bulkDelete(100, 1)
            .then((messages) => allD(ch, messages.size))
            .catch(console.error);
    }
    return;
}
client.login(process.env.TOKEN);
//a

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}! `, version);
    updater();
    setInterval(function() {
        updater();
    }, 240000);
});
