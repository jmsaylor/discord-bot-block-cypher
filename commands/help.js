const { stripIndents } = require('common-tags');

module.exports = {
    name: 'help',
    usage: 'help <command>',
    aliases: ['info'],
    description: 'Shows useful information',
    run: async ({ client, msg, args }) => {
        const { prefix } = client;
        // Made with ❤ by Cosmic#1043
        const cmd = client.cmds.get(args[0]);
        if (!cmd) {
            let cmds = client.cmds.map(c => c.name).join(', ');
            msg.channel.send({
                embed: {
                    title: 'Commands',
                    description: `\`${cmds}\``,
                    footer: {
                        text: '^help <command>',
                    },
                },
            });
        } else {
            const { name, usage, description, aliases } = cmd;
            msg.channel.send({
                embed: {
                    title: name,
                    description: stripIndents`
                    **Usage:** \`${usage}\`
                    **Description:** \`${description ? description : 'N/A'}\`
                    **Alias:** \`${aliases ? aliases.join(', ') : 'N/A'}\``,
                    footer: {
                        text: '^help <command>',
                    },
                },
            });
        }
    },
};
