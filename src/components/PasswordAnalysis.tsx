import { usePasswordAnalysis } from '@hooks/usePasswordAnalysis';
import { usePasswordWizard } from '@context/PasswordWizardContextProvider';

export default function PasswordAnalysis() {
  const { stages, userStats } = usePasswordWizard();
  const { decision, firstVsOthers, attemptDurationAndStrength, durationAnalysis, mostEntropyPassword, mostStrongPassword } =
    usePasswordAnalysis();

  const { attempts, times } = userStats;
  const { message, averageOtherStrength, firstStageStrength } = firstVsOthers;
  const { message: durationMessage, longestDurationStage, shortestDurationStage } = durationAnalysis;
  const { message: attemptMessage, longestAttemptStage, shortestAttemptStage } = attemptDurationAndStrength;

  return (
    <div className='mb-12 rounded-md border p-4 shadow-md'>
      <h2 className='mb-4 text-center text-xl font-bold'>Parola Analizi</h2>

      <div className='my-4 text-center font-medium'>0 = Too weak, 1 = Weak , 2 = Medium, 3 = Strong</div>

      <div className='mt-6 space-y-8 text-left'>
        <div>
          <h3 className='text-md pb-4 font-bold'>1. Hangi aşamada daha güçlü parola oluşturuldu?</h3>

          <div className='flex flex-col gap-2'>
            <span>
              Oluşturduğunuz en güçlü parola, <strong>Aşama {mostStrongPassword.id}</strong> sırasında elde edilmiştir.
            </span>

            <span>
              <strong>Parola:</strong> <span className='text-blue-600'>{mostStrongPassword.password}</span>
            </span>

            <span>
              <strong>Parolanın Güç seviyesi: </strong>
              <span className='text-green-600'>
                {mostStrongPassword.strength} - {mostStrongPassword.value}
              </span>
            </span>
          </div>
        </div>

        <div>
          <h3 className='text-md pb-4 font-bold'>2. Hangi parola daha yüksek entropiye sahip?</h3>

          <div className='flex flex-col gap-2'>
            <span>
              Bilgi entropisi açısından en güçlü parola, <strong>Aşama {mostEntropyPassword.id} </strong>
              sırasında oluşturulmuştur.Yüksek entropi, parolanın daha zor tahmin edilebilir olduğunu gösterir.
            </span>

            <span>
              <strong> Parola Entropisi:</strong> <span className='text-blue-600'>c{mostEntropyPassword.password}</span>{' '}
              olarak ölçülmüştür.
            </span>

            <span>
              <strong>Entropi Seviyesi: </strong>
              <span className='text-green-600'>{mostEntropyPassword.entropy.toFixed(4)}</span>
            </span>
          </div>
        </div>

        <div>
          <h3 className='text-md pb-4 font-bold'>4. Parola gücünüz, parola oluşturma süresine göre nasıl değişti?</h3>
          <div className='flex flex-col gap-2'>
            <span>Parola oluşturma sürelerinin parola gücüyle olan ilişki analizini içerir.</span>

            <span>
              <strong>En kısa süre geçirilen aşama: </strong>
              <span className='font-medium'>Aşama {shortestDurationStage.stage.id}</span>
            </span>

            <span>
              <strong>Süre: </strong>
              <span className='text-blue-600'>
                {shortestDurationStage.duration?.minutes} dakika {shortestDurationStage.duration?.seconds.toFixed(3)} saniye
              </span>
              , <strong>Güç Seviyesi: </strong>
              <span className='text-green-600'>{shortestDurationStage.stage.strength}</span>
            </span>

            <span>
              <strong>En uzun süre geçirilen aşama: </strong>
              <span>Aşama {longestDurationStage.stage.id}</span>
            </span>

            <span>
              <strong>Süre: </strong>
              <span className='text-blue-600'>
                {longestDurationStage.duration?.minutes} dakika {longestDurationStage.duration?.seconds.toFixed(3)} saniye
              </span>
              , <strong>Güç Seviyesi: </strong>
              <span className='text-green-600'>{longestDurationStage.stage.strength}</span>
            </span>

            <span className='mt-2 font-medium text-purple-700'>{durationMessage}</span>
          </div>
        </div>

        <div>
          <h3 className='text-md pb-4 font-bold'>5. Parola Gücü, Deneme Sayısı ve Süresi arasındaki ilişki</h3>

          <div className='flex flex-col gap-2'>
            <span>
              <strong>En az deneme yapılan aşama: </strong>
              <span>Aşama {shortestAttemptStage.stage.id}</span>
            </span>

            <span>
              <strong>Deneme Sayısı: </strong>
              <span className='text-blue-600'>{shortestAttemptStage.attempt} defa</span>, <strong>Güç Seviyesi: </strong>
              <span className='text-green-600'>{shortestAttemptStage.stage.strength}</span>
            </span>

            <span>
              <strong>En fazla deneme yapılan aşama: </strong>
              <span>Aşama {longestAttemptStage.stage.id}</span>
            </span>

            <span>
              <strong>Deneme Sayısı: </strong>
              <span className='text-blue-600'>{longestAttemptStage.attempt} defa</span>, <strong>Güç Seviyesi: </strong>
              <span className='text-green-600'>{longestDurationStage.stage.strength}</span>
            </span>

            <span className='mt-2 font-medium text-purple-700'>{attemptMessage}</span>
          </div>
        </div>

        <div>
          <h3 className='text-md pb-4 font-bold'>6. İlk Aşamada Yönergeler Olmadığında Ne Kadar Güçlü Şifre Oluşturuldu?</h3>

          <div className='flex flex-col gap-2'>
            <span>
              <strong>İlk aşamada yönergeler olmadan oluşturulan şifre gücü: </strong>
              <span className='text-green-600'>{firstStageStrength} </span>
            </span>

            <span>
              <strong>Diğer aşamalardaki şifrelerin ortalama gücü: </strong>
              <span className='text-blue-600'>{averageOtherStrength.toFixed(2)}</span>
            </span>

            <span className='mt-2 font-medium text-purple-700'>Bu durum analiz edildiğine {message}</span>
          </div>
        </div>

        <div>
          <h3 className='text-md pb-4 font-bold'>7. Parola Kararı</h3>

          <p>
            Bu analiz, kullanıcının güçlü bir parola oluşturup oluşturmadığını ve süreç boyunca kararlarını kontrol eder.
          </p>

          <div className='mt-2 font-medium text-purple-700'>{decision}</div>
        </div>
      </div>

      <h2 className='my-4 text-center text-xl font-bold'>Aşama Özeti</h2>

      <ul className='space-y-2'>
        {stages.map((stage, index) => (
          <li key={stage.id} className='mb-4'>
            <h3 className='text-md mb-3 font-semibold text-[var(--primary)]'>Aşama {index + 1}</h3>

            <ul className='list-inside list-disc space-y-1'>
              <li className='text-[var(--secondary)]'>
                Parola: <span className='text-[var(--primary)]'>{stage.password}</span>
              </li>

              <li className='text-[var(--secondary)]'>
                Güç:{' '}
                <span className='text-[var(--primary)]'>
                  {stage.strength} {stage.value}
                </span>
              </li>

              <li className='text-[var(--secondary)]'>
                Geçirilen Süre:{' '}
                <span className='text-[var(--primary)]'>
                  {times[index].minutes} dakika {times[index].seconds.toFixed(3)} saniye
                </span>
              </li>

              <li className='text-[var(--secondary)]'>
                Deneme Sayısı: <span className='text-[var(--primary)]'>{attempts[index]}</span>
              </li>

              <li className='text-[var(--secondary)]'>
                Uzunluk: <span className='text-[var(--primary)]'>{stage.length} karakter</span>
              </li>

              <li className='text-[var(--secondary)]'>
                Küçük Harf: <span className='text-[var(--primary)]'>{stage.hasLowerCase ? 'Evet' : 'Hayır'}</span>
              </li>

              <li className='text-[var(--secondary)]'>
                Büyük Harf: <span className='text-[var(--primary)]'>{stage.hasUpperCase ? 'Evet' : 'Hayır'}</span>
              </li>

              <li className='text-[var(--secondary)]'>
                Özel Karakter: <span className='text-[var(--primary)]'>{stage.hasSpecialChars ? 'Evet' : 'Hayır'}</span>
              </li>

              <li className='text-[var(--secondary)]'>
                Ortak Parola: <span className='text-[var(--primary)]'>{stage.is_common_password ? 'Evet' : 'Hayır'}</span>
              </li>

              <li className='text-[var(--secondary)]'>
                Sözlük Kelimesi İçeriyor:{' '}
                <span className='text-[var(--primary)]'>{stage.contains_dictionary_word ? 'Evet' : 'Hayır'}</span>
              </li>

              <li className='text-[var(--secondary)]'>
                Entropi: <span className='text-[var(--primary)]'>{stage.entropy}</span>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
