const Discord = require('discord.js');
const { MessageEmbed, MessageCollector } = require("discord.js");
const db = require('wio.db')
exports.run = async(client, message, args, ayar, emoji) => {
    //let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let victim = message.guild.member(member)

    if (!message.member.voice.channel) {
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Gitmek istiyorsan önce seste olman gerek!`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    if (!victim) {
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Ses kanalında gideceğin kişiyi etiketlemen gerek.`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    if (!victim.voice.channel) {
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Etiketlediğin kişi seste değil!`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    if (victim.id === message.member.id) {
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Cidden kendine mi gitmek istiyorsun? Başka yerde dene!`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    if (victim.voice.channelID === message.member.voice.channelID) {
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Zaten aynı ses kanalındasın!`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    if(message.member.roles.cache.get('835083522170421269')
    || message.member.roles.cache.get('835083580278308884') || message.member.roles.cache.get('835623076942446622') || message.member.roles.cache.get('835622904967331911')
    || message.member.roles.cache.get('835622812780986408') || message.member.roles.cache.get('835621485082050590') || message.member.roles.cache.get('835621420703809577')
    || message.member.roles.cache.get('835619799441866822') || message.member.roles.cache.get('835621236867989535') || message.member.roles.cache.get('835621001642770462')
    || message.member.roles.cache.get('835620892033417259') || message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
    || message.member.roles.cache.get('835619974025576490') || message.member.roles.cache.get('835620400288497705') || message.member.roles.cache.get('835083307434770432')){
       if(victim.roles.highest.position < message.member.roles.highest.position){
             message.member.voice.setChannel(victim.voice.channel.id)
             const embed = new Discord.MessageEmbed()
             .setColor("BLUE")
             .setDescription(`${victim} adlı kullanıcının odasına başarıyla gittin. [${message.author}]`)
             return message.channel.send({embed}).then(m => m.delete({ timeout: 7000 }))
       }
    }


    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`${victim}, ${message.author} adlı kullanıcı senin bulunduğun ses kanalına gelmek istiyor. Onaylıyor musun?`)
    return message.channel.send({embed}).then(async(msg) => {
        await msg.react("✅");
        await msg.react("⛔");

        let collector = msg.createReactionCollector(
            (reaction, user) => user.id
          );
          collector.on("collect", async (reaction, user) => {
            if(user.id == victim.id){
                if(reaction._emoji.name === "✅") {
                    await msg.reactions.removeAll()
                    message.member.voice.setChannel(victim.voice.channel.id)
                    const embed = new Discord.MessageEmbed()
                    .setColor("BLUE")
                    .setDescription(`${message.author} adlı kullanıcıyı ${victim} adlı kullanıcının odasına taşıdım.`)
                    message.channel.send({embed}).then(m => m.delete({ timeout: 7000 }))
                    message.delete({ timeout: 7000 })
                    msg.delete()
                }

                if(reaction._emoji.name === "⛔") {
                    await msg.reactions.removeAll()
                    const embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${message.author}, talebinizi ${victim} adlı kullanıcı reddeti!`)
                    message.channel.send({embed}).then(m => m.delete({ timeout: 7000 }))
                    message.delete({ timeout: 7000 })
                    msg.delete()
                }

            }
          });

    });
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    aliases: ["git","kanalgit","gıt"]
    }

    exports.help = {
    name: 'Git',
    description: 'Mesajın atıldıgı sunucunun sınırsız davet linkini oluşturur.',
    usage: 'herkese-rol-ver <istek>'
    }
