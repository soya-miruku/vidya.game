export const IsTextEmpty = (text: any) => {
  if(typeof(text) === 'string') {
    return text.trim().length === 0;
  }

  if(text?.[0]?.children) {
    return text[0].children?.[0].text?.trim().length === 0;
  }

  return false;
}