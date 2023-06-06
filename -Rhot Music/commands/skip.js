const Discord = require('discord.js');
module.exports = {
  name: "skip",
  description: "Skip the song or shift song to next",
  execute(client, message, args) {
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
        .setDescription(`Çalan bir şarkı bulunmuyor!`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    let myRole = message.guild.roles.cache.get("835623076942446622");
    if(message.member.roles.highest.position >= myRole.position){

                serverQueue.connection.dispatcher.end();
                const embed = new Discord.MessageEmbed()
                  .setColor("BLUE")
                  .setDescription(`Şarkı başarıyla geçildi!`)
                  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 10000 }) && message.delete({ timeout: 10000 }));
    }

    const kişi = message.guild.me.voice.channel.members;
    const yeniliste = kişi.map(e => ({id:e.user.id}));
    const kişisayısı = message.guild.me.voice.channel.members.size;
    const sayı = Math.round((kişisayısı) / 2);
    let oy = 0;
    var n = sayı.toString();
    console.log(sayı)
    const mesaj = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setDescription(`Şarkıyı geçebilmek için odada bulunan ${n} kişinin tepkiye tıklaması gerekli! 20 saniye sonra mesaj silinecek hızlı olun.`)
    message.channel.send(mesaj).then(msg => {
      msg.react("✅");

      let collector = msg.createReactionCollector(
        (reaction, user) => user.id
      );

      collector.on("collect", async (reaction, user) => {
        for (var i = 0; i < kişisayısı; i++){
          const döngü = yeniliste[i]
          const döngüstring = döngü.id;
          if(user.id === message.guild.me.id){return}
        if(user.id === döngüstring){
            oy = oy + 1;
            let veri = sayı - oy;
            let nn = veri.toString()
            const mesaj = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(`Şarkıyı geçebilmek için odada bulunan ${nn} kişinin tepkiye tıklaması gerekli! 20 saniye sonra mesaj silinecek hızlı olun.`)
            msg.edit(mesaj)
           
            if(oy.toString() === n.toString()){
                serverQueue.connection.dispatcher.end();
                const embed = new Discord.MessageEmbed()
                  .setColor("BLUE")
                  .setDescription(`Şarkı oy birliğiyle geçildi!`)
                  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 10000 }) && message.delete({ timeout: 10000 }));
            }
          };
        }
      });
      msg.delete({ timeout: 20000 })});

  }
};
