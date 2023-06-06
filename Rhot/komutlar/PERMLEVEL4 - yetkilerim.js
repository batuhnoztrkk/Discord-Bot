const Discord = require('discord.js');
const db = require('wio.db')
const { stripIndents } = require('common-tags');

exports.run = async (client, msg, args) => {
  var kontrol = db.fetch("kullanıcıKontrol_" + msg.guild.id)
  if(kontrol === "Kapalı") {return msg.channel.send("Bu komut yetkili tarafından bu sunucuda kapatılmıştır.")}

let x;
    let x2;
    let x3;
    let x4;
    let x5;
    let x6;
    let x7;
    let x8;
    let x9;
    let x10;
    let x11;

    //yönetici
    if (msg.member.hasPermission("ADMINISTRATOR")) x = ":white_check_mark:"
    if (!msg.member.hasPermission("ADMINISTRATOR")) x = ":x: "

    //Denetim kaydı
    if (msg.member.hasPermission("VIEW_AUDIT_LOG")) x2 = ":white_check_mark:"
    if (!msg.member.hasPermission("VIEW_AUDIT_LOG")) x2 = ":x: "

    //Sunucuyu yönet
    if (msg.member.hasPermission("MANAGE_GUILD")) x3 = ":white_check_mark:"
    if (!msg.member.hasPermission("MANAGE_GUILD")) x3 = ":x: "

    //Rolleri yönet
    if (msg.member.hasPermission("MANAGE_ROLES")) x4 = ":white_check_mark:"
    if (!msg.member.hasPermission("MANAGE_ROLES")) x4 = ":x: "

    //Kanalları yönet
    if (msg.member.hasPermission("MANAGE_CHANNELS")) x5 = ":white_check_mark:"
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) x5 = ":x: "

    //üyeleri at
    if (msg.member.hasPermission("KICK_MEMBERS")) x6 = ":white_check_mark:"
    if (!msg.member.hasPermission("KICK_MEMBERS")) x6 = ":x: "

    //üyeleri yasakla
    if (msg.member.hasPermission("BAN_MEMBERS")) x7 = ":white_check_mark:"
    if (!msg.member.hasPermission("BAN_MEMBERS")) x7 = ":x: "

    //mesajları yönet
    if (msg.member.hasPermission("MANAGE_MESSAGES")) x8 = ":white_check_mark:"
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) x8 = ":x: "

    //kullanıcı adlarını yönet
    if (msg.member.hasPermission("MANAGE_NICKNAMES")) x9 = ":white_check_mark:"
    if (!msg.member.hasPermission("MANAGE_NICKNAMES")) x9 = ":x: "

    //emojileri yönet
    if (msg.member.hasPermission("MANAGE_EMOJIS")) x10 = ":white_check_mark:"
    if (!msg.member.hasPermission("MANAGE_EMOJIS")) x10 = ":x: "

    //webhookları yönet
    if (msg.member.hasPermission("MANAGE_WEBHOOKS")) x11 = ":white_check_mark:"
    if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) x11 = ":x: "
     const embed = new Discord.MessageEmbed()
  .setColor('PURPLE')
   .setFooter(`${client.user.username} Yetkilerim Sistemi.`,msg.guild.iconURL({dynamic:true}))
    .setDescription(`** ${x} Yönetici \n${x2} Denetim Kaydını Görüntüle\n ${x3} Sunucuyu Yönet \n${x4} Rolleri Yönet \n${x5} Kanalları Yönet \n${x6} Üyeleri At \n${x7} Üyeleri Yasakla \n${x8} Mesajları Yönet \n${x9} Kullanıcı Adlarını Yönet \n${x10} Emojileri Yönet \n${x11} Webhook'ları Yönet**`);
 msg.channel.send(embed);

 const unban = new Discord.MessageEmbed()
 .setColor('BLACK')
 .setTitle("YETKİLERİM")
 .setThumbnail(msg.author.avatarURL())
 .setDescription(`**• Sorgulatan kullanıcı : ${msg.member} \n• Yetkileri : \n ${x} Yönetici \n${x2} Denetim Kaydını Görüntüle\n ${x3} Sunucuyu Yönet \n${x4} Rolleri Yönet \n${x5} Kanalları Yönet \n${x6} Üyeleri At \n${x7} Üyeleri Yasakla \n${x8} Mesajları Yönet \n${x9} Kullanıcı Adlarını Yönet \n${x10} Emojileri Yönet \n${x11} Webhook'ları Yönet}**`)
 .setTimestamp()
 .setFooter(`${client.user.username} Yetkilerim Sistemi.`,msg.guild.iconURL({dynamic:true}))
 var data = await db.fetch("logKanal_" + msg.guild.id)
 msg.client.channels.cache.get(data).send(unban);


};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Yetkilerim'],
  permLevel: 4,
    kategori: "kullanıcı"
};

exports.help = {
  name: 'yetkilerim',
  description: 'Komutu kullandığınız sunucudaki yetkilerinizi/izinlerinizi gösterir.',
  usage: 'yetkilerim'
};
