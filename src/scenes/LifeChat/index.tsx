import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
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
  const INJECTED_JS = `
  window.onload = function() {
    window.fwSettings = {
      widget_id: 150000002267,
    };
    !(function () {
      if ('function' != typeof window.FreshworksWidget) {
        var n = function () {
          n.q.push(arguments);
        };
        (n.q = []), (window.FreshworksWidget = n);
      }
      console.log('benbd');
      var yourscript = document.createElement('script');
      yourscript.type = 'text/javascript';
      yourscript.async = true;
      yourscript.defer = true;
      yourscript.src = 'https://widget.freshworks.com/widgets/150000002267.js';
      // document.getElementsByTagName('style')[0].appendCh ild(yourscript);
      var s = document.getElementsByTagName('body')[0];
      s.parentNode.insertBefore(yourscript, s);
      window.FreshworksWidget('open');
    })();
  }
`;

  return (
    <BackButtonTitleCenter title="Live Chat Support">
      <VStack my="7" bg="amber.200">
        <WebView
          ref={webview}
          style={WEBVIEW(height)}
          javaScriptCanOpenWindowsAutomatically
          startInLoadingState={true}
          injectedJavaScript={INJECTED_JS}
          cacheEnabled={false}
          cacheMode={'LOAD_NO_CACHE'}
          source={{ uri: 'https://fluffy-shortbread-389e6b.netlify.app/' }}
        />
      </VStack>
    </BackButtonTitleCenter>
  );
};

export default memo(LiveChatPage);
