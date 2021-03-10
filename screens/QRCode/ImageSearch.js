import { Form, Item, Input, Icon, Label } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Text, View } from '../../components/Themed';

class ImageSearch extends React.PureComponent  {
  render() {
    console.log("renders in ImageSearch")
    return <Text>Hello</Text>;
  }
}

export default ImageSearch

// const SecondRoute = () => {

//   useEffect(() => {
//     fetchFromApi({query:"Nature wilderness", page})
//   }, [])

//   const [data, setData] = useState([]);
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);

//   const fetchFromApi = async (info, pageNum) => {
//     let response = await fetch(
//       `https://api.unsplash.com/search/photos?client_id=Gh7x3qW_v2v6kdbTaPLShzIMCyyTIP5At-4J98rqjLg&query=${info}&page=${pageNum}&per_page=50&orientation=portrait`
//     );
//     let json = await response.json();
//     let newArray = []
//     json.results.forEach(item => {
//       newArray.push({
//         uri: item.urls.small,
//         hdUri: item.urls.full,
//       })
//     });
//     setData(newArray)
//     // console.log("here")
//   }

//   const onEndReached = () => {
//     fetchFromApi({query, page:1})
//     setPage(page + 1)
//   }

//   useEffect(() => {
//     const timeOutId = setTimeout(() => fetchFromApi({query, page: page+1}), 500);
//     return () => clearTimeout(timeOutId);
//   }, [query]);

//   const renderData = () => (
//     <MasonryList
//       style={{flex:1}}
//       columns={3}
//       images={data}
//       // onEndReached={() => onEndReached()}
//     />
//   )

//   console.log("test")
//   return(
//     <View style={{ flex: 1}}>
//       <View style={{width:'90%', alignSelf:'center', marginBottom: 10}}>
//         <Item regular>
//           <Input placeholder='Search for Images' value={query} onChangeText={val => {setQuery(val)}} style={{color:'#fff'}}/>
//         </Item>
//       </View>
//       <View style={{flex: 1, width:'90%', alignSelf:'center', backgroundColor:'red'}}>
//         {renderData()}
//       </View>
//     </View>
//   );
// }
