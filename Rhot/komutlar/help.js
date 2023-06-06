const Discord = require('discord.js');
const moment = require('moment');
const db = require('wio.db');
const ms = require('ms')
const stripIndents = require("common-tags");
const fetch = require("node-fetch");
const userInstagram = require("user-instagram");
exports.run = async (client, message, args, reaction) => { 
 
    /*//let membersWithRole = message.guild.roles.cache.get('833069798061244426').members;
    
    let qwe = message.guild.members.cache.filter(s => s.roles.cache.has('833069798061244426') && !s.roles.cache.has('835082161836130354') && !s.roles.cache.has('835083192654233632') && !s.roles.cache.has('835083101448962069') && !s.roles.cache.has('835621861265637436') && !s.user.bot);
    const geçiciveri = qwe.map(x => x.user.);
    let count = message.guild.members.cache.filter(s => s.roles.cache.has('833069798061244426') && !s.roles.cache.has('835082161836130354') && !s.roles.cache.has('835083192654233632') && !s.roles.cache.has('835083101448962069') && !s.roles.cache.has('835621861265637436') && !s.user.bot).size;
    //let size = membersWithRole[0];
    //for(int i = 0; i < count; i++){
        //qwe
    //}
    console.log(qwe[0])*/

   /* userInstagram('gucci')
  .then(console.log)
  .catch(console.error);*/

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0
};
exports.help = {
  name: 'insta',
  description: '',
  usage: 'kayıt'
};
