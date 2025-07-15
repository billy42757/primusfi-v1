import React, { useEffect, useState } from 'react';
import RecentItem from './RecentItem';
import { RecentItemProps } from '@/types/type';
import axios from 'axios';
import { url } from '@/data/data';
import { elipsKey, timeAgo } from '@/utils';
import { errorAlert } from '../ToastGroup';

const RecentList: React.FC = () => {
  const [recentItems, setRecentItem] = useState<RecentItemProps[]>([]);

  useEffect(() => {
    try {
      (async() => {
        const recentData = await axios.get(url + "api/market/recent");
        console.log("recen datas:", recentData.data.length);
        
        let recentItem:RecentItemProps[] = []
        for (let index = 0; index < recentData.data?.length; index++) {
          const element = recentData.data[index];
          recentItem.push ({
            question: element.question,
            timeAgo: timeAgo(Number(element.createdAt)),
            userName: elipsKey( element.creator),
            action: element.isFund? "add fund" :  element.buyYes || element.buyNo? "bought" : "sold",
            price: element.isFund? element.fundAmount : element.value,
            imageSrc: element.imageUrl,
            status: element.isFund? "funded" :  element.buyYes || element.sellYes? "yes" : "no",
          })
        }
        console.log("recent data:", recentItem);
        setRecentItem(recentItem);
      })();
    } catch (error) {
      errorAlert("Failed getting recent activity!")
    }
  }, [])

  return (
    <div className="self-stretch rounded-2xl flex flex-col justify-start items-start gap-2">
      {(recentItems).map((item, index) => (
        <RecentItem key={index} {...item} />
      ))}
    </div>
  );
};

export default RecentList;
