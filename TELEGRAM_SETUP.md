# Telegram Bot Setup for Order Notifications

## Setup Steps (5 minutes)

### 1. Create Telegram Bot
1. Open Telegram and search for **@BotFather**
2. Send `/newbot`
3. Choose a name: "Likhith Orders Bot"
4. Choose a username: "LikhithOrdersBot" (must end with 'bot')
5. Copy the **Bot Token** (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. Get Your Chat ID
1. Search for **@userinfobot** on Telegram
2. Send it any message
3. Copy your **Chat ID** (a number like: `123456789`)

### 3. Test the Bot
1. Search for your bot username in Telegram
2. Click **START** button
3. Send any message to activate the bot

### 4. Update script.js
Add these constants at the top of script.js:

```javascript
const TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN_HERE";
const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID_HERE";
```

Add this function:

```javascript
const sendTelegramNotification = async (order) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return false;
  }

  const message = `
🆕 *New Order Received*

📦 *Order ID:* ${order.id}
💳 *UTR Number:* ${order.transactionId || 'N/A'}
👤 *Customer:* ${order.customer.name}
📧 *Email:* ${order.customer.email}
📱 *Phone:* ${order.customer.phone}
💰 *Amount:* Rs. ${order.amount}
🛍️ *Items:* ${order.items.map(i => `${i.title} x${i.qty}`).join(', ')}
📅 *Date:* ${new Date(order.createdAt).toLocaleString()}
`;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });
    return true;
  } catch (error) {
    console.error('Telegram notification failed:', error);
    return false;
  }
};
```

Call it after creating order:
```javascript
await sendTelegramNotification(order);
```

## Done!
You'll get instant Telegram messages for every order with full details!
