import { StackNavigator } from 'react-navigation';
import Root from '../components/Root';
import Browser from '../components/Browser';
import PlaceSearch from '../components/PlaceSearch';

export default StackNavigator({
  Home: {
    screen: Root,
    navigationOptions: {
      header: null
    }
  },
  Browser: Browser,
  Search: PlaceSearch
});
