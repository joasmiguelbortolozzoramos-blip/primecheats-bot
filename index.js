import {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events
} from "discord.js";
import express from "express";

const app = express();
app.get("/", (req, res) => {
  res.send("PrimeCheats bot online 🚀");
});
app.listen(3000, () => {
  console.log("Servidor web ligado");
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ]
});

client.once(Events.ClientReady, () => {
  console.log(`🤖 PrimeCheats ligado como ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "comprar_produto") {
    await interaction.reply({
      content:
        "💸 **Pagamento via Pix**\n\n" +
        "Envie o Pix e **depois mande o comprovante aqui**.\n" +
        "Assim que confirmado, o produto será liberado automaticamente.",
      ephemeral: true
    });
  }
});

client.on(Events.GuildMemberAdd, async member => {
  try {
    await member.send(
      "👋 Bem-vindo à **PrimeCheats**!\n\n" +
      "Para comprar, use o painel de vendas no servidor.\n" +
      "Após pagar no Pix, envie o comprovante."
    );
  } catch (e) {}
});

client.login(process.env.TOKEN);
