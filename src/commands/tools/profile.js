const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../schemas/profiles');
const mongoose = require('mongoose');
const Levels = require('../../classes/levelManager');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Check your or another user\'s profile')
        .addUserOption(
            option => option
            .setName("user")
            .setDescription("Person whose profile you want to check")
        ),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });
        
        const user = interaction.options.getUser("user") || interaction.member.user
        //const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const userData = await Levels.fetch(user.id, interaction.guildId);
        // xpFor(user.level + 1)

        const levelEmbed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setTitle(`${user.username}'s Profile`)
            .setDescription("Note: Level and Experience of requested user")
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: "Level", value: `**\` ${userData.level} \`** `, inline: true },
                { name: "Experience", value: `**\` ${userData.xp - Levels.xpFor(userData.level)}  / ${Levels.xpFor(userData.level + 1) - Levels.xpFor(userData.level)} \`** `, inline: true },
                { name: "Coins", value: `**\` ${userData.currency} \`** `, inline: true }
                )
        
        await interaction.editReply({
            embeds: [levelEmbed]
        });
    }
}