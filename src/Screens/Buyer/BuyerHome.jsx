import {View, StyleSheet} from 'react-native';
import {COLORS} from '../../../constants';
import {Location, Search} from '../../Components';
import {Banner, Greeting, FeaturedCategories} from './Components';

const BuyerHome = () => {
  return (
    <View style={styles.body}>
      <View style={styles.head}>
        <Greeting />
        {/* <Location /> */}
      </View>
      <Search placeholder={'What would you like to buy?'} />
      <Banner />
      <FeaturedCategories />
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
    flexDirection: 'column',
    gap: 25,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default BuyerHome;
