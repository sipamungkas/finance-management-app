import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,

    alignItems: 'flex-start',
  },
  wrapper: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    justifyContent: 'center',
    borderRadius: 8,
    height: 70,
  },
  cardContainer: {flexDirection: 'row', alignItems: 'center', gap: 4},
  txtAmmount: {
    paddingHorizontal: 24,
    marginTop: 5,
  },
  fabWrapper: {
    position: 'absolute',
    bottom: 48,
    right: 24,
    backgroundColor: 'white',
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
  },

  // modal
});
