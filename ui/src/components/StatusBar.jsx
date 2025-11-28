import { Tabs } from '@mantine/core';
import { Proxy } from "../screens/proxy/Proxy"

export function StatusBar() {
  const tabList = [
    { id: "dashboard", title: "Dashboard", icon: "" },
    { id: "target", title: "Target", icon: "" },
    { id: "proxy", title: "Proxy", icon: "" },
    { id: "decoder", title: "Decoder", icon: "" },
  ]
  return (
    <>
      <Tabs defaultValue={tabList[0].id}>
        <Tabs.List>
          {tabList.map((t, i) =>
            <Tabs.Tab value={t.id} key={i}>
              {t.title}
            </Tabs.Tab>
          )}
        </Tabs.List>

        <Tabs.Panel value="proxy">
          <Proxy />
        </Tabs.Panel>
      </Tabs>
    </>
  )
}