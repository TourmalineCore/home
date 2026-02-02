export function getMessageFromForm(formData: FormData): { [key: string]: string; } {
  return Array
    .from(formData)
    .reduce((message, [key, value]) => ({
      ...message,
      [key]: value,
    }), {});
}
