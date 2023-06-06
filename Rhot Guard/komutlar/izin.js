const Discord = require('discord.js');
const moment = require('moment');
const db = require('wio.db');
const ms = require('ms')
exports.run = async (client, message, args, reaction) => { //835083307434770432

    if(message.member.id === '278229385721675777' || message.member.id === '184365222734069760' || message.member.id === '568385647220490242'){

      if(!args[0]){
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`Giriş izni vereceğin botun idsini girmen gerekli.`)
          return message.channel.send({embed}).then(msg => msg.delete({ timeout: 10000 }) && message.delete({ timeout: 10000 }));
      }
      if(args[1]){
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`Hatalı form yazıma dikkat edin!`)
          return message.channel.send({embed}).then(msg => msg.delete({ timeout: 10000 }) && message.delete({ timeout: 10000 }));
      }
          db.set("izin_" + args[0], "1");
          const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`\`${args[0]}\` Idli bota giriş izni verildi. `)
          message.channel.send({embed}).then(msg => msg.delete({ timeout: 10000 }) && message.delete({ timeout: 10000 }));
          const kanal = message.guild.channels.cache.get('853011392835616828');
          return kanal.send(`\`${args[0]}\` Idli bota, **${message.author.username}** Tarafından giriş izni verildi.`)
  }

  else{
    return message.channel.send("Okayyy!").then(msg => msg.delete({ timeout: 500 }) && message.delete({ timeout: 500 }));
  }

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['izin'],
  permLevel: 0
};
exports.help = {
  name: 'İzin',
  description: '',
  usage: 'kayıt'
};
