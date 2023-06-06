const Discord = require('discord.js')
const db = require('wio.db')

exports.run = async (client ,message, args) =>{
const { channel } = message.member.voice;


 await channel.join();

}

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['join'],
 permLevel: 4
};

exports.help = {
 name: 'join',
 description: 'Davet Log Kanalını Belirler',
 usage: 'davet-kanal-ayarla #kanal'
};
