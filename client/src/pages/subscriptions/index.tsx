import SectionHeader from '@/components/section-header';
import { useStore } from '@/hooks';
import { Box, LinearProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import PremiumPlans from './premium-plans';
import { styles } from './styles';

const SubscriptionsPage = () => {
  const { subscriptions, getSubscriptions, getSubscriptionsLoading } =
    useStore('subscriptionsStore');

  useEffect(() => {
    getSubscriptions();
  }, []);

  if (getSubscriptionsLoading && !subscriptions) {
    return <LinearProgress sx={styles.progress} />;
  }

  return (
    <Box sx={styles.pageWrapper}>
      <SectionHeader
        title="Subscriptions"
        description="List of available subscription plans."
      />
      {subscriptions && subscriptions.length > 0 ? (
        <PremiumPlans plans={subscriptions} />
      ) : null}
    </Box>
  );
};

export default observer(SubscriptionsPage);
