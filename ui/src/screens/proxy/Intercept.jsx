import { useState, useEffect } from "react";
import { Box, Button, Flex, Switch, Table, Text } from "@mantine/core";
import { elements } from "../../data";

export function Intercept() {

  const [isIntercepting, setIsIntercepting] = useState(false);

  // useEffect(() => {
  //   window.backend.toggleInterceptor(isIntercepting)
  // }, [isIntercepting])

  const rows = elements.map((element, i) => (
    <Table.Tr key={i}>
      <Table.Td>{element.time}</Table.Td>
      <Table.Td>{element.ip}</Table.Td>
      <Table.Td>{element.listenerPort}</Table.Td>
      <Table.Td>{element.method}</Table.Td>
      <Table.Td>{element.params}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
      <Table.Td>{element.url}</Table.Td>
    </Table.Tr>
  ));

  function handleToggle() {
    setIsIntercepting(!isIntercepting)
    window.backend.toggleInteceptor(!isIntercepting)
  }

  return (
    <>
      <Box p="md">
        <Flex gap="md" justify="space-between">
          <Flex align="center" p="xs">
            <Text fz="sm">
              Intercept
            </Text>
            <Switch checked={isIntercepting} onChange={() => handleToggle()} color="green" className="cursor-pointer" />
          </Flex>
          <Flex>
            <Button>Forward</Button>
            <Button>Drop</Button>
          </Flex>
        </Flex>
        <Box mt="md">
          <Table.ScrollContainer p={0}>
            <Table stickyHeader withRowBorders withColumnBorders withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Time</Table.Th>
                  <Table.Th>IP</Table.Th>
                  <Table.Th>Listener Port</Table.Th>
                  <Table.Th>Method</Table.Th>
                  <Table.Th>Params</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>URL</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Box>
      </Box>
    </>
  )
}