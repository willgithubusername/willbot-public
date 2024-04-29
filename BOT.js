const { Client, Intents } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js-slash-command');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Slash commands setup
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const commands = [
        new SlashCommandBuilder().setName('ping').setDescription('Ping command to check if the bot is online.'),
        new SlashCommandBuilder().setName('trivia').setDescription('Starts a trivia game.')
    ];

    const rest = await client.application?.commands.set(commands);
    console.log('Slash commands registered!');
});

// Slash command handling
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'trivia') {
        await interaction.reply('Welcome to Trivia! I will ask you a question.');
        const question = getTriviaQuestion();
        await interaction.followUp(question);
    }
});

// Trivia game logic
function getTriviaQuestion() {
    const triviaQuestions = [
        { question: "Who is the author of 'Harry Potter'?", answer: "J.K. Rowling" },
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "What is the chemical symbol for water?", answer: "H2O" }
    ];

    const randomQuestion = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
    return randomQuestion.question;
}

client.login('bot token');
