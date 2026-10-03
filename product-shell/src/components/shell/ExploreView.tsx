'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useShellStore } from '@/services/useShellStore';
import { EXPLORE_TOPICS } from '@/data/mockFeedData';
import { ExploreTopic } from '@/types/shell';
import { t } from '@/i18n/copy';

const HI_TOPIC: Record<string, { title: string; sub: string }> = {
  exp_1: { title: 'बंगाल की खाड़ी — चक्रवाती दबाव', sub: 'रास्ता और संभावना, सादी भाषा में' },
  exp_2: { title: 'खरीफ धान — पानी भरने का खतरा', sub: 'कौन-से गाँव प्रभावित हो सकते हैं' },
  exp_3: { title: 'पूर्व भारत — धान मंडी भाव', sub: 'आवक घटी तो भाव कैसे हिल सकता है' },
  exp_4: { title: 'पंजाब — गेहूं पर गर्मी', sub: 'फूल अवस्था संवेदनशील है' },
  exp_5: { title: 'झुलसा रोग का मौसम', sub: 'गीले पत्ते ≠ अभी दवा' },
  exp_6: { title: 'विदर्भ सोयाबीन आवक', sub: 'किसान रोकें या बेचें — रेंज में सोचें' },
  exp_7: { title: 'गाँव नक्शा कितना सटीक', sub: 'उन्नत: CRPS / पहाड़' },
  exp_8: { title: 'फसल नुकसान मुआवज़ा', sub: 'उपज ट्रिगर — नीति इंजन नहीं है' },
  exp_9: { title: 'महानदी निकासी देरी', sub: 'ज्वार और गेट क्षमता' },
  exp_10: { title: 'बाढ़ सहने वाली धान', sub: 'किस्म सलाह, बीज गारंटी नहीं' }
};

const CAT_HI: Record<string, string> = {
  All: 'सब',
  Weather: 'मौसम',
  Agriculture: 'फसल',
  Market: 'मंडी',
  Policy: 'नीति',
  Research: 'गहराई'
};

export default function ExploreView() {
  const { setActiveContextTopic, openModuleWorkspace, submitComposerQuery, setActiveNav, locale } = useShellStore();
  const [family, setFamily] = useState('All');
  const hi = locale === 'hi';
  const categories = ['All', 'Weather', 'Agriculture', 'Market', 'Policy', 'Research'];
  const visible = family === 'All' ? EXPLORE_TOPICS : EXPLORE_TOPICS.filter((row) => row.category === family);

  const openTopic = (topic: ExploreTopic) => {
    if (topic.region) setActiveContextTopic(topic.region);
    setActiveNav('ai');
    submitComposerQuery(hi ? (HI_TOPIC[topic.id]?.title || topic.title) : topic.title);
  };

  return (
    <div className="nv-page">
      <div className="nv-page-head">
        <p>{t(locale, 'explore')}</p>
        <h1>{hi ? 'विश्लेषण कार्ड' : 'Analysis cards'}</h1>
        <span>{hi ? 'शुरुआत: एक कार्ड चुनो। उन्नत: जुड़े इंजन खोलो।' : 'Beginner: pick a card. Advanced: open the linked engines.'}</span>
      </div>
      <div className="nv-filters">
        {categories.map((item) => (
          <button key={item} type="button" className={family === item ? 'is-active' : ''} onClick={() => setFamily(item)}>
            {hi ? CAT_HI[item] : item}
          </button>
        ))}
      </div>
      <div className="nv-catalog">
        {visible.map((topic, index) => (
          <motion.article
            key={topic.id}
            className="nv-feature-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.35 }}
            onClick={() => openTopic(topic)}
          >
            <div className="nv-feature-top">
              <span>{hi ? CAT_HI[topic.category] : topic.category}</span>
              <em>{topic.region}</em>
            </div>
            <h2>{hi ? HI_TOPIC[topic.id]?.title || topic.title : topic.title}</h2>
            <p>{hi ? HI_TOPIC[topic.id]?.sub || topic.subtitle : topic.subtitle}</p>
            <div className="nv-tags">
              {topic.relatedModules.map((moduleNumber) => (
                <i
                  key={moduleNumber}
                  onClick={(event) => {
                    event.stopPropagation();
                    openModuleWorkspace(moduleNumber, 3000 + moduleNumber, `M${moduleNumber}`);
                  }}
                >
                  M{String(moduleNumber).padStart(2, '0')}
                </i>
              ))}
              {topic.trending ? <i className="is-pro">{hi ? 'चर्चा में' : 'Trending'}</i> : null}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
