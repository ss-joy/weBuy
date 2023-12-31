export function cutOutFirst100Words(text: string) {
  const words = text.split(" ");
  const cutWords = words.slice(0, 38);
  return cutWords.join(" ");
}
