const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth");

    const sock = makeWASocket({
        auth: state
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async (msg) => {
        const message = msg.messages[0];

        if (!message.message) return;

        const text = message.message.conversation?.toLowerCase();

        if (text === "hi") {
            await sock.sendMessage(message.key.remoteJid, { text: "Hello 👋 I am your bot!" });
        }
    });
}

startBot();
