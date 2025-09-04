-- Enable leaked password protection and set password strength requirements
UPDATE auth.config SET
  password_min_length = 8,
  password_require_lowercase = true,
  password_require_uppercase = true,
  password_require_numbers = true,
  password_require_symbols = false,
  password_protect_against_common_passwords = true;