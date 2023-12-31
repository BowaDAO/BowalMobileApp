import {View, StyleSheet, FlatList} from 'react-native';
import {cagtegoriesData} from '../../../constants/data';
import {COLORS} from '../../../constants';
import {CategoryCard} from './Components';
import {getAllVendors} from '../../Redux/Slices/getVendorSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {RefreshController} from '../../Components';

const Categories = () => {
  const dispatch = useDispatch();

  const {status, vendors} = useSelector(store => store.vendors);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllVendors());
    }
  }, []);

  const renderItem = ({item}) => <CategoryCard item={item} vendors={vendors} />;

  return (
    <View style={styles.body}>
      <FlatList
        data={cagtegoriesData}
        renderItem={renderItem}
        keyExtractor={item => item?.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
        contentContainerStyle={{gap: 10, paddingTop: 15}}
        refreshControl={<RefreshController />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
export default Categories;
