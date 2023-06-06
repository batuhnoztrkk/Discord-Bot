const Discord = require('discord.js')
const {PREFIX} = require('../config.json')
module.exports = {
  name: "help",
  description: "yardım",
  execute(client, message) {
  message.channel.send(new Discord.MessageEmbed()
                      .setDescription(
    `
    **${PREFIX}play <şarkı-adı/URL>:** \`Yazılan şarkıyı oynatır.\`
    **${PREFIX}skip:** \`Sırada bulunan şarkıya geçiş sağlar.\`
    **${PREFIX}loop:** \`Çalınan şarkıyı sürekli olarak döngüye sokar. Kapatmak için: .loop.\`
    **${PREFIX}stop:** \`Çalınan şarkıyı durdurur.\`
    **${PREFIX}resume:** \`Durdurulan şarkıyı devam ettirir.\`
    **${PREFIX}queue::** \`Sıradaki şarkıları liste halinde gösterir.\`
    **${PREFIX}np:** \`Çalınan şarkının ne olduğunu gösterir.\`
    **${PREFIX}quit:** \`Bot sesten çıkar ve sırayı temizler.\`

`)
                      )
}
}
