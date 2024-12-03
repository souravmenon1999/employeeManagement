import Skeleton,{SkeletonTheme} from "react-loading-skeleton";
import styles from '../styles/skeletonComponent.module.css';

import React from 'react';


const SkeletonComponent: React.FC = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.skeletonHeader}></div>
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonAvatar}></div>
        <div className={styles.skeletonContent}>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLine}></div>
        </div>
      </div>
      <div className={styles.skeletonFooter}></div>
    </div>
  );
};

export default SkeletonComponent;
