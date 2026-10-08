export const GALA_EVENT_SLUG = 'church-gala-2026'

export interface GalaRegistration {
  full_name: string
  bringing_guest: 'Yes' | 'No'
  has_food_allergies: 'Yes' | 'No'
  food_allergy_details: string
  attendee_count: number
}

export function validateGalaRegistration(value: unknown):
  | { data: GalaRegistration; error?: never }
  | { data?: never; error: string } {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { error: 'Please complete the registration form.' }
  }

  const fields = value as Record<string, unknown>
  const fullName = typeof fields.full_name === 'string' ? fields.full_name.trim() : ''
  if (!fullName || fullName.length > 150) {
    return { error: 'Please enter your full name (up to 150 characters).' }
  }
  if (fields.bringing_guest !== 'Yes' && fields.bringing_guest !== 'No') {
    return { error: 'Please indicate whether you are bringing one guest.' }
  }
  if (fields.has_food_allergies !== 'Yes' && fields.has_food_allergies !== 'No') {
    return { error: 'Please indicate whether you or your guest have any food allergies.' }
  }

  const details = typeof fields.food_allergy_details === 'string'
    ? fields.food_allergy_details.trim()
    : ''
  if (fields.has_food_allergies === 'Yes' && (!details || details.length > 2000)) {
    return { error: 'Please describe the food allergies (up to 2,000 characters).' }
  }

  return {
    data: {
      full_name: fullName,
      bringing_guest: fields.bringing_guest,
      has_food_allergies: fields.has_food_allergies,
      food_allergy_details: fields.has_food_allergies === 'Yes' ? details : '',
      attendee_count: fields.bringing_guest === 'Yes' ? 2 : 1,
    },
  }
}
