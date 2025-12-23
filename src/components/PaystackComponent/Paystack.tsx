import { PAY_STACK_KEY } from '@wd/api';
import { Modal, View } from 'react-native';
import { WebView } from 'react-native-webview';

type TGetContent = {
  paystackKey: string;
  billingEmail: string;
  amount: number | string;
  currency?: string;
  reference: string;
  phone?: string;
  splitCode?: string;
};

export const getContent = ({
  paystackKey,
  billingEmail = 'info@weedeen.com',
  amount,
  currency = 'NGN',
  reference,
  phone = '',
  splitCode,
}: TGetContent) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://js.paystack.co/v1/inline.js"></script>
        <title>Paystack</title>
      </head>
        <body style="background-color:#fff;height:100vh">
          <script type="text/javascript">
            function payWithPaystack(){
              const paystack = PaystackPop.setup({
                key: '${paystackKey}',
                email: '${billingEmail}',
                amount: ${amount},
                ref: ${`${reference}`},
                currency: '${currency}',
                phone: '${phone}',
                ${splitCode ? `split_code: '${splitCode}',` : ''}
                callback: function(response){
                  var resp = {event:'successful', transactionRef:response};
                  window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                },
                onClose: function(){
                  var resp = {event:'cancelled'};
                  window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                },
                onError: function(error){
                  var resp = {event:'error', error};
                  window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                }
              });
              paystack.openIframe();
            }
            window.onload = (event) => {
              payWithPaystack();
            };
          </script>
        </body>
    </html>
    `;
};

type TPaystackModal = {
  isOpen: boolean;
  amount: number | string;
  email: string;
  phone?: string;
  reference: string;
  onCancel: (data: any) => void;
  onSuccess: (data: any) => void;
  onError: (data: any) => void;
};

export const PaystackModal = ({
  isOpen,
  amount,
  email,
  onCancel,
  onSuccess,
  reference,
  phone = '',
  onError,
}: TPaystackModal) => {
  const onReceiveMessage = data => {
    const webResponse = JSON.parse(data);
    switch (webResponse.event) {
      case 'cancelled':
        onCancel({ status: 'cancelled' });
        break;
      case 'error':
        onError?.(webResponse.error);
        break;
      case 'successful':
        if (onSuccess) {
          onSuccess({
            status: 'success',
            transactionRef: reference,
            data: webResponse,
          });
        }
        break;
      default:
        break;
    }
  };

  return (
    <Modal visible={isOpen}>
      <View style={{ flex: 1 }}>
        <WebView
          onMessage={e => onReceiveMessage(e.nativeEvent?.data)}
          source={{
            html: getContent({
              reference,
              paystackKey: PAY_STACK_KEY,
              billingEmail: email,
              amount,
              phone,
            }),
          }}
          style={{ flex: 1 }}
        />
      </View>
    </Modal>
  );
};
