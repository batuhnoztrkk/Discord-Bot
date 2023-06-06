const Discord = require('discord.js');
const moment = require('moment');
const db = require('wio.db');
const ms = require('ms')
const stripIndents = require("common-tags");
const fetch = require("node-fetch");
const userInstagram = require("user-instagram");
const { createCanvas, loadImage } = require('canvas')
const fs = require('fs');
exports.run = async (client, message, args, reaction) => { 

    if(args[0]){
        let myRole = message.guild.roles.cache.get("835619799441866822");
        if(message.member.roles.highest.position >= myRole.position){
            let member = message.mentions.users.first() || message.guild.members.cache.find(c => c.id === args[0]).user;
            if(!member)
            {
              const embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription(`Başkasının invite sayısını görebilmek için onu etiketlemen veya idsini girmen gerek.`)
              return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
            }

            var xp = db.fetch(`rankxp_${member.id}`)
            var level = db.fetch(`ranklevel_${member.id}`)
            var levelMax = parseInt(level)*300;
            let hesap = Math.floor(((100 / levelMax) * parseInt(xp)) * 7.7);

            if(!xp && !level){
                const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`Bu kullanıcı daha önce mesaj atmamış veya veritabanında bir hata oluştu.`)
                return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
            }

            const canvas = createCanvas(1000, 333)
            const ctx = canvas.getContext('2d')
        
            const background = await loadImage("./background.jpg");
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#ffffff";
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "#000000";
            ctx.fillRect(180, 216, 770, 65);
            ctx.fill();
        
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fill();
        
            ctx.globalAlpha = 1;
            ctx.strokeRect(180, 216, 770, 65);
            ctx.stroke();
        
        
            ctx.fillStyle = 'blue';
            ctx.globalAlpha = 0.6;
            ctx.fillRect(180, 220, hesap, 60);
            ctx.fill();
            ctx.globalAlpha = 1;
        
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "#ffffff";
            ctx.fillText(`${xp == null ? 0 : xp} / ${levelMax} XP`, 600, 260);
        
            ctx.font = "50px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "left";
            ctx.fillText(member.tag, 330, 120);
        
            ctx.fillStyle = "#ffffff";
            ctx.font = "50px Arial";
            ctx.fillText("Level:", 330, 180);
            ctx.fillText(level, 470, 180);
        
            ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
            ctx.lineWidth = 6;
            ctx.strokeStyle = "#ffffff";
            ctx.stroke();
            ctx.closePath();
            ctx.clip();
            const avatar = await loadImage(member.displayAvatarURL({ format: "jpg"}));
            ctx.drawImage(avatar, 40, 40, 250, 250);
        
        
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), background.jpg)
            return message.channel.send(attachment)


        }
        else{
            const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`Başkasının rankına bakabilmek için yeterli yetkin bulunmamaktadır.`)
            return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
        }


    }


    var xp = db.fetch(`rankxp_${message.author.id}`)
    var level = db.fetch(`ranklevel_${message.author.id}`)
    var levelMax = parseInt(level)*300;
    let hesap = Math.floor(((100 / levelMax) * parseInt(xp)) * 7.7);

    if(!xp && !level){
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Daha önce mesaj atmamışsın.`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
 
    const canvas = createCanvas(1000, 333)
    const ctx = canvas.getContext('2d')

    const background = await loadImage("./background.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffffff";
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "#000000";
    ctx.fillRect(180, 216, 770, 65);
    ctx.fill();

    ctx.globalAlpha = 0.6;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.strokeRect(180, 216, 770, 65);
    ctx.stroke();


    ctx.fillStyle = 'blue';
    ctx.globalAlpha = 0.6;
    ctx.fillRect(180, 220, hesap, 60);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${xp == null ? 0 : xp} / ${levelMax} XP`, 600, 260);

    ctx.font = "50px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.fillText(message.member.user.tag, 330, 120);

    ctx.fillStyle = "#ffffff";
    ctx.font = "50px Arial";
    ctx.fillText("Level:", 330, 180);
    ctx.fillText(level, 470, 180);

    ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    const avatar = await loadImage(message.member.user.displayAvatarURL({ format: "jpg"}));
    ctx.drawImage(avatar, 40, 40, 250, 250);


    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), background.jpg)
    message.channel.send(attachment)

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['seviye'],
  permLevel: 0
};
exports.help = {
  name: 'rank',
  description: '',
  usage: 'kayıt'
};
