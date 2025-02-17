import { Options } from 'check-password-strength';

declare global {
  type TPasswordForm = {
    password1: string;
    password2: string;
    password3: string;
  };

  type TPasswordStrength = {
    password: string;
    options?: Options<string>;
    allowedSymbols?: string;
  };

  type TStats = {
    time: Duration;
    attempt: number;
  };

  type TUserStats = {
    times: Array<Duration>;
    attempts: Array<number>;
  };

  type TStrength = 0 | 1 | 2 | 3;

  type TStage = {
    id: number;
    password: string;
    value: string;
    strength: number;
    length: number;
    hasLowerCase: boolean;
    hasUpperCase: boolean;
    hasSpecialChars: boolean;
    is_common_password: boolean;
    contains_dictionary_word: boolean;
    num_lowercase: number;
    num_uppercase: number;
    num_digits: number;
    num_special_chars: number;
    num_spaces: number;
    consecutive_chars: number;
    character_diversity: number;
    entropy: number;
  };
}
