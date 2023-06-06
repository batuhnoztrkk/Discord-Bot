const { MessageEmbed } = require("discord.js")
const lyricsFinder = require('lyrics-finder');
const Discord = require('discord.js')
const getArtistTitle = require('get-artist-title')
module.exports = {
  name: "lyrics", 
  description: "Get lyrics of Song",
  async execute (client, message, args) {

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
          .setDescription(`Herhangi bir şarkı oynatmıyorum.`)
          return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
      }
    
  //let m = await message.channel.send("Şarkı sözlerini arıyorum.")  

  var sarkıtitle = serverQueue.songs[0].title;
  var sarkıauthor = serverQueue.songs[0].author;
  const [ artistt, ttitle ] = getArtistTitle(sarkıtitle, {
    defaultArtist: sarkıauthor
  })
  
  message.channel.send(artistt + ttitle).then(msg => {
        (async function(artist, title) {
      const lyrics = await lyricsFinder(artist, title) || "Hey! Bu şarkının sözlerini bulamadım. Şarkının orjinalini dinlersen belki bulabilirim. Unutma daha #BETA aşamasındayım.";
      const uzunluk = lyrics.length;
      const ilk = lyrics.slice(0, 2000);
      const hesap = uzunluk - 2000;
      const son = lyrics.slice(hesap);

      if(uzunluk >= 2000 && uzunluk < 4000){
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${sarkıtitle}`, message.author.avatarURL({format : "png",dynamic : true}), serverQueue.songs[0].url)
        .setDescription(`${ilk}`)
        .setFooter(`Lyrics...1`, message.guild.iconURL({dynamic:true}))
        return message.channel.send({embed}).then(msg => {
          msg.react("➡️");
          let collector = msg.createReactionCollector(
            (reaction, user) => user.id
          );
          collector.on("collect", async (reaction, user) => {
              if(user.id === message.member.id){
                const mesaj = new Discord.MessageEmbed()
                .setAuthor(`${sarkıtitle}`, message.author.avatarURL({format : "png",dynamic : true}), serverQueue.songs[0].url)
                .setDescription(`${son}`)
                .setFooter(`Lyrics...2`, message.guild.iconURL({dynamic:true}))
                msg.edit(mesaj);
                msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
              }
          });
        })

      }
      if(uzunluk >= 4000){
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Bu şarkı sözü 4000 sözcükten fazla olduğu için gösteremiyorum.`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
      }

      const mesaj = new Discord.MessageEmbed()
      .setAuthor(`${sarkıtitle}`, message.author.avatarURL({format : "png",dynamic : true}), serverQueue.songs[0].url)
      .setDescription(`${lyrics}`)
      .setFooter(`Lyrics...`, message.guild.iconURL({dynamic:true}))
      msg.edit(mesaj);

  })(`${artistt}` ,`${ttitle}`);
  })



  /*Genius.tracks.search(serverQueue.songs[0].title)
.then(results => {
    const song = results[0];
    song.lyrics()
    .then(lyrics => {
      if (lyrics.length > 9999) {
        return message.channel.send("Şarkı sözleri çoook uzun.")
      }
      
      if (lyrics.length < 9999) {
        const lyricsEmbed = new MessageEmbed()
          .setColor("#ff2050")
          .setDescription(lyrics.trim());
        return m.edit('', lyricsEmbed);
      }
  m.delete()
      
    })
}).catch(err => message.channel.send("Şarkı sözlerini bulamadım."));*/
    
    
  }
}