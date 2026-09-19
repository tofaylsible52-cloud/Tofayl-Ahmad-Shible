/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = usePortfolio();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((notif) => {
          let bg = 'bg-neutral-900 border-neutral-700 text-white';
          let icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;

          if (notif.type === 'success') {
            bg = 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100';
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
          } else if (notif.type === 'warning') {
            bg = 'bg-amber-950/90 border-amber-500/40 text-amber-100';
            icon = <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />;
          } else if (notif.type === 'error') {
            bg = 'bg-rose-950/90 border-rose-500/40 text-rose-100';
            icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
          }

          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md ${bg}`}
            >
              {icon}
              <p className="text-sm font-medium flex-1 pt-0.5 leading-snug">{notif.message}</p>
              <button
                type="button"
                onClick={() => removeNotification(notif.id)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
