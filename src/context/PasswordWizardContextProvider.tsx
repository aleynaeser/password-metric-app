'use client';

import { DateTime, Duration } from 'luxon';
import { Result } from 'check-password-strength';
import { createContext, useContext, useState } from 'react';

interface IPasswordWizardContext {
  activeStage: number;
  setActiveStage: (stage: number) => void;
  stages: TStage[];
  setStages: (stages: TStage[]) => void;
  passwordAccepted: boolean;
  setPasswordAccepted: (accepted: boolean) => void;
  userStats: TUserStats;
  updateStats: (stats: TStats) => void;
  metrics: Result<string> | undefined;
  setMetrics: (stage: Result<string> | undefined) => void;
  startTime: DateTime<true> | undefined;
  setStartTime: (time: DateTime<true> | undefined) => void;
}

const PasswordWizardContext = createContext<IPasswordWizardContext | undefined>(undefined);

export function PasswordWizardContextProvider({ children }: { children: React.ReactNode }) {
  const [stages, setStages] = useState<TStage[]>([]);
  const [activeStage, setActiveStage] = useState<number>(1);

  const [metrics, setMetrics] = useState<Result<string>>();
  const [passwordAccepted, setPasswordAccepted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<DateTime<true> | undefined>();

  const [userStats, setUserStats] = useState<TUserStats>({
    times: [],
    attempts: [0, 0, 0],
  });

  const updateStats = (stats: { time: Duration; attempt: number }) => {
    const newStats = { ...userStats };
    newStats.times[activeStage - 1] = stats.time;
    newStats.attempts[activeStage - 1] = stats.attempt;
    setUserStats(newStats);
  };

  const value = {
    activeStage,
    setActiveStage,
    stages,
    setStages,
    passwordAccepted,
    setPasswordAccepted,
    userStats,
    updateStats,
    metrics,
    setMetrics,
    startTime,
    setStartTime,
  };

  return <PasswordWizardContext.Provider value={value}>{children}</PasswordWizardContext.Provider>;
}

export function usePasswordWizard() {
  const context = useContext(PasswordWizardContext);
  if (!context) {
    throw new Error('usePasswordWizard must be used within a PasswordWizardProvider');
  }
  return context;
}
