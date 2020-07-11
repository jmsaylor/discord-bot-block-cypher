module.exports = {
    name: 'transact',
    usage: 'transact',
    description: '',
    run: async ({ msg, args }) => {
        //Sender
        const sender = msg.author.username;
        console.log(`Sender: ${sender}`);

        //Amount
        const amount = args[0];
        console.log(`Amount: ${amount}`);

        //Recepient
        msg.mentions.users.forEach(user => {
            console.log(`Recepient: ${user.username}`);
        });
    },
};
