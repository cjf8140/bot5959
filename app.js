const Discord = require('discord.js');
const client = new Discord.Client();

const axios = require("axios");
const request = require("request");

const School = require('school-kr');
const school = new School();

var dayadder;
school.init(School.Type.HIGH, School.Region.SEOUL, "B100005288") //효문

logword = "!log5959";

const version = "v 2.0.1 물결티콘 ~도움 검색 왜 두번 나오지 수정"

var keyword = [];
var reply = [];


var adr = 0;

var url = [];

var log_c = [];
var log_t = [];
var log_n = 0;

var cheat = 0;

var dbK = [];
var dbE = [];
var dbT = [];

var wordA = [];
var wordB = [];

var meal;



function updater() {
    dbUpdater();
    dbwordUpdater();
    (async function() {
        try {
            meal = await school.getMeal();
            calendar = await school.getCalendar();
        } catch (err) {
            console.log(err);
        }
    }());
}

function dbUpdater() {
    request({
        url: "https://docs.google.com/spreadsheets/d/10htzKQieunSbSvAIsjFdVg3TS_BNecAIG72JpVbNFd4/gviz/tq?tqx=out:json",
        json: true
    }, function(err, res, html) {
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
                dbK[i] = html.table.rows[i].c[0].v;
                dbE[i] = html.table.rows[i].c[1].v;
                dbT[i] = html.table.rows[i].c[3].v;
                i += 1;
            } catch (err) {
                console.log(err);
                dbUpdater;
                break;
            }
        }
    })
}

function dbwordUpdater() {
    request({
        url: "https://docs.google.com/spreadsheets/d/1ySBE6521thCJXAfT99i3_JVR_l2LEqgZdG3llA0mb5w/gviz/tq?tqx=out:json",
        json: true
    }, function(err, res, html) {
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
                wordA[i] = html.table.rows[i].c[0].v;
                wordB[i] = html.table.rows[i].c[1].v;
                i += 1;
            } catch (err) {
                console.log(err);
                dbwordUpdater;
                break;
            }
        }
    })
}


client.on('message', async msg => {
    log_c[log_n] = msg.content;
    log_t[log_n] = msg.author.tag;
    log_n++;
    if (msg.content == logword) {
        var message = [];
        for (i = 0; i < log_n - 1; i++) {
            message += log_t[i] + ': ' + log_c[i] + '\n';
        }
        for (i = 0; i < message.length; i += 2000) {
            if (message.substring(i, i + 2000) == "") {
                break;
            }
            msg.channel.send(message.substring(i, i + 2000));
        }
    }
    if (msg.content == "!업뎉") {
        updater();
        msg.channel.send("업데이트 완료!");
    }
    if (msg.author.bot) return;
    if (msg.channel.id == 931173230545371136) {
        msg.delete();
        msg.channel.send(msg.content);
    }

    var string = msg.content.split(' ');
    var initial = msg.content.charAt(0);
    //msg.channel.send("🎉준희야 생일 축하해🦅");
    if (msg.content == "." && (msg.channel.id == 890911625475919902 || msg.channel.id == 927313891988475974 || msg.channel.id == 981555925586415656)) {
        if (Number(string[1] > 90)) {
            return;
        }
        (async function() {
            msg.delete();
            const fetched = await msg.channel.fetchMessages({ limit: 100 });
            msg.channel.bulkDelete(fetched);
        }());
        return;
    }

    if (msg.content == "!v") {
        msg.channel.send(version);
    }

    if (string[0] == '!word') {
        let sentence = "";
        if (string[1] == undefined) {
            for (let i = 0; i < 5; i++) {
                const num = gr(wordA.length)
                sentence += wordA[num] + "\t:\t ||" + wordB[num] + "||\n";
            }
        } else {
            console.log("!");
            for (let i = 0; i < Number(string[1]); i++) {
                if (string[2] == undefined) {
                    const num = gr(wordA.length);
                    sentence += wordA[num] + "\t:\t ||" + wordB[num] + "||\n";
                } else {
                    const num = gr(50);
                    sentence += wordA[Number(string[2]) + num] + "\t:\t ||" + wordB[Number(string[2]) + num] + "||\n";
                }
            }
        }
        msg.channel.send(sentence);
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
                tday = new Date(day.getFullYear(), day.getMonth(), day.getDate() + dayadder);
            }
        } else if (msg.content.includes("화")) {
            while (tday.getDay() != 2) {
                dayadder += 1;
                tday = new Date(day.getFullYear(), day.getMonth(), day.getDate() + dayadder);
            }
        } else if (msg.content.includes("수")) {
            while (tday.getDay() != 3) {
                dayadder += 1;
                tday = new Date(day.getFullYear(), day.getMonth(), day.getDate() + dayadder);
            }
        } else if (msg.content.includes("목")) {
            while (tday.getDay() != 4) {
                dayadder += 1;
                tday = new Date(day.getFullYear(), day.getMonth(), day.getDate() + dayadder);
            }
        } else if (msg.content.includes("금")) {
            while (tday.getDay() != 5) {
                dayadder += 1;
                tday = new Date(day.getFullYear(), day.getMonth(), day.getDate() + dayadder);
            }
        } else {
            if (day.getHours() <= 11 || (day.getHours() == 12 && day.getMinutes() <= 30)) {
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
        msg.channel.send(meal.month + "월 " + (meal.day + dayadder) + "일 " + meal[meal.day + dayadder]);
    }
    if (initial == '=' && string[0] != '==') {
        if (keyword.includes(string[0].substring(1, 100))) {
            reply[keyword.indexOf(string[0].substring(1, 100))] = string[1];
        } else {
            keyword[adr] = string[0].substring(1, 100);
            reply[adr] = string[1];
            for (var i = 2; i < string.length; i++) {
                reply[adr] += ' ' + string[i];
            }
            adr++;
        }
    }
    if (msg.content == '==') {
        var list = '';
        for (var i = keyword.length - 1; i >= 0; i--) {
            if (reply[i]) {
                list += keyword[i] + ' = ' + reply[i] + '\n';
            }
        }
        msg.channel.send(list);
    }


    if (msg.content.includes('~')) {
        if (msg.content == '~도움') {
            var str = "";
            for (var i = 0; i < dbK.length; i++) {
                str += dbK[i] + ', ';
            }
            msg.channel.send(str.slice(0, 2000));
            if (str.length > 2000)
                msg.channel.send(str.slice(2000, 4000));
            if (str.length > 4000)
                msg.channel.send(str.slice(4000, 6000));

        } else if (string[0] == "~도움") {
            var str = "";
            console.log(dbT);
            for (var i = 0; i < dbK.length; i++) {
                if (dbK[i] && dbT[i])
                    if (dbK[i].includes(string[1]) || dbT[i].includes(string[1])) {
                        str += dbK[i] + ', ';
                    }
            }
            msg.channel.send(str.slice(0, 2000));
            if (str.length > 2000)
                msg.channel.send(str.slice(2000, 4000));
        }

        for (var i = 0; i < dbK.length; i++) {
            if (msg.content == ('~' + dbK[i])) {
                msg.channel.send(dbE[i]);
                break;
            }
        }
    }

    if (initial == "&") {
        msg.delete();
        msg.channel.send("https://hitomi.la/galleries/" + msg.content.slice(1) + ".html");
    }

    if (msg.content.includes("처갓집")) {
        msg.channel.send('02-992-8881');
    }

    if (msg.content == '!사관') {
        msg.channel.send('\'즐거움\'까지 ' + date(1, 1) + '일 .')
    }

    if (string[0] == '!생일') {
        if (string[1] == undefined) {
            msg.channel.send('동준: **1월 14일**: __' + date(1, 14) + '__일 남음.\n' +
                '철종: **3월 6일**: __' + date(3, 6) + '__일 남음.\n' +
                '호현: **3월 31일**: __' + date(3, 31) + '__일 남음.\n' +
                '수민: **5월 15일**: __' + date(5, 15) + '__일 남음.\n' +
                '준희: **8월 26일**: __' + date(8, 26) + '__일 남음.\n' +
                '연수: **9월 10일**: __' + date(9, 10) + '__일 남음.\n' +
                '진호: **9월 14일**: __' + date(9, 14) + '__일 남음.\n' +
                '승주: **10월 11일**: __' + date(10, 11) + '__일 남음.\n' +
                '연주: **10월 21일**: __' + date(10, 21) + '__일 남음.\n' +
                '민혁: **11월 22일**: __' + date(11, 22) + '__일 남음.\n' +
                '건화: **12월 1일**: __' + date(12, 1) + '__일 남음.');
        }
        if (string[1] && string[1].includes('철')) {
            msg.channel.send('철종: **3월 6일**: __' + date(3, 6) + '__일 남음.');
        }
        if (string[1] && string[1].includes('승')) {
            msg.channel.send('승주: **10월 11일**: __' + date(10, 11) + '__일 남음.');
        }
        if (string[1] && string[1].includes('진')) {
            msg.channel.send('진호: **9월 14일**: __' + date(9, 14) + '__일 남음.');
        }
        if (string[1] && string[1].includes('호')) {
            msg.channel.send('호현: **3월 31일**: __' + date(3, 31) + '__일 남음.');
        }
        if (string[1] && string[1].includes('동')) {
            msg.channel.send('동준: **1월 14일**: __' + date(1, 14) + '__일 남음.');
        }
        if (string[1] && string[1].includes('수')) {
            msg.channel.send('수민: **5월 15일**: __' + date(5, 15) + '__일 남음.');
        }
        if (string[1] && string[1].includes('건')) {
            msg.channel.send('건화: **12월 1일**: __' + date(12, 1) + '__일 남음.');
        }
        if (string[1] && string[1].includes('준')) {
            msg.channel.send('준희: **8월 26일**: __' + date(8, 26) + '__일 남음.');
        }
        if (string[1] && string[1].includes('민')) {
            msg.channel.send('민혁: **11월 22일**: __' + date(11, 22) + '__일 남음.');
        }
        if (string[1] && string[1].includes('수')) {
            msg.channel.send('연수: **9월 10일**: __' + date(9, 10) + '__일 남음.');
        }
        if (string[1] && string[1].includes('주')) {
            msg.channel.send('연주: **10월 21일**: __' + date(10, 21) + '__일 남음.');
        }
    }

    if (string[0] == '/생일') {
        if (string[1] == undefined) {
            msg.channel.send('동준: **1월 14일**: __' + date(1, 14) + '__일 남음.\n' +
                '철종: **3월 6일**: __' + date(3, 6) + '__일 남음.\n' +
                '연수: **9월 10일**: __' + date(9, 10) + '__일 남음.\n' +
                '승주: **10월 11일**: __' + date(10, 11) + '__일 남음.\n' +
                '연주: **10월 21일**: __' + date(10, 21) + '__일 남음.\n' +
                '성수: **12월 19일**: __' + date(12, 19) + '__일 남음.');
        }
        if (string[1] && string[1].includes('철')) {
            msg.channel.send('철종: **3월 6일**: __' + date(3, 6) + '__일 남음.');
        }
        if (string[1] && string[1].includes('수')) {
            msg.channel.send('연수: **9월 10일**: __' + date(9, 10) + '__일 남음.');
        }
        if (string[1] && string[1].includes('승')) {
            msg.channel.send('승주: **10월 11일**: __' + date(10, 11) + '__일 남음.');
        }
        if (string[1] && string[1].includes('주')) {
            msg.channel.send('연주: **10월 21일**: __' + date(10, 21) + '__일 남음.');
        }
        if (string[1] && string[1].includes('성')) {
            msg.channel.send('성수: **12월 19일**: __' + date(12, 19) + '__일 남음.');
        }
        if (string[1] && string[1].includes('동')) {
            msg.channel.send('동준: **1월 14일**: __' + date(1, 14) + '__일 남음.');
        }
    }

    if (string[0] == '!date') {
        msg.channel.send(date(Number(string[1]), Number(string[2])) + '일 남음');
    }
    if (msg.content == "!해석" || msg.content == "!석해") {
        return;
    }
    if (string[0] == '!해석') {
        msg.delete();
        msg.channel.send(Buffer.from(string[1], 'base64').toString());
    }
    if (string[0] == '!석해') {
        msg.delete();
        msg.channel.send(Buffer.from(msg.author.tag + ": " + msg.content.substring(4, ), 'utf-8').toString('base64'));
    }
    if (string[0] == '!!석해') {
        msg.delete();
        var ms = msg.content.substring(5, );
        for (var i = 0; i < 10; i++) {
            ms = Buffer.from(ms, 'utf-8').toString('base64');
        }
        msg.channel.send(ms);
    }

    if (msg.content.includes("주사위")) {
        if (cheat == 0) {
            msg.channel.send(gr(6) + 1);
        } else {
            msg.channel.send(cheat);
            cheat = 0;
        }
    }
    if (string[0] == ("!!사기")) {
        cheat = Number(string[1]);
        msg.reply("👍");
    }
    if (string[0] == "d" && msg.content != "d") {
        msg.channel.send(gr(Number(string[1])) + 1);
    }
    if (msg.content == '.') {
        msg.channel.send(".\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.\n\n.");
    }


    if (msg.content == ".,.,...") {
        if (Number(string[1] > 90)) {
            return;
        }
        (async function() {
            msg.delete();
            const fetched = await msg.channel.fetchMessages({ limit: 100 });
            msg.channel.bulkDelete(fetched);
        }());
        return;
    }
});

var BTCid;
var BTMid;

function legacy() {


    // if (msg.content == '!수능') {
    //     msg.channel.send('까지 ' + date(11, 18) + '일 남음.')
    // }
    // if (msg.content.includes("온") && msg.content.includes("클")) {
    //     msg.channel.send("https://www.ebsoc.co.kr/");
    // }
    // if (msg.content.includes("쉬는") && msg.content.includes("시간")) {
    //     var now = new Date();
    //     var hour = now.getHours();
    //     var minute = now.getMinutes();
    //     var second = now.getSeconds();
    //     if (hour < 12 || (hour == 12 && minute < 10)) {
    //         if (minute > 20) {
    //             msg.channel.send((69 - minute) + "분 " + (60 - second) + "초 남음");
    //         } else if (minute < 10) {
    //             msg.channel.send((9 - minute) + "분 " + (60 - second) + "초 남음");
    //         } else {
    //             msg.channel.send((19 - minute) + "분 " + (60 - second) + "초 남음");
    //         }
    //     } else if (hour < 16) {
    //         if (minute > 10) {
    //             msg.channel.send((59 - minute) + "분 " + (60 - second) + "초 남음");
    //         } else {
    //             msg.channel.send((9 - minute) + "분 " + (60 - second) + "초 남음");
    //         }
    //     }
    // }
    // if (msg.content == "!쉬는") {
    //     BTCid = msg.channel.id;
    //     await msg.channel.send("Stuff").then(sent => { // 'sent' is that message you just sent
    //         BTMid = sent.id;
    //     });
    //     console.log(BTCid + ", " + BTMid);
    //     BTimer;
    //     client.setInterval(BTimer, 3000);
    // }
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
    var ranNum = Math.floor(Math.random() * (max));
    return ranNum;
}

// client.login(process.env.TOKEN);
client.login('ODE2Mjg4NTc3MDI1MDgxMzQ0.YD4x-g.nuFX8V0I7JeQKWVsOe8SjVOi8u8');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! `, version);
    updater();
    client.setInterval(updater, 10 * 60 * 1000);
})

async function getHTML() {
    try {
        return await axios.get(url);
    } catch (error) {
        console.error(error);
    }
}