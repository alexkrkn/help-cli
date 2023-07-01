import { Box, Text } from 'ink';

interface MenuProps {
  items: { letter: string, name: string }[];
}

export const Menu = (props: MenuProps) => {

  return (
    <Box>
      {props.items.map((item) =>
        <Box key={item.letter}>
          <Text bold backgroundColor="green" color="whiteBright"> {item.letter} </Text>
          <Box>
            <Text bold color="white"> {item.name}  </Text>
          </Box>
        </Box>
      )}
    </Box>
  );

};
