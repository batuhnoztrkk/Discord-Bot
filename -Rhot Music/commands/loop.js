const Discord = require('discord.js')
module.exports = {
  name: "loop",
  description: "LOOP THE QUEUE",
  execute (client, message, args) {

    const { channel } = message.member.voice;
    if (!channel) {
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Ses kanalında değilsin!`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Benle aynı ses kanalında değilsin!`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Döngüye alabileceğim bir şarkı bulamadım.`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }


    serverQueue.loop = !serverQueue.loop


    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Döngü şimdi **${serverQueue.loop ? "Aktif" : "Deaktif"}**`)
      message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));

  }
}
