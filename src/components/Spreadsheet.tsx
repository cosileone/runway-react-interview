import { Box, Flex, Text } from '@chakra-ui/react';
import _ from 'lodash';
import React, { Fragment, useState } from 'react';

import Cell from 'components/Cell';

const NUM_ROWS = 20;
const NUM_COLUMNS = 20;

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
              key={String(rowIdx)}
              color="gray.400"
              fontWeight="400"
              fontSize="sm"
              position="absolute"
              left="-2rem"
              top="0.5rem"
              textAlign="right"
            >
              {rowIdx + 1}
            </Text>
            {row.map((cellValue, columnIdx) => (
              <Fragment key={`${rowIdx}/${columnIdx}`}>
                {rowIdx === 0 ?? (
                  <Text
                    color="gray.400"
                    fontWeight="400"
                    fontSize="sm"
                    position="absolute"
                    top="-2rem"
                    textAlign="right"
                  >
                    shenanigans
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
              </Fragment>
            ))}
          </Flex>
        );
      })}
    </Box>
  );
};

export default Spreadsheet;
