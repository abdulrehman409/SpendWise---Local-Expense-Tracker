
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </div>
        <h2 className="text-2xl font-bold">Get in Touch</h2>
        <p className="opacity-80 text-sm mt-2">Have questions or feedback? We'd love to hear from you!</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</p>
              <a href="tel:03325750036" className="text-lg font-bold text-gray-800">03325750036</a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</p>
              <a href="mailto:abdulrehmannasir409@gmail.com" className="text-lg font-bold text-gray-800 break-all">abdulrehmannasir409@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 text-center">
        <p className="text-xs text-gray-400">Version 1.0.0 (Offline Build)</p>
      </div>
    </div>
  );
};

export default Contact;
