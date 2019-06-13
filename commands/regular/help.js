const commando = require('discord.js-commando');
const discord = require('discord.js');

class Help extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'help',
            group: 'regular',
            memberName: 'help',
            description: 'All the commands listed will be told.'
        });
    }

    async run(message, args)
    {
        let embed = new discord.RichEmbed()
            .setAuthor(message.member.displayName,message.author.displayAvatarURL)
            .setTitle('List of Commands')
            .setDescription('Here is a list of my commands.')
            .setColor('BLUE')

        message.channel.send(embed)
        let embed2 = new discord.RichEmbed()
        .setTitle('Regular Commands')
        .addField('?charley [message]', 'Charley may be there.')
        .addField('?info', 'Tells you about me!')
        .addField('?help', 'Tells you list os commands.')
        .setColor('BLUE')
        message.channel.send(embed2);

        let embed3 = new discord.RichEmbed()
            .setTitle('Admin Commands')
            .addField('?setup', 'Setup your server with Micky!')
            .setFooter('More commands coming soon.')
            .setColor('BLUE')

        message.channel.send(embed3)
    }
}

module.exports = Help;
