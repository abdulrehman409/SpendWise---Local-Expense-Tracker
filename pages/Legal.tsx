
import React from 'react';
import { LegalType } from '../types';

interface LegalProps {
  type: LegalType;
}

const Legal: React.FC<LegalProps> = ({ type }) => {
  const content = {
    [LegalType.PRIVACY]: {
      title: 'Privacy Policy',
      text: `
        SpendWise built the app as a Free app. This SERVICE is provided by at no cost and is intended for use as is.
        
        Information Collection and Use:
        The app works entirely OFFLINE. We do not collect, share, or store any personal data on any server. All expense data you input is stored locally on your device's private storage (LocalStorage/Internal DB).
        
        Security:
        I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.
        
        Device Permissions:
        The app does not require internet permission. It operates strictly within your device environment.
        
        Children's Privacy:
        These Services do not address anyone under the age of 13.
      `
    },
    [LegalType.TERMS]: {
      title: 'Terms & Conditions',
      text: `
        By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app.
        
        You’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app.
        
        The app itself, and all the trademarks, copyright, database rights and other intellectual property rights related to it, still belong to the developer.
        
        Data Responsibility:
        It is your responsibility to keep your phone and access to the app secure. If you clear your browser data or app data, your expenses will be PERMANENTLY deleted as we do not maintain cloud backups.
      `
    },
    [LegalType.DISCLAIMER]: {
      title: 'Disclaimer',
      text: `
        SpendWise is intended for personal financial tracking purposes only. 
        
        Accuracy of Data:
        The developer is not responsible for any financial decisions made based on the summaries provided by this app. Always verify your bank statements for critical financial planning.
        
        Loss of Data:
        Since the app stores data locally, we are not liable for any data loss occurring due to device theft, hardware failure, or software resets.
        
        No Liability:
        In no event shall the developer be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever.
      `
    }
  };

  const active = content[type];

  return (
    <div className="animate-in fade-in duration-300 pb-12">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{active.title}</h2>
        <div className="prose prose-sm text-gray-600 space-y-4 whitespace-pre-line text-sm leading-relaxed">
          {active.text}
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-indigo-50 rounded-xl text-indigo-700 text-xs font-medium text-center">
        This app is designed for complete offline use. Your privacy is our priority.
      </div>
    </div>
  );
};

export default Legal;
