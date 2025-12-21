import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface Props {
  title?: string;
  value?: string | number;
  isLoading?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const StatCard = ({ title, value, isLoading, className, icon }: Props) => {
  return (
    <View
      className={`bg-white items-center flex-row gap-2 relative rounded-xl p-4 border border-gray-200 ${className}`}
      style={{ elevation: 4 }}
    >
      {icon}
      <View>
        <Text className="font-bold" style={{ fontSize: 20 }}>
          {value ?? 0}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#666' }}>
          {title || '--/--'}
        </Text>
      </View>
      {isLoading && (
        <ActivityIndicator className="absolute right-4" color="#666" />
      )}
    </View>
  );
};

export default StatCard;

const styles = StyleSheet.create({});
