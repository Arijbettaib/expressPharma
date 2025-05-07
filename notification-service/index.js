const { runConsumer } = require('./consumer');

(async () => {
  try {
    console.log("🚀 Notification-Service démarre...");
    await runConsumer();
  } catch (err) {
    console.error("❌ Erreur dans Notification-Service :", err);
  }
})();
