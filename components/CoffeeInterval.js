import React, { useState, useEffect } from 'react';
import { Box, FlatList, Center, NativeBaseProvider, Text } from 'native-base';

export default function CoffeeAutonomous(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await fetch("https://api.sampleapis.com/coffee/hot");
    const data = await resp.json();

    setData(data)
    setLoading(false)
  }

  const renderItem = ({ item }) => {
    return (
      <Box px={5} py={2} rounded="md" bg="primary.300" my={2}>
        {item.title}
      </Box>
    )
  }

  useEffect(() => {
    fetchData();
    const dataInterval = setInterval (() => fetchData(), 5 * 1000)

    return () => clearInterval(dataInterval);
  }, []);

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Box>Fetch Api</Box>
        {loading && <Box>Loading...</Box>}
        {data && (
          <FlatList 
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </Center>
    </NativeBaseProvider>
  )
}