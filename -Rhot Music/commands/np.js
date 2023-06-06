const Discord = require('discord.js')
module.exports = {
  name: "np",
  description: "send the name of on going song",
  execute (client, message, args) {

      const { channel } = message.member.voice;
    if (!channel) {
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Müzik açabilmek için herhangi bir ses kanalında bulunman gerek.`)
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
        .setDescription(`Herhangi şarkı oynatmıyorum!`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Şuanda Oynatılan Şarkı: `+serverQueue.songs[0].title)
      message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));

  }
}
