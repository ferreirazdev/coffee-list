import React, {useState, useEffect} from 'react';
import { FlatList, Box, NativeBaseProvider, Center } from 'native-base';
import { create } from 'apisauce';
import DataRenderer from './DataRenderer'

export default function SauceExample(){
  const [data, setData] = useState([])
  const api = create({
    baseURL: "https://api.sampleapis.com/coffee"
  });

  const fetchData = () => {
    api
      .get("/hot")
      .then((response) => response.data)
      .then((data) => setData(data));
  }

  const renderItem = ({ item }) => {
    return(
      <Box px={5} py={2} rounded="md" bg="primary.300" my={2}>
        {item.title}
      </Box>
    )
  }

  useEffect(() => {
    fetchData();
  }, [])
  
  return(
    <NativeBaseProvider>
      <Center flex={1}>{data && <DataRenderer data={data} />}</Center>
    </NativeBaseProvider>
  )
}