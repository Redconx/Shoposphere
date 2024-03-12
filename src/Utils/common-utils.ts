export const addEllipsis = (text:string) => {
  if (text.length > 50) {
    return text.substring(0, 50) + "...";
  }
  return text;
};

export const URL = "https://flip-a9xe.onrender.com";
// export const URL = "http://localhost:2410";