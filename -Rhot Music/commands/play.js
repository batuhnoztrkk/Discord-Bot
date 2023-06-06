const { Util } = require("discord.js");
const { YOUTUBE_API_KEY } = require("../config.json");
const ytdl = require("ytdl-core");
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(YOUTUBE_API_KEY);
const Discord = require('discord.js')
const { play } = require("../system/music.js")
module.exports = {
  name: "play",
  description: "PLAY THE SOFTNESS OF THE SOUND",
  async execute(client, message, args) {

    if (!args.length) {
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Şarkı açabilmem için isim ve link vermen gerek. Örnek kullanım: .play <isim>|<URL>`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }

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
        .setDescription(`Şuanda farklı kanalda müzik çalıyorum!`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }


    const targetsong = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const urlcheck = videoPattern.test(args[0]);

    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Oynatma listesi şuanda oynatılamıyor!`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    let songData = null;
    let song = null;

    if (urlcheck) {
      try {

         const result = await youtube.searchVideos(args[0], 1)
         if(!result[0]) {
           const embed = new Discord.MessageEmbed()
             .setColor("RED")
             .setDescription(`Bu linkde bir şarkı bulamadım!`)
             return message.channel.send({embed}).then(msg => msg.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
         }
        songData = await ytdl.getInfo(result[0].url,{});

        console.log(songData)
        song = {
           title: songData.videoDetails.title,
           url: songData.videoDetails.video_url,
           duration: songData.videoDetails.lengthSeconds,
           thumbnail : songData.videoDetails.thumbnails[0].url,
           author : songData.videoDetails.author.name,
           wiews : songData.videoDetails.viewCount,
          likes : {
          trues : songData.videoDetails.likes.toLocaleString(),
          falses :songData.videoDetails.dislikes.toLocaleString()
         }
        };


      } catch (error) {
        if (message.include === "copyright") {
          const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`Copyright | Telif sebebiyle bu şarkıyı açamıyorum!`)
            return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
        } else {
          console.error(error);
        }
      }
    } else {
      try {
         const result = await youtube.searchVideos(targetsong, 1)
        if(!result[0]) {
          const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`Aramalarım sonucunda bulamadım! İsmi doğru girdiğinizden emin olunuz!`)
            return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
        }
        songData = await ytdl.getInfo(result[0].url)
         song = {
           title: songData.videoDetails.title,
           url: songData.videoDetails.video_url,
           duration: songData.videoDetails.lengthSeconds,
           thumbnail : songData.videoDetails.thumbnails[0].url,
           author : songData.videoDetails.author.name,
           wiews : songData.videoDetails.viewCount,
          likes : {
          trues : songData.videoDetails.likes.toLocaleString(),
          falses :songData.videoDetails.dislikes.toLocaleString()
         }

        };

      } catch (error) {
        console.error(error)
      }
    }

    /////////////

    if(serverQueue) {
      serverQueue.songs.push(song)
      return serverQueue.textChannel.send( new Discord.MessageEmbed()
      .setAuthor(`${song.title}`, message.author.avatarURL({format : "png",dynamic : true}), song.url)
      .setThumbnail(song.thumbnail)
      .setFooter(`Şarkı sıraya eklendi...`, message.guild.iconURL({dynamic:true})));
    } else {
      queueConstruct.songs.push(song);
    }

    if(!serverQueue) message.client.queue.set(message.guild.id, queueConstruct)

     if (!serverQueue) {
      try {

        queueConstruct.connection = await channel.join();
        play(song, message)
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send({embed: {"description": `Kanala giriş yapamıyorum.: ${error}`, "color": "#ff2050"}}).catch(console.error);
      }
    }


  }
};
