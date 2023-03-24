export const getcurrentUrl = (url: string, mediaCode?: string) => {
  // debugger
  const urlSplit = url.split('.');
    const finalUrl =  urlSplit[0] + getRetinaDisplay(mediaCode) + urlSplit[1];
  return new URL(`../assets/images/${finalUrl}`, import.meta.url).href
}

const getRetinaDisplay = (mediaCode?: string) => {
  if(mediaCode === 'md')
      return '@2x.'
  else if(mediaCode === 'lg')
      return '@3x.'  
  else
      return '.'
  }