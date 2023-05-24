import env from '@env';
// import { useQueryClient } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import { Mixpanel, MixpanelType } from 'mixpanel-react-native';
import React, { FC, useLayoutEffect } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

const MixpanelContext = createContext<any>(null);

export const useMixpanel = () => useContext(MixpanelContext);

export const MixpanelProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mixpanel, setMixpanel] = useState<MixpanelType>(null);
  const [data, setData] = useState<any>();
  useLayoutEffect(() => {
    async function fetchData() {
      try {
        const res = await cacheService.get('user');
        if (JSON.parse(res || '{}')?.id !== data?.id) {
          setData(JSON.parse(res || '{}'));
          console.log('userID -set', res);
        }
        return res;
      } catch (error) {
        console.error('errr mixpanel - no user id -', JSON.stringify(error));
      }
    }
    fetchData();
  });

  useEffect(() => {
    const trackAutomaticEvents = true;
    const mixpanelInstance = new Mixpanel(env.MXP_PRO_TOKS, trackAutomaticEvents);
    mixpanelInstance.init();
    setMixpanel(mixpanelInstance);
  }, []);

  return <MixpanelContext.Provider value={[mixpanel, data]}>{children}</MixpanelContext.Provider>;
};
