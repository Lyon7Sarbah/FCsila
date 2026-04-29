-- ============================================================
-- FC SILA ACADEMY — Full Database Export
-- Generated: 2026-04-29
-- ============================================================

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id                SERIAL PRIMARY KEY,
  parent_name       VARCHAR(255)  NOT NULL,
  phone             VARCHAR(100)  NOT NULL,
  email             VARCHAR(255)  NOT NULL,
  child_name        VARCHAR(255)  NOT NULL,
  child_age         VARCHAR(20)   NOT NULL,
  age_group         VARCHAR(20)   DEFAULT NULL,
  experience        VARCHAR(50)   DEFAULT NULL,
  medical           TEXT          DEFAULT NULL,
  lang              VARCHAR(5)    DEFAULT 'ru',
  status            VARCHAR(30)   DEFAULT 'pending',
  notes             TEXT          DEFAULT NULL,
  created_at        TIMESTAMPTZ   DEFAULT now(),
  updated_at        TIMESTAMPTZ   DEFAULT now(),
  agreement_sent_at TIMESTAMPTZ   DEFAULT NULL,
  promo_code        VARCHAR(50)   DEFAULT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_registrations_status  ON registrations (status);
CREATE INDEX IF NOT EXISTS idx_registrations_created ON registrations (created_at DESC);

-- ============================================================
-- REGISTERED PLAYERS DATA
-- (No registrations recorded yet — table is empty)
-- ============================================================

-- When you have data to migrate, paste INSERT rows here, e.g.:
-- INSERT INTO registrations (parent_name, phone, email, child_name, child_age, age_group, experience, medical, lang, status, notes, created_at, promo_code)
-- VALUES ('...', '...', ...);
