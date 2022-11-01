const useTelegram = () => {
  const tg = window.Telegram.WebApp;

  return {
    tg,
    showPopup: tg.showPopup,
  };
};

export default useTelegram;
