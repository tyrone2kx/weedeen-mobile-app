import useTheme from '@wd/utils/theme/useTheme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from '../Icon/Icon';

const SwipeableItem = ({
  item,
  onEdit,
  onDelete,
  children,
  index,
}: {
  item: any;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  children: React.ReactNode;
  index: string;
}) => {
  const row: Array<any> = [];
  let prevOpenedRow: any = null;

  const { theme } = useTheme();

  const closeRow = (_idx: string) => {
    if (prevOpenedRow && prevOpenedRow !== row[_idx]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[_idx];
  };

  const handleEdit = () => {
    onEdit?.(item);
    closeRow(prevOpenedRow);
  };

  const handleDelete = () => {
    onDelete?.(item);
    closeRow(prevOpenedRow);
  };

  const renderLeftActions = () => {
    return (
      <View style={styles.rightActions}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleEdit}
          style={[
            styles.actionButton,
            { backgroundColor: theme.green.DEFAULT },
          ]}
        >
          <Icon color={theme.white.DEFAULT} name="card-edit" size={20} />
        </TouchableOpacity>
      </View>
    );
  };
  const renderRightActions = () => {
    return (
      <View style={styles.rightActions}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleDelete}
          style={[styles.actionButton, { backgroundColor: theme.red.DEFAULT }]}
        >
          <Icon color={theme.white.DEFAULT} name="trash" size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      friction={1}
      leftThreshold={40}
      onSwipeableOpen={() => closeRow(index)}
      overshootFriction={8}
      overshootLeft={true}
      overshootRight={true}
      ref={ref => {
        row[index] = ref;
      }}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      rightThreshold={40}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemText: {
    fontSize: 16,
  },
  rightActions: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // width: 150,
    flexDirection: 'row',
  },
  actionButton: {
    width: 75,
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: 'blue',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SwipeableItem;
