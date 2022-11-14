const Profile = require('../../schemas/profiles');
const mongoose = require('mongoose');
const Levels = require('../../classes/levelManager')

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (!message.guild) return;     // if DM
        if (message.author.bot) return; // if a bot sends a message

        const randomXp = Math.floor(Math.random() * 9) + 1; // random number between 0 and 9 and add 1

        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);  // if user leveled up
        if (hasLeveledUp) { // Leveled up logic for auto roles, messages, etc
            const user = await Levels.fetch(message.author.id, message.guild.id);
            console.log(user.level);
        }

        /*
        let userProfile = await Profile.findOne({ id: message.user.id, guildId: message.Guild.id});
        if (!guildProfile){
            guildProfile = await new Guild({ // Most likely the case b/c joining new server
                _id: mongoose.Types.ObjectId(),
                guildId: guild.id,
                guildName: guild.name,
                guildIcon: guild.iconURL() ? guild.iconURL() : "None"
            })

            await guildProfile.save().catch(console.error);
            console.log(guildProfile);
        } else {
            console.log('Profile already exists!')
        }
        */
    },
};