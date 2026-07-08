export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }

  /** True for 401/403 — the current API key's plan doesn't cover this endpoint. */
  get isForbidden() {
    return this.status === 401 || this.status === 403
  }

  get isNotFound() {
    return this.status === 404
  }
}

interface FieldErrorBody {
  errors: { param?: string; error: string }[]
}

function isFieldErrorBody(value: unknown): value is FieldErrorBody {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as FieldErrorBody).errors)
  )
}

/**
 * balldontlie returns three different error shapes depending on the failure:
 * plain text ("Unauthorized", "Not Found"), or JSON `{ errors: [{ param, error }] }`
 * for invalid query params. Normalize all of them to one readable message.
 */
export async function parseErrorMessage(response: Response): Promise<string> {
  const text = await response.text()
  if (!text) return response.statusText || `Request failed with status ${response.status}`

  try {
    const body: unknown = JSON.parse(text)
    if (isFieldErrorBody(body)) {
      return body.errors
        .map((e) => (e.param ? `${e.param}: ${e.error}` : e.error))
        .join("; ")
    }
    if (typeof body === "object" && body !== null && "message" in body) {
      const message = (body as { message: unknown }).message
      if (typeof message === "string") return message
    }
    return text
  } catch {
    return text
  }
}
