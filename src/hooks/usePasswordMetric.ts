import axios from 'axios';
import { useState } from 'react';
import { Result } from 'check-password-strength';

export const usePasswordMetric = () => {
  const [commonPasswords, setCommonPasswords] = useState<string[]>([]);

  // Mark this function as async to handle the asynchronous loadCommonPasswords
  const extractFeatures = async (password: string, metric: Result<string>, activeStage: number) => {
    await loadCommonPasswords();
    const isValid = await checkContainsDictionaryWord(password);

    return {
      id: activeStage,
      strength: metric.id,
      value: metric.value,
      password: password,
      length: metric.length,
      hasLowerCase: metric.contains.includes('lowercase'),
      hasUpperCase: metric.contains.includes('uppercase'),
      hasSpecialChars: metric.contains.includes('symbol'),
      is_common_password: isCommon(password),
      contains_dictionary_word: isValid,
      num_lowercase: (password.match(/[a-z]/g) || []).length,
      num_uppercase: (password.match(/[A-Z]/g) || []).length,
      num_digits: (password.match(/\d/g) || []).length,
      num_special_chars: (password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length,
      num_spaces: (password.match(/ /g) || []).length,
      character_diversity: new Set(password).size,
      consecutive_chars: countConsecutiveChars(password),
      entropy: calculateEntropy(password),
    };
  };

  const checkWord = async (password: string) => {
    try {
      const response = await axios.get(`https://sozluk.gov.tr/gts?ara=${password}`);
      return response.data.length > 0;
    } catch (error) {
      console.log('Error =>', error);
      return false;
    }
  };

  const checkContainsDictionaryWord = async (password: string) => {
    const isValid = await checkWord(password);
    return isValid;
  };

  // Check is Common Password
  const loadCommonPasswords = async () => {
    try {
      const response = await fetch('/model/common-passwords');
      const data = await response.text();
      const passwords = data.split('\n').map((password) => password.trim());
      setCommonPasswords(passwords);
    } catch (error) {
      console.error('Error loading common passwords:', error);
    }
  };

  const isCommon = (password: string) => {
    return commonPasswords.includes(password);
  };

  // Count consecutive characters
  const countConsecutiveChars = (password: string): number => {
    let count = 0;
    let maxCount = 0;

    for (let i = 1; i < password.length; i++) {
      if (password[i] === password[i - 1]) {
        count++;
        maxCount = Math.max(maxCount, count);
      } else {
        count = 0;
      }
    }

    return maxCount;
  };

  // Calculate entropy of the password
  const calculateEntropy = (password: string): number => {
    const length = password.length;
    const uniqueChars = new Set(password).size;
    return Math.log2(uniqueChars) * length;
  };

  return { extractFeatures, loadCommonPasswords }; // Return the function if you need to call it manually
};
