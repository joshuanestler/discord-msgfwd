const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Logged in as ' + client.user.tag);
    client.user.setStatus('invisible').catch(console.error);
});

client.login(config.token);

client.on('message', message => {
    // Check if message is PN
    if (message.guild == null) return;

    // Check all elements in forward
    for (forward of config.forwards) {
        // Check if message matches config
        if (forward.srcServer != message.guild.id) return;
        if (forward.srcChannel != message.channel.id) return;
        if (forward.minLength && !(message.content.length >= forward.minLength)) return;
        if (forward.maxLength && !(message.content.length <= forward.maxLength)) return;
        if (forward.hasAttachments && !(message.attachments.size > 0)) return;

        const srcServer = client.guilds.get(forward.srcServer);
        const dstServer = client.guilds.get(forward.dstServer);
        const srcChannel = srcServer.channels.get(forward.srcChannel);
        const dstChannel = dstServer.channels.get(forward.dstChannel);

        forwardedMessage = `**${message.author.username}** wrote in \`#${srcChannel.name}\` of __*${message.guild.name}*__:\n`;
        forwardedMessage += message.content;
        forwardedMessage += message.attachments.size > 0 ? "\n\n\`[This message has attachments]\`" : "";

        // Send message after 10 seconds
        setTimeout(() => {
            dstChannel.send(forwardedMessage).catch(console.error);
        }, 10000);
    }
});

// ERROR Handling

client.on('error', error => {
    console.error('The websocket connection encountered an error:', error);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});