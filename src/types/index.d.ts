export {};

type PopupButton = {
  id: string;
  type: string;
  text: string;
};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        close: () => void;
        ready: () => void;
        initDataUnsafe: {
          query_id?: string;
          user?: {
            username: string;
          };
        };
        MainButton: {
          setParams: (params: { text: string }) => void;
          isVisible: boolean;
          show: () => void;
          hide: () => void;
        };
        onEvent: (event: string, callback: () => void) => void;
        offEvent: (event: string, callback: () => void) => void;
        sendData: (data: string) => void;
        showPopup: (
          title: string,
          message: string,
          buttons: PopupButton[]
        ) => void;
      };
    };
  }
}
