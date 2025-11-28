import { Box, Table, TextInput } from "@mantine/core"

export function HttpHistory() {

  const tableData = {
    caption: 'HTTPS History on 192.168.1.14',
    head: ['Element position', 'Atomic mass', 'Symbol', 'Element name'],
    body: [
      [6, 12.011, 'C', 'Carbon'],
      [7, 14.007, 'N', 'Nitrogen'],
      [39, 88.906, 'Y', 'Yttrium'],
      [56, 137.33, 'Ba', 'Barium'],
      [58, 140.12, 'Ce', 'Cerium'],
    ],
  };

  return (
    <>
      <Box p="md">
        <TextInput placeholder="Enter domain to search" mb="md" />
        <Table data={tableData} highlightOnHover withTableBorder withColumnBorders stickyHeader mah={200} />
      </Box>
    </>
  )
}