const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("upgrade")
        .setDescription("ترقية الادارة من رتبة الى اخرى")
        .addUserOption(option => option.setName("user").setDescription("منشن الشخص").setRequired(true)),
    async execute(client, interaction) {
        if (interaction.member.roles.cache.some(role => role.id === "ايدي الرتبة")){

        const user = interaction.options.getUser("user");
        const member = await interaction.guild.members.fetch(user.id);

        const currentRole = member.roles.highest;
        const roles = interaction.guild.roles.cache.sort((a, b) => a.position - b.position);
        const nextRole = roles.find(role => role.position === currentRole.position + 1);

        if (!nextRole) {
            return interaction.reply({ content: "لا يمكن ترقية هذا المستخدم. لا توجد رتبة أعلى.", ephemeral: true });
        }

        try {
            await member.roles.add(nextRole);
            await interaction.reply({ content: `تم ترقية بنجاح`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "حدث خطأ أثناء ترقية الرتبة.", ephemeral: true });
        }
        const log = client.channels.cache.get("ايدي روم الترقيات");
         await log.send({ content: `**تمت ترقية <@${user.id}> الى رتبة <@&${nextRole.id}>\nشاكرين له على التفاعل**` });
        } else {
interaction.reply({ content: "**:x: you don't have any permissions for type commands**"});
}
    }
};
