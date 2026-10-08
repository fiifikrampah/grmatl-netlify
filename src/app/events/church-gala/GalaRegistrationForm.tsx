'use client'

import { useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowRight, LoaderCircle, Users } from 'lucide-react'
import { GALA_EVENT_SLUG, validateGalaRegistration } from '@/lib/gala-registration'

const choiceClass = 'flex min-h-12 flex-1 cursor-pointer items-center gap-3 rounded-xl border border-[#ded5c4] bg-white px-4 py-3 text-sm font-semibold transition-colors hover:border-[#92702e] has-[:checked]:border-[#92702e] has-[:checked]:bg-[#f6efdf] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#92702e]'
const inputClass = 'w-full rounded-xl border border-[#ded5c4] bg-white px-4 py-3.5 text-base text-[#25221c] placeholder:text-[#80796d] focus:border-[#92702e] focus:outline-none focus:ring-2 focus:ring-[#92702e]/20'

export default function GalaRegistrationForm() {
  const router = useRouter()
  const pathname = usePathname()
  const submitting = useRef(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [bringingGuest, setBringingGuest] = useState('')
  const [hasAllergies, setHasAllergies] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return

    const result = validateGalaRegistration(Object.fromEntries(new FormData(event.currentTarget)))
    if (result.error) {
      setSubmitError(result.error)
      return
    }

    submitting.current = true
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/event-responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_slug: GALA_EVENT_SLUG, response_data: result.data }),
      })
      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || 'We couldn’t submit your registration. Please try again.')
      }
      router.replace(pathname === '/gala' ? '/gala/success' : '/events/church-gala/success')
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Please try again in a moment.')
      submitting.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Gala registration" aria-busy={isSubmitting}>
      <fieldset disabled={isSubmitting} className="space-y-7 disabled:opacity-70">
        <legend className="sr-only">Your gala registration details</legend>
        <div>
          <label htmlFor="full-name" className="mb-2 block text-sm font-semibold">Attendee’s full name <span className="text-[#8a6523]">*</span></label>
          <input id="full-name" name="full_name" type="text" autoComplete="name" required maxLength={150} pattern=".*\S.*" placeholder="Your full name" className={inputClass} />
        </div>

        <fieldset aria-describedby="guest-help">
          <legend className="mb-1 text-sm font-semibold">Will you be bringing a guest? <span className="text-[#8a6523]">*</span></legend>
          <p id="guest-help" className="mb-3 text-sm text-[#6d6558]">Each attendee may bring a maximum of one guest.</p>
          <div className="flex gap-3">
            {['Yes', 'No'].map((answer) => (
              <label key={answer} className={choiceClass}>
                <input type="radio" name="bringing_guest" value={answer} required checked={bringingGuest === answer} onChange={() => setBringingGuest(answer)} className="h-4 w-4 accent-[#92702e]" />
                {answer}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset aria-describedby="allergy-help">
          <legend className="mb-1 text-sm font-semibold">Do you or your guest have any food allergies? <span className="text-[#8a6523]">*</span></legend>
          <p id="allergy-help" className="mb-3 text-sm text-[#6d6558]">Let us know so we can plan for you.</p>
          <div className="flex gap-3">
            {['Yes', 'No'].map((answer) => (
              <label key={answer} className={choiceClass}>
                <input type="radio" name="has_food_allergies" value={answer} required checked={hasAllergies === answer} onChange={() => setHasAllergies(answer)} className="h-4 w-4 accent-[#92702e]" />
                {answer}
              </label>
            ))}
          </div>
          {hasAllergies === 'Yes' ? (
            <div className="mt-4">
              <label htmlFor="allergy-details" className="mb-2 block text-sm font-semibold">Food allergy details <span className="text-[#8a6523]">*</span></label>
              <textarea id="allergy-details" name="food_allergy_details" required maxLength={2000} rows={3} aria-describedby="allergy-details-help" placeholder="For example: I have a peanut allergy; my guest has a shellfish allergy." className={`${inputClass} resize-y`} />
              <p id="allergy-details-help" className="mt-2 text-xs leading-relaxed text-[#6d6558]">Please list the allergies and indicate whether they apply to you, your guest, or both.</p>
            </div>
          ) : null}
        </fieldset>

        {bringingGuest ? (
          <p className="flex items-center gap-2 border-t border-[#e6ddce] pt-5 text-sm text-[#6d6558]" role="status">
            <Users className="h-4 w-4 text-[#8a6523]" aria-hidden="true" />
            {bringingGuest === 'Yes' ? 'Registering 2 attendees: you and one guest.' : 'Registering 1 attendee: you.'}
          </p>
        ) : null}
      </fieldset>

      {submitError ? <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{submitError}</p> : null}
      <button type="submit" disabled={isSubmitting} className="mt-7 flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#242019] px-5 py-4 text-sm font-semibold text-[#f4e0ac] transition-colors hover:bg-[#3d3322] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#92702e] disabled:cursor-wait disabled:opacity-70">
        {isSubmitting ? <><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />Submitting…</> : <>Register for the gala<ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
      </button>
    </form>
  )
}
