import {StyleSheet} from 'react-native';
import {color} from '../../utilities';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.whitesmoke,
  },
  selectedButton: {
    backgroundColor: 'red',
  },
  normalButton: {
    backgroundColor: 'white',
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: 100
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  selectedText: {
    marginLeft: 12,
    fontSize: 20,
  },
  photo: {
    height: 100,
    width: 100,
  },
});
export default styles;
