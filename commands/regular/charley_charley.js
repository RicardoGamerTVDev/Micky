const commando = require('discord.js-commando');
const discord = require('discord.js');

class CharleyCharley extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'charley',
            group: 'regular',
            memberName: 'charley',
            description: 'GET CHARLEY!'
        });
    }

    async run(message, args)
    {
        let messageCharley = message.content.split(' ').slice(1).join(' ');

        if(!message) return message.reply('seriously? u got nothing to say...?')

        let chance = Math.floor(Math.random() * 2)
        if(chance == 1)
        {
            let embed = new discord.RichEmbed()
                .setTitle('Charley, Charley.')
                .setImage('http://www.creepypasta.xyz/wp-content/uploads/2017/01/Charlie-Charlie-challenge.jpg')
                .setAuthor(message.member.displayName,message.author.displayAvatarURL)
                .setColor('GREEN')
                .setDescription(`Your message. ${messageCharley} was replied to a yes.`)
                .setFooter('Yes', message.author.displayAvatarURL)
            
            message.channel.send(embed);
        }
        else
        {
            let embed = new discord.RichEmbed()
                .setTitle('Charley, Charley.')
                .setImage('https://cde.peru.com//ima/0/1/4/6/4/1464856/611x458/charlie-charlie.jpg')
                .setAuthor(message.member.displayName,message.author.displayAvatarURL)
                .setColor('RED')
                .setDescription(`Your message. ${messageCharley} was replied to a no.`)
                .setFooter('No', message.author.displayAvatarURL)
            
            message.channel.send(embed); 
        }
    }
}

module.exports = CharleyCharley;
