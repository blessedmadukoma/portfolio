export function TruncateText(text: any, maxLength: number) {
  if (text?.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}
