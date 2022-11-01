const useTelegram = () => {
  const tg = window.Telegram.WebApp;

  return {
    showPopup: tg.showPopup,
  };
};

export default useTelegram;
