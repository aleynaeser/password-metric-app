export {};

declare global {
  type TPasswordForm = {
    password1: string;
    password2: string;
    password3: string;
  };

  type TStage = {
    id: number;
    password: string;
    time: Date;
    user_attempts: number;
    strength: 0 | 1 | 2;
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
