import { Box, Container, Flex, Text } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useState } from 'react';

import Cell from 'components/Cell';

const NUM_ROWS = 10;
const NUM_COLUMNS = 10;

const Spreadsheet: React.FC = () => {
  const [spreadsheetState, setSpreadsheetState] = useState(
    _.times(NUM_ROWS, () => _.times(NUM_COLUMNS, _.constant(''))),
  );

  return (
    <Box width="full" ml="8">
      {spreadsheetState.map((row, rowIdx) => {
        return (
          <Flex key={String(rowIdx)} position="relative">
            <Text
              color="gray.400"
              fontWeight="400"
              fontSize="sm"
              position="absolute"
              left="-2rem"
              top="0.5rem"
            >
              {rowIdx + 1}
            </Text>
            {row.map((cellValue, columnIdx) => (
              <Container key={`${rowIdx}/${columnIdx}`} position="relative" p="0">
                {rowIdx === 0 && (
                  <Text
                    color="gray.400"
                    fontWeight="400"
                    fontSize="sm"
                    position="absolute"
                    top="-1.5rem"
                    pl="50%"
                  >
                    {columnIdx + 1}
                  </Text>
                )}
                <Cell
                  value={cellValue}
                  onChange={(newValue: string) => {
                    const newRow = [
                      ...spreadsheetState[rowIdx].slice(0, columnIdx),
                      newValue,
                      ...spreadsheetState[rowIdx].slice(columnIdx + 1),
                    ];
                    setSpreadsheetState([
                      ...spreadsheetState.slice(0, rowIdx),
                      newRow,
                      ...spreadsheetState.slice(rowIdx + 1),
                    ]);
                  }}
                />
              </Container>
            ))}
          </Flex>
        );
      })}
    </Box>
  );
};

export default Spreadsheet;
