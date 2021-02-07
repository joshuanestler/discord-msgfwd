const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Logged in as ' + client.user.tag);
    client.user.setStatus('invisible').catch(console.error);
});

client.login(config.token);

function checkMessage(message, forward) {
    if (forward.srcServer != message.guild.id) return false;
    if (forward.srcChannel != message.channel.id) return false;
    if (forward.minLength && !(message.content.length >= forward.minLength)) {
        console.log(`Message by ${message.author} in ${message.channel.name} has ${message.content.length} characters (minimum of ${forward.minLength} required)`);
        return false;
    }
    if (forward.maxLength && !(message.content.length <= forward.maxLength)) {
        console.log(`Message by ${message.author} has ${message.content.length} characters (maximum of ${forward.maxLength} required)`);
        return false;
    }
    if (forward.hasAttachments && !(message.attachments.size > 0)) {
        console.log(`Message by ${message.author} has no attachements`);
        return false;
    }

    return true;
}

client.on('message', message => {
    // Check if message is DM
    if (message.guild == null) return;

    // Check all elements in forward
    for (const forward of config.forwards) {
        // Check if message matches config
        if (!checkMessage(message, forward)) continue;

        const srcServer = client.guilds.get(forward.srcServer);
        const dstServer = client.guilds.get(forward.dstServer);
        const srcChannel = srcServer.channels.get(forward.srcChannel);
        const dstChannel = dstServer.channels.get(forward.dstChannel);

        let forwardedMessage = `**${message.author.username}** wrote in \`#${srcChannel.name}\` of __*${message.guild.name}*__:\n`;
        forwardedMessage += message.content;
        forwardedMessage += message.attachments.size > 0 ? "\n\n\`[This message has attachments]\`" : "";

        console.log(`Message forwarded:\n${forwardedMessage}`);

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