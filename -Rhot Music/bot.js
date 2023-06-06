const discord = require("discord.js")

const client = new discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START"] });
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json")


client.on("ready", () => {
  console.log('RHOT MÜZİK PREEFİX: ------- ')
  console.log('RHOT MÜZİK PREEFİX: ------- ')
  console.log('RHOT MÜZİK PREEFİX: ------- ')
  console.log('RHOT MÜZİK PREEFİX: ------- ')
  console.log('RHOT MÜZİK PREEFİX: ------- ')
  console.log('RHOT MÜZİK PREEFİX: ------- ')
  console.log('RHOT MÜZİK PREEFİX: ------- ')
  client.user.setActivity("Roth Group #Beta")
})

client.on("warn", info => console.log(info));

client.on("error", console.error)

client.commands = new discord.Collection()
client.prefix = PREFIX
client.queue = new Map();


const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))
for (const file of cmdFiles) {
  const command = require(join(__dirname, "commands", file))
  client.commands.set(command.name, command)
}


client.on("message", message => {
   if (message.author.bot) return;
  if (!message.guild) return;

  if(message.content.startsWith(PREFIX)) {

    const args = message.content.slice(PREFIX.length).trim().split(/ +/)
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) {
      return;
    }

  try  {
      client.commands.get(command).execute(client, message, args)
    } catch (err) {
      console.log(err)
      message.reply("I am getting error on using this command")
    }

  }


});

client.on('voiceStateUpdate', async (oldState, newState) => {
  if(!newState.guild.me.voice.channel){return}
  const queue = oldState.client.queue.get(oldState.guild.id);
  const kanalid = oldState.channelID;
  const botkanalid = newState.guild.me.voice.channelID;
  if(kanalid == botkanalid) {
    const kişisayısı = newState.guild.me.voice.channel.members.size;
    if(kişisayısı == "1"){
      queue.channel.leave();
      oldState.client.queue.delete(oldState.guild.id)
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Şöyle bir baktımda kanalda kimse yok. Ben kendim müzik dinlemeye gittim!`)
        return queue.textChannel.send({embed}).then(msg => msg.delete({ timeout: 10000 })).catch(console.error)
    }
  }
});

client.login(TOKEN)
