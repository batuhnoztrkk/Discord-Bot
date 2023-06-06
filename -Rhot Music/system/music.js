
const ytdlDiscord = require("ytdl-core-discord");
const Discord = require('discord.js')
module.exports = {
  async play(song, message) {
    const queue = message.client.queue.get(message.guild.id);

    if(!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id)
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Şarkı bitti!`)
        return queue.textChannel.send({embed}).then(msg => msg.delete({ timeout: 10000 }) && message.delete({ timeout: 10000 })).catch(console.error)
    }

    try {
      var stream = await ytdlDiscord(song.url, {
        highWaterMark: 1 << 25,
      });

    } catch (error) {
      if(queue) {
        queue.songs.shift()
        module.exports.play(queue.songs[0], message)
      }

      if(error.message.includes === "copyright") {
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`Copyright | Telif sebebiyle bu şarkıyı açamıyorum!`)
          return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
      } else {
        console.error(error)
      }
    }

    const dispatcher = queue.connection
    .play(stream, {type: "opus"}).on("finish", () => {
      if(queue.loop) {
        let lastsong = queue.songs.shift()
        queue.songs.push(lastsong)
        module.exports.play(queue.songs[0], message)
      } else {
        queue.songs.shift()
        module.exports.play(queue.songs[0], message)
      }
    }).on("error", console.error)
    dispatcher.setVolumeLogarithmic(queue.volume / 200); //sesi buradan arttırırsınız



      queue.textChannel.send(
        new Discord.MessageEmbed()
        .setAuthor(`${song.title}`, message.author.avatarURL({format : "png",dynamic : true}), song.url)
        .setThumbnail(song.thumbnail)
        .setFooter(`Oynatılıyor...`, message.guild.iconURL({dynamic:true}))
      )


  }
}
