import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS, assets} from '../../../constants';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

const Splash = ({navigation}) => {
  const {user} = useSelector(store => store.currentUser);

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigation.replace('BuyerStack');
      }
      navigation.replace('OnboardingStack');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={assets.logo} style={styles.logo} />
      <Text style={styles.text}>BOWAL</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  logo: {
    height: 55,
    width: 55,
  },
  text: {
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 2,
    color: COLORS.white,
  },
});
export default Splash;
