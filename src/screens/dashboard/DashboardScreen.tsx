import EmptyState from '@wd/components/EmptyState/EmptyState';
import Header from '@wd/components/Header';
import InfiniteScrollView from '@wd/components/InfiniteScrollView/InfiniteScrollView';
import Loader from '@wd/components/Loader/Loader';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import SinglePost from '@wd/components/SinglePost/SinglePost';
import { RoutesEnum } from '@wd/navigation/enum';
import { DashboardStackScreenProps } from '@wd/navigation/types';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import { ImageIcon } from 'lucide-react-native';
import React, { FC } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import useGetPosts from './hooks/useGetPosts';

const DashboardScreen: FC<
  DashboardStackScreenProps<RoutesEnum.DASHBOARD_SCREEN>
> = ({ navigation }) => {
  const { theme } = useTheme();
  const { isLoading, posts, page, setPage, totalPages, refetch } =
    useGetPosts();
  const user = useAppSelector(state => state.user?.currentUser);
  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <Header headerTitle={`Hi ${user?.firstName}`} navigation={navigation} />
      <View className="p-4 relative" style={globalStyles.screen}>
        <InfiniteScrollView
          callback={() => {
            if (page < totalPages) {
              setPage(page + 1);
            }
          }}
          fetching={isLoading}
          refreshControl={
            <RefreshControl
              colors={[theme.blue.DEFAULT]}
              onRefresh={refetch}
              progressBackgroundColor={theme.gray[150]}
              refreshing={isLoading}
            />
          }
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          {isLoading ? (
            <Loader style={{ marginVertical: '50%' }} />
          ) : !posts.length ? (
            <EmptyState
              description="There are no available news and updates at this time"
              icon={<ImageIcon color={'white'} size={40} />}
              section
              title="No posts available"
            />
          ) : (
            <View style={{ flex: 1, marginTop: 20 }}>
              {posts.map(post => (
                <SinglePost key={'resident' + post.id} post={post} />
              ))}
            </View>
          )}
        </InfiniteScrollView>
      </View>
    </>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
