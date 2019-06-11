const commando = require('discord.js-commando');
const discord = require('discord.js');

class SuggestCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'suggest',
            group: 'regular',
            memberName: 'suggest',
            description: 'Suggest your ideas!'
        });
    }

    async run(message, args)
    {
        if(message.channel.name === 'sumbit-suggestions')
        {
            let suggestions = message.guild.channels.find(channel => channel.name === 'suggestions')
            let suggestion = message.content.split(' ').slice(1).join(' ');

            if(!suggestion) return message.channel.send(`${message.author.tag}, you don't have a suggestion to sumbit.`)

            message.delete();

            let embed = new discord.RichEmbed()
                .setTimestamp()
                .setAuthor(message.member.displayName,message.author.displayAvatarURL)
                .setColor('BLUE')
                .setTitle(`Hey, ${message.author.tag}!`)
                .setDescription('I have just submitted your suggestion, lets hope you get some good votes!')
                .addField(`${message.author.tag} suggested:`, `${suggestion}`)
                .setThumbnail(message.author.avatarURL)
                .setFooter('Your suggestion may become a future!')

            message.channel.send(embed);
            
            let embed3000 = new discord.Client()
                .setTitle(`Thanks for leaving a suggestion, ${message.member.displayName}`)
                .setDescription(`Our staff and members here on ${message.guild.name} will think about your suggestion!`)
                .setThumbnail(message.guild.iconURL)
                .setColor('BLUE')
                .setFooter("Your suggestion has been sent to `#suggestions`!")

            message.member.send("embed3000")
            
            let voteSuggestions = new discord.RichEmbed()
                .setTitle('New Suggestion!')
                .setDescription(`This suggestion was created at ${message.createdAt}`)
                .addField(`This suggestion was created by:`, `${message.author} | ${message.author.id}`)
                .addField('They suggested:', `${suggestion}`)
                .setThumbnail(message.author.avatarURL)
                .setImage('https://cdn.discordapp.com/attachments/578689190255001631/585300609968898071/suggestion-box-improve-business-660x330.jpg')
                .setColor('NAVY')
                .setFooter('They make really good suggestions!')

            let reactionEmbed = await suggestions.send(voteSuggestions);

            reactionEmbed.react('✅')
            reactionEmbed.react('❎')
        }
    }
}

module.exports = SuggestCommand;
