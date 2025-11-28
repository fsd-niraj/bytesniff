import { Tabs, Text, TextInput, Loader } from '@mantine/core';
import { Intercept } from './Intercept';
import { HttpHistory } from './HttpsHistory';

const tabList = [
  { id: "intercept", title: "Intercept", icon: "" },
  { id: "httpsHistory", title: "HTTP History", icon: "" },
  { id: "webSocketHistory", title: "Web Socket History", icon: "" },
  { id: "proxySettings", title: "Proxy Settings", icon: "" },
]

export function Proxy() {
  return (
    <>
      <Tabs defaultValue={tabList[0].id}>
        <Tabs.List>
          {tabList.map((t, i) =>
            <Tabs.Tab value={t.id} key={i}>
              <Text fz="xs">{t.title}</Text>
            </Tabs.Tab>
          )}
        </Tabs.List>

        <Tabs.Panel value="intercept">
          <Intercept />
        </Tabs.Panel>

        <Tabs.Panel value="httpsHistory">
          <HttpHistory />
        </Tabs.Panel>

        <Tabs.Panel value="proxySettings">
          Settings
        </Tabs.Panel>
      </Tabs>
    </>
  )
}