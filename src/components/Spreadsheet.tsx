import { Box, Container, Flex, Text } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import Cell from 'components/Cell';

const NUM_ROWS = 10;
const NUM_COLUMNS = 10;

const Spreadsheet: React.FC = () => {
  const [spreadsheetState, setSpreadsheetState] = useState(
    _.times(NUM_ROWS, () => _.times(NUM_COLUMNS, _.constant(''))),
  );

  const [selectedCell, setSelectedCell] = useState<{ row: number; column: number }>();

  useEffect(() => {
    if (selectedCell) {
      const cell = document.getElementById(`${selectedCell.row}/${selectedCell.column}`);
      cell?.focus();
    }
  }, [selectedCell]);

  const onKeyDownHandler = useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
    (ev) => {
      if (selectedCell) {
        switch (ev.key) {
          case 'ArrowUp':
            if (selectedCell.row === 0) break;
            setSelectedCell({
              row: selectedCell.row - 1,
              column: selectedCell.column,
            });
            break;
          case 'ArrowDown':
            if (selectedCell.row >= NUM_ROWS - 1) break;
            setSelectedCell({
              row: selectedCell.row + 1,
              column: selectedCell.column,
            });
            break;
          case 'ArrowLeft':
            if (selectedCell.column === 0) break;
            setSelectedCell({
              row: selectedCell.row,
              column: selectedCell.column - 1,
            });
            break;
          case 'ArrowRight':
            if (selectedCell.column >= NUM_COLUMNS - 1) break;
            setSelectedCell({
              row: selectedCell.row,
              column: selectedCell.column + 1,
            });
            break;
          default:
            // console.log(ev.key);
            break;
        }
      } else {
        setSelectedCell({ row: 0, column: 0 });
      }
    },
    [selectedCell],
  );

  return (
    <Box width="full" ml="8" onKeyDown={onKeyDownHandler}>
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
                  id={`${rowIdx}/${columnIdx}`}
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
                  onFocus={() => {
                    setSelectedCell({ row: rowIdx, column: columnIdx });
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
