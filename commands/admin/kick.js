const commando = require('discord.js-commando');
const discord = require('discord.js');
const config = require('../../config.json');

class KickCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'kick',
            group: 'admin',
            memberName: 'kick',
            description: 'Kicks a user.'
        });
    }

    async run(message, args)
    {
        let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let reason = args.split(' ').slice(1).join(' ');
        let logs = message.guild.channels.find(channel => channel.name === 'bans-and-kicks');
        
        //We will make the embeds for the kick errors
        
        let noTarget = new discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle('Error')
            .setDescription('You didn't mention a user to kick. Please mention a user to kick.')
            .setColor('RED')
            .setThumbnail(message.author.avatarURL)
            .setFooter(message.guild.name, message.guild.iconURL)
            .setTimestamp()
          
        
        if(!target) return message.channel.send(noTarget);
        
        let noLogs = new discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle('Error')
            .setDescription('The owner or administrators didn\'t make a channel called `bans-and-kicks`. Please create the channel in order to see who kicked who.')
            .setColor('RED')
            .setThumbnail(message.author.avatarURL)
            .setFooter(message.guild.name, message.guild.iconURL)
            .setTimestamp()
            
        if(!logs) return message.channel.send(noLogs);
        
        let noAdministrator = new discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle('Error')
            .setDescription(`Your trying to kick ${target.user.username} in ${message.guild.name}. But you don't have have the permission __KICK_MEMBERS__ to use this.`)'
            .setColor('RED')
            .setThumbnail(message.author.avatarURL)
            .setFooter(message.guild.name, message.guild.iconURL)
        
        if(!message.member.hasPermission('KICK_MEMBERS')) return messge.channel.send(noAdministrator);
        
        let kickInfo = new discord.RichEmbed()
            .setAuthor(target.user.username, target.user.avatarURL)
            .setDescription('Kick Information')
            .addField('Kicked User', `${target.user.tag} | ${target.user.id}`)
            .addField('Kicked By', `${message.author.tag} | ${message.author.id}`)
            .addField('Kicked At', `${message.createdAt}`)
            .addField('Kicked In', `${message.channel}`)
            .addField('Kicked For', `${reason}`)
            .setFooter(message.guild.name, message.guild.iconURL)
            
        message.channel.send(`Sucsessfully kicked ${target.user.tag} for ${reason}`)
        target.kick(reason)
        logs.send(kickInfo)
            
    }
}
