import { usePasswordWizard } from '@context/PasswordWizardContextProvider';
import { Duration } from 'luxon';

export const usePasswordAnalysis = () => {
  const { stages, userStats } = usePasswordWizard();

  const getTotalSeconds = (duration: Duration) => duration?.minutes * 60 + duration?.seconds;

  const calculateMostStrengthPassword = () => {
    return stages.reduce((max, stage) => (stage.strength > max.strength ? stage : max));
  };

  const calculateMostEntropyPassword = () => {
    return stages.reduce((max, stage) => (stage.entropy > max.entropy ? stage : max));
  };

  const analyzeFirstAndOtherStagesPasswords = () => {
    const firstStage = stages[0];
    const otherStages = stages.slice(1);

    const averageOtherStrength = otherStages.reduce((sum, stage) => sum + stage.strength, 0) / otherStages.length;

    const message =
      firstStage.strength < averageOtherStrength
        ? 'Yönergelerle daha güçlü şifreler oluşturduğunuz anlaşılmaktadır'
        : 'Yönergesizde güçlü şifreler oluşturduğunuzu göstermektedir';

    return {
      message,
      averageOtherStrength,
      firstStageStrength: firstStage.strength,
    };
  };

  const calculateDurationAnalysis = () => {
    let message;

    const longestDurationIndex = userStats.times.reduce(
      (maxIdx, time, idx) => (getTotalSeconds(time) > getTotalSeconds(userStats.times[maxIdx]) ? idx : maxIdx),
      0,
    );

    const shortestDurationIndex = userStats.times.reduce(
      (minIdx, time, idx) => (getTotalSeconds(time) < getTotalSeconds(userStats.times[minIdx]) ? idx : minIdx),
      0,
    );

    const longestStrength = stages[longestDurationIndex].strength;
    const shortestStrength = stages[shortestDurationIndex]?.strength;

    if (longestStrength === shortestStrength) {
      message = 'Şifre oluşturma süreniz ve şifre gücünüz arasında dengeli bir ilişki var.';
    } else if (
      getTotalSeconds(userStats.times[longestDurationIndex]) > getTotalSeconds(userStats.times[shortestDurationIndex])
    ) {
      message = 'Şifre oluşturma süreniz arttıkça daha güçlü şifreler oluşturdunuz.';
    } else {
      message = 'Şifre oluşturma süreniz kısa olsa da güçlü şifreler oluşturmayı başardınız.';
    }

    return {
      message,
      longestDurationStage: {
        index: longestDurationIndex,
        stage: stages[longestDurationIndex],
        duration: userStats.times[longestDurationIndex],
      },
      shortestDurationStage: {
        index: longestDurationIndex,
        stage: stages[shortestDurationIndex],
        duration: userStats.times[shortestDurationIndex],
      },
    };
  };

  const calculateAttemptsDurationStrengthAnalysis = () => {
    let message;
    const durationAnalysis = calculateDurationAnalysis();

    const longestDurationIndex = durationAnalysis.longestDurationStage.index;
    const shortestDurationIndex = durationAnalysis.shortestDurationStage.index;

    const longestTime = userStats.times[longestDurationIndex];
    const shortestTime = userStats.times[shortestDurationIndex];
    const shortestStrength = stages[shortestDurationIndex].strength;
    const longestStrength = stages[longestDurationIndex].strength;

    const longestAttemptIndex = userStats.attempts.reduce(
      (maxIdx, attempt, idx) => (attempt > userStats.attempts[maxIdx] ? idx : maxIdx),
      0,
    );

    const shortestAttemptIndex = userStats.attempts.reduce(
      (minIdx, attempt, idx) => (attempt < userStats.attempts[minIdx] ? idx : minIdx),
      0,
    );

    const longestAttempts = userStats.attempts[longestAttemptIndex];
    const shortestAttempts = userStats.attempts[shortestAttemptIndex];

    console.log(userStats  );

    if (longestAttempts === shortestAttempts) {
      if (longestStrength === shortestStrength)
        message =
          'Şifre oluşturmak için aynı şifre gücüne sahip denemeler yaptınız ve deneme sayısı açısından hiçbir fark yok.';
      else
        message =
          'Şifre oluşturmak için aynı sayıda deneme yaptınız, ancak süre ve güç sayısı açısından farklılıklar gözlemlenebilir.';
    } else if (longestAttempts > shortestAttempts) {
      if (getTotalSeconds(longestTime) > getTotalSeconds(shortestTime))
        message = 'Şifre oluşturma süreniz uzakdıkça, daha fazla denemeyle şifre oluşturdunuz.';
      else message = 'Şifre oluşturma süreniz kısaldıkça, fazla deneme denemeyle şifre oluşturdunuz.';
    } else if (longestAttempts < shortestAttempts) {
      if (getTotalSeconds(longestTime) > getTotalSeconds(shortestTime))
        message = 'Şifre oluşturma süreniz uzakdıkça, daha az denemeyle şifre oluşturdunuz.';
      else message = 'Şifre oluşturma süreniz kısaldıkça, daha az denemeyle şifre oluşturdunuz.';
    }

    return {
      longestAttemptStage: {
        attempt: longestAttempts,
        stage: stages[longestAttemptIndex],
      },
      shortestAttemptStage: {
        attempt: shortestAttempts,
        stage: stages[shortestAttemptIndex],
      },
      message: message,
    };
  };

  const userIsAcceptedPassword = () => {
    if (stages.length <= 2) {
      const lastStage = stages[stages.length - 1];

      if (lastStage.strength < 3) {
        return 'Oluşturulan parola zayıf olduğu bilindiği halde şifre kabul edildi ve daha güçlü bir şifre oluşturmak için herhangi bir çaba sarf edilmedi. Bu durum, bilişsel uyumsuzluk etkisiyle ilişkilendirilebilir: Kullanıcı güçlü bir şifre oluşturma konusunda gerekli önlemleri almak yerine, mevcut şifreyi kabul etmiştir. Bu, güvenli şifre oluşturma konusunda bilinçli bir yaklaşım yerine, mevcut durumu kabul etme eğiliminden kaynaklanabilir.';
      }
      return 'Kullanıcı güçlü bir şifre oluşturdu. Bu, kullanıcının güçlü şifre oluşturma sürecine uygun şekilde dikkatli kararlar verdiğini ve güvenli şifreleme konusuna yönelik bilinçli bir çaba sarf ettiğini göstermektedir. Bunu başarmak, bilişsel uyumsuzluk yerine güvenlik bilincinin yüksek olduğunu ortaya koyuyor.';
    }
    return 'Kullanıcı süreçte güçlü bir şifre oluşturmaya çalıştı. Bu durumda, kullanıcı sürecin her aşamasında bilinçli kararlar alarak güvenli bir şifre oluşturma yolunda çaba sarf etti.';
  };

  const mostStrongPassword = calculateMostStrengthPassword();
  const mostEntropyPassword = calculateMostEntropyPassword();
  const firstVsOthers = analyzeFirstAndOtherStagesPasswords();
  const durationAnalysis = calculateDurationAnalysis();
  const decision = userIsAcceptedPassword();
  const attemptDurationAndStrength = calculateAttemptsDurationStrengthAnalysis();

  return {
    decision,
    mostStrongPassword,
    mostEntropyPassword,
    firstVsOthers,
    durationAnalysis,
    attemptDurationAndStrength,
  };
};
