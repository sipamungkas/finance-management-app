import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    flex: 1,
    borderRadius: 8,
  },
  wrapper: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    flex: 1,
  },
  txtAmount: {
    fontSize: 18,
    fontWeight: '600',
  },
  txtDate: {
    fontSize: 16,
  },
  btnWrapper: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 4,
    padding: 4,
  },
});
