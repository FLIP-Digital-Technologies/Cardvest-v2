import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import env from '@env';
import { VStack } from 'native-base';
import React, { FC, memo } from 'react';
import { Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const { height } = Dimensions.get('screen');

const WEBVIEW = height => ({
  height: height * 0.8,
  backgroundColor: '#fff',
  width: '100%',
  flex: 1,
});

const LiveChatPage: FC = () => {
  const webview = React.useRef(null);

  const content = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style="background-color: #000;">
  <style>
  iframe {
  //   right: 0 !important;
  //   top: 100px !important;
  //   border: none !important;
  //   position: fixed !important;
  //   min-width: 104px !important;
  //   max-width: 156px !important;
  //   height: 56px !important;
  //   z-index: 2147483000 !important;
  //   visibility: visible !important;
  //   left: 0 !important;
  //   margin: auto !important;
    background-color: purple !important;
    scale: 12%;
  }
  div#fc_frame {
    // position: absolute;
    // left: 0 !important;
    // margin: auto !important;
    // right: 0 !important;
    // bottom: 0 !important;
    // top: 0 !important;
    height: 40rem;
    width: 20rem;
    overflow: scroll !important;
  }
</style>
    <script>
      function initFreshChat() {
        window.fcWidget.init({
          token: '23aa0928-52ac-4709-a98a-719d344f9c03',
          host: 'https://fliplabs-help.freshchat.com',
        });
      }
      function initialize(i, t) {
        var e;
        i.getElementById(t)
          ? initFreshChat()
          : (((e = i.createElement('script')).id = t),
            (e.async = !0),
            (e.src = 'https://fliplabs-help.freshchat.com/js/widget.js'),
            (e.onload = initFreshChat),
            i.head.appendChild(e));
      }
      function initiateCall() {
        initialize(document, 'Freshchat-js-sdk');
      }
      window.addEventListener
        ? window.addEventListener('load', initiateCall, !1)
        : window.attachEvent('load', initiateCall, !1);
    </script>
    <!-- <script type='text/javascript' src='https://widget.freshworks.com/widgets/150000002267.js' async defer></script> -->
    <style>
      iframe {
      //   right: 0 !important;
      //   top: 100px !important;
      //   border: none !important;
      //   position: fixed !important;
      //   min-width: 104px !important;
      //   max-width: 156px !important;
      //   height: 56px !important;
      //   z-index: 2147483000 !important;
      //   visibility: visible !important;
      //   left: 0 !important;
      //   margin: auto !important;
        background-color: purple !important;
        scale: 12%;
      }
      div#fc_frame {
        scale: 12%;
      }
    </style>
    <script>
      window.setTimeout(() => {
        document.getElementById("fc_widget").addEventListener("onload", (this) => {
          this.contentDocument.body.style.visibility='hidden';
        });
        window.fcWidget.open();
      }, 10000);
    </script>
  </body>
</html>
`;

  return (
    <BackButtonTitleCenter title="Live Chat Support">
      <VStack my="7" bg="amber.200">
        <WebView
          ref={webview}
          style={WEBVIEW(height)}
          javaScriptCanOpenWindowsAutomatically
          startInLoadingState={true}
          // injectedJavaScript={INJECTED_JS}
          cacheEnabled={false}
          cacheMode={'LOAD_NO_CACHE'}
          source={{ uri: `${env.API_URL.replace('/api/v2', '/chat')}` }}
        />
      </VStack>
    </BackButtonTitleCenter>
  );
};

export default memo(LiveChatPage);
